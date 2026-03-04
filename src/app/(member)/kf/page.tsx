import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";
import Image from "next/image";
import Link from "next/link";

const currentLesson = {
  number: 51,
  dateRange: "March 1 – March 7, 2026",
};

export default function KFPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader
        title="KF Weekly Meetings"
        subtitle="Small, weekly meetings for grounding and re-centering, encouragement, confession, sharing, Bible teaching, training, healing, and prayer."
        accent="teal"
      />

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/kf/meetings/kf${currentLesson.number}`}
            className="group block overflow-hidden rounded-2xl border-2 border-teal/20 transition-all hover:border-teal/40 hover:-translate-y-0.5"
          >
            <div className="relative h-40 overflow-hidden">
              <Image src="/ship-sailing.jpg" alt="Sailing toward the horizon" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/50 to-transparent" />
              <span className="absolute left-5 top-5 inline-block rounded-full bg-teal px-3 py-1 text-xs font-bold text-white shadow-sm">
                This Week
              </span>
            </div>
            <div className="bg-white/5 p-8 pt-4">
              <h2 className="text-2xl font-bold text-white">
                KF{currentLesson.number}
              </h2>
              <p className="mt-1 text-white/50">{currentLesson.dateRange}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-teal-light group-hover:text-teal transition-colors">
                Open this week&apos;s lesson &rarr;
              </span>
            </div>
          </Link>

          <div className="mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search all lessons by topic, scripture, or keyword..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 pl-12 text-sm text-white outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 placeholder:text-white/30"
              />
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ContentCard title="Start Here" description="New to KF? Begin here for an orientation to the weekly meeting format." href="/kf/start-here" accent="teal" badge="Begin" />
            <ContentCard title="Call & Playback Info" description="Conference call numbers, playback information, and meeting times." href="/kf/call-info" accent="amber" />
            <ContentCard title="All Weekly Meetings" description="Browse all 52 weekly lessons, teachings, and meeting guides." href="/kf/meetings" accent="coral" />
            <ContentCard title="Listen to Recordings" description="Recordings from past KF meetings via StartMeeting." href="/kf/recordings" accent="sky" />
            <ContentCard title="KF Facilitator Information" description="Resources and guidelines for KF meeting facilitators." href="/kf/facilitator" accent="violet" />
          </div>
        </div>
      </section>
    </div>
  );
}
