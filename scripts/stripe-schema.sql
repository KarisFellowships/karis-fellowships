-- Add payment tracking columns to existing users table
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS nhg_paid boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS hpkp_donated boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS romans_donated boolean DEFAULT false;

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  type text NOT NULL CHECK (type IN ('nhg_registration', 'gift_onetime', 'gift_recurring', 'hpkp', 'romans')),
  stripe_session_id text,
  created_at timestamptz DEFAULT now()
);

-- RLS: users can read their own donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own donations"
  ON public.donations FOR SELECT
  USING (auth.uid() = user_id);

-- Service role (webhook) inserts are allowed via service key, not RLS
-- The webhook uses the Supabase service role key which bypasses RLS
