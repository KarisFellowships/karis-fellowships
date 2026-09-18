-- NHG facilitator sign-up: sessions + role slots.
-- KF-members-only feature. Both tables have RLS ENABLED with NO member policies,
-- so all access goes through service-role API routes that re-check tier
-- (['kf','admin']) server-side — matching the kf-register / registrations pattern.
-- Session dates are seeded from content/KF Date Projection.xlsx (project rule 2)
-- via scripts/seed-facilitator-sessions.mjs; slots start OPEN (user_id null).
-- Applied to project afeaatpzvpdlttqyspdd on 2026-09-17.

create table if not exists public.nhg_facilitator_sessions (
  id uuid primary key default gen_random_uuid(),
  cycle_year integer not null,
  section text not null,            -- 'NHG Huddle' | 'Saturday Meetings' | 'Weekend Intensive' | 'KF 0'
  content text not null,            -- chapter/topic title (verbatim NHG material)
  session_date date not null,       -- from the KF Date Projection sheet
  start_time time,
  end_time time,
  duration_minutes integer,
  sort integer not null default 0,  -- display order within the cycle
  created_at timestamptz not null default now()
);
create index if not exists nhg_fac_sessions_cycle_idx on public.nhg_facilitator_sessions (cycle_year, sort);
alter table public.nhg_facilitator_sessions enable row level security;

create table if not exists public.nhg_facilitator_slots (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.nhg_facilitator_sessions(id) on delete cascade,
  role_label text not null,         -- 'Lead' | 'Support #1' | 'Support #2' | 'Intro Facilitator' | 'Intro Meeting Support'
  part text,                        -- '1st hour' | '2nd hour' | null
  slot_index integer not null default 1,
  sort integer not null default 0,
  user_id uuid references public.users(id) on delete set null,  -- null = OPEN
  display_name text,                -- snapshot name shown to all KF members (members can't read each other's profile)
  signed_up_at timestamptz,
  reminder_week_sent_at timestamptz,   -- ~7-day reminder (Phase B cron); null = unsent
  reminder_day_sent_at timestamptz,    -- ~1-day reminder (Phase B cron); null = unsent
  updated_at timestamptz not null default now(),
  unique (session_id, part, role_label, slot_index)
);
create index if not exists nhg_fac_slots_session_idx on public.nhg_facilitator_slots (session_id);
create index if not exists nhg_fac_slots_user_idx on public.nhg_facilitator_slots (user_id) where user_id is not null;
alter table public.nhg_facilitator_slots enable row level security;
-- No policies on either table: RLS-enabled-no-policy = service-role-only access.
