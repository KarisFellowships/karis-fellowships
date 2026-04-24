import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function KFStartHerePage() {
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="KF — Start Here" subtitle="Welcome to Karis Fellowships. Here's how the weekly meetings work." accent="teal" image="/ocean-horizon.jpg" imageAlt="Vast ocean horizon" />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-xl bg-[#1e293b] p-6">
            <p className="leading-relaxed text-white/55">
              After completing the NHG book study, you are now part of Karis
              Fellowships — a one-year training program of Bible teaching,
              practical tools, support, and healing. Our KF members attend
              small, weekly meetings via conference call for grounding and
              re-centering, encouragement, confession, sharing, Bible
              teaching, training, healing, and prayer.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Meeting Structure</h2>
            <p className="mt-3 text-white/50">
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
            <Link href="/kf/call-info" className="rounded-full border-2 border-teal px-6 py-3 text-sm font-bold text-teal-light transition-colors hover:bg-teal/20">
              Call Info
            </Link>
          </div>
          <p className="text-sm text-white/30 italic">
            Content for this page will be expanded from your KF materials.
          </p>
        </div>
      </section>
    </div>
  );
}
