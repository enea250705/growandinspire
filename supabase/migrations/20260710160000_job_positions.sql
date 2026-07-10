-- Job positions, managed from /admin/jobs and listed on /careers.
--
-- Applications still land in the existing `applications` table (type = 'job');
-- this only replaces the free-text "Role you are applying for" input with a
-- list she controls.

create table if not exists job_positions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  department text,
  location text,
  employment_type text,          -- Full-time | Part-time | Internship | Freelance
  description text,
  requirements text,             -- one per line, rendered as a list
  is_open boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table job_positions enable row level security;

-- Anyone may read the open ones. Closed positions stay invisible to the public
-- so she can draft a role before publishing it.
drop policy if exists "public reads open positions" on job_positions;
create policy "public reads open positions" on job_positions
  for select using (is_open = true);

-- No insert/update/delete policy for anon or authenticated on purpose: every
-- write goes through a server action running as the service role, behind
-- requireAdmin(). The service role bypasses RLS.

create index if not exists job_positions_open_idx
  on job_positions (is_open, sort_order, created_at desc);
