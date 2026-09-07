import Image from "next/image";
import Link from "next/link";
import { getCurrentLesson, getAllLessons } from "@/lib/date-engine";
import { requireKF } from "@/lib/require-tier";

export default async function KFMeetingsPage() {
  await requireKF();
  const currentLesson = await getCurrentLesson();
  const allLessons = await getAllLessons();
  const lessonMap = new Map(allLessons.map((l) => [l.lessonNumber, l]));

  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page background */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/ship-voyage.jpg" alt="Sailboat heading out to open sea" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
      </div>

      <div className="relative z-10">
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">KF Weekly Meetings</h1>
            <p className="mt-2 max-w-3xl text-sm font-medium text-white/85 drop-shadow sm:text-base">Browse all 52 KF weekly lessons, teachings, and meeting guides.</p>
          </div>
        </section>
        <section className="px-6 pb-12 pt-10">
          <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 53 }, (_, i) => i).map((n) => {
              const lesson = lessonMap.get(n);
              return (
                <Link
                  key={n}
                  href={`/kf/meetings/kf${n}`}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.09]"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    n === currentLesson.lessonNumber
                      ? "bg-teal text-white"
                      : "bg-teal/20 text-teal-light"
                  }`}>
                    {n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-teal-light transition-colors">
                      {n === 0 ? "KF Introductory Meeting" : `KF${n} Meeting`}
                    </h3>
                    {lesson && (
                      <p className="text-xs text-white/35">{lesson.dateRange}</p>
                    )}
                    {n === currentLesson.lessonNumber && (
                      <span className="text-xs font-medium text-teal-light">This Week</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}
