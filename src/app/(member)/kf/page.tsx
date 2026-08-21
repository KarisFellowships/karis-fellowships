import ContentCard from "@/components/ContentCard";
import Image from "next/image";
import Link from "next/link";
import { getCurrentLesson } from "@/lib/date-engine";
import { getMeetingCodes, phoneNumber, kfMeetings } from "@/lib/meeting-codes";
import { requireKF } from "@/lib/require-tier";
import SearchBar from "@/components/SearchBar";
import Expandable from "@/components/Expandable";
import { docUrl } from "@/lib/storage-url";

const PHONE_ICON =
  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";

export default async function KFPage() {
  await requireKF();
  const currentLesson = await getCurrentLesson();
  const codes = await getMeetingCodes();
  const callPhone = phoneNumber(codes);
  const meetings = kfMeetings(codes);

  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page background */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/ship-voyage.jpg" alt="Sailboat heading out to open sea" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
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
            {/* Top row: This Week (photographic) + the getting-around cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* This Week — an elevated glassy blue card, the inviting entry point */}
              <Link
                href={`/kf/meetings/kf${currentLesson.lessonNumber}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sky/30 bg-gradient-to-br from-sky/[0.24] via-sky/[0.13] to-sky/[0.06] p-6 shadow-lg shadow-black/15 ring-1 ring-inset ring-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-sky/50 hover:shadow-xl hover:shadow-sky/20"
              >
                {/* soft glow accent in the corner */}
                <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-sky/20 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                <div className="relative">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-light">This Week</p>
                  <h2 className="mt-2 font-serif text-4xl font-semibold leading-none text-white">
                    KF{currentLesson.lessonNumber}
                  </h2>
                  <p className="mt-2 text-sm text-white/65">{currentLesson.dateRange}</p>
                </div>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-light transition-all duration-300 group-hover:gap-2.5">
                  Open lesson &rarr;
                </span>
              </Link>

              <ContentCard
                title="All Weekly Meetings"
                description="Browse all 52 weekly lessons, teachings, and meeting guides."
                href="/kf/meetings"
                accent="coral"
                icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
              <ContentCard
                title="Listen to Recordings"
                description="Recordings from past KF meetings via StartMeeting."
                href="/kf/recordings"
                accent="sky"
                icon="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
              <ContentCard
                title="KF Facilitator Information"
                description="Resources and guidelines for KF meeting facilitators."
                href="/kf/facilitator"
                accent="violet"
                icon="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"
              />
            </div>

            {/* Start Here — expandable, with the notes as expandable bubbles */}
            <Expandable title="Start Here" iconPath="M13 10V3L4 14h7v7l9-11h-7z" accent="teal">
              <div className="space-y-3">
                <Expandable title="Welcome to Karis Fellowships" compact accent="teal">
                  <p className="leading-relaxed text-white/70">
                    After completing the NHG book study, you are now part of Karis Fellowships — a one-year training
                    program of Bible teaching, practical tools, support, and healing. Our KF members attend small, weekly
                    meetings via conference call for grounding and re-centering, encouragement, confession, sharing, Bible
                    teaching, training, healing, and prayer.
                  </p>
                </Expandable>
                <Expandable title="Meeting Structure" compact accent="teal">
                  <p className="leading-relaxed text-white/70">
                    Each weekly meeting follows a consistent format including an opening, mindfulness and meditation
                    training, Karis confession and toolbox teaching, sharing time, Bible teaching, a FAITH process
                    integration, and closing prayer.
                  </p>
                </Expandable>
              </div>
            </Expandable>

            {/* Call & Playback Info — expandable */}
            <Expandable title="Call & Playback Info" iconPath={PHONE_ICON} accent="amber">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/30">Phone Number</p>
                  <p className="mt-1 text-2xl font-bold text-teal-light">{callPhone}</p>
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/30">Meeting Times &amp; Access Codes</p>
                  <div className="space-y-3">
                    {meetings.map(({ day, time, code }) => (
                      <div key={day} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-semibold text-white">{day}</p>
                          <p className="text-sm text-white/50">{time}</p>
                        </div>
                        <p className="font-mono text-lg font-bold text-amber">{code}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Expandable>

            {/* The every-meeting documents */}
            <div className="grid gap-4 sm:grid-cols-2">
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
