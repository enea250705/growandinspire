-- ============================================================
-- Grow and Inspire - pending SQL to run once in Supabase SQL editor.
-- Idempotent: safe to re-run (drops policies before recreating).
-- Covers B5 (user select policies) and B7 (admin tables).
-- ============================================================

-- ---- B5: users read their own submitted rows (by email) -------------------
drop policy if exists "auth reads own dinner apps" on dinner_applications;
create policy "auth reads own dinner apps" on dinner_applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

drop policy if exists "auth reads own applications" on applications;
create policy "auth reads own applications" on applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

drop policy if exists "auth reads own registrations" on event_registrations;
create policy "auth reads own registrations" on event_registrations
  for select to authenticated
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = email);

-- ---- B7: admin role + site settings ---------------------------------------
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table admins enable row level security;
drop policy if exists "user reads own admin row" on admins;
create policy "user reads own admin row" on admins
  for select to authenticated using (auth.uid() = user_id);

create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);
alter table site_settings enable row level security;
drop policy if exists "public reads settings" on site_settings;
create policy "public reads settings" on site_settings
  for select using (true);

-- ---- CV uploads: anon may INSERT into the private 'cvs' bucket only --------
-- No SELECT/LIST for anon (CVs are private). Admin downloads via service role.
drop policy if exists "anon upload cvs" on storage.objects;
create policy "anon upload cvs" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'cvs');

-- ---- Grant yourself admin (edit the email; you must have signed up) --------
insert into admins (user_id)
select id from auth.users where email = 'growandinspire@admin.com'
on conflict (user_id) do nothing;
