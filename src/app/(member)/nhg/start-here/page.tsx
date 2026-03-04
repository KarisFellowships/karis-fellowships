import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function NHGStartHerePage() {
  return (
    <>
      <PageHeader title="NHG — Start Here" subtitle="Welcome to the Neurosis and Human Growth book study." accent="terracotta" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-2xl bg-terracotta-light/30 p-6">
            <p className="leading-relaxed text-foreground/80">
              Your first step is to participate in the Neurosis and Human Growth
              (NHG) book study. You read the first 11 chapters of Karen
              Horney&apos;s masterpiece, complete a study guide for each chapter,
              and attend live conference calls to hear additional material, check
              your answers, and ask questions.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">What to Expect</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">
              Focusing as you read on the Christian struggle to walk by the
              Spirit and no longer fulfill the desires of the flesh (Galatians
              5:16-25), you will find solid answers to questions about what traps
              you in legalism, what really drives you, and why your life so lacks
              the peace and joy the Bible describes.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/nhg/schedules" className="rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white transition-all hover:bg-terracotta/90 hover:-translate-y-0.5">
              View Schedules
            </Link>
            <Link href="/nhg/meetings" className="rounded-full border-2 border-terracotta px-6 py-3 text-sm font-bold text-terracotta transition-colors hover:bg-terracotta-light">
              Meeting Info
            </Link>
          </div>
          <p className="text-sm text-foreground/50 italic">
            Content for this page will be expanded from your NHG materials.
          </p>
        </div>
      </section>
    </>
  );
}
