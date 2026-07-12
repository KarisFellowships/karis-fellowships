-- Applied to project afeaatpzvpdlttqyspdd on 2026-07-10.
--
-- Harden the SECURITY DEFINER profile-bootstrap trigger function (advisor 0011,
-- function_search_path_mutable). The body already fully-qualifies public.users,
-- so pinning search_path to empty is safe and removes the mutable-search_path
-- privilege-escalation vector. Also revoke the unnecessary direct-RPC execute
-- surface (advisors 0028/0029) — the function only needs to run via the
-- on_auth_user_created trigger, and trigger execution does not require caller
-- EXECUTE, so signup is unaffected.

alter function public.handle_new_user() set search_path = '';

revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon;
revoke all on function public.handle_new_user() from authenticated;
