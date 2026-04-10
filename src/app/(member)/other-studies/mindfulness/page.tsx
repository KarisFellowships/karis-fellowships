import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const documents = [
  { label: "Week 1 Reflection Guide", href: "/docs/toolbox/archived/mindfulness-month/MM-Week-1-Reflection-Guide.pdf" },
  { label: "Weeks 2–4 Experiment Guide", href: "/docs/toolbox/archived/mindfulness-month/MM-Weeks-2-4-Experiment-Guide.pdf" },
  { label: "RAIN Process", href: "/docs/toolbox/archived/mindfulness-month/RAIN-Process-v2a.pdf" },
];

export default function MindfulnessPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="Mindfulness Month" subtitle="Mindfulness resources and training materials" accent="sky" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-2">
            {documents.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10 hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky/15">
                  <svg className="h-4 w-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</span>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/other-studies" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
              &larr; Back to Other Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
