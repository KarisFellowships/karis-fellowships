import { docUrl } from "@/lib/storage-url";
import { nhgFeatured } from "@/lib/nhg-surface";
import { getFacilitatorBoard } from "@/lib/facilitator";
import FacilitatorSignup from "@/app/(member)/nhg/facilitator/FacilitatorSignup";

// Combined NHG facilitator area (KF-members-only): General Resources at the top,
// then the sign-up board with each week's facilitator guide attached to its
// matching session. Rendered only inside the caller's KF-tier gate; the
// claim/release API routes also re-check KF.

const facilitatorResources = [
  { label: "NHG Facilitator Huddle Guide", href: "/docs/nhg/facilitator/NHG-Fac-Huddle-Guide-2023z.pdf" },
  { label: "NHG Introductory Meeting Facilitator Guide", href: "/docs/nhg/facilitator/NHG-Introductory-Mtg-Fac-Guide-2021z-wkg.pdf" },
  { label: "NHG Book Study Syllabus", href: "/docs/nhg/facilitator/NHG-Book-Study-Syllabus-2025.pdf" },
  { label: "Review Study Questions", href: "/docs/nhg/facilitator/review-study-questions-v2a.pdf" },
];

// Per-chapter facilitator guides (keyed by chapter number, matching the sign-up
// sessions' "Ch N" content). Attached to each session below.
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

// Map a session's content (e.g. "Ch 2: … & Ch 3: …") to its facilitator guide(s)
// by chapter number. One guide -> "Facilitator Guide"; multiple -> "Week N Guide".
function guidesForContent(content: string): { label: string; href: string }[] {
  const chapters: number[] = [];
  for (const m of content.matchAll(/Ch\s*(\d+)/gi)) {
    const n = Number(m[1]);
    if (facilitatorGuides[n] && !chapters.includes(n)) chapters.push(n);
  }
  if (chapters.length === 0) return [];
  if (chapters.length === 1) {
    return [{ label: "Facilitator Guide", href: docUrl(facilitatorGuides[chapters[0]].href) }];
  }
  return chapters.map((n) => ({ label: `Week ${n} Guide`, href: docUrl(facilitatorGuides[n].href) }));
}

export default async function FacilitatorSection({
  userId,
  myName,
}: {
  userId: string;
  myName: string;
}) {
  const board = await getFacilitatorBoard(userId);
  const sessions = board.sessions.map((s) => ({ ...s, guides: guidesForContent(s.content) }));

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

            {/* General Resources — at the top */}
            <div className="mt-6">
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

            {/* Sign-up board — each session shows its matching facilitator guide */}
            <div className="mt-8">
              {sessions.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/50 backdrop-blur-sm">
                  Facilitator sign-up for the upcoming study will open here soon.
                </p>
              ) : (
                <FacilitatorSignup sessions={sessions} myName={myName} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
