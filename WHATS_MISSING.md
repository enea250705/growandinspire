# Grow and Inspire — What's Missing

_Verified against actual code + passing `next build`, 2026-07-09._

## Verdict
**Not done for full public launch. Soft launch possible now.**

- Frontend: **100%** (25 routes build clean, mobile QA passed)
- Backend B1–B7: **done** (Supabase schema+RLS, all forms save, auth, premium gating, content from DB, admin panel)
- Remaining: **B8 email, B4 payments, B9 deploy** + manual config

Confirmed by code inspection: `src/lib/actions/{forms,auth,admin}.ts`, `src/app/admin/*` (9 pages),
`src/lib/supabase/*`, `src/lib/membership.ts` all present. No `resend`/`nodemailer` anywhere.
`stripe` in package.json but **no payment code exists**.

---

## ❌ MISSING — blocks full launch

### B8 — Email (not started)
No emails sent anywhere. Needed for:
- Signup confirmation + password-reset delivery — **currently blocks public self-signup**
- Applicant "we received your application" receipt
- Welcome email on signup
- Team alert on new application / sponsorship lead

Plan: Resend (free 3k/mo). Needs a domain to verify for deliverability.

### B4 — Stripe payments (deferred to last)
`stripe` pkg installed, no checkout/webhook/portal code. Memberships granted by hand in admin.
Conference/retreat forms collect interest, take no money.
Needed only if launch must charge cards. Includes:
- Products/prices: Individual/Professional/Corporate subs, Conference €150/€175 one-time
- Checkout → webhook writes `memberships` row
- `/checkout/success` + `/checkout/cancel` pages
- Customer Portal link in dashboard
- Webhook signature verification

### B9 — Deploy (not started)
- Hetzner VPS: Node 20 + PM2/Docker
- Domain + DNS + HTTPS (Caddy easiest)
- Production env vars (Supabase prod, Stripe LIVE, Resend)
- Config that **breaks in prod if skipped**:
  - `NEXT_PUBLIC_APP_URL` localhost → real domain (else password-reset links break)
  - Supabase → Auth → URL config: Site URL + redirect allowlist → domain
  - Stripe webhook endpoint → prod URL (only if B4 done)

---

## ⚠️ MANUAL / HOUSEKEEPING (do before any launch)
- [ ] **RUN THE NEW MIGRATION** `supabase/migrations/20260710000000_forms_expansion.sql` in Supabase SQL Editor — adds the expanded form columns + new tables (`podcast_applications`, `idea_tables_applications`, `coaching_applications`, `membership_signups`) + `pitch-decks` storage bucket. **The 6 updated forms will error on submit until this runs.**
- [ ] Supabase Auth: disable "Confirm email" **OR** ship B8 (else real users can't verify signup)
- [ ] Change temp admin password `<see password manager>` (`growandinspire@admin.com`)
- [ ] Replace placeholder YouTube IDs with real Alketa videos (admin → Content Manager)
- [ ] Set real prices/dates (admin → Site Settings)

---

## Launch paths
- **Soft launch (~1 day):** disable email-confirm → B9 deploy. Live, collects applications, admin grants memberships by hand.
- **Full launch (~3–4 days):** B8 email → B4 Stripe → B9 deploy. Fully automated.

Phase order remaining: **B8 → B4 → B9**
