-- Applied to project afeaatpzvpdlttqyspdd on 2026-07-10.
--
-- Per-key fixed-window rate limiting for public endpoints (/api/checkout,
-- /api/contact). No external vendor: the counter lives in Postgres and is only
-- touched by the SECURITY DEFINER function below, invoked by the service role.

create table if not exists public.rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  count integer not null default 0
);

alter table public.rate_limits enable row level security;
-- No policies: only rate_limit_check (definer) writes here; nothing reads it directly.

create or replace function public.rate_limit_check(p_key text, p_max integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  insert into public.rate_limits (key, window_start, count)
    values (p_key, now(), 1)
  on conflict (key) do update set
    count = case
      when public.rate_limits.window_start < now() - make_interval(secs => p_window_seconds)
        then 1
      else public.rate_limits.count + 1
    end,
    window_start = case
      when public.rate_limits.window_start < now() - make_interval(secs => p_window_seconds)
        then now()
      else public.rate_limits.window_start
    end
  returning count into v_count;
  return v_count <= p_max;
end;
$$;

revoke all on function public.rate_limit_check(text, integer, integer) from public;
revoke all on function public.rate_limit_check(text, integer, integer) from anon;
revoke all on function public.rate_limit_check(text, integer, integer) from authenticated;
grant execute on function public.rate_limit_check(text, integer, integer) to service_role;
