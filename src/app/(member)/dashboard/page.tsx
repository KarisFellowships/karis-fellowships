import Link from "next/link";
import Image from "next/image";

const currentLesson = {
  number: 51,
  dateRange: "March 1 – March 7, 2026",
  title: "KF51 Meeting",
};

export default function DashboardPage() {
  return (
    <div className="pt-20">
      {/* Hero banner with image */}
      <section className="relative overflow-hidden px-6 py-14">
        <div className="absolute inset-0">
          <Image src="/sunrise-ocean.jpg" alt="Sunrise over the ocean" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/90 via-teal-deep/80 to-teal-deep/60" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium text-teal-light/80">Welcome back</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Your Dashboard</h1>
          <p className="mt-2 text-white/60">Everything you need, all in one place.</p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Current lesson card */}
          <Link
            href={`/kf/meetings/kf${currentLesson.number}`}
            className="group block overflow-hidden rounded-2xl bg-gradient-to-r from-teal-muted via-teal-muted/60 to-sky-light border-2 border-teal/20 p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-block rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                  This Week
                </span>
                <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                  KF{currentLesson.number}
                </h2>
                <p className="mt-1 text-slate">{currentLesson.dateRange}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-teal transition-colors group-hover:text-teal-hover">
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
                className="w-full rounded-xl border border-border bg-white px-5 py-4 pl-12 text-sm shadow-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Quick links with images */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/kf/meetings", label: "KF Weekly Meetings", desc: "52 weekly lessons", img: "/ship-sailing.jpg", color: "bg-teal" },
              { href: "/toolbox", label: "KF Toolbox", desc: "Worksheets, meditations & more", img: "/butterfly-transform.jpg", color: "bg-coral" },
              { href: "/nhg", label: "NHG Book Study", desc: "Schedules, guides & recordings", img: "/forest-light.jpg", color: "bg-sky" },
              { href: "/other-studies", label: "Other Studies", desc: "Romans, HPKP, Mindfulness", img: "/mountain-dawn.jpg", color: "bg-violet" },
            ].map(({ href, label, desc, img, color }) => (
              <Link
                key={href}
                href={href}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/40 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-28 overflow-hidden">
                  <Image src={img} alt={label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                </div>
                <div className="p-4 pt-2">
                  <div className={`mb-2 h-0.5 w-8 rounded-full ${color}`} />
                  <h3 className="font-bold text-foreground group-hover:text-teal transition-colors">{label}</h3>
                  <p className="mt-0.5 text-xs text-slate">{desc}</p>
                </div>
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
                  className="group flex items-center gap-4 rounded-xl border border-border/40 bg-white p-4 transition-all hover:border-teal/30 hover:shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-muted text-sm font-bold text-teal">
                    {n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors">KF{n} Meeting</h3>
                    <p className="text-xs text-slate">View lesson &rarr;</p>
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
