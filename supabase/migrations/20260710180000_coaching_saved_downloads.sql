-- Three previously-stubbed features made real:
--   1. coaching_program_requests — lead-magnet email capture on /coaching
--   2. saved_items              — a member's bookmarked videos
--   3. downloads                — member resource files (worksheets, PDFs)

-- 1. Coaching program requests --------------------------------------------------
-- The "Shkarko Programin" form captures an email. Anyone may submit (public lead
-- capture); only the admin (service role) reads them. No public SELECT.
create table if not exists coaching_program_requests (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  created_at timestamptz not null default now()
);

alter table coaching_program_requests enable row level security;

drop policy if exists "public inserts coaching requests" on coaching_program_requests;
create policy "public inserts coaching requests" on coaching_program_requests
  for insert with check (true);

-- 2. Saved items ---------------------------------------------------------------
-- A user bookmarks a content_item. Rows are private: each user manages only their
-- own, enforced by auth.uid() = user_id in RLS.
create table if not exists saved_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_id uuid not null references content_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, content_id)
);

alter table saved_items enable row level security;

drop policy if exists "users read own saved" on saved_items;
create policy "users read own saved" on saved_items
  for select using (auth.uid() = user_id);

drop policy if exists "users insert own saved" on saved_items;
create policy "users insert own saved" on saved_items
  for insert with check (auth.uid() = user_id);

drop policy if exists "users delete own saved" on saved_items;
create policy "users delete own saved" on saved_items
  for delete using (auth.uid() = user_id);

create index if not exists saved_items_user_idx on saved_items (user_id, created_at desc);

-- 3. Downloads -----------------------------------------------------------------
-- file_url is the resource. Premium files must not leak to non-members, so the
-- RLS policy exposes only FREE rows to the public client. Premium rows are read
-- with the service role, after a membership check in application code — the same
-- philosophy that protects premium youtube_id.
create table if not exists downloads (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  file_url text not null,
  is_premium boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table downloads enable row level security;

-- Public client sees only free downloads. Members get premium ones via the
-- service role (which bypasses RLS) after the gate passes.
drop policy if exists "public reads free downloads" on downloads;
create policy "public reads free downloads" on downloads
  for select using (is_premium = false);

create index if not exists downloads_sort_idx on downloads (sort_order, created_at desc);
