import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type UserTier = "nhg" | "kf" | "admin";

export interface KFUser {
  id: string;
  email: string;
  name: string | null;
  tier: UserTier;
  active: boolean;
}
