import Link from "next/link";
import Image from "next/image";
import { getNHGStatus } from "@/lib/nhg-date-engine";
import { createServerClient } from "@/lib/supabase-server";
import { docUrl } from "@/lib/storage-url";

const readingGuides: Record<number, { label: string; guide: string; intro: string }> = {
  1: { label: "Intro & Chapt 1", guide: "/docs/nhg/reading-guides/1NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/Chapter 1 KF Introduction.pdf" },
  2: { label: "Chap 2 & 3", guide: "/docs/nhg/reading-guides/2NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/3NHG-Intro-Students-2023z.pdf" },
  3: { label: "Chap 4", guide: "/docs/nhg/reading-guides/4NHG-pdf-Reading-Guide-2023z.pdf", intro: "/docs/nhg/introductions/4NHG-Intro-students-FINI-2023z.pdf" },
  4: { label: "Chap 5", guide: "/docs/nhg/reading-guides/5NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/5NHG-Intro-student-2023z.pdf" },
  5: { label: "Chap 6", guide: "/docs/nhg/reading-guides/6NHG-PDF-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/6NHG-Intro-students-2023z.pdf" },
  6: { label: "Chap 7 & 8", guide: "/docs/nhg/reading-guides/7NHG-PDF-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/7NHG-Intro-students-2023z.pdf" },
  7: { label: "Chap 9 & 10", guide: "/docs/nhg/reading-guides/9NHG-PDF-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/9-10NHG-Intro-students-2023z.pdf" },
  8: { label: "Chap 11", guide: "/docs/nhg/reading-guides/11NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/11NHG-Students-Intro-2023z.pdf" },
};

const kfIntroDocuments = [
  { label: "NHG Book Study Syllabus", href: "/docs/nhg/kf-intro/NHG-Book-Study-Syllabus-2025 (1).pdf" },
  { label: "KF Meeting Schedule", href: "/docs/nhg/kf-intro/KF-Meeting-Schedule-2024z.pdf" },
  { label: "Meeting Prep Guide", href: "/docs/nhg/kf-intro/MPG-pdf-2021z.pdf" },
  { label: "Love or Pride", href: "/docs/nhg/kf-intro/Love-or-Pride-FINI-2021.pdf" },
  { label: "KF Introductory Meeting", href: "/docs/nhg/kf-intro/KF10.0-M-FINI-2024.pdf" },
  { label: "KF Introductory Meeting (Expanded)", href: "/docs/nhg/kf-intro/KF10.0-E-FINI-2024.pdf" },
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

const facilitatorResources = [
  { label: "NHG Facilitator Huddle Guide", href: "/docs/nhg/facilitator/NHG-Fac-Huddle-Guide-2023z.pdf" },
  { label: "NHG Introductory Meeting Facilitator Guide", href: "/docs/nhg/facilitator/NHG-Introductory-Mtg-Fac-Guide-2021z-wkg.pdf" },
  { label: "NHG Book Study Syllabus", href: "/docs/nhg/facilitator/NHG-Book-Study-Syllabus-2025.pdf" },
  { label: "Review Study Questions", href: "/docs/nhg/facilitator/review-study-questions-v2a.pdf" },
];

export default async function NHGPage() {
  const nhg = await getNHGStatus();

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  let userTier: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("tier")
      .eq("id", user.id)
      .single();
    userTier = profile?.tier ?? null;
  }
  const isKFMember = userTier === "kf" || userTier === "admin";

  const activeWeek = nhg.currentWeek;
  const upcomingWeek = nhg.nextWeek;
  const currentGuide = activeWeek ? readingGuides[activeWeek.weekNumber] : null;

  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      {/* Vibrant header */}
      <section className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/forest-light.jpg" alt="Light breaking through a forest canopy" fill className="object-cover brightness-110 saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-medium text-violet-light/80 drop-shadow">NHG Book Study</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">Neurosis and Human Growth</h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">Your foundational study for the Karis journey.</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-6xl space-y-3">
          {/* Current or Upcoming Week */}
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {activeWeek ? (
                <div className="overflow-hidden rounded-xl bg-[#1e293b] p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-violet px-3 py-1 text-xs font-bold text-white">
                        This Week
                      </span>
                      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                        {activeWeek.label}
                      </h2>
                      <p className="mt-1 text-white/50">{activeWeek.dateRange}</p>
                    </div>
                    {currentGuide && (
                      <div className="flex flex-col gap-2">
                        <a
                          href={docUrl(currentGuide.guide)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-violet/15 px-4 py-2.5 text-sm font-semibold text-violet-light transition-all hover:bg-violet/25"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          Reading Guide
                        </a>
                        <a
                          href={docUrl(currentGuide.intro)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-amber/15 px-4 py-2.5 text-sm font-semibold text-amber transition-all hover:bg-amber/25"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                          Introduction
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : upcomingWeek ? (
                <div className="overflow-hidden rounded-xl bg-[#1e293b] p-8">
                  <span className="inline-block rounded-full bg-teal/20 px-3 py-1 text-xs font-bold text-teal-light">
                    Upcoming
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Next Study: {upcomingWeek.label}
                  </h2>
                  <p className="mt-1 text-white/50">Begins {upcomingWeek.dateRange}</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl bg-[#1e293b] p-8">
                  <h2 className="text-2xl font-bold text-white">NHG Book Study</h2>
                  <p className="mt-2 text-white/50">Check back for the next study schedule.</p>
                </div>
              )}
            </div>

            {/* Call Info */}
            <div className="rounded-xl bg-[#1e293b] p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Meeting Call Info</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wide">Phone</p>
                  <p className="mt-0.5 text-lg font-bold text-violet-light">(701) 801-1220</p>
                </div>
                <div className="border-t border-white/10 pt-3 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-white/70">Saturday AM</p>
                    <p className="mt-0.5 font-mono text-base font-bold text-violet-light/80">226-621-530#</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/70">Weekend Intensive</p>
                    <p className="mt-0.5 font-mono text-base font-bold text-violet-light/80">546-213-115#</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={docUrl("/docs/nhg/kf-intro/NHG-Book-Study-Syllabus-2025 (1).pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-[#1e293b] p-5 transition-all hover:bg-[#243044] hover:-translate-y-0.5"
            >
              <h3 className="font-bold text-white group-hover:text-violet-light transition-colors">NHG Book Study Syllabus</h3>
              <p className="mt-1 text-xs text-white/40">Study overview and plan</p>
            </a>
            <a
              href={docUrl("/docs/nhg/review-study-questions-v2a.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-[#1e293b] p-5 transition-all hover:bg-[#243044] hover:-translate-y-0.5"
            >
              <h3 className="font-bold text-white group-hover:text-violet-light transition-colors">Review Study Questions</h3>
              <p className="mt-1 text-xs text-white/40">Open</p>
            </a>
            <Link
              href="/nhg/recordings"
              className="group rounded-xl bg-[#1e293b] p-5 transition-all hover:bg-[#243044] hover:-translate-y-0.5"
            >
              <h3 className="font-bold text-white group-hover:text-violet-light transition-colors">Recordings</h3>
              <p className="mt-1 text-xs text-white/40">Past NHG sessions</p>
            </Link>
          </div>

          {/* Full Study Schedule */}
          <div className="pt-6">
            <h2 className="text-lg font-bold text-white mb-3">Study Schedule</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nhg.schedule.map((week) => {
                const isCurrent = activeWeek?.weekNumber === week.weekNumber;
                const guide = readingGuides[week.weekNumber];
                return (
                  <div
                    key={week.weekNumber}
                    className={`rounded-xl p-4 transition-all ${
                      isCurrent
                        ? "bg-violet/15 ring-1 ring-violet/30"
                        : "bg-[#1e293b]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                        isCurrent ? "bg-violet text-white" : "bg-violet/20 text-violet-light"
                      }`}>
                        {week.weekNumber}
                      </span>
                      <div>
                        <h3 className={`text-sm font-semibold ${isCurrent ? "text-violet-light" : "text-white"}`}>
                          {week.label}
                        </h3>
                        <p className="text-xs text-white/35">{week.dateRange}</p>
                        {isCurrent && <span className="text-xs font-medium text-violet-light">This Week</span>}
                      </div>
                    </div>
                    {guide && (
                      <div className="mt-3 flex gap-2">
                        <a href={docUrl(guide.guide)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-violet-light/70 hover:text-violet-light transition-colors">
                          Reading Guide
                        </a>
                        <span className="text-white/20">|</span>
                        <a href={docUrl(guide.intro)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-amber/70 hover:text-amber transition-colors">
                          Introduction
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* KF Introductory Meeting — week 9, optional */}
              <div className="rounded-xl bg-[#1e293b] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/20 text-sm font-bold text-teal-light">
                    9
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">KF Introductory Meeting</h3>
                    <p className="text-xs text-white/35">Optional</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {kfIntroDocuments.map(({ label, href }) => (
                    <a key={href} href={docUrl(href)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-light/70 hover:text-teal-light transition-colors">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Reading Guides */}
          <div className="pt-6">
            <h2 className="text-lg font-bold text-white mb-3">All Reading Guides</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(readingGuides).map(([num, { label, guide, intro }]) => (
                <div key={num} className="flex items-center justify-between rounded-xl bg-[#1e293b] p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet/15 text-xs font-bold text-violet-light">
                      {num}
                    </span>
                    <span className="text-sm text-white/70">{label}</span>
                  </div>
                  <div className="flex gap-2">
                    <a href={docUrl(guide)} target="_blank" rel="noopener noreferrer" className="rounded-md bg-violet/10 px-2 py-1 text-xs font-semibold text-violet-light hover:bg-violet/20 transition-colors">
                      Guide
                    </a>
                    <a href={docUrl(intro)} target="_blank" rel="noopener noreferrer" className="rounded-md bg-amber/10 px-2 py-1 text-xs font-semibold text-amber hover:bg-amber/20 transition-colors">
                      Intro
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facilitator Section — KF members only */}
          {isKFMember && (
          <div className="pt-6">
            <div className="rounded-xl bg-[#1e293b] p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-coral/20">
                  <svg className="h-6 w-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">NHG Facilitator Resources</h2>

                  {/* Current Week Facilitator Guide */}
                  {activeWeek && facilitatorGuides[activeWeek.weekNumber] && (
                    <div className="mt-4 rounded-xl bg-coral/10 ring-1 ring-coral/20 p-5">
                      <span className="inline-block rounded-full bg-coral/20 px-3 py-1 text-xs font-bold text-coral">
                        This Week
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {facilitatorGuides[activeWeek.weekNumber].label}
                      </h3>
                      <a
                        href={docUrl(facilitatorGuides[activeWeek.weekNumber].href)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-coral/20 px-4 py-2.5 text-sm font-semibold text-coral transition-all hover:bg-coral/30"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Open Facilitator Guide
                      </a>
                    </div>
                  )}

                  {/* General Facilitator Resources */}
                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">General Resources</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {facilitatorResources.map(({ label, href }) => (
                        <a
                          key={href}
                          href={docUrl(href)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coral/15">
                            <svg className="h-4 w-4 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          </span>
                          <span className="text-sm font-medium text-white/70 group-hover:text-coral transition-colors">{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* All Weekly Facilitator Guides */}
                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">All Weekly Guides</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(facilitatorGuides).map(([num, { label, href }]) => {
                        const isCurrent = activeWeek?.weekNumber === Number(num);
                        return (
                          <a
                            key={num}
                            href={docUrl(href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 rounded-xl p-3 transition-all hover:-translate-y-0.5 ${
                              isCurrent
                                ? "bg-coral/15 ring-1 ring-coral/30"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                              isCurrent ? "bg-coral text-white" : "bg-coral/15 text-coral"
                            }`}>
                              {num}
                            </span>
                            <span className={`text-sm font-medium transition-colors ${
                              isCurrent ? "text-coral" : "text-white/60 hover:text-coral"
                            }`}>
                              Week {num}
                              {isCurrent && <span className="ml-1 text-xs text-coral/70">(This Week)</span>}
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
          )}
        </div>
      </section>
    </div>
  );
}
