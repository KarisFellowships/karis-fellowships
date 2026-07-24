-- KF re-registration: optional free-text elaboration on the "areas you're
-- interested in helping with" question. Nullable, additive, no backfill.
alter table public.users add column if not exists volunteer_note text;
