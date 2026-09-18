import PageHeader from "@/components/PageHeader";
import { requireKF } from "@/lib/require-tier";
import { createServerClient } from "@/lib/supabase-server";
import { getFacilitatorBoard } from "@/lib/facilitator";
import FacilitatorSignup from "./FacilitatorSignup";

// KF-members-only. /nhg is a member route open to nhg-tier users, so this page
// MUST gate to KF/admin itself — middleware is not enough (project rule 4).
export const dynamic = "force-dynamic";

export default async function NHGFacilitatorPage() {
  const { userId } = await requireKF();

  const supabase = await createServerClient();
  const { data: profile } = await supabase.from("users").select("name").eq("id", userId).single();
  const myName = profile?.name ?? "";

  const board = await getFacilitatorBoard(userId);

  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader
        title="NHG Facilitator Sign-Up"
        subtitle="Sign up to lead and support the NHG book study sessions."
        accent="violet"
        image="/nature-mountain.jpg"
        imageAlt="Mountain landscape"
        payg
      />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          {board.sessions.length === 0 ? (
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
              <p className="text-white/50">Facilitator sign-up for the upcoming study will open here soon.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-white/60">
                  Thank you for helping facilitate! Choose an open role below to sign up. You&apos;ll
                  receive a confirmation email, and your name will be visible to other KF members so
                  everyone can see who is leading each session.
                </p>
              </div>
              <FacilitatorSignup sessions={board.sessions} myName={myName} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
