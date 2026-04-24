import Image from "next/image";
import Link from "next/link";
import { getAllLessons, getCurrentLesson } from "@/lib/date-engine";
import { getNHGStatus } from "@/lib/nhg-date-engine";

function getMonthName(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function formatShortRange(startDate: string, endDate: string): string {
  const s = new Date(startDate + "T12:00:00Z");
  const e = new Date(endDate + "T12:00:00Z");
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${fmt(s)} – ${fmt(e)}`;
}

export default async function CalendarPage() {
  const [allLessons, currentLesson, nhgStatus] = await Promise.all([
    getAllLessons(),
    getCurrentLesson(),
    getNHGStatus(),
  ]);

  // Group KF lessons by month
  const kfByMonth = new Map<string, typeof allLessons>();
  for (const lesson of allLessons) {
    const month = getMonthName(lesson.startDate);
    if (!kfByMonth.has(month)) kfByMonth.set(month, []);
    kfByMonth.get(month)!.push(lesson);
  }

  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/sunrise-ocean.jpg" alt="New day dawning" fill className="object-cover brightness-110 saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">Calendar</h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">All KF and NHG dates sourced from the KF Date Projection schedule.</p>
          </div>
        </div>
      </section>
      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-6xl">
          {/* KF Weekly Meetings Schedule */}
          <h2 className="text-lg font-bold text-white mb-4">KF Weekly Meetings</h2>
          <div className="space-y-6 mb-12">
            {Array.from(kfByMonth.entries()).map(([month, lessons]) => (
              <div key={month}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-teal-light/60 mb-2">{month}</h3>
                <div className="space-y-1">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.lessonNumber}
                      href={`/kf/meetings/kf${lesson.lessonNumber}`}
                      className={`flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-white/10 ${
                        lesson.lessonNumber === currentLesson.lessonNumber
                          ? "bg-teal/15 ring-1 ring-teal/30"
                          : "bg-[#1e293b]"
                      }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                        lesson.lessonNumber === currentLesson.lessonNumber
                          ? "bg-teal text-white"
                          : "bg-teal/20 text-teal-light"
                      }`}>
                        {lesson.lessonNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {lesson.lessonNumber === 0 ? "KF Introductory Meeting" : `KF${lesson.lessonNumber} Meeting`}
                        </p>
                        <p className="text-xs text-white/40">{formatShortRange(lesson.startDate, lesson.endDate)}</p>
                      </div>
                      {lesson.lessonNumber === currentLesson.lessonNumber && (
                        <span className="shrink-0 rounded-full bg-teal/20 px-2 py-0.5 text-[10px] font-bold text-teal-light">This Week</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* NHG Schedule */}
          {nhgStatus.schedule.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-white mb-4">NHG Book Study</h2>
              <div className="space-y-1 mb-12">
                {nhgStatus.schedule.map((week) => (
                  <div
                    key={week.weekNumber}
                    className={`flex items-center gap-3 rounded-lg p-3 ${
                      nhgStatus.currentWeek?.weekNumber === week.weekNumber
                        ? "bg-coral/15 ring-1 ring-coral/30"
                        : "bg-[#1e293b]"
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      nhgStatus.currentWeek?.weekNumber === week.weekNumber
                        ? "bg-coral text-white"
                        : "bg-coral/20 text-coral"
                    }`}>
                      {week.weekNumber}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{week.label}</p>
                      <p className="text-xs text-white/40">{formatShortRange(week.startDate, week.endDate)}</p>
                    </div>
                    {nhgStatus.currentWeek?.weekNumber === week.weekNumber && (
                      <span className="shrink-0 rounded-full bg-coral/20 px-2 py-0.5 text-[10px] font-bold text-coral">This Week</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
