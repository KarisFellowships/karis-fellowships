import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";

export default function NHGPage() {
  return (
    <>
      <PageHeader
        title="NHG Book Study"
        subtitle="Neurosis and Human Growth — your foundational study for the Karis journey."
        accent="terracotta"
      />

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-terracotta-light/40 p-6 text-foreground/80">
            <p>
              It starts with a conference call-based book study to help you
              discover where you are now — exactly how you are enslaved to
              pride, fear, and illusion. Reading Karen Horney&apos;s Neurosis and
              Human Growth, a masterpiece of psychology that dovetails
              beautifully with Scripture.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ContentCard
              title="Start Here"
              description="New to the NHG book study? Begin here for an overview and orientation."
              href="/nhg/start-here"
              accent="terracotta"
              badge="Begin"
            />
            <ContentCard
              title="Schedules & Reading Guides"
              description="Study schedules, chapter reading guides, and study plan options."
              href="/nhg/schedules"
              accent="gold"
            />
            <ContentCard
              title="Attend NHG Meetings"
              description="Conference call information and meeting details for live sessions."
              href="/nhg/meetings"
              accent="sage"
            />
            <ContentCard
              title="Listen to Recordings"
              description="Recordings from past NHG sessions for review and catch-up."
              href="/nhg/recordings"
              accent="sky"
            />
            <ContentCard
              title="NHG Facilitator Information"
              description="Resources and guidelines for NHG discussion facilitators."
              href="/nhg/facilitator"
              accent="plum"
            />
          </div>
        </div>
      </section>
    </>
  );
}
