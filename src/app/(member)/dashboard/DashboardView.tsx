import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { docUrl } from "@/lib/storage-url";
import { dashCard, dashCardHover } from "@/lib/dashboard-surface";

// Presentational view for the KF dashboard. Kept separate from page.tsx (which does
// the auth check + data fetching) so the layout can be previewed with dummy props.
export interface DashboardViewProps {
  lessonNumber: number;
  dateRange: string;
  callPhone: string;
  meetings: { day: string; time: string; code: string }[];
  recent: { n: number; dateRange: string | null }[];
}

export default function DashboardView({ lessonNumber, dateRange, callPhone, meetings, recent }: DashboardViewProps) {
  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page background */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image
          src="/forest-canopy.jpg"
          alt="Sunlit forest canopy"
          fill
          priority
          className="object-cover object-center brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#4a5568] sm:from-black/45 sm:via-black/20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">
              Your Dashboard
            </h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">
              Empowering Christians to fulfill their true glory.
            </p>
            <div className="mt-6">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Dashboard content */}
        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-7xl space-y-4">
            {/* Top row: This Week (square) | Call Info (centered) | Prep & Schedule */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* This Week — square card with ship-voyage image */}
              <Link
                href={`/kf/meetings/kf${lessonNumber}`}
                className="group relative block overflow-hidden rounded-2xl lg:h-full"
              >
                <div className="relative aspect-square lg:aspect-auto lg:h-full lg:min-h-[20rem]">
                  <Image
                    src="/ship-voyage.jpg"
                    alt="Sailboat heading out to open sea"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 top-0 p-6">
                    <span className="inline-block rounded-full bg-teal/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      This Week
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
                      KF{lessonNumber}
                    </h2>
                    <p className="mt-1 text-sm text-white/70">{dateRange}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-light transition-colors group-hover:text-white">
                      Open Lesson &rarr;
                    </span>
                  </div>
                </div>
              </Link>

              {/* Call Info — centered vertically */}
              <div className={`flex flex-col justify-center p-6 ${dashCard}`}>
                <div className="flex items-center gap-2 mb-5">
                  <svg className="h-5 w-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Meeting Call Info</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/35">Phone</p>
                    <p className="mt-0.5 text-xl font-bold text-teal-light">{callPhone}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4 space-y-4">
                    {meetings.map(({ day, time, code }) => (
                      <div key={day}>
                        <p className="text-sm font-semibold text-white/70">{day} &middot; {time}</p>
                        <p className="mt-0.5 font-mono text-base font-bold text-teal-light/80">{code}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/kf/call-info" className="mt-5 inline-flex items-center text-sm font-semibold text-teal-light hover:text-teal transition-colors">
                  Full call details &rarr;
                </Link>
              </div>

              {/* Meeting Prep Guide & Meeting Schedule */}
              <div className="flex flex-col gap-4">
                {/* Meeting Prep Guide */}
                <div className={`flex-1 p-6 ${dashCard}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="h-5 w-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Meeting Prep Guide</h3>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed">
                    Prepare for KF{lessonNumber} with the weekly guide.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <a
                      href={docUrl("/docs/kf-resources/meeting-prep-guide.pdf")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-amber/15 px-4 py-2.5 text-sm font-semibold text-amber transition-all hover:bg-amber/25"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Prep Guide (PDF)
                    </a>
                    <a
                      href={docUrl("/docs/kf-resources/KF-MPG-typed-2021.docx")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-amber/15 px-4 py-2.5 text-sm font-semibold text-amber transition-all hover:bg-amber/25"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Word
                    </a>
                  </div>
                </div>

                {/* Meeting Schedule */}
                <div className={`flex-1 p-6 ${dashCard}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="h-5 w-5 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Meeting Schedule</h3>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed">
                    This document is used at every meeting. It contains the introductions to read for each section.
                  </p>
                  <a
                    href={docUrl("/docs/kf-resources/KF-Meeting-Schedule.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky/15 px-4 py-2.5 text-sm font-semibold text-sky transition-all hover:bg-sky/25"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Open Schedule
                  </a>
                </div>
              </div>
            </div>

            {/* Second row: Facilitators + KF Recordings (2-up) */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className={`p-6 ${dashCard}`}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="h-5 w-5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Facilitators</h3>
                </div>
                <p className="text-base text-white/70 leading-relaxed mb-4">
                  Facilitator guide and this week&apos;s KF{lessonNumber} facilitator questions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={docUrl("/docs/facilitator/facilitator-guide.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet/15 px-4 py-2 text-sm font-semibold text-violet-light transition-all hover:bg-violet/25"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Facilitator Guide
                  </a>
                  <a
                    href={docUrl(`/docs/questions/kf${lessonNumber}-questions.pdf`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet/15 px-4 py-2 text-sm font-semibold text-violet-light transition-all hover:bg-violet/25"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    KF{lessonNumber} Questions
                  </a>
                </div>
                <Link href="/kf/facilitator" className="mt-3 inline-flex items-center text-xs font-semibold text-violet-light hover:text-violet transition-colors">
                  All facilitator resources &rarr;
                </Link>
              </div>

              {/* KF Recordings */}
              <div className={`p-6 ${dashCard}`}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="h-5 w-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 9.5v5m0 0l-2-2m2 2l2-2M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">KF Recordings</h3>
                </div>
                <p className="text-base text-white/70 leading-relaxed">
                  To listen to a recording of the latest meeting, use the phone number <span className="font-semibold text-teal-light">(701)&nbsp;801-1229</span> and your meeting time&apos;s access code from the table above. Follow the audio prompts. Press # to listen to the most recent recording.
                </p>
                <Link href="/kf/recordings" className="mt-4 inline-flex items-center text-sm font-semibold text-teal-light hover:text-teal transition-colors">
                  Listen to all recordings &rarr;
                </Link>
              </div>
            </div>

            {/* Quick links — image cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { href: "/kf/meetings", label: "KF Weekly Meetings", desc: "52 weekly lessons", img: "/ocean-horizon.jpg" },
                { href: "/toolbox", label: "KF Toolbox", desc: "Worksheets & meditations", img: "/butterfly-transform.jpg" },
                { href: "/nhg", label: "NHG Book Study", desc: "Schedules & guides", img: "/forest-light.jpg" },
                { href: "/other-studies", label: "Other Studies", desc: "Romans, HPKP, Mindfulness", img: "/mountain-dawn.jpg" },
              ].map(({ href, label, desc, img }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative block overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={img} alt={label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-sm font-bold text-white group-hover:text-teal-light transition-colors">{label}</h3>
                    <p className="mt-0.5 text-xs text-white/45">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent lessons */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-white">Recent Lessons</h2>
                <Link href="/kf/meetings" className="text-sm font-semibold text-teal-light hover:text-teal transition-colors">
                  View all 52 &rarr;
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recent.map(({ n, dateRange: lessonDate }) => (
                  <Link
                    key={n}
                    href={`/kf/meetings/kf${n}`}
                    className={`group flex items-center gap-4 p-4 ${dashCard} ${dashCardHover}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal/20 text-sm font-bold text-teal-light">
                      {n}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-teal-light transition-colors">KF{n} Meeting</h3>
                      {lessonDate && <p className="text-xs text-white/55">{lessonDate}</p>}
                      <p className="text-xs text-white/45">View lesson &rarr;</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
