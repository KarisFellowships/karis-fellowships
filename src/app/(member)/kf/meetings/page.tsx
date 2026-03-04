import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

function getLessonDateRange(lessonNumber: number): string {
  const startDate = new Date("2025-09-07");
  const offset = lessonNumber * 7;
  const start = new Date(startDate);
  start.setDate(start.getDate() + offset);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function KFMeetingsPage() {
  return (
    <div className="min-h-screen bg-slate-dark">
      <PageHeader title="All Weekly Meetings" subtitle="Browse all 52 KF weekly lessons, teachings, and meeting guides." accent="coral" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-36">
              <Image src="/ship-sailing.jpg" alt="Ship sailing on the sea" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/70 to-teal-deep/30" />
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <p className="text-lg font-bold text-white">52 weeks of training and transformation.</p>
            </div>
          </div>

          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search lessons by topic, scripture, or keyword..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 pl-12 text-sm text-white outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 placeholder:text-white/30"
            />
            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 53 }, (_, i) => i).map((n) => (
              <Link
                key={n}
                href={`/kf/meetings/kf${n}`}
                className="group flex items-center gap-4 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10 hover:-translate-y-0.5"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  n === 51
                    ? "bg-teal text-white"
                    : "bg-teal/20 text-teal-light"
                }`}>
                  {n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-teal-light transition-colors">
                    KF{n} Meeting
                  </h3>
                  <p className="text-xs text-white/35">{getLessonDateRange(n)}</p>
                  {n === 51 && (
                    <span className="text-xs font-medium text-teal-light">This Week</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
