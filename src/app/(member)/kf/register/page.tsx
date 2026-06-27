import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import KFRegisterClient from "./KFRegisterClient";

export default async function KFRegisterPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("tier, kf_invited, kf_registered_year, kf_first_year")
    .eq("id", user.id)
    .single();

  if (!profile?.kf_invited) {
    redirect("/nhg");
  }

  const currentYear = new Date().getFullYear();
  if (profile.kf_registered_year === currentYear) {
    redirect("/kf");
  }

  const isReturning = !!profile.kf_first_year;
  const userName = user.user_metadata?.name ?? "";

  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section
        className="relative z-10"
        style={{ background: "linear-gradient(135deg, #0a6c6e 0%, #0d9494 50%, #14b8a6 100%)" }}
      >
        <div className="absolute inset-0 bg-white/[0.06]" />
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">
              Karis Fellowships Registration
            </h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">
              {isReturning
                ? "Register for the upcoming KF training year."
                : "You have been invited to join Karis Fellowships."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <KFRegisterClient
          userName={userName}
          userEmail={user.email ?? ""}
          isReturning={isReturning}
        />
      </section>
    </div>
  );
}
