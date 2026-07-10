-- "What's Included" comparison table on /membership, admin-managed at /admin/plans.
--
-- Columns follow the membership_plans rows (dynamic). Each feature stores the set
-- of plan ids that include it, so adding/removing a plan or feature just works.
-- This is display-only marketing copy; it does NOT drive entitlements (the
-- MembershipTier system is separate and untouched).

create table if not exists comparison_features (
  id uuid primary key default uuid_generate_v4(),
  feature text not null,
  included_plan_ids uuid[] not null default '{}',   -- membership_plans.id values that get a check
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table comparison_features enable row level security;

-- Always public (marketing table shown to everyone).
drop policy if exists "public reads comparison" on comparison_features;
create policy "public reads comparison" on comparison_features
  for select using (true);

-- Writes go through server actions as the service role, behind requireAdmin().

create index if not exists comparison_features_order_idx
  on comparison_features (sort_order, created_at);

-- Seed the eight current rows, mapping each to the seeded plans by label. Only
-- seeds when empty; array_agg is coalesced so an unmatched label yields '{}'.
insert into comparison_features (feature, included_plan_ids, sort_order)
select
  f.feature,
  coalesce(
    (select array_agg(id) from membership_plans where label = any(f.labels)),
    '{}'::uuid[]
  ),
  f.ord
from (values
  ('Learning Hub',               array['Individual','Professional','Corporate'], 0),
  ('Grow Exclusive library',     array['Individual','Professional','Corporate'], 1),
  ('Live Q&A sessions',          array['Individual','Professional','Corporate'], 2),
  ('4 business events / year',   array['Individual','Professional','Corporate'], 3),
  ('Coaching group access',      array['Professional','Corporate'],              4),
  ('Dinner with Alketa priority',array['Professional','Corporate'],              5),
  ('Team seats (up to 5)',       array['Corporate'],                             6),
  ('Sponsorship options',        array['Corporate'],                             7)
) as f(feature, labels, ord)
where not exists (select 1 from comparison_features);
