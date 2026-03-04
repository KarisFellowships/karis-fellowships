import Link from "next/link";

const currentLesson = {
  number: 51,
  dateRange: "March 1 – March 7, 2026",
  title: "KF51 Meeting",
};

export default function DashboardPage() {
  return (
    <div className="pt-20">
      {/* Welcome banner */}
      <section className="bg-gradient-to-r from-sage via-sage-hover to-sage px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-white/70">Welcome back</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Your Dashboard</h1>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Current lesson hero card */}
          <Link
            href={`/kf/meetings/kf${currentLesson.number}`}
            className="group block overflow-hidden rounded-2xl bg-gradient-to-r from-gold-light via-gold-light/60 to-terracotta-light border-2 border-gold/30 p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">
                  This Week
                </span>
                <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                  KF{currentLesson.number}
                </h2>
                <p className="mt-1 text-foreground/70">{currentLesson.dateRange}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-hover transition-colors group-hover:text-gold">
                Open Lesson &rarr;
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons, toolbox, and resources..."
                className="w-full rounded-xl border border-border bg-white px-5 py-4 pl-12 text-sm shadow-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/kf/meetings", label: "KF Weekly Meetings", desc: "52 weekly lessons", color: "border-l-sage bg-sage-muted/30" },
              { href: "/toolbox", label: "KF Toolbox", desc: "Worksheets, meditations & more", color: "border-l-gold bg-gold-light/30" },
              { href: "/nhg", label: "NHG Book Study", desc: "Schedules, guides & recordings", color: "border-l-terracotta bg-terracotta-light/30" },
              { href: "/other-studies", label: "Other Studies", desc: "Romans, HPKP, Mindfulness", color: "border-l-plum bg-plum-light/30" },
            ].map(({ href, label, desc, color }) => (
              <Link
                key={href}
                href={href}
                className={`group block rounded-xl border border-border/40 border-l-4 ${color} p-5 transition-all hover:shadow-md hover:-translate-y-0.5`}
              >
                <h3 className="font-bold text-foreground group-hover:text-sage transition-colors">{label}</h3>
                <p className="mt-1 text-xs text-foreground/60">{desc}</p>
              </Link>
            ))}
          </div>

          {/* Recent lessons */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground">Recent Lessons</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[50, 49, 48, 47, 46, 45].map((n) => (
                <Link
                  key={n}
                  href={`/kf/meetings/kf${n}`}
                  className="group flex items-center gap-4 rounded-xl border border-border/40 bg-white p-4 transition-all hover:border-sage/30 hover:shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sage-muted text-sm font-bold text-sage">
                    {n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-sage transition-colors">KF{n} Meeting</h3>
                    <p className="text-xs text-foreground/50">View lesson &rarr;</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
