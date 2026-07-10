# Grow and Inspire - Project Status

_Last updated: 2026-07-09_

## Short answer
**Not 100% done.** The app is fully built and works end-to-end (frontend + backend B1-B7),
but three things remain before a full public launch: **email**, **payments**, and **deploy**.
A soft launch (collect applications, manual memberships, no card payments) is possible now.

---

## DONE ✅

### Frontend (100%)
- All 25+ routes, mobile + desktop, spec-audited
- Teal brand, logo, real Alketa hero portrait
- Watermarked video player (YouTube + Plyr)

### Backend
- **B1 Supabase** - 8 tables + RLS, live
- **B2 Forms** - all public forms write to DB (dinner, job/guest/investment, conference, retreat, sponsorship, newsletter)
- **B3 Auth** - signup / login / logout / forgot-password, `/dashboard` + `/admin` protected
- **B5 Premium gating** - server-side, premium video never leaks to non-members, watermark = member email
- **B6 Content from DB** - `content_items` seeded, watch pages read from Supabase (ISR), mock file removed
- **B7 Admin panel** (`/admin`) - overview, applications (approve/reject), leads, registrations,
  content CRUD, members (grant/revoke), subscribers + CSV
- **B7 extras** - site settings (edit prices/dates), admin management, CV upload (private bucket)

### Verified by full UX test (2026-07-06)
All routes, auth redirects, premium gate (both branches), forms, RLS isolation,
CSV export gating, CV upload/download privacy. Zero runtime errors.

---

## MISSING ❌

### B8 - Email (not started)
No emails sent anywhere. Needed for:
- Signup confirmation + password reset delivery (currently blocks public self-signup)
- Applicant "we received your application"
- Welcome email on signup
- Team alert on new application / lead

**Plan:** Resend (free 3k/mo). Needs a domain to verify for good deliverability.

### B4 - Stripe payments (deferred to last)
No card payments. Memberships granted manually via admin panel.
Conference/retreat forms collect interest but take no money.
**Needed only if launch must charge cards.**

### B9 - Deploy (not started)
- Hetzner VPS: Node 20 + PM2/Docker
- Domain + DNS + HTTPS (Caddy easiest)
- Production env vars
- **Config changes required for prod:**
  - `NEXT_PUBLIC_APP_URL` localhost -> real domain (password-reset links break otherwise)
  - Supabase -> Auth -> URL config: set Site URL + redirect allowlist to the domain
  - Change admin password (currently temporary `<see password manager>`)

---

## MANUAL / HOUSEKEEPING

- [ ] Supabase Auth: disable "Confirm email" OR wire B8 (else real users can't verify signup)
- [ ] Replace placeholder YouTube IDs with real Alketa videos (via admin Content Manager)
- [ ] Set real prices/dates via admin Site Settings
- [ ] Change temporary admin password
- [ ] `supabase/RUN_THESE_NOW.sql` - already run (B5 policies + admin tables + CV storage policy)

---

## SUPABASE / ACCESS NOTES
- Project: `https://lcbrucousywmxkfgyctl.supabase.co`
- Keys in `app/.env.local` (NOT in git - correct)
- Admin login: `growandinspire@admin.com` / `<see password manager>` (temp - change)
- Repo: https://github.com/enea250705/growandinspire.git (master)

---

## LAUNCH PATHS

**Soft launch (~1 day):** disable email-confirm -> B9 deploy. Live, collects applications,
admin grants memberships by hand. Add email + payments later.

**Full launch (~3-4 days):** B8 email -> B4 Stripe -> B9 deploy. Fully automated.

## Phase order (revised)
B1 -> B2 -> B3 -> B5 -> B6 -> B7 -> **B8 -> B4 -> B9** (remaining)
