-- When a member joined KF. users.created_at is the NHG sign-up date (often months
-- earlier), so it can't tell us who is NEW to KF. Used by the KF Dashboard's
-- Start Here card (shown for a member's first 4 weeks in KF) and shown in the
-- admin Members tab.
--
-- Set automatically by trigger the first time a member's tier becomes 'kf',
-- whichever path does it (admin panel or /api/kf-register). Never overwritten,
-- so a member moved back to NHG and later re-promoted keeps their original date.
-- Existing KF members are left NULL (they joined before this was tracked).
-- Applied to project afeaatpzvpdlttqyspdd on 2026-10-09.

alter table public.users add column if not exists kf_joined_at timestamptz;

create or replace function public.set_kf_joined_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.tier = 'kf' and new.kf_joined_at is null
     and (tg_op = 'INSERT' or old.tier is distinct from 'kf') then
    new.kf_joined_at := now();
  end if;
  return new;
end;
$$;

revoke all on function public.set_kf_joined_at() from public, anon, authenticated;

drop trigger if exists users_set_kf_joined_at on public.users;
create trigger users_set_kf_joined_at
  before insert or update of tier on public.users
  for each row execute function public.set_kf_joined_at();
