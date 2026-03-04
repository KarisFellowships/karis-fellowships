import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";
import Link from "next/link";

const currentLesson = {
  number: 51,
  dateRange: "March 1 – March 7, 2026",
};

export default function KFPage() {
  return (
    <>
      <PageHeader
        title="KF Weekly Meetings"
        subtitle="Small, weekly meetings for grounding and re-centering, encouragement, confession, sharing, Bible teaching, training, healing, and prayer."
        accent="sage"
      />

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* This week's lesson */}
          <Link
            href={`/kf/meetings/kf${currentLesson.number}`}
            className="group block rounded-2xl bg-gradient-to-r from-sage-muted via-sage-muted/60 to-gold-light border-2 border-sage/20 p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="inline-block rounded-full bg-sage px-3 py-1 text-xs font-bold text-white">
              This Week
            </span>
            <h2 className="mt-3 text-2xl font-bold text-foreground">
              KF{currentLesson.number}
            </h2>
            <p className="mt-1 text-foreground/60">{currentLesson.dateRange}</p>
            <span className="mt-4 inline-flex items-center text-sm font-bold text-sage group-hover:text-sage-hover transition-colors">
              Open this week&apos;s lesson &rarr;
            </span>
          </Link>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search all lessons by topic, scripture, or keyword..."
                className="w-full rounded-xl border border-border bg-white px-5 py-4 pl-12 text-sm shadow-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Navigation cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ContentCard
              title="Start Here"
              description="New to KF? Begin here for an orientation to the weekly meeting format."
              href="/kf/start-here"
              accent="sage"
              badge="Begin"
            />
            <ContentCard
              title="Call & Playback Info"
              description="Conference call numbers, playback information, and meeting times."
              href="/kf/call-info"
              accent="gold"
            />
            <ContentCard
              title="All Weekly Meetings"
              description="Browse all 52 weekly lessons, teachings, and meeting guides."
              href="/kf/meetings"
              accent="terracotta"
            />
            <ContentCard
              title="Listen to Recordings"
              description="Recordings from past KF meetings via StartMeeting."
              href="/kf/recordings"
              accent="sky"
            />
            <ContentCard
              title="KF Facilitator Information"
              description="Resources and guidelines for KF meeting facilitators."
              href="/kf/facilitator"
              accent="plum"
            />
          </div>
        </div>
      </section>
    </>
  );
}
