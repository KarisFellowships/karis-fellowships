import Navbar from "@/components/Navbar";
import type { NavTier } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

// Member areas should never be indexed — defense-in-depth alongside robots.txt.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("tier")
    .eq("id", user.id)
    .single();

  const tier: NavTier = (profile?.tier as NavTier) ?? "nhg";

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white">
        Skip to content
      </a>
      <Navbar isLoggedIn={true} tier={tier} />
      <main id="main" className="min-h-screen bg-slate-dark">{children}</main>
      <Footer />
    </>
  );
}
