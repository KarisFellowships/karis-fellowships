-- Idempotency infrastructure for the Stripe webhook.
-- Applied to project afeaatpzvpdlttqyspdd on 2026-06-27.
--
-- 1) Event ledger so a replayed Stripe event is processed at most once.
create table if not exists public.stripe_events (
  id text primary key,                 -- Stripe event.id
  type text,
  received_at timestamptz not null default now()
);

-- Service-role only: RLS on with no policy means anon/authenticated have no access;
-- the webhook uses the service-role key which bypasses RLS.
alter table public.stripe_events enable row level security;

-- 2) Dedupe key so a duplicate checkout.session.completed cannot create two donation rows.
create unique index if not exists donations_stripe_session_id_key
  on public.donations (stripe_session_id)
  where stripe_session_id is not null;
