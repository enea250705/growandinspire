# Email confirmation with Resend — setup guide

Goal: real signup confirmation + password reset emails, sent from your own domain.

Approach: **Resend as Supabase's SMTP provider.** Supabase keeps owning the auth emails; we only
swap the transport. We do *not* call the Resend API from the app, and no Resend key ever enters
this repo — it lives in the Supabase dashboard.

Why this fixes the blocker: the `HTTP 429 over_email_send_rate_limit` we measured comes from
Supabase's shared built-in sender (a few emails/hour, not for production). Custom SMTP removes
that cap entirely.

---

## Code — done already

| File | Change |
|---|---|
| `src/app/auth/confirm/route.ts` | **new.** Handles email links via `verifyOtp({ token_hash, type })`. Covers both `type=email` (signup) and `type=recovery` (password reset). |
| `src/lib/actions/auth.ts` | `signUp()` now passes `emailRedirectTo`; `sendPasswordReset()` redirect simplified to `/dashboard/settings`. |

Verified at runtime, not just compiled: with the production server running, an unauthenticated
request to `/auth/confirm` reaches the handler and a bad token correctly redirects to
`/login?error=confirm_failed`. This mattered because `src/proxy.ts` middleware runs on every
request — it only guards `/dashboard` and `/admin`, so `/auth/confirm` passes through. A person
confirming their email is by definition not logged in yet; if the middleware had blocked it, the
whole flow would fail silently.

**Small gap left on purpose:** `/login` receives `?error=confirm_failed` but doesn't display a
message, so a failed confirmation just shows a plain login page. Rendering it needs a Suspense
boundary (`useSearchParams` would make the currently-static `/login` dynamic). Worth doing, not
worth risking on this pass. Say the word.

**Why a new route was needed.** The existing `/auth/callback` only handles `?code=` links (the
OAuth/PKCE exchange). Supabase's default `{{ .ConfirmationURL }}` produces exactly that kind of
link, and it only works in the same browser that started the signup — the PKCE verifier lives in
a cookie there. For server-side signup, Supabase's own docs say to switch the templates to a
`token_hash` link and verify it with `verifyOtp`. That is what the new route does. Without both
the route *and* the template edits below, email confirmation fails even with SMTP working
perfectly.

**Not changed on purpose:** the "Account created — check your email" screen in
`src/app/login/page.tsx` is **correct** for this path. With confirmation ON, `signUp()` returns no
session, so that message is accurate. (In my previous report I suggested redirecting to
`/dashboard` — that only applied to the *disable-confirmation* path we are no longer taking.
Ignore it.)

---

Domain: **`growandinspire.al`**, verified in Resend (apex domain, not a subdomain).

## Step 1 — Domain ✅ done

`growandinspire.al` is added and verified. Resend will send to any recipient, from
`no-reply@growandinspire.al`. No mailbox needs to exist at that address — sending and receiving
are separate.

**Recommended, if Resend didn't already have you add it:** a DMARC record. `TXT` at
`_dmarc.growandinspire.al`, value `v=DMARC1; p=none;`. Not required to send, but Gmail and Outlook
increasingly deprioritise mail without it — and a confirmation email in the spam folder looks
identical to "signup is broken." Check DNS before assuming it's there; Resend verifies on SPF and
DKIM alone.

## Step 2 — Create the API key

Resend → **API Keys → Create API Key**. Permission: **Sending access**. Copy it — shown once.

## Step 3 — Point Supabase SMTP at Resend

Supabase Dashboard → **Project Settings → Authentication → SMTP Settings** → enable *Custom SMTP*:

| Field | Value |
|---|---|
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | your Resend API key |
| Sender email | `no-reply@growandinspire.al` |
| Sender name | `Grow and Inspire` |

The sender address must be on `growandinspire.al`, or Resend rejects the message.

Then: **Authentication → Rate Limits → "Emails sent per hour"** — raise it. It defaults to the
low built-in-sender value and will keep throttling you even after SMTP is configured. This is the
step people forget.

Leave **Authentication → Providers → Email → "Confirm email"** turned **ON**. That is the whole
point of this work.

## Step 4 — Edit the two email templates

Supabase Dashboard → **Authentication → Email Templates**. The default templates use
`{{ .ConfirmationURL }}`, which will **not** work with the server-side flow. Replace the link in
each.

**Confirm signup:**
```html
<h2>Konfirmo emailin tënd</h2>
<p>Kliko linkun më poshtë për të aktivizuar llogarinë tënde.</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard">
    Konfirmo emailin
  </a>
</p>
```

**Reset password:**
```html
<h2>Rivendos fjalëkalimin</h2>
<p>Kliko linkun më poshtë për të vendosur një fjalëkalim të ri.</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/dashboard/settings">
    Rivendos fjalëkalimin
  </a>
</p>
```

`type=email` and `type=recovery` are what the new route passes to `verifyOtp`. Getting them wrong
sends users to `/login?error=confirm_failed`.

## Step 5 — URLs (this is where it silently breaks)

Confirmation links are built from `{{ .SiteURL }}`, which comes from the **Supabase dashboard**,
not from `NEXT_PUBLIC_APP_URL`. Both are `localhost` right now.

**While testing locally (do this first):** leave everything as `http://localhost:3000`. Supabase
Site URL, Redirect URLs, and `NEXT_PUBLIC_APP_URL` all stay local. The email still sends from
`growandinspire.al`; only the link inside points at your own machine, which is what you want while
testing on it.

**When you deploy (B9):** change all three together, or the flow breaks.

1. Supabase → **Authentication → URL Configuration → Site URL** → `https://growandinspire.al`
2. Same page → **Redirect URLs** → add `https://growandinspire.al/**`
3. Production env → `NEXT_PUBLIC_APP_URL=https://growandinspire.al`

Change one and not the others and the email arrives with a link to the wrong host. Nothing in the
logs explains why — it just looks like a broken site.

---

## Testing (you can do this today)

Domain is verified, so Resend sends to any address. Nothing here needs the deploy.

1. Finish steps 2–5 above (API key, SMTP, rate limit, templates).
2. `npm run dev`
3. Go to `/login` → Sign Up tab → use a **real inbox you can open**.
4. You should see "Account created — check your email." That screen is correct.
5. Open the email — sender `no-reply@growandinspire.al`. Click the link.
6. It hits `localhost:3000/auth/confirm`, verifies the token, and drops you on `/dashboard`
   logged in.
7. Then test **Forgot password?** the same way. It lands on `/dashboard/settings`.

**Resend → Logs** shows the real SMTP result per message. It's the fastest way to tell a DNS
problem from a template problem: if a message isn't listed at all, Supabase never called Resend.

**The client still can't test this until the site is deployed.** A `localhost` link is dead on
their computer. The email will reach them; the link won't work. Email confirmation and deploy (B9)
are independent to set up, coupled to actually work for anyone but you.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Still `429 over_email_send_rate_limit` | SMTP saved but the Auth → Rate Limits hourly cap is still at the default. Raise it. |
| Email never arrives, Resend logs empty | Supabase never called Resend — SMTP host/port/username wrong, or Custom SMTP not enabled. |
| Resend logs show rejected | Sender address isn't on the verified domain. |
| Link → `/login?error=confirm_failed` | Template still uses `{{ .ConfirmationURL }}`, or `type=` doesn't match (`email` for signup, `recovery` for reset). Also fires if the link was already used or expired. |
| Link opens `localhost` on another machine | Supabase Site URL not updated (step 5). |
| Mail lands in spam | Domain verified but no DMARC record; add `_dmarc` TXT. |

## What still isn't sent

This covers only the two emails Supabase itself sends: signup confirmation and password reset.
The rest of B8 — "we received your application" receipts, welcome emails, team alerts on a new
application — is separate work and would call the Resend API from server actions. Not built.
