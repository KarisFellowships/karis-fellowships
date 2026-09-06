import Image from "next/image";
import Link from "next/link";
import { docUrl } from "@/lib/storage-url";

const documents = [
  { label: "Week 1 Reflection Guide", href: "/docs/toolbox/archived/mindfulness-month/MM-Week-1-Reflection-Guide.pdf" },
  { label: "Weeks 2–4 Experiment Guide", href: "/docs/toolbox/archived/mindfulness-month/MM-Weeks-2-4-Experiment-Guide.pdf" },
  { label: "RAIN Process", href: "/docs/toolbox/archived/mindfulness-month/RAIN-Process-v2a.pdf" },
];

export default function MindfulnessPage() {
  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/misty-valley-dawn.jpg" alt="Misty valley at dawn" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
      </div>
      <div className="relative z-10">
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">Mindfulness Month</h1>
            <p className="mt-2 text-sm font-medium text-white/85 drop-shadow sm:text-base">Mindfulness resources and training materials</p>
          </div>
        </section>
        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-2">
              {documents.map(({ label, href }) => (
                <a
                  key={href}
                  href={docUrl(href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.09]"
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
    </div>
  );
}
