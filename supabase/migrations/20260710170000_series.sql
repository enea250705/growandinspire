-- Series (a.k.a. programs / multi-episode collections), managed from
-- /admin/series and shown on the homepage, /series, and the user dashboard.
--
-- A series is a pure container: it groups existing content_items in an order.
-- Gating stays PER VIDEO — each content_item keeps its own is_premium, so one
-- series can freely mix free and members-only episodes. The series itself has
-- no premium flag on purpose.

create table if not exists series (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  thumbnail_url text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table series enable row level security;

-- Anyone may read the published ones. Unpublished series stay invisible to the
-- public so she can assemble one before revealing it. (Mirrors job_positions:
-- new public tables already have a default SELECT grant for anon/authenticated,
-- so an RLS policy alone is enough — no explicit grant needed here.)
drop policy if exists "public reads published series" on series;
create policy "public reads published series" on series
  for select using (is_published = true);

-- No insert/update/delete policy for anon/authenticated on purpose: every write
-- goes through a server action running as the service role, behind requireAdmin().

create index if not exists series_published_idx
  on series (is_published, sort_order, created_at desc);

-- Link videos to a series. Nullable: a video can stand alone (belong to no
-- series). on delete set null keeps the videos when a series is removed.
alter table content_items
  add column if not exists series_id uuid references series(id) on delete set null;
alter table content_items
  add column if not exists episode_number int;

create index if not exists content_items_series_idx
  on content_items (series_id, episode_number);

-- content_items is special: 20260710120000_protect_premium_video_ids REVOKED the
-- table-level SELECT and re-granted column by column. New columns are NOT covered
-- by that grant, so anon/authenticated must be granted the two new ones explicitly
-- — otherwise every public content query 42501s and the site goes blank.
-- (youtube_id stays ungranted, as before.)
grant select (series_id, episode_number) on public.content_items to anon, authenticated;
