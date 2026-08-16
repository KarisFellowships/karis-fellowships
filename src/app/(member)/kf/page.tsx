import ContentCard from "@/components/ContentCard";
import Image from "next/image";
import Link from "next/link";
import { getCurrentLesson } from "@/lib/date-engine";
import { requireKF } from "@/lib/require-tier";

export default async function KFPage() {
  await requireKF();
  const currentLesson = await getCurrentLesson();
  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page behind the cards */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/ship-voyage.jpg" alt="Sailboat heading out to open sea" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
      </div>

      <div className="relative z-10">
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">KF Weekly Meetings</h1>
            <p className="mt-2 max-w-3xl text-sm font-medium text-white/85 drop-shadow sm:text-base">
              Small, weekly meetings for grounding and re-centering, encouragement, confession, sharing, Bible teaching,
              training, healing, and prayer.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-7xl space-y-4">
            {/* Top row: This Week (left) + Start Here (right) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href={`/kf/meetings/kf${currentLesson.lessonNumber}`}
                className="group flex flex-col rounded-2xl border border-teal/30 bg-teal/[0.10] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:bg-teal/[0.16] sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal/20 font-serif text-2xl font-bold text-teal-light">
                    {currentLesson.lessonNumber}
                  </span>
                  <span className="inline-block rounded-full bg-teal/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    This Week
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-2xl text-white">KF{currentLesson.lessonNumber}</h2>
                <p className="mt-1 text-xs text-white/55">{currentLesson.dateRange}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-light transition-all duration-300 group-hover:translate-x-1">
                  Open lesson &rarr;
                </span>
              </Link>

              <ContentCard
                title="Start Here"
                description="New to KF? Begin here for an orientation to the weekly meeting format."
                href="/kf/start-here"
                accent="teal"
                badge="Begin"
                icon="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <ContentCard
                title="KF Facilitator Information"
                description="Resources and guidelines for KF meeting facilitators."
                href="/kf/facilitator"
                accent="violet"
                icon="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
