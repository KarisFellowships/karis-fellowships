-- Fix the donations de-dupe index so the Stripe webhook can actually provision payments.
--
-- The prior index (20260627000001) was PARTIAL:
--   create unique index ... on donations (stripe_session_id) where stripe_session_id is not null;
-- Postgres cannot use a partial index as an ON CONFLICT arbiter without also being given its
-- predicate, and PostgREST/upsert has no way to pass that predicate. So the webhook's
--   .upsert({ ... }, { onConflict: "stripe_session_id", ignoreDuplicates: true })
-- emitted `INSERT ... ON CONFLICT (stripe_session_id) DO NOTHING` and failed with SQLSTATE
-- 42P10 ("no unique or exclusion constraint matching the ON CONFLICT specification") on EVERY
-- checkout.session.completed event -> the webhook threw -> HTTP 500 -> Stripe retried forever,
-- always failing. Net effect: no donation row was ever recorded and users.nhg_paid /
-- hpkp_donated / romans_donated was never flipped -- the customer was charged but left on
-- /nhg/payment-required with no access. 100% of payments. (Found in the launch audit; see
-- LAUNCH-AUDIT.md.)
--
-- A PLAIN unique index is inferable as an ON CONFLICT (stripe_session_id) arbiter. Postgres
-- still treats NULLs as distinct in a unique index, so multiple null-session rows remain
-- allowed and non-null dedupe (the idempotency guarantee) is preserved.
-- Applied to project afeaatpzvpdlttqyspdd on 2026-07-17.
drop index if exists public.donations_stripe_session_id_key;

create unique index if not exists donations_stripe_session_id_key
  on public.donations (stripe_session_id);
