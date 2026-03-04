import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default function KFMeetingsPage() {
  return (
    <>
      <PageHeader title="All Weekly Meetings" subtitle="Browse all 52 KF weekly lessons, teachings, and meeting guides." accent="coral" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Visual header */}
          <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-36">
              <Image src="/ship-sailing.jpg" alt="Ship sailing on the sea" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/70 to-teal-deep/30" />
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <p className="text-lg font-bold text-white">52 weeks of training and transformation.</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search lessons by topic, scripture, or keyword..."
              className="w-full rounded-xl border border-border bg-white px-5 py-4 pl-12 text-sm shadow-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 53 }, (_, i) => i).map((n) => (
              <Link
                key={n}
                href={`/kf/meetings/kf${n}`}
                className="group flex items-center gap-4 rounded-xl border border-border/40 bg-white p-4 transition-all hover:border-teal/30 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold shadow-sm ${
                  n === 51
                    ? "bg-teal text-white"
                    : "bg-teal-muted text-teal"
                }`}>
                  {n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors">
                    KF{n} Meeting
                  </h3>
                  {n === 51 && (
                    <span className="text-xs font-medium text-teal">This Week</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
