import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default function KFStartHerePage() {
  return (
    <>
      <PageHeader title="KF — Start Here" subtitle="Welcome to Karis Fellowships. Here's how the weekly meetings work." accent="teal" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Image banner */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-48">
              <Image src="/ocean-horizon.jpg" alt="Vast ocean horizon" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/70 to-transparent" />
            </div>
            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-xl font-bold text-white">Your new journey begins here.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-teal-muted/50 p-6">
            <p className="leading-relaxed text-slate">
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
            <p className="mt-3 text-slate">
              Each weekly meeting follows a consistent format including an opening,
              mindfulness and meditation training, Karis confession and toolbox
              teaching, sharing time, Bible teaching, a FAITH process integration,
              and closing prayer.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/kf/meetings" className="rounded-full bg-teal px-6 py-3 text-sm font-bold text-white transition-all hover:bg-teal-hover hover:-translate-y-0.5">
              View All Meetings
            </Link>
            <Link href="/kf/call-info" className="rounded-full border-2 border-teal px-6 py-3 text-sm font-bold text-teal transition-colors hover:bg-teal-muted">
              Call Info
            </Link>
          </div>
          <p className="text-sm text-slate italic">
            Content for this page will be expanded from your KF materials.
          </p>
        </div>
      </section>
    </>
  );
}
