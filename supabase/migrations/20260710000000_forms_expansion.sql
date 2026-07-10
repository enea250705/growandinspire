-- Forms expansion (client update 2026-07-10): all 6 forms grow to full field sets.
-- Dedicated columns per spec (no jsonb dumping). Checkbox groups stored as text[].
-- Run once in Supabase SQL Editor or via: npx supabase db push

-- ============================================================
-- 1. dinner_applications  — extend (§ Dinner with Alketa)
-- ============================================================
alter table dinner_applications
  add column if not exists first_name          text,
  add column if not exists last_name           text,
  add column if not exists company             text,
  add column if not exists website             text,
  add column if not exists industry            text,
  add column if not exists position            text,
  add column if not exists founding_year       text,
  add column if not exists employee_count      text,   -- 1-10 | 11-50 | 51-100 | 100+
  add column if not exists annual_revenue      text,   -- optional
  add column if not exists business_description text,   -- max 500 chars (enforced client-side)
  add column if not exists challenges          text[] default '{}',
  add column if not exists why_join            text,
  add column if not exists question_for_alketa text,
  add column if not exists what_you_bring      text,
  add column if not exists networking_types    text[] default '{}',
  add column if not exists expectations        text,
  add column if not exists linkedin            text,
  add column if not exists instagram           text;

-- ============================================================
-- 2. event_registrations  — extend (§ Business Conference register)
-- ============================================================
alter table event_registrations
  add column if not exists first_name       text,
  add column if not exists last_name        text,
  add column if not exists company          text,
  add column if not exists position         text,
  add column if not exists industry         text,
  add column if not exists city             text,
  add column if not exists interests        text[] default '{}',
  add column if not exists networking_goals text,
  add column if not exists participation    text[] default '{}',
  add column if not exists package          text;

-- ============================================================
-- 3. podcast_applications  — new (§ Podcast Guest Application)
-- ============================================================
create table if not exists podcast_applications (
  id uuid primary key default uuid_generate_v4(),
  first_name       text not null,
  last_name        text,
  email            text not null,
  phone            text,
  linkedin         text,
  instagram        text,
  website          text,
  position         text,
  company          text,
  industry         text,
  employee_count   text,
  years_in_business text,
  why_story        text,   -- why should your story be on Inspire Podcast
  topics           text[] default '{}',
  three_lessons    text,   -- 3 key lessons the audience gets
  prior_media      text,   -- have you been a guest before
  media_link       text,
  status           text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at       timestamptz not null default now()
);

-- ============================================================
-- 4. idea_tables_applications  — new (§ Idea Tables)
-- ============================================================
create table if not exists idea_tables_applications (
  id uuid primary key default uuid_generate_v4(),
  first_name      text not null,
  last_name       text,
  age             text,
  city            text,
  email           text not null,
  phone           text,
  idea_name       text,
  industries      text[] default '{}',
  description     text,
  problem_solved  text,
  target_audience text,   -- who is it for
  stage           text,   -- ide | mvp | produkt | biznes aktiv
  why_present     text,
  feedback_wanted text[] default '{}',
  linkedin        text,
  instagram       text,
  website         text,
  pitch_deck_path text,   -- Supabase Storage path (pitch-decks bucket)
  status          text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at      timestamptz not null default now()
);

-- ============================================================
-- 5. coaching_applications  — new (§ Coaching Application)
-- ============================================================
create table if not exists coaching_applications (
  id uuid primary key default uuid_generate_v4(),
  first_name        text not null,
  last_name         text,
  email             text not null,
  phone             text,
  city              text,
  position          text,
  company           text,
  industry          text,
  experience        text,
  improve_areas     text[] default '{}',
  biggest_challenge text,
  six_month_goal    text,
  coaching_type     text,   -- individual | team
  availability      text[] default '{}',  -- morning | afternoon | evening
  status            text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at        timestamptz not null default now()
);

-- ============================================================
-- 6. membership_signups  — new (§ Membership / Sign in join form)
-- ============================================================
create table if not exists membership_signups (
  id uuid primary key default uuid_generate_v4(),
  first_name     text not null,
  last_name      text,
  email          text not null,
  phone          text,
  profession     text,
  industry       text,
  interests      text[] default '{}',
  main_objective text[] default '{}',
  how_heard      text,
  newsletter     boolean not null default false,
  status         text not null default 'pending' check (status in ('pending', 'contacted', 'member')),
  created_at     timestamptz not null default now()
);

-- ============================================================
-- RLS: public INSERT only (no public SELECT — admin reads via service role)
-- ============================================================
alter table podcast_applications     enable row level security;
alter table idea_tables_applications enable row level security;
alter table coaching_applications    enable row level security;
alter table membership_signups       enable row level security;

create policy "public insert podcast_applications" on podcast_applications
  for insert with check (true);

create policy "public insert idea_tables_applications" on idea_tables_applications
  for insert with check (true);

create policy "public insert coaching_applications" on coaching_applications
  for insert with check (true);

create policy "public insert membership_signups" on membership_signups
  for insert with check (true);

-- ============================================================
-- B5-style: authenticated users read their own submitted rows (by email)
-- so the dashboard "my applications" can include these forms.
-- ============================================================
create policy "auth reads own podcast apps" on podcast_applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

create policy "auth reads own idea apps" on idea_tables_applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

create policy "auth reads own coaching apps" on coaching_applications
  for select to authenticated using (auth.jwt() ->> 'email' = email);

-- ============================================================
-- Pitch-deck uploads: private 'pitch-decks' bucket, anon INSERT only.
-- Admin downloads via service role. Mirrors the 'cvs' bucket setup.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('pitch-decks', 'pitch-decks', false)
on conflict (id) do nothing;

drop policy if exists "anon upload pitch-decks" on storage.objects;
create policy "anon upload pitch-decks" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'pitch-decks');
