import { redirect } from "next/navigation";
import { createServerClient } from "./supabase-server";

// Server-side tier enforcement (defense-in-depth). Middleware (proxy.ts) gates
// routes too, but pages/API must independently verify — never rely on middleware
// alone. Redirects if not signed in, inactive, or not in the allowed tiers.
export async function requireTier(
  allowed: string[]
): Promise<{ userId: string; tier: string }> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("tier, active")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.active) redirect("/login");

  if (!allowed.includes(profile.tier)) {
    redirect(profile.tier === "nhg" ? "/nhg" : "/kf");
  }

  return { userId: user.id, tier: profile.tier };
}

export const requireAdmin = () => requireTier(["admin"]);
export const requireKF = () => requireTier(["kf", "admin"]);
