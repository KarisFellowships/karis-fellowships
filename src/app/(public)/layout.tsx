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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white">
        Skip to content
      </a>
      <Navbar isLoggedIn={!!user} tier={tier} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
