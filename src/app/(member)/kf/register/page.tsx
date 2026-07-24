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
    <div className="min-h-screen bg-gradient-to-b from-[#3f4856] to-[#2b323d] pt-20">
      <section className="px-6 pt-14 text-center sm:pt-20">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-light">
          Karis Fellowships
        </span>
        <h1 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold text-white sm:text-4xl">
          {isReturning ? "Register for the Upcoming Year" : "Complete Your Registration"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
          {isReturning
            ? "Confirm your participation for the upcoming KF training year."
            : "You have been invited to join Karis Fellowships."}
        </p>
      </section>

      <section className="px-6 pb-16 pt-10">
        <KFRegisterClient
          userName={userName}
          userEmail={user.email ?? ""}
          isReturning={isReturning}
        />
      </section>
    </div>
  );
}
