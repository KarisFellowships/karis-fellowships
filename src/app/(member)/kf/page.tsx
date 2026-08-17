import ContentCard from "@/components/ContentCard";
import Image from "next/image";
import Link from "next/link";
import { getCurrentLesson } from "@/lib/date-engine";
import { requireKF } from "@/lib/require-tier";
import SearchBar from "@/components/SearchBar";
import { docUrl } from "@/lib/storage-url";

export default async function KFPage() {
  await requireKF();
  const currentLesson = await getCurrentLesson();
  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page background */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/forest-canopy.jpg" alt="Sunlit forest canopy" fill priority className="object-cover object-center brightness-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#4a5568] sm:from-black/45 sm:via-black/20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">KF Weekly Meetings</h1>
            <p className="mt-2 max-w-3xl text-sm font-medium text-white/85 drop-shadow sm:text-base">
              Small, weekly meetings for grounding and re-centering, encouragement, confession, sharing, Bible teaching,
              training, healing, and prayer.
            </p>
            <div className="mt-6">
              <SearchBar />
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-7xl space-y-4">
            {/* This Week — photographic hero (mirrors the old dashboard card) */}
            <Link
              href={`/kf/meetings/kf${currentLesson.lessonNumber}`}
              className="group relative block h-56 overflow-hidden rounded-2xl sm:h-64"
            >
              <Image
                src="/ship-voyage.jpg"
                alt="Sailboat heading out to open sea"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
              <div className="absolute inset-x-0 top-0 p-6 sm:p-8">
                <span className="inline-block rounded-full bg-teal/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  This Week
                </span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
                  KF{currentLesson.lessonNumber}
                </h2>
                <p className="mt-1 text-sm text-white/70">{currentLesson.dateRange}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-light transition-colors group-hover:text-white">
                  Open Lesson &rarr;
                </span>
              </div>
            </Link>

            {/* Getting around */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ContentCard
                title="Start Here"
                description="New to KF? Begin here for an orientation to the weekly meeting format."
                href="/kf/start-here"
                accent="teal"
                badge="Begin"
                icon="M13 10V3L4 14h7v7l9-11h-7z"
              />
              <ContentCard
                title="All Weekly Meetings"
                description="Browse all 52 weekly lessons, teachings, and meeting guides."
                href="/kf/meetings"
                accent="coral"
                icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
              <ContentCard
                title="Call & Playback Info"
                description="Conference call numbers, playback information, and meeting times."
                href="/kf/call-info"
                accent="amber"
                icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
              <ContentCard
                title="Listen to Recordings"
                description="Recordings from past KF meetings via StartMeeting."
                href="/kf/recordings"
                accent="sky"
                icon="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </div>

            {/* Facilitator + the every-meeting documents */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ContentCard
                title="KF Facilitator Information"
                description="Resources and guidelines for KF meeting facilitators."
                href="/kf/facilitator"
                accent="violet"
                icon="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"
              />

              {/* Meeting Prep Guide — document */}
              <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/15">
                  <svg className="h-6 w-6 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                </span>
                <h3 className="mt-4 font-serif text-lg text-white sm:text-xl">Meeting Prep Guide</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  Prepare for KF{currentLesson.lessonNumber} with the weekly guide.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a href={docUrl("/docs/kf-resources/meeting-prep-guide.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-amber/15 px-4 py-2 text-sm font-semibold text-amber transition-all hover:bg-amber/25">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    PDF
                  </a>
                  <a href={docUrl("/docs/kf-resources/KF-MPG-typed-2021.docx")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-amber/15 px-4 py-2 text-sm font-semibold text-amber transition-all hover:bg-amber/25">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Word
                  </a>
                </div>
              </div>

              {/* Meeting Schedule — document */}
              <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky/15">
                  <svg className="h-6 w-6 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </span>
                <h3 className="mt-4 font-serif text-lg text-white sm:text-xl">Meeting Schedule</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  This document is used at every meeting. It contains the introductions to read for each section.
                </p>
                <div className="mt-4">
                  <a href={docUrl("/docs/kf-resources/KF-Meeting-Schedule.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-sky/15 px-4 py-2 text-sm font-semibold text-sky transition-all hover:bg-sky/25">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Open Schedule
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
