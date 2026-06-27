-- Add KF registration columns to existing users table
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS kf_invited boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS kf_registered_year integer,
  ADD COLUMN IF NOT EXISTS nhg_completed_date date,
  ADD COLUMN IF NOT EXISTS kf_first_year integer,
  ADD COLUMN IF NOT EXISTS volunteer_interest text;
