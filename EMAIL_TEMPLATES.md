# Supabase email templates — copy-paste

Paste into **Supabase Dashboard → Authentication → Email Templates**. Two templates matter.
Both must use the `token_hash` link — the default `{{ .ConfirmationURL }}` will send fine and
every link will fail, because `/auth/callback` only handles `?code=` links.

Colours match the site: `#00b4a6` (brand accent — it's teal, despite being named `brand-gold` in
the code), `#0d0d0d` (black), `#f5f7f7` (cream).

Written in Albanian, matching the rest of the site. Email HTML must use tables and inline styles —
Outlook ignores `flex`, `grid`, and most `<style>` blocks. Don't "clean this up" into modern CSS.

No logo image is included. The logo lives at `/logo-v2.png` on a site that isn't deployed yet, and
email clients can't load `localhost`. Once you deploy, you can add
`<img src="https://growandinspire.al/logo-v2.png" width="180" alt="Grow and Inspire">` inside the
header cell. Many clients block images by default anyway, so keep the text wordmark as a fallback.

---

## 1. Confirm signup

**Subject:** `Konfirmo emailin tënd — Grow and Inspire`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7f7;padding:40px 0;font-family:Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="background-color:#0d0d0d;padding:28px 32px;text-align:center;">
            <span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">GROW &amp; INSPIRE</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px;">
            <h1 style="margin:0 0 12px;font-size:22px;color:#0d0d0d;">Mirë se erdhe!</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555555;">
              Kliko butonin më poshtë për të konfirmuar adresën tënde të emailit dhe për të aktivizuar llogarinë.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:999px;background-color:#00b4a6;">
                  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard"
                     style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:bold;color:#0d0d0d;text-decoration:none;border-radius:999px;">
                    Konfirmo emailin
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#888888;">
              Nëse butoni nuk funksionon, kopjo këtë link në shfletuesin tënd:<br>
              <span style="color:#00b4a6;word-break:break-all;">{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard</span>
            </p>
            <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#888888;">
              Nëse nuk je regjistruar ti, thjesht injoroje këtë email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f5f7f7;padding:20px 32px;text-align:center;font-size:12px;color:#999999;">
            Grow and Inspire · Tiranë, Shqipëri
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## 2. Reset password

**Subject:** `Rivendos fjalëkalimin — Grow and Inspire`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7f7;padding:40px 0;font-family:Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="background-color:#0d0d0d;padding:28px 32px;text-align:center;">
            <span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">GROW &amp; INSPIRE</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px;">
            <h1 style="margin:0 0 12px;font-size:22px;color:#0d0d0d;">Rivendos fjalëkalimin</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555555;">
              Kërkove të ndryshosh fjalëkalimin. Kliko butonin më poshtë për të vendosur një të ri.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:999px;background-color:#00b4a6;">
                  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/dashboard/settings"
                     style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:bold;color:#0d0d0d;text-decoration:none;border-radius:999px;">
                    Rivendos fjalëkalimin
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#888888;">
              Linku skadon pas një ore. Nëse nuk e kërkove ti këtë ndryshim, injoroje këtë email —
              fjalëkalimi yt nuk do të ndryshojë.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f5f7f7;padding:20px 32px;text-align:center;font-size:12px;color:#999999;">
            Grow and Inspire · Tiranë, Shqipëri
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

---

## The two variables that must be exact

| Template | `type=` | `next=` |
|---|---|---|
| Confirm signup | `email` | `/dashboard` |
| Reset password | `recovery` | `/dashboard/settings` |

`type` is passed straight to `verifyOtp` in `src/app/auth/confirm/route.ts`. Wrong value → the
user lands on `/login?error=confirm_failed` with no explanation.

## Templates you can ignore

Supabase ships five. You only use two.

- **Magic Link** — not used; the app is password-only.
- **Invite user** — not used.
- **Change email address** — not used; `updateProfile()` in `src/lib/actions/auth.ts` updates name,
  phone, and profession, never `email`. If you ever add email changing, this template needs the
  same `token_hash` fix (`type=email_change`) or it will break the same way.

---

## How the reset flow actually runs

Verified against the code — no new pages needed:

1. `/forgot-password` → user enters email → `sendPasswordReset()`
2. Supabase sends the *Reset password* template via Resend
3. User clicks → `/auth/confirm?token_hash=…&type=recovery&next=/dashboard/settings`
4. The route calls `verifyOtp` → **user now has a session** (they are logged in)
5. Redirect to `/dashboard/settings`, which already has a change-password form wired to
   `updatePassword()`

Step 4 is the part worth understanding: a recovery link *logs the person in*. That's why they can
set a new password without knowing the old one. It also means the link is a live credential —
anyone with the email can take the account. One hour expiry, single use.

**Known rough edge:** at step 5 the user lands on the settings page with no message telling them
to scroll to the password section. It works, but it's confusing. Two options, neither urgent:

- Point `next=/dashboard/settings?reset=1` and have `SettingsClient` show a banner and focus the
  password field.
- Build a dedicated `/reset-password` page.

## Testing

Sign up with `skeleton.shorta+t1@gmail.com`, `+t2`, etc. Gmail delivers all of them to your one
inbox, but Supabase treats each as a distinct user — so you never need to delete test accounts or
raise rate limits just to test again.

Then check **Resend → Logs**. If a message isn't listed there at all, Supabase never called Resend
(SMTP misconfigured). If it's listed as delivered but the link fails, the template is wrong.
