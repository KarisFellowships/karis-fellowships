import Navbar from "@/components/Navbar";
import type { NavTier } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

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
      <Navbar isLoggedIn={true} tier={tier} />
      <main className="min-h-screen bg-slate-dark">{children}</main>
      <Footer />
    </>
  );
}
