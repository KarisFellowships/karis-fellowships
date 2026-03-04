import Link from "next/link";
import Image from "next/image";

const currentLesson = {
  number: 51,
  dateRange: "March 1 – March 7, 2026",
  title: "KF51 Meeting",
};

const callInfo = {
  phone: "1-605-313-5111",
  accessCode: "834205#",
  playbackCode: "834205#",
  playbackPhone: "1-605-313-5111",
  meetingDay: "Sundays",
  meetingTime: "Check your group for times",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-dark pt-20">
      {/* Hero banner */}
      <section className="relative overflow-hidden px-6 py-14">
        <div className="absolute inset-0">
          <Image src="/sunrise-ocean.jpg" alt="Sunrise over the ocean" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/90 via-teal-deep/80 to-teal-deep/60" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium text-teal-light/80">Welcome back</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Your Dashboard</h1>
          <p className="mt-2 text-white/50">Everything you need, all in one place.</p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Two-column: Lesson + Call Info */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Current lesson (wider) */}
            <div className="lg:col-span-2">
              <Link
                href={`/kf/meetings/kf${currentLesson.number}`}
                className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 transition-all hover:bg-white/10 hover:-translate-y-0.5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                      This Week
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                      KF{currentLesson.number}
                    </h2>
                    <p className="mt-1 text-white/50">{currentLesson.dateRange}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-light transition-colors group-hover:text-teal">
                    Open Lesson &rarr;
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Call Info */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Meeting Call Info</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wide">Phone</p>
                  <p className="mt-0.5 text-lg font-bold text-teal-light">{callInfo.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wide">Access Code</p>
                  <p className="mt-0.5 text-lg font-bold text-white">{callInfo.accessCode}</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs text-white/35 uppercase tracking-wide">When</p>
                  <p className="mt-0.5 text-sm font-semibold text-white/70">{callInfo.meetingDay}</p>
                  <p className="text-xs text-white/40">{callInfo.meetingTime}</p>
                </div>
              </div>
              <Link href="/kf/call-info" className="mt-4 inline-flex items-center text-xs font-semibold text-teal-light hover:text-teal transition-colors">
                Full call details &rarr;
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons, toolbox, and resources..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 pl-12 text-sm text-white outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 placeholder:text-white/30"
              />
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Quick links — text floating over images */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/kf/meetings", label: "KF Weekly Meetings", desc: "52 weekly lessons", img: "/ship-sailing.jpg" },
              { href: "/toolbox", label: "KF Toolbox", desc: "Worksheets, meditations & more", img: "/butterfly-transform.jpg" },
              { href: "/nhg", label: "NHG Book Study", desc: "Schedules, guides & recordings", img: "/forest-light.jpg" },
              { href: "/other-studies", label: "Other Studies", desc: "Romans, HPKP, Mindfulness", img: "/mountain-dawn.jpg" },
            ].map(({ href, label, desc, img }) => (
              <Link
                key={href}
                href={href}
                className="group relative block overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={img} alt={label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/90 via-slate-dark/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-bold text-white group-hover:text-teal-light transition-colors">{label}</h3>
                  <p className="mt-0.5 text-xs text-white/50">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent lessons */}
          <div className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Recent Lessons</h2>
              <Link href="/kf/meetings" className="text-sm font-semibold text-teal-light hover:text-teal transition-colors">
                View all 52 &rarr;
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[50, 49, 48, 47, 46, 45].map((n) => (
                <Link
                  key={n}
                  href={`/kf/meetings/kf${n}`}
                  className="group flex items-center gap-4 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal/20 text-sm font-bold text-teal-light">
                    {n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-teal-light transition-colors">KF{n} Meeting</h3>
                    <p className="text-xs text-white/35">View lesson &rarr;</p>
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
