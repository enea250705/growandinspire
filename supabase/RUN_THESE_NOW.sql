-- ============================================================
-- Grow and Inspire - pending SQL to run once in Supabase SQL editor.
-- Safe to run top-to-bottom. Covers B5 (user select policies) and
-- B7 (admin tables). After running, grant yourself admin at the bottom.
-- ============================================================

-- ---- B5: users read their own submitted rows (by email) -------------------
create policy "auth reads own dinner apps" on dinner_applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

create policy "auth reads own applications" on applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

create policy "auth reads own registrations" on event_registrations
  for select to authenticated
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = email);

-- ---- B7: admin role + site settings ---------------------------------------
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table admins enable row level security;
create policy "user reads own admin row" on admins
  for select to authenticated using (auth.uid() = user_id);

create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);
alter table site_settings enable row level security;
create policy "public reads settings" on site_settings
  for select using (true);

-- ---- Grant yourself admin (edit the email; you must have signed up) --------
insert into admins (user_id)
select id from auth.users where email = 'REPLACE_WITH_YOUR_EMAIL@example.com'
on conflict (user_id) do nothing;
