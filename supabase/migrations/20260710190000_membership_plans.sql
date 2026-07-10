-- Membership pricing plans, managed from /admin/plans and rendered on /membership.
--
-- Scope note: this powers only the pricing CARDS on /membership (price, label,
-- description, features, badge, CTA, add/remove). The "What's Included"
-- comparison table below the cards, and the entitlement tier system
-- (MembershipTier = individual|professional|corporate used by grantMembership,
-- content gating and RLS), are intentionally left untouched — they are not
-- driven by this table.

create table if not exists membership_plans (
  id uuid primary key default uuid_generate_v4(),
  label text not null,               -- Individual / Professional / Corporate
  price text not null default '0',   -- kept as text: shown verbatim after the € sign
  period text not null default '/ month',
  description text,
  features text,                     -- one feature per line, rendered as a list
  cta text not null default 'Get Started',
  cta_href text not null default '/login',
  badge text,                        -- e.g. "Most Popular"; null = no badge
  highlight boolean not null default false,  -- the emphasised dark card
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table membership_plans enable row level security;

-- Anyone may read published plans (public pricing page). Unpublished plans stay
-- hidden so she can draft one before it goes live.
drop policy if exists "public reads published plans" on membership_plans;
create policy "public reads published plans" on membership_plans
  for select using (is_published = true);

-- No anon/authenticated write policy on purpose: every write goes through a
-- server action running as the service role, behind requireAdmin().

create index if not exists membership_plans_pub_idx
  on membership_plans (is_published, sort_order, created_at);

-- Seed the three current plans so /membership is identical to today right after
-- this runs. Idempotent-ish: only seeds when the table is empty.
insert into membership_plans (label, price, period, description, features, cta, cta_href, badge, highlight, sort_order)
select * from (values
  (
    'Individual', '29', '/ month',
    'For individuals ready to grow personally and professionally.',
    E'Full Learning Hub access\nGrow Exclusive content library\nMonthly live Q&A with Alketa\n4 business events per year\nCommunity network access\nDownloadable guides and templates',
    'Get Started', '/login', null, false, 0
  ),
  (
    'Professional', '79', '/ month',
    'For professionals and small business owners scaling up.',
    E'Everything in Individual\nPriority event registration\nCoaching group access (quarterly)\nBusiness Growth Plan template\nDirect community introductions\nEarly access to new content\nDinner with Alketa - application priority',
    'Get Started', '/login', 'Most Popular', true, 1
  ),
  (
    'Corporate', '199', '/ month',
    'For companies investing in team leadership and brand presence.',
    E'Everything in Professional\nUp to 5 team members\nSponsorship partnership options\nSpeaking slot consideration (conference)\nCo-branding opportunities\nDedicated onboarding call\nQuarterly business review with Alketa',
    'Contact Us', '/sponsorship', null, false, 2
  )
) as seed(label, price, period, description, features, cta, cta_href, badge, highlight, sort_order)
where not exists (select 1 from membership_plans);
