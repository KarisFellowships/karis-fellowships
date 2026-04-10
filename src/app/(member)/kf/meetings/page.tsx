import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { getCurrentLesson } from "@/lib/date-engine";

function computeLessonDateRange(lessonNumber: number, currentLessonNumber: number, currentStartDate: string): string {
  const anchor = new Date(currentStartDate + "T12:00:00Z");
  const offset = lessonNumber - currentLessonNumber;
  const start = new Date(anchor.getTime() + offset * 7 * 24 * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${fmt(start)} – ${fmt(end)}`;
}

export default async function KFMeetingsPage() {
  const currentLesson = await getCurrentLesson();

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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 52 }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={`/kf/meetings/kf${n}`}
                className="group flex items-center gap-4 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10 hover:-translate-y-0.5"
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
                    KF{n} Meeting
                  </h3>
                  <p className="text-xs text-white/35">
                    {computeLessonDateRange(n, currentLesson.lessonNumber, currentLesson.startDate)}
                  </p>
                  {n === currentLesson.lessonNumber && (
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
