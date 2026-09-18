import { docUrl } from "@/lib/storage-url";
import { nhgFeatured } from "@/lib/nhg-surface";
import { getFacilitatorBoard } from "@/lib/facilitator";
import FacilitatorSignup from "@/app/(member)/nhg/facilitator/FacilitatorSignup";

// Combined NHG facilitator area (KF-members-only): sign-up board + the facilitator
// guides/resources, all in one place at the bottom of the NHG page. Rendered only
// inside the caller's KF-tier gate; the claim/release API routes also re-check KF.

const facilitatorResources = [
  { label: "NHG Facilitator Huddle Guide", href: "/docs/nhg/facilitator/NHG-Fac-Huddle-Guide-2023z.pdf" },
  { label: "NHG Introductory Meeting Facilitator Guide", href: "/docs/nhg/facilitator/NHG-Introductory-Mtg-Fac-Guide-2021z-wkg.pdf" },
  { label: "NHG Book Study Syllabus", href: "/docs/nhg/facilitator/NHG-Book-Study-Syllabus-2025.pdf" },
  { label: "Review Study Questions", href: "/docs/nhg/facilitator/review-study-questions-v2a.pdf" },
];

const facilitatorGuides: Record<number, { label: string; href: string }> = {
  1: { label: "NHG Week 1 Facilitator Guide", href: "/docs/nhg/facilitator/1NHG-Intro-Fac-Guide-2023z.pdf" },
  2: { label: "NHG Week 2 Facilitator Guide", href: "/docs/nhg/facilitator/2NHG-Intro-Fac-Guide-2023z.pdf" },
  3: { label: "NHG Week 3 Facilitator Guide", href: "/docs/nhg/facilitator/3NHG-Intro-Fac-Guide-2023z.pdf" },
  4: { label: "NHG Week 4 Facilitator Guide", href: "/docs/nhg/facilitator/4NHG-Intro-Fac-Guide-2023z.pdf" },
  5: { label: "NHG Week 5 Facilitator Guide", href: "/docs/nhg/facilitator/5NHG-Intro-Fac-Guide-2023z.pdf" },
  6: { label: "NHG Week 6 Facilitator Guide", href: "/docs/nhg/facilitator/6NHG-Intro-Fac-Guide-2023z.pdf" },
  7: { label: "NHG Week 7 Facilitator Guide", href: "/docs/nhg/facilitator/7NHG-Intro-Fac-Guide-2023z.pdf" },
  8: { label: "NHG Week 8 Facilitator Guide", href: "/docs/nhg/facilitator/8NHG-Intro-Fac-Guide-2023z.pdf" },
  9: { label: "NHG Week 9 Facilitator Guide", href: "/docs/nhg/facilitator/9-10NHG-Intro-9-Fac-Guide-2023z-.pdf" },
  10: { label: "NHG Week 10 Facilitator Guide (Intro in Ch 9)", href: "/docs/nhg/facilitator/10NHG-Fac-Guide-2023z-Intro-in-Ch-9.pdf" },
  11: { label: "NHG Week 11 Facilitator Guide", href: "/docs/nhg/facilitator/11NHG-Intro-Fac-Guide-2023z.pdf" },
};

export default async function FacilitatorSection({
  userId,
  myName,
  activeWeekNumber,
}: {
  userId: string;
  myName: string;
  activeWeekNumber: number | null;
}) {
  const board = await getFacilitatorBoard(userId);

  return (
    <div id="facilitator" className="scroll-mt-24 pt-4">
      <div className={`${nhgFeatured} p-8`}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fde68a]/15">
            <svg className="h-6 w-6 text-[#fde68a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-white">NHG Facilitator Resources</h2>

            {/* Intro */}
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Thank you for offering the gift of facilitation. Choose any open slot below to
              sign up. You&apos;ll receive a confirmation email, and your name will be visible to
              other KF members so everyone can see who is leading each session.
            </p>

            {/* Sign-up board */}
            <div className="mt-6">
              {board.sessions.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/50 backdrop-blur-sm">
                  Facilitator sign-up for the upcoming study will open here soon.
                </p>
              ) : (
                <FacilitatorSignup sessions={board.sessions} myName={myName} />
              )}
            </div>

            {/* General Resources */}
            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">General Resources</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {facilitatorResources.map(({ label, href }) => (
                  <a
                    key={href}
                    href={docUrl(href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.10] hover:-translate-y-0.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fde68a]/15">
                      <svg className="h-4 w-4 text-[#fde68a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    <span className="text-sm font-medium text-white/70 group-hover:text-[#fde68a] transition-colors">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* All Weekly Guides */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">All Weekly Guides</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(facilitatorGuides).map(([num, { href }]) => {
                  const isCurrent = activeWeekNumber === Number(num);
                  return (
                    <a
                      key={num}
                      href={docUrl(href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 rounded-xl p-3 transition-all hover:-translate-y-0.5 ${
                        isCurrent
                          ? "bg-[#fde68a]/15 ring-1 ring-[#fde68a]/30"
                          : "border border-white/10 bg-white/[0.05] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.10]"
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        isCurrent ? "bg-[#fde68a] text-[#2b2150]" : "bg-[#fde68a]/15 text-[#fde68a]"
                      }`}>
                        {num}
                      </span>
                      <span className={`text-sm font-medium transition-colors ${
                        isCurrent ? "text-[#fde68a]" : "text-white/60 hover:text-[#fde68a]"
                      }`}>
                        Week {num}
                        {isCurrent && <span className="ml-1 text-xs text-[#fde68a]/70">(This Week)</span>}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
