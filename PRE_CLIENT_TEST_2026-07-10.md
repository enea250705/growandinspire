# Pre-Client-Test Verification — 2026-07-10

Question asked: *"is everything working, can we send this to the client as a first test?"*

**Answer: not yet.** One blocker must be fixed first (2-minute Supabase toggle), and one
security issue should be understood before real videos are uploaded. Everything else works.

Method: clean `rm -rf .next && npm run build`, `next start` on port 3210, HTTP probe of every
route, and live tests against the real Supabase Auth + REST API. Test users were created and
deleted (cleanup verified). No browser automation — see "Not covered" at the bottom.

---

## 🔴 Blocker — the client cannot create an account

You said the first test must include signing up. Right now it fails.

Verified live against Supabase:

| Check | Result |
|---|---|
| `mailer_autoconfirm` | `false` → email confirmation is **required** |
| Email provider (B8) | **not built** — Supabase's built-in sender is used |
| Live signup attempt | **HTTP 429** `over_email_send_rate_limit` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` |
| Admin-created user (`email_confirm: true`) → login | **SUCCESS** |

Three separate things break the same flow:

1. Supabase requires email confirmation, but no email provider is configured, so the
   confirmation email is sent through Supabase's built-in sender — which is capped at a few
   messages per hour and is already exhausted. Signup returns a 429 error.
2. Even when an email does go out, the confirmation link points at `localhost:3000`, which is
   dead on the client's machine.
3. `src/app/login/page.tsx` shows "Account created — check your email and confirm your address"
   whenever `signUp()` returns without an error. It never checks whether a session came back,
   so a user who is silently stuck still sees a success screen.

**Fix (do this before sending):** Supabase Dashboard → Authentication → Providers → Email →
turn **off** "Confirm email". Signup then grants a session immediately and login works. This is
a dashboard setting, not code — I can't flip it for you, and it changes how every future user
signs up, so it's your call.

**The toggle alone is not enough.** Once confirmation is off, `signUp()` returns a real session
and the user is already logged in — but `login/page.tsx` still renders the "check your email"
screen with a "Back to login" button and never redirects. The client will read a working signup
as a failure. The success branch needs to redirect to `/dashboard` when a session exists. That
one is code, so I can fix it — just say so.

**Password reset stays broken either way.** "Forgot password?" sits on the login screen, and
`sendPasswordReset()` goes through the same built-in sender (same 429) with a redirect to
`localhost:3000/auth/callback`. Reset inherently needs a delivered email, so disabling
confirmation does not fix it. It only works once B8 (email provider) ships. Tell the client not
to click it, or hide the link for the test.

Second option if you'd rather not disable confirmation: I create the client's account manually
from the admin panel (`email_confirm: true`) and send them the password. Verified working. But
then the client can't test signup as a real visitor would.

---

## 🔴 Security — the premium paywall is bypassable

The episode page itself is written correctly: for a premium item viewed by a non-member, the
server never renders the player and never puts that item's `youtube_id` in the HTML. Verified.

The data layer undoes it. `content_items` has a public-read RLS policy and `src/lib/content.ts`
selects `youtube_id` for every row. The anon key is public by design — it ships inside the
browser bundle. So anyone can run one request and get the video ID of all 7 premium episodes:

```
GET /rest/v1/content_items?select=title,youtube_id&is_premium=eq.true
apikey: <the anon key from the page source>
→ 200, all 7 premium youtube_ids
```

The same IDs also appear in plain HTML on every listing page (e.g. `/watch/grow-exclusive`),
because `ContentCard` builds its thumbnail from `https://img.youtube.com/vi/<youtube_id>/...`
for premium cards too.

**Impact:** if Alketa's paid videos are *unlisted* on YouTube — the normal setup for this kind of
embed — then the ID *is* the access control. Anyone can watch the paid content for free without
signing up. Right now the exposed IDs are placeholders, so nothing real is leaking yet. This
must be fixed **before her real videos go in**, not after.

**Fix:** stop sending `youtube_id` to non-members. Either drop the column from the public
`SELECT` and fetch it server-side only after `isMember()` passes, or expose it through a
membership-restricted view. Store a real `thumbnail_url` so premium cards stop deriving the
image from the video ID. Happy to implement — say the word.

---

## ✅ What is verified working

**Build:** clean production build, 37 routes, TypeScript passes, no errors.

**Routes** — every page returns HTTP 200 with real content, no error boundaries:
`/`, `/about`, `/apply`, `/coaching`, `/community`, `/dinner-with-alketa`, `/events`,
`/forgot-password`, `/insights`, `/login`, `/membership`, `/privacy`, `/sponsorship`, `/terms`,
`/watch`, `/watch/podcast`, all category listings, individual episode pages. Unknown URLs
return a proper 404.

**Auth guards:** `/dashboard` and `/admin` correctly redirect anonymous visitors to `/login`.

**Login:** confirmed users get a session and reach the dashboard.

**Premium gate on the episode page:** a non-member on a premium episode gets no player and no
video ID for that episode. (The listing-page leak above is separate.)

**All 9 form write paths — retested today against the live database, 9/9 pass.** This is the
check that matters most for a client test, because the six forms were rebuilt this session
against a migration that added ~18 new columns, and `next build` cannot catch a mismatch between
a column name in the code and a column name in the database (there are no generated Supabase
types). So each form's insert was replayed as an anonymous user with the *exact* column set its
server action uses:

| Table | Result |
|---|---|
| `dinner_applications` | PASS (HTTP 201) |
| `podcast_applications` | PASS |
| `idea_tables_applications` | PASS |
| `coaching_applications` | PASS |
| `event_registrations` | PASS |
| `membership_signups` | PASS |
| `sponsorship_leads` | PASS |
| `applications` (job apply) | PASS |
| `subscribers` (newsletter) | PASS |

Every row was confirmed present, then deleted. No column drift, no RLS rejection, no NOT NULL
violation. A client submitting any of the six forms will have their data saved.

**Data layer:** also re-verified this morning — RLS blocks anonymous reads of applications and
memberships, both storage buckets are private, duplicate newsletter signups are rejected. The
forms-expansion migration **is** applied live. (`WHATS_MISSING.md` still says the migration needs
running — that file is out of date; ignore that line.)

---

## 🟡 Fix before the client looks at it

- **Content is entirely placeholder.** 15 items, none of them Alketa's. The YouTube IDs are stock
  videos and several are reused across different episodes — `qp0HIF3SfI4` appears 3 times,
  `Ks-_Mh1QhMc` twice. Two Revista items (*Women Redefining Albanian Business*, *The Future of
  Tirana*) have no video at all. A client clicking through will see the same stranger's video
  under three different titles.
- **`/privacy` and `/terms` name Stripe** as the payment processor, and the privacy page states
  "Payment information is handled exclusively by Stripe." If you go with Paddle, this is wrong —
  and it's legal text, so it matters. Also `src/app/admin/members/page.tsx` shows the client the
  string *"Deri sa Stripe të lidhet"*.
- **Login page is in English**, while the rest of the site is Albanian — and it mixes both
  ("Log In", "Create Account", but the loading state says "Duke u lidhur..."). Visible on the
  first screen the client sees if they test signup.
- **Temp admin password `<see password manager>` is still active** on `growandinspire@admin.com`. Change
  it before anyone outside gets a URL.

## ⚪ Known and expected — not defects

- **No payments.** No Stripe or Paddle code exists; `STRIPE_*` env values are placeholders. This
  is the pending Paddle decision, not a bug. The `stripe` npm package can be removed once Paddle
  is confirmed.
- **No deployment.** The app runs on localhost only. There is no URL to send yet.

---

## Not covered by this pass

No browser automation was available (Playwright is not installed, and installing it on this
Next.js build isn't worth the risk right now). HTTP 200 means the page rendered — it does not
mean the page *looks right* or that clicking works. Still needs a human:

- Submitting each of the 6 forms in a real browser: validation, required fields, error states
- The video player (Plyr + YouTube), moving watermark, right-click deterrent
- Mobile layout (390×844)
- Admin panel and dashboard with real data — the data layer is verified, the UI is not clicked
- File uploads: CV upload and pitch-deck upload

---

## Bottom line

> **Superseded (2026-07-10, later same day).** This report proposed disabling "Confirm email" as
> the quick unblock. We chose the better path instead: real confirmation emails via Resend. See
> **`EMAIL_SETUP_RESEND.md`**. Consequences: keep "Confirm email" **ON**; the "check your email"
> screen is **correct** and must not be changed to redirect; "Forgot password?" gets fixed rather
> than hidden. The rest of this report still stands.

Do these in order:

1. Set up Resend email confirmation — see `EMAIL_SETUP_RESEND.md`. Code is done; the Resend and
   Supabase dashboard steps are yours. **(blocks the test)**
2. Change the admin password.
3. Load Alketa's real videos, or tell the client up front that the content is placeholder.
4. Fix the Stripe references in `/privacy` and `/terms`.
5. Decide whether to fix the premium-ID leak now or before her real videos are uploaded.
6. Deploy (B9). Now doubly required: a `localhost` confirmation link is dead on the client's
   machine, so email confirm cannot be tested by them until the site has a real URL.

Step 5 is the one that gets more expensive the longer it waits: once real paid videos are
uploaded with the leak in place, the IDs are already public.
