import Link from "next/link";
import Image from "next/image";
import { getNHGStatus } from "@/lib/nhg-date-engine";
import { createServerClient } from "@/lib/supabase-server";
import { docUrl } from "@/lib/storage-url";
import NHGWelcome from "@/components/NHGWelcome";
import NHGFaq from "@/components/NHGFaq";
import IntroMeetingBlock from "@/components/IntroMeetingBlock";
import WeekendIntensiveSchedule from "@/components/WeekendIntensiveSchedule";
import { getMeetingCodes, phoneNumber, sectionCodes } from "@/lib/meeting-codes";
import { nhgCard, nhgFeatured, nhgCardHover, nhgCardLight, nhgCardLightHover } from "@/lib/nhg-surface";

const readingGuides: Record<number, { label: string; chapters: string; guide: string; intro: string }> = {
  1: { label: "Intro & Chapter 1", chapters: "The Search for Glory", guide: "/docs/nhg/reading-guides/1NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/Chapter 1 KF Introduction.pdf" },
  2: { label: "Chapters 2 & 3", chapters: "Neurotic Claims & The Tyranny of the Should", guide: "/docs/nhg/reading-guides/2NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/3NHG-Intro-Students-2023z.pdf" },
  3: { label: "Chapter 4", chapters: "Neurotic Pride", guide: "/docs/nhg/reading-guides/4NHG-pdf-Reading-Guide-2023z.pdf", intro: "/docs/nhg/introductions/4NHG-Intro-students-FINI-2023z.pdf" },
  4: { label: "Chapter 5", chapters: "Self-Hate and Self-Contempt", guide: "/docs/nhg/reading-guides/5NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/5NHG-Intro-student-2023z.pdf" },
  5: { label: "Chapter 6", chapters: "Alienation from Self", guide: "/docs/nhg/reading-guides/6NHG-PDF-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/6NHG-Intro-students-2023z.pdf" },
  6: { label: "Chapters 7 & 8", chapters: "General Measures to Relieve Tension & The Expansive Solutions", guide: "/docs/nhg/reading-guides/7NHG-PDF-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/7NHG-Intro-students-2023z.pdf" },
  7: { label: "Chapters 9 & 10", chapters: "The Self-Effacing Solution & Morbid Dependency", guide: "/docs/nhg/reading-guides/9NHG-PDF-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/9-10NHG-Intro-students-2023z.pdf" },
  8: { label: "Chapter 11", chapters: "Resignation", guide: "/docs/nhg/reading-guides/11NHG-pdf-Rdg-Guide-2023z.pdf", intro: "/docs/nhg/introductions/11NHG-Students-Intro-2023z.pdf" },
};

const kfIntroDocuments = [
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

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function formatWeekendDay(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${days[d.getUTCDay()]}, ${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

// Weekend Intensive: the same reading guides as the weekly study, condensed into
// one weekend. The dates come from the schedule (so they rotate each year); the
// day-of-weekend offsets, chapter groupings, and times are fixed.
const weekendIntensiveDayPlan: { offset: number; sessions: { label: string; time: string }[] }[] = [
  { offset: 0, sessions: [{ label: "Chapters 1 & 2", time: "7pm – 9pm" }] },
  { offset: 1, sessions: [
    { label: "Chapters 3 & 4", time: "8am – 10am" },
    { label: "Chapters 5 & 6", time: "11am – 1pm" },
    { label: "Chapters 7 & 8", time: "7pm – 9pm" },
  ] },
  { offset: 2, sessions: [
    { label: "Chapters 9 & 10", time: "3pm – 5pm" },
    { label: "Chapters 11 & Review", time: "7pm – 8pm" },
  ] },
];

export default async function NHGPage() {
  const nhg = await getNHGStatus();
  const meetingCodes = await getMeetingCodes();
  const callPhone = phoneNumber(meetingCodes);
  const nhgCodes = sectionCodes(meetingCodes, "nhg");

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  let userTier: string | null = null;
  let kfInvited = false;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("tier, kf_invited")
      .eq("id", user.id)
      .single();
    userTier = profile?.tier ?? null;
    kfInvited = profile?.kf_invited ?? false;
  }
  const isKFMember = userTier === "kf" || userTier === "admin";

  const activeWeek = nhg.currentWeek;
  const nextStudyDate = nhg.schedule.length > 0 ? nhg.schedule[0].startDate : null;
  const syllabusUrl = docUrl("/docs/nhg/kf-intro/NHG-Book-Study-Syllabus-2025 (1).pdf");

  // Featured week = the current week (once the study is running) or the next
  // upcoming week before it starts. Rendered as a large cinematic card.
  const featuredWeek = nhg.comingUpWeek ?? nhg.currentWeek ?? nhg.nextWeek ?? nhg.schedule[0] ?? null;
  const featuredGuide = featuredWeek ? readingGuides[featuredWeek.weekNumber] : undefined;
  const featuredIsCurrent = !!nhg.currentWeek && nhg.currentWeek.weekNumber === featuredWeek?.weekNumber;
  // The weekly cards: exclude the featured week and the Weekend Intensive
  // (same reading guides on a weekend schedule — shown via its own link).
  const otherWeeks = nhg.schedule.filter(
    (w) => w.weekNumber >= 1 && w.weekNumber !== featuredWeek?.weekNumber && !/weekend intensive/i.test(w.label)
  );

  // KF Introductory Meeting (KF0) — the step into KF after the study. Its date
  // is pulled from the seeded KF schedule for this cohort's year, so it rotates
  // each year with the projection (never hardcoded).
  const cohortSample = featuredWeek ?? nhg.schedule[0] ?? null;
  const cohortYear = cohortSample
    ? new Date(cohortSample.startDate + "T12:00:00Z").getUTCFullYear()
    : null;
  let kfIntroDate: string | null = null;
  if (cohortYear) {
    const { data: kfIntroRow } = await supabase
      .from("kf_schedule")
      .select("start_date")
      .eq("lesson_number", 0)
      .gte("start_date", `${cohortYear}-01-01`)
      .lte("start_date", `${cohortYear}-12-31`)
      .order("start_date", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (kfIntroRow?.start_date) kfIntroDate = formatDate(kfIntroRow.start_date as string);
  }

  // Weekend Intensive: dates from the schedule (week labeled "Weekend
  // Intensive"), access code from the meeting_codes table.
  const weekendIntensive = nhg.schedule.find((w) => /weekend intensive/i.test(w.label)) ?? null;
  const weekendIntensiveCode = nhgCodes.find((c) => /weekend intensive/i.test(c.label))?.code ?? null;
  const weekendIntensiveDays = weekendIntensive
    ? weekendIntensiveDayPlan.map((d) => ({
        date: formatWeekendDay(addDays(weekendIntensive.startDate, d.offset)),
        sessions: d.sessions,
      }))
    : [];

  // KF Introductory Meeting (09). Same content rendered in two spots, one shown
  // per breakpoint: on desktop it sits in the "Coming Up" left column under the
  // featured card (its original place); on mobile the columns stack, so it's
  // shown AFTER the weekly meetings instead of jumping ahead of weeks 1–8.
  const kfIntroBlock = (
    <div className="rounded-2xl border border-violet/35 bg-violet/[0.24] p-5 backdrop-blur-md sm:p-6">
      <div className="flex gap-4">
        <span className="mt-0.5 shrink-0 font-serif text-3xl font-medium leading-none text-violet-light/50">09</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-semibold leading-snug text-white sm:text-xl">KF Introductory Meeting</h3>
          {kfIntroDate && <p className="mt-0.5 text-sm font-medium text-white/50">{kfIntroDate}</p>}
          <p className="mt-2.5 text-sm leading-relaxed text-white/65">This meeting follows the same format as a weekly Karis Fellowships Meeting. Familiarize yourself and bring these documents with you to the meeting.</p>
          <ul className="mt-4 space-y-2.5">
            {kfIntroDocuments.map(({ label, href }) => (
              <li key={href} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-light/50" />
                <a href={docUrl(href)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-teal-light transition-colors hover:text-white">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#4a5568]">
      {/* Header + getting-started sit over the banner image, which fades to the page
          background before the weekly schedule (like the KF meeting pages). */}
      <div className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/forest-light.jpg" alt="Light breaking through a forest canopy" fill className="object-cover object-[center_30%] brightness-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pt-36 sm:pt-44">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75 drop-shadow">NHG Book Study</p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.03] text-white drop-shadow-xl sm:text-5xl lg:text-6xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>Neurosis and Human Growth</h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-white/80 drop-shadow sm:text-lg">A foundational study for Karis Fellowships.</p>
            {nextStudyDate && (
              <p className="mt-6 text-sm text-white/70 drop-shadow">
                <span className="uppercase tracking-[0.2em] text-white/50">Next study begins</span>
                &nbsp;&nbsp;<span className="font-serif text-xl text-white">{formatDate(nextStudyDate)}</span>
              </p>
            )}
          </div>
        </div>
        <div className="relative px-6 pb-14 pt-10">
          <div className="mx-auto max-w-6xl space-y-2">
          {kfInvited && userTier === "nhg" && (
            <a
              href="/kf/register"
              className="group flex items-center gap-4 rounded-2xl border-2 border-teal/70 bg-teal/25 p-6 shadow-lg shadow-teal/10 transition-all duration-500 hover:border-teal hover:bg-teal/35"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/40">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-serif text-xl font-semibold text-white">You&apos;ve been invited to join Karis Fellowships!</p>
                <p className="mt-1 text-sm font-medium text-white/85">Click here to complete your KF registration.</p>
              </div>
              <svg className="h-5 w-5 text-teal-light/60 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}

          {/* Getting started: Start Here + Call In Info + Syllabus, grouped tightly */}
          <div className="space-y-2">
          {/* Start Here — full-width accordion */}
          <NHGWelcome syllabusUrl={syllabusUrl} nextStudyDate={null} />

          {/* Call In Info (numbers spread across the width) + compact Syllabus */}
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className={`flex-1 px-5 py-4 ${nhgCard}`}>
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="font-serif text-lg text-white/90">Call In Info</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-white/40">Phone</p>
                  <p className="font-bold text-violet-light">{callPhone}</p>
                </div>
                {nhgCodes.map((c) => (
                  <div key={c.id}>
                    <p className="text-[10px] uppercase tracking-wide text-white/40">{/weekend|intensive/i.test(c.label) ? c.label : "Saturday 9 am CST"}</p>
                    <p className="font-mono text-sm font-bold text-violet-light/80">{c.code}</p>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={syllabusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-5 py-4 ${nhgCard} ${nhgCardHover}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-light/15">
                <svg className="h-5 w-5 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </span>
              <span className="font-serif text-lg text-white transition-colors group-hover:text-violet-light">NHG Book Study Syllabus</span>
            </a>
          </div>
          </div>
          </div>
        </div>
      </div>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl space-y-10">

          {/* Study Schedule */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-light/80">The Study</p>
            <h2 className="mt-2 mb-4 font-serif text-2xl font-medium text-white sm:text-3xl">Weekly Schedule &amp; Reading Guides</h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/70">
              We meet weekly for eight weeks as well as a weekend intensive of the same meetings. All weekly meetings are Saturday at 9 am CST, see the weekend intensive schedule below. While in the meeting a facilitator will read the KF Introduction and guide you through the reading guides.
            </p>
            <div className="grid gap-x-6 gap-y-6 lg:grid-cols-3 lg:items-stretch">
              <div className="flex flex-col gap-4 lg:col-span-1">
                {featuredWeek && (
                featuredGuide ? (
                  <Link
                    href={docUrl(featuredGuide.guide)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-square overflow-hidden rounded-2xl"
                  >
                    <Image
                      src="/mountain-dawn.jpg"
                      alt="Sunrise over a mountain range above the clouds"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241c46] via-[#2b2150]/40 to-black/25" />
                    <div className="absolute inset-x-0 top-0 p-6">
                      <span className="inline-flex w-fit items-center rounded-full bg-violet px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet/30">
                        {featuredIsCurrent ? "This Week" : formatDate(featuredWeek.startDate)}
                      </span>
                      <h2 className="mt-3 font-serif text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
                        {featuredGuide.label}
                      </h2>
                      <p className="mt-1 text-xs italic text-white/85 drop-shadow sm:text-sm">{featuredGuide.chapters}</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-base font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-white/25 sm:text-lg">
                        Open Reading Guide &rarr;
                      </span>
                    </div>
                  </Link>
                ) : (
                  <IntroMeetingBlock
                    title={featuredWeek.label.startsWith("NHG") ? featuredWeek.label : `NHG ${featuredWeek.label}`}
                    date={formatDate(featuredWeek.startDate)}
                    syllabusUrl={syllabusUrl}
                  />
                )
                )}

                {/* Desktop: supporting blocks stacked under the featured card; the last
                    two grow to fill the column so it matches the week-card column. */}
                <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:gap-4">
                  {kfIntroBlock}
                  <div className="flex flex-1 flex-col">
                    <WeekendIntensiveSchedule accessCode={weekendIntensiveCode} days={weekendIntensiveDays} />
                  </div>
                  <Link
                    href="/nhg/recordings"
                    className={`group flex flex-1 items-center gap-4 p-6 ${nhgCardLight} ${nhgCardLightHover}`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-light/15">
                      <svg className="h-6 w-6 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 9.5v5m0 0l-2-2m2 2l2-2M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-white group-hover:text-violet-light transition-colors">Meeting Recordings</h3>
                      <p className="mt-0.5 text-xs text-white/50">Past NHG sessions</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col lg:col-span-2">
                <div className="grid flex-1 auto-rows-fr gap-4 sm:grid-cols-2">
                  {otherWeeks.map((week) => {
                    const guide = readingGuides[week.weekNumber];
                    return (
                      <div key={week.weekNumber} className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet/35 bg-violet/[0.24] p-5 backdrop-blur-md transition-all duration-300 hover:border-violet/50 hover:bg-violet/[0.30]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-light/70">Week {week.weekNumber} &middot; {guide?.label ?? week.label}</p>
                        <h3 className="mt-2.5 font-serif text-2xl font-medium leading-tight text-white">{guide?.chapters ?? week.label}</h3>
                        <p className="mt-1.5 text-sm text-white/55">{formatDate(week.startDate)}</p>
                        <div className="mt-auto flex items-start gap-7 pt-6">
                          {guide && (
                            <a href={docUrl(guide.guide)} target="_blank" rel="noopener noreferrer" aria-label="Open Reading Guide" className="group/btn flex flex-col items-center gap-2 text-center">
                              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet text-white shadow-lg shadow-violet/40 transition-transform duration-300 group-hover/btn:scale-105">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors group-hover/btn:text-white">Reading Guide</span>
                            </a>
                          )}
                          {guide && (
                            <a href={docUrl(guide.intro)} target="_blank" rel="noopener noreferrer" aria-label="Open KF Introduction" className="group/btn flex flex-col items-center gap-2 text-center">
                              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-violet/50 bg-violet/20 text-violet-light transition-all duration-300 group-hover/btn:bg-violet/30 group-hover/btn:scale-105">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors group-hover/btn:text-white">KF Introduction</span>
                            </a>
                          )}
                          {week.weekNumber === 8 && (
                            <a href={docUrl("/docs/nhg/review-study-questions-v2a.pdf")} target="_blank" rel="noopener noreferrer" aria-label="Open Review" className="group/btn flex flex-col items-center gap-2 text-center">
                              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#fde68a]/40 text-[#fde68a] transition-all duration-300 group-hover/btn:bg-[#fde68a]/10 group-hover/btn:scale-105">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors group-hover/btn:text-white">Review</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Mobile: supporting blocks after the weekly cards (kept in flow) */}
            <div className="mt-4 space-y-2 lg:hidden">
              <WeekendIntensiveSchedule accessCode={weekendIntensiveCode} days={weekendIntensiveDays} />
              <Link
                href="/nhg/recordings"
                className={`group flex items-center gap-4 p-5 ${nhgCardLight} ${nhgCardLightHover}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-light/15">
                  <svg className="h-5 w-5 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 9.5v5m0 0l-2-2m2 2l2-2M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>
                </span>
                <div>
                  <h3 className="font-serif text-lg text-white group-hover:text-violet-light transition-colors">Meeting Recordings</h3>
                  <p className="mt-0.5 text-xs text-white/50">Past NHG sessions</p>
                </div>
              </Link>
              {kfIntroBlock}
            </div>
          </div>

          {/* FAQs & Tips */}
          <NHGFaq />

          {/* Facilitator Section — KF members only */}
          {isKFMember && (
          <div className="pt-4">
            <div className={`${nhgFeatured} p-8`}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fde68a]/15">
                  <svg className="h-6 w-6 text-[#fde68a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">NHG Facilitator Resources</h2>

                  {activeWeek && facilitatorGuides[activeWeek.weekNumber] && (
                    <div className="mt-4 rounded-xl bg-[#fde68a]/15 ring-1 ring-[#fde68a]/30 p-5">
                      <span className="inline-block rounded-full bg-[#fde68a]/20 px-3 py-1 text-xs font-bold text-[#fde68a]">
                        This Week
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {facilitatorGuides[activeWeek.weekNumber].label}
                      </h3>
                      <a
                        href={docUrl(facilitatorGuides[activeWeek.weekNumber].href)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#fde68a]/20 px-4 py-2.5 text-sm font-semibold text-[#fde68a] transition-all hover:bg-[#fde68a]/30"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Open Facilitator Guide
                      </a>
                    </div>
                  )}

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

                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">All Weekly Guides</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(facilitatorGuides).map(([num, { href }]) => {
                        const isCurrent = activeWeek?.weekNumber === Number(num);
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
          )}
        </div>
      </section>
    </div>
  );
}
