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
          <p className="mt-2 text-white/50">Empowering Christians to fulfill their true glory.</p>
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

          {/* Meeting Prep Guide + Facilitator Section */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Meeting Prep Guide */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Meeting Prep Guide</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Prepare for this week&apos;s KF{currentLesson.number} meeting with the Meeting Prep Guide.
              </p>
              <a
                href="/docs/meeting-prep-guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber/15 px-4 py-2.5 text-sm font-semibold text-amber transition-all hover:bg-amber/25"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Open Meeting Prep Guide
              </a>
            </div>

            {/* Facilitator Section */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Facilitators</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Facilitator guide and this week&apos;s KF{currentLesson.number} facilitator questions.
              </p>
              <div className="space-y-2">
                <a
                  href="/docs/facilitator-guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-violet/15 px-4 py-2.5 text-sm font-semibold text-violet-light transition-all hover:bg-violet/25"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  Facilitator Guide
                </a>
                <a
                  href={`/docs/questions/kf${currentLesson.number}-questions.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-violet/15 px-4 py-2.5 text-sm font-semibold text-violet-light transition-all hover:bg-violet/25"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  KF{currentLesson.number} Facilitator Questions
                </a>
              </div>
              <Link href="/kf/facilitator" className="mt-3 inline-flex items-center text-xs font-semibold text-violet-light hover:text-violet transition-colors">
                All facilitator resources &rarr;
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
