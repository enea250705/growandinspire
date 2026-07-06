-- B7: admin role table + site settings.

create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

-- A user may read their own admin row (to self-check). No public insert:
-- admins are granted via service role / SQL only.
create policy "user reads own admin row" on admins
  for select to authenticated
  using (auth.uid() = user_id);

-- Key/value display settings (prices, dates) editable from the admin panel.
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

-- Public may read settings (they drive display prices on public pages).
create policy "public reads settings" on site_settings
  for select using (true);
