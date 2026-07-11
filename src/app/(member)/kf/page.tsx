import ContentCard from "@/components/ContentCard";
import Image from "next/image";
import Link from "next/link";
import { getCurrentLesson } from "@/lib/date-engine";
import { requireKF } from "@/lib/require-tier";

export default async function KFPage() {
  await requireKF();
  const currentLesson = await getCurrentLesson();
  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/ship-voyage.jpg" alt="Sailboat heading out to open sea" fill className="object-cover brightness-110 saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">KF Weekly Meetings</h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">Small, weekly meetings for grounding and re-centering, encouragement, confession, sharing, Bible teaching, training, healing, and prayer.</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-6xl space-y-3">
          {/* Top row: This Week (left) + Start Here (right) */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/kf/meetings/kf${currentLesson.lessonNumber}`}
              className="group flex items-center gap-5 rounded-xl bg-[#1e293b] p-6 transition-all hover:bg-[#243044]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-teal/20 text-lg font-bold text-teal-light">
                {currentLesson.lessonNumber}
              </span>
              <div>
                <span className="inline-block rounded-full bg-teal/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  This Week
                </span>
                <h2 className="mt-1.5 text-xl font-bold text-white group-hover:text-teal-light transition-colors">
                  KF{currentLesson.lessonNumber}
                </h2>
                <p className="text-xs text-white/50">{currentLesson.dateRange}</p>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-teal-light transition-colors group-hover:text-white">
                  Open lesson &rarr;
                </span>
              </div>
            </Link>

            <ContentCard title="Start Here" description="New to KF? Begin here for an orientation to the weekly meeting format." href="/kf/start-here" accent="teal" badge="Begin" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ContentCard title="All Weekly Meetings" description="Browse all 52 weekly lessons, teachings, and meeting guides." href="/kf/meetings" accent="coral" />
            <ContentCard title="Call & Playback Info" description="Conference call numbers, playback information, and meeting times." href="/kf/call-info" accent="amber" />
            <ContentCard title="Listen to Recordings" description="Recordings from past KF meetings via StartMeeting." href="/kf/recordings" accent="sky" />
            <ContentCard title="KF Facilitator Information" description="Resources and guidelines for KF meeting facilitators." href="/kf/facilitator" accent="violet" />
          </div>
        </div>
      </section>
    </div>
  );
}
