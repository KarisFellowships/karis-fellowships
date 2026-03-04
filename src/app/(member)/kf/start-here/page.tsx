import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function KFStartHerePage() {
  return (
    <>
      <PageHeader title="KF — Start Here" subtitle="Welcome to Karis Fellowships. Here's how the weekly meetings work." accent="sage" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-2xl bg-sage-muted/50 p-6">
            <p className="leading-relaxed text-foreground/80">
              After completing the NHG book study, you are now part of Karis
              Fellowships — a one-year training program of Bible teaching,
              practical tools, support, and healing. Our KF members attend
              small, weekly meetings via conference call for grounding and
              re-centering, encouragement, confession, sharing, Bible
              teaching, training, healing, and prayer.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Meeting Structure</h2>
            <p className="mt-3 text-foreground/70">
              Each weekly meeting follows a consistent format including an opening,
              mindfulness and meditation training, Karis confession and toolbox
              teaching, sharing time, Bible teaching, a FAITH process integration,
              and closing prayer.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/kf/meetings" className="rounded-full bg-sage px-6 py-3 text-sm font-bold text-white transition-all hover:bg-sage-hover hover:-translate-y-0.5">
              View All Meetings
            </Link>
            <Link href="/kf/call-info" className="rounded-full border-2 border-sage px-6 py-3 text-sm font-bold text-sage transition-colors hover:bg-sage-muted">
              Call Info
            </Link>
          </div>
          <p className="text-sm text-foreground/50 italic">
            Content for this page will be expanded from your KF materials.
          </p>
        </div>
      </section>
    </>
  );
}
