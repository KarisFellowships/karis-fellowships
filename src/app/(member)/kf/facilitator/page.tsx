import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const currentLesson = 51;

export default function KFFacilitatorPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="Facilitator Resources" subtitle="Everything you need to lead your weekly KF meeting." accent="violet" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Facilitator Guide */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet/20">
                <svg className="h-6 w-6 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Meeting Facilitator Guide</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  The complete facilitator guide with protocols, tips, and structure for leading KF meetings.
                </p>
                <a
                  href="/docs/facilitator-guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet/15 px-5 py-2.5 text-sm font-semibold text-violet-light transition-all hover:bg-violet/25"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Open Facilitator Guide
                </a>
              </div>
            </div>
          </div>

          {/* This Week highlight */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-violet/10 to-teal/10 ring-1 ring-violet/20 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block rounded-full bg-violet px-3 py-1 text-xs font-bold text-white">This Week</span>
            </div>
            <h3 className="text-lg font-bold text-white">KF{currentLesson} Facilitator Questions</h3>
            <p className="mt-1 text-sm text-white/50">Questions for this week&apos;s meeting discussion.</p>
            <a
              href={`/docs/questions/kf${currentLesson}-questions.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-violet/80"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Open KF{currentLesson} Questions
            </a>
          </div>

          {/* All Weekly Questions */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white">All Facilitator Questions</h2>
            <p className="mt-2 text-sm text-white/40">Questions for each of the 53 weekly meetings (KF0 – KF52).</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 53 }, (_, i) => i).map((n) => (
                <a
                  key={n}
                  href={`/docs/questions/kf${n}-questions.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 rounded-xl p-3 transition-all hover:-translate-y-0.5 ${
                    n === currentLesson
                      ? "bg-violet/20 ring-1 ring-violet/40"
                      : "bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    n === currentLesson ? "bg-violet text-white" : "bg-violet/15 text-violet-light"
                  }`}>
                    {n}
                  </span>
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors ${
                      n === currentLesson ? "text-violet-light" : "text-white group-hover:text-violet-light"
                    }`}>
                      KF{n} Questions
                    </h3>
                    {n === currentLesson && (
                      <span className="text-xs font-medium text-violet-light">This Week</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/dashboard" className="text-sm font-semibold text-teal-light hover:text-teal transition-colors">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
