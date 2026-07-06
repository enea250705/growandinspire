# Grow and Inspire - Backend Phases

> Frontend is 100% complete (all 25 routes, spec-compliant, mobile QA passed).
> This file tracks the backend build. Work one phase at a time, in order.
> Each phase is done when: build passes, the feature works end to end, and a test insert/flow is verified.

Stack (fixed, per spec): Supabase (Postgres + Auth + Storage) · Stripe · Resend (later) · Hetzner VPS deploy.

---

## Phase B1 - Supabase Foundation (~half day)

**Goal:** project connected, schema live, security on.

- [ ] Create Supabase project (free tier fine to start)
- [ ] Set real values in `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] SQL migration - tables from spec:
  - `memberships` (id, user_id, tier [individual|professional|corporate], status, started_at, renews_at, stripe_subscription_id)
  - `content_items` (id, type [podcast|founder|artist|business|revista|exclusive], title, description, youtube_id, thumbnail_url, is_premium, published_at)
  - `events` (id, title, type [conference|coaching_group|networking|other], description, date_start, date_end, price_eur, location, capacity)
  - `event_registrations` (id, event_id, user_id nullable, name, email, phone, status, created_at)
  - `dinner_applications` (id, name, email, phone, profession, reason, social_link, status, created_at)
  - `applications` (id, type [job|guest|investment], name, email, payload jsonb, status, created_at)
  - `sponsorship_leads` (id, company_name, contact_name, email, phone, interest_area, budget, message, created_at)
- [ ] RLS on every table: public INSERT where forms need it, SELECT/UPDATE only for admin role
- [ ] Verified test insert from the app

**Blocker to start:** need Supabase Project URL + anon key.

---

## Phase B2 - Forms Save For Real (~1 day)

**Goal:** every public form writes to the database. Highest immediate value - applications start collecting without any login.

Wire via Next.js server actions (never expose service key client-side):

- [ ] Dinner with Alketa form -> `dinner_applications`
- [ ] Apply: Work with Class -> `applications` (type job, CV upload to Supabase Storage)
- [ ] Apply: Become a Guest -> `applications` (type guest)
- [ ] Apply: Investment Fund / Idea form (homepage + apply page) -> `applications` (type investment)
- [ ] Sponsorship contact form -> `sponsorship_leads`
- [ ] Conference registration (homepage) -> `event_registrations`
- [ ] Retreat interest list (homepage) -> `event_registrations`
- [ ] Newsletter (footer) -> subscribers table (add in migration)
- [ ] Real success AND error states on every form (currently success is faked)

---

## Phase B3 - Auth (~1 day)

**Goal:** real accounts.

- [ ] Signup / login / logout via Supabase Auth (email + password)
- [ ] Forgot-password page (link exists on /login, page missing)
- [ ] Session middleware protects `/dashboard/*` (redirect to /login)
- [ ] Dashboard shows the real logged-in user (name, email) instead of mock "Anisa"
- [ ] Settings page: profile update + password change actually work
- [ ] Log Out button works

---

## Phase B4 - Stripe Payments (~1-2 days) - DEFERRED TO LAST

**Moved to the end of the roadmap per client decision (2026-07-06).** All
other phases proceed without it. Until B4 runs, `memberships` rows are created
manually (service-role insert or admin panel B7); B5 gating reads the table
regardless of who wrote the row.

**Goal:** money flows. Test mode first, live keys only at deploy.

- [ ] Stripe products/prices: Individual / Professional / Corporate (subscriptions), Conference Early Bird EUR 150 + Standard EUR 175 (one-time)
- [ ] Membership checkout flow: pick plan -> Stripe Checkout -> webhook creates/updates `memberships` row (tier, status, started_at, renews_at, stripe_subscription_id)
- [ ] Conference ticket checkout -> `event_registrations` marked paid
- [ ] `/checkout/success` and `/checkout/cancel` pages
- [ ] Stripe Customer Portal link in dashboard (cancel/upgrade handled by Stripe, not us)
- [ ] Webhook signature verification

Prices for anything purchasable live in Stripe (source of truth). Display-only prices (coaching packages, retreat) go in a `site_settings` table, editable in B7.

---

## Phase B5 - Premium Gating (~1 day)

**Goal:** membership means something. All checks server-side, never CSS-only (spec requirement).

- [ ] `grow-exclusive` and `is_premium` content: server checks active membership before rendering video
- [ ] Lock badges / "Join to unlock" only for non-members; members see content
- [ ] Dashboard real data: my membership, my applications (from `applications` + `dinner_applications`), my event registrations
- [ ] Video watermark switches from placeholder to the member's actual email

---

## Phase B6 - Content From Database (~half day)

**Goal:** kill the mock file.

- [ ] `mock-content.ts` data seeded into `content_items`
- [ ] Watch hub, category pages, episode pages, dashboard rails read from Supabase
- [ ] Static generation with revalidation (ISR) so pages stay fast

---

## Phase B7 - Admin Panel (~2 days)

**Goal:** Alketa's team runs the platform without a developer.

- [ ] `/admin` area, gated by admin role (Supabase custom claim or admins table)
- [ ] Applications review: dinner + job + guest + investment, approve/reject buttons (updates status - manual review per spec, no automation)
- [ ] Sponsorship leads inbox
- [ ] Event registrations list (see who registered for conference/retreat)
- [ ] Content manager: add/edit episode (title, category, YouTube ID, premium flag)
- [ ] Site settings: display prices (coaching packages, retreat), event dates
- [ ] Newsletter subscribers export (CSV)

---

## Phase B8 - Email Notifications (~half day, optional per spec)

**Goal:** people hear back automatically.

- [ ] Resend account + domain verification
- [ ] Confirmation email on every application submit
- [ ] Welcome email on signup
- [ ] Notification to team inbox on new application / sponsorship lead

Spec explicitly says do not block on this - DB saves are enough until here.

---

## Phase B9 - Deploy (~1 day)

**Goal:** live on the internet.

- [ ] Hetzner VPS: Docker (or PM2) + Node 20
- [ ] Domain + DNS + HTTPS (Caddy or nginx + certbot)
- [ ] Production env vars (Supabase prod keys, Stripe LIVE keys, Resend)
- [ ] Stripe webhook endpoint updated to production URL
- [ ] Smoke test every flow in production: signup, checkout (small real charge, then refund), form submit, admin review

---

## Rules (from spec)

1. No i18n now - Albanian hardcoded, structure ready for later
2. YouTube + Plyr only, no other video providers, no native YouTube iframes
3. No approval automation - dinner/job applications always reviewed manually
4. Premium filtering always server-side
5. No silent TODOs - every gap gets a `// TODO:` comment and gets reported

## Progress

Execution order (revised 2026-07-06): B1 → B2 → B3 → B5 → B6 → B7 → B8 → B4 → B9.
Stripe (B4) deferred to just before deploy.

| Phase | Status | Date |
|-------|--------|------|
| B1 Supabase Foundation | done | 2026-07-06 |
| B2 Forms Save | done | 2026-07-06 |
| B3 Auth | done (needs live login test + disable email-confirm) | 2026-07-06 |
| B5 Premium Gating | done (member + non-member paths verified) | 2026-07-06 |
| B6 Content From DB | not started | |
| B7 Admin Panel | not started | |
| B8 Email | not started | |
| B4 Stripe | deferred (second to last) | |
| B9 Deploy | not started | |
