import Navbar from "@/components/Navbar";
import type { NavTier } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerClient } from "@/lib/supabase-server";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Reflect the visitor's logged-in state in the header so navigating to a
  // public page (e.g. the "Karis Fellowships" home link) keeps them logged in
  // instead of showing the logged-out nav. The session is unaffected either way.
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let tier: NavTier = null;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("tier")
      .eq("id", user.id)
      .single();
    tier = (profile?.tier as NavTier) ?? "nhg";
  }

  return (
    <>
      <Navbar isLoggedIn={!!user} tier={tier} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
