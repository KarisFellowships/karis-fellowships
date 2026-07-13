-- Applied to project afeaatpzvpdlttqyspdd on 2026-07-10.
--
-- Durable, queryable record of NHG registration form submissions. Previously the
-- answers were only in auth.users.user_metadata (not visible in the admin panel).
-- Written at checkout by the service-role client; admin-only (no RLS policies, so
-- only the service role reaches it).

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  name text,
  country text,
  state text,
  city text,
  phone text,
  meeting_choice text,
  karis_link text,
  hope_to_gain text,
  registered_before text,
  questions_comments text,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;
-- No policies on purpose: registration answers are admin-only. The checkout route
-- and the admin API use the service role, which bypasses RLS.

create index if not exists registrations_created_at_idx on public.registrations (created_at desc);
create index if not exists registrations_user_id_idx on public.registrations (user_id);
