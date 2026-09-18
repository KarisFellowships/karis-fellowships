import { docUrl } from "@/lib/storage-url";
import { getFacilitatorBoard } from "@/lib/facilitator";
import FacilitatorSignup from "@/app/(member)/nhg/facilitator/FacilitatorSignup";

// Combined NHG facilitator area (KF-members-only): General Resources up top (its
// own highlighted block), then the sign-up board with each session's relevant
// guide(s) attached. Rendered only inside the caller's KF-tier gate; the
// claim/release API routes also re-check KF.

// Cross-cutting resources shown once at the top (huddle guide + review questions
// are attached to their specific sessions below instead).
const generalResources = [
  { label: "NHG Introductory Meeting Facilitator Guide", href: "/docs/nhg/facilitator/NHG-Introductory-Mtg-Fac-Guide-2021z-wkg.pdf" },
  { label: "NHG Book Study Syllabus", href: "/docs/nhg/facilitator/NHG-Book-Study-Syllabus-2025.pdf" },
];

const HUDDLE_GUIDE = "/docs/nhg/facilitator/NHG-Fac-Huddle-Guide-2023z.pdf";
const REVIEW_QUESTIONS = "/docs/nhg/facilitator/review-study-questions-v2a.pdf";

// Per-chapter facilitator guides (keyed by chapter number, matching the sign-up
// sessions' "Ch N" content).
const facilitatorGuides: Record<number, string> = {
  1: "/docs/nhg/facilitator/1NHG-Intro-Fac-Guide-2023z.pdf",
  2: "/docs/nhg/facilitator/2NHG-Intro-Fac-Guide-2023z.pdf",
  3: "/docs/nhg/facilitator/3NHG-Intro-Fac-Guide-2023z.pdf",
  4: "/docs/nhg/facilitator/4NHG-Intro-Fac-Guide-2023z.pdf",
  5: "/docs/nhg/facilitator/5NHG-Intro-Fac-Guide-2023z.pdf",
  6: "/docs/nhg/facilitator/6NHG-Intro-Fac-Guide-2023z.pdf",
  7: "/docs/nhg/facilitator/7NHG-Intro-Fac-Guide-2023z.pdf",
  8: "/docs/nhg/facilitator/8NHG-Intro-Fac-Guide-2023z.pdf",
  9: "/docs/nhg/facilitator/9-10NHG-Intro-9-Fac-Guide-2023z-.pdf",
  10: "/docs/nhg/facilitator/10NHG-Fac-Guide-2023z-Intro-in-Ch-9.pdf",
  11: "/docs/nhg/facilitator/11NHG-Intro-Fac-Guide-2023z.pdf",
};

// Resolve the guide(s) shown on a session: the huddle gets the Huddle Guide;
// chapter sessions get their weekly guide(s) by chapter number; review sessions
// (Ch 11 / "…& Review") also get the Review Study Questions.
function guidesForSession(section: string, content: string): { label: string; href: string }[] {
  if (section === "NHG Huddle") {
    return [{ label: "Huddle Guide", href: docUrl(HUDDLE_GUIDE) }];
  }
  const chapters: number[] = [];
  for (const m of content.matchAll(/Ch\s*(\d+)/gi)) {
    const n = Number(m[1]);
    if (facilitatorGuides[n] && !chapters.includes(n)) chapters.push(n);
  }
  const guides: { label: string; href: string }[] = [];
  // Consistent labels: always "Week N Guide" (never a bare "Facilitator Guide").
  for (const n of chapters) guides.push({ label: `Week ${n} Guide`, href: docUrl(facilitatorGuides[n]) });
  if (/review/i.test(content) || chapters.includes(11)) {
    guides.push({ label: "Review Study Questions", href: docUrl(REVIEW_QUESTIONS) });
  }
  return guides;
}

export default async function FacilitatorSection({
  userId,
  myName,
}: {
  userId: string;
  myName: string;
}) {
  const board = await getFacilitatorBoard(userId);
  const sessions = board.sessions.map((s) => ({ ...s, guides: guidesForSession(s.section, s.content) }));

  return (
    // Glassier frame with just a hint of violet (softer than the shared nhgFeatured
    // slab) so the frosted session boxes read as glass, not purple. The page hero
    // carries the "NHG Facilitator Resources" title, so this block goes straight to
    // the resources + sign-up.
    <div id="facilitator" className="rounded-2xl border border-violet/20 bg-violet/[0.08] p-6 backdrop-blur-md sm:p-8">
      {/* General Resources — highlighted block at the top */}
      <div className="rounded-2xl border border-[#fde68a]/25 bg-[#fde68a]/[0.07] p-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#fde68a]">General Resources</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {generalResources.map(({ label, href }) => (
            <a
              key={href}
              href={docUrl(href)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl bg-[#fde68a]/10 p-3 ring-1 ring-[#fde68a]/20 transition-all hover:bg-[#fde68a]/20 hover:-translate-y-0.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fde68a]/20">
                <svg className="h-5 w-5 text-[#fde68a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </span>
              <span className="text-sm font-semibold text-white/85 group-hover:text-[#fde68a] transition-colors">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sign-Up */}
      <div className="mt-8 border-t border-white/10 pt-8">
        <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">Facilitator Sign-Up</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Thank you for offering the gift of facilitation. Choose any open slot below to sign up.
          You&apos;ll receive a confirmation email, and your name will be visible to other KF members
          so everyone can see who is leading each session.
        </p>
        <div className="mt-6">
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
  );
}
