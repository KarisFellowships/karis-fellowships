-- ============================================================================
-- BASELINE SCHEMA — captured from the live project (afeaatpzvpdlttqyspdd) on
-- 2026-07-10, representing the objects that existed BEFORE migration tracking
-- began (they were created ad hoc / via scripts/*.sql, never as migrations).
--
-- Purpose: give the security backbone (tables, RLS policies, the profile-bootstrap
-- trigger) a reviewable, version-controlled source of truth, and a rebuild path
-- for a fresh database. Dated 2026-01-01 so it runs BEFORE the incremental
-- migrations (stripe idempotency, documents lock, meeting_codes, rate_limiting,
-- handle_new_user hardening).
--
-- Every statement is idempotent (IF NOT EXISTS / OR REPLACE / DROP ... IF EXISTS),
-- so this is a no-op against the current live DB and safe to replay on a new one.
-- It is NOT re-applied to the live DB (the objects already exist).
-- ============================================================================

-- ---- users: member profiles (1:1 with auth.users) --------------------------
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  tier text not null default 'nhg' check (tier in ('nhg', 'kf', 'admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  nhg_paid boolean default false,
  hpkp_donated boolean default false,
  romans_donated boolean default false,
  kf_invited boolean default false,
  kf_registered_year integer,
  nhg_completed_date date,
  kf_first_year integer,
  volunteer_interest text
);

alter table public.users enable row level security;

drop policy if exists "read_own_profile" on public.users;
create policy "read_own_profile" on public.users
  for select using (auth.uid() = id);

-- ---- kf_schedule: KF weekly-meeting dates by lesson & year ------------------
create table if not exists public.kf_schedule (
  id serial primary key,
  lesson_number integer not null,
  year integer not null,
  start_date date not null,
  end_date date not null
);
create index if not exists kf_schedule_dates on public.kf_schedule (start_date, end_date);
-- Note: the unique index on (lesson_number, year) is added in 20260710000003.

alter table public.kf_schedule enable row level security;

drop policy if exists "Allow public read" on public.kf_schedule;
create policy "Allow public read" on public.kf_schedule
  for select using (true);

drop policy if exists "Authenticated users can read schedule" on public.kf_schedule;
create policy "Authenticated users can read schedule" on public.kf_schedule
  for select using (auth.role() = 'authenticated');

-- ---- nhg_schedule: NHG book-study week dates -------------------------------
create table if not exists public.nhg_schedule (
  id bigint primary key,
  week_number integer not null,
  label text not null,
  year integer not null,
  start_date date not null,
  end_date date not null,
  unique (week_number, year)
);

alter table public.nhg_schedule enable row level security;

drop policy if exists "Allow public read" on public.nhg_schedule;
create policy "Allow public read" on public.nhg_schedule
  for select using (true);

-- ---- donations: recorded Stripe payments -----------------------------------
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  amount integer not null,
  type text not null check (type in ('nhg_registration', 'gift_onetime', 'gift_recurring', 'hpkp', 'romans')),
  stripe_session_id text,
  created_at timestamptz default now()
);

alter table public.donations enable row level security;

drop policy if exists "Users can read own donations" on public.donations;
create policy "Users can read own donations" on public.donations
  for select using (auth.uid() = user_id);
-- Note: the stripe_events dedupe table and the partial UNIQUE index on
-- donations.stripe_session_id are added in 20260627000001.

-- ---- handle_new_user: bootstrap a public.users row on signup ---------------
-- Original definition as it existed at baseline (SECURITY DEFINER, no search_path).
-- Hardened later in 20260710000005 (search_path pinned, direct execute revoked).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, name, tier, active, nhg_paid)
  values (new.id, new.email, new.raw_user_meta_data->>'name', 'nhg', true, false);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
