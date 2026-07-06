-- B1 Migration: Grow and Inspire schema
-- Run once in Supabase SQL Editor or via: npx supabase db push

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- Tables
-- ============================================================

create table if not exists memberships (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier text not null check (tier in ('individual', 'professional', 'corporate')),
  status text not null default 'active' check (status in ('active', 'cancelled', 'past_due', 'trialing')),
  started_at timestamptz not null default now(),
  renews_at timestamptz,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

create table if not exists content_items (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('podcast', 'founder', 'artist', 'business', 'revista', 'exclusive')),
  title text not null,
  description text,
  youtube_id text,
  thumbnail_url text,
  is_premium boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  type text not null check (type in ('conference', 'coaching_group', 'networking', 'retreat', 'other')),
  description text,
  date_start timestamptz,
  date_end timestamptz,
  price_eur numeric(10,2),
  location text,
  capacity integer,
  created_at timestamptz not null default now()
);

create table if not exists event_registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'paid')),
  created_at timestamptz not null default now()
);

create table if not exists dinner_applications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  profession text,
  reason text,
  social_link text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('job', 'guest', 'investment')),
  name text not null,
  email text not null,
  payload jsonb not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists sponsorship_leads (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  interest_area text,
  budget text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table memberships enable row level security;
alter table content_items enable row level security;
alter table events enable row level security;
alter table event_registrations enable row level security;
alter table dinner_applications enable row level security;
alter table applications enable row level security;
alter table sponsorship_leads enable row level security;
alter table subscribers enable row level security;

-- content_items: anyone can read
create policy "public read content" on content_items
  for select using (true);

-- events: anyone can read
create policy "public read events" on events
  for select using (true);

-- public form submissions (INSERT only, no SELECT)
create policy "public insert event_registrations" on event_registrations
  for insert with check (true);

create policy "public insert dinner_applications" on dinner_applications
  for insert with check (true);

create policy "public insert applications" on applications
  for insert with check (true);

create policy "public insert sponsorship_leads" on sponsorship_leads
  for insert with check (true);

create policy "public insert subscribers" on subscribers
  for insert with check (true);

-- memberships: user sees only their own row
create policy "user read own membership" on memberships
  for select using (auth.uid() = user_id);
