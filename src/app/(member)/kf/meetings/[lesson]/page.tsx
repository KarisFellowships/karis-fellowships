import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ lesson: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { lesson } = await params;
  const lessonNumber = lesson.replace("kf", "");
  const prevLesson = parseInt(lessonNumber) > 0 ? parseInt(lessonNumber) - 1 : null;
  const nextLesson = parseInt(lessonNumber) < 52 ? parseInt(lessonNumber) + 1 : null;

  return (
    <div className="bg-slate-dark">
      {/* Immersive image header with text overlay */}
      <section className="relative overflow-hidden pt-20">
        <div className="relative h-56 sm:h-64">
          <Image src="/ocean-horizon.jpg" alt="Horizon" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/60 to-slate-dark/30" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 h-1 w-12 rounded-full bg-teal" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">KF{lessonNumber} Meeting</h1>
            <p className="mt-2 text-white/50">Meeting Version of Teachings</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* PDF download buttons */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-teal-hover hover:-translate-y-0.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Meeting PDF
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-teal px-5 py-2.5 text-sm font-bold text-teal-light transition-all hover:bg-teal/20 hover:-translate-y-0.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Expanded PDF
            </button>
          </div>

          {/* Opening prayer */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center italic text-white/60">
            <p>Karis is an invitation to a relationship based on mutual generosity.</p>
            <p className="mt-3 text-sm">
              &ldquo;Search me, O God, and know my heart. Examine me and know my
              thoughts. See if there is any way in me that causes pain, and lead
              me in the ways of eternity.&rdquo;
            </p>
            <p className="mt-1 text-xs text-white/30">Psalm 139:23-24</p>
          </div>

          {/* Lesson sections */}
          <div className="mt-10 space-y-4">
            {[
              { time: "0:01", title: "Opening", color: "border-l-teal" },
              { time: "0:02", title: "Presenting", color: "border-l-teal" },
              { time: "0:06", title: "Karis Circulation", color: "border-l-coral" },
              { time: "0:07", title: "Guidelines & Limitations", color: "border-l-coral" },
              { time: "0:08", title: "Mindfulness & Meditation Training", color: "border-l-sky" },
              { time: "0:20", title: "Karis Confession", color: "border-l-violet" },
              { time: "0:21", title: "Toolbox", color: "border-l-violet" },
              { time: "0:30", title: "Sharing", color: "border-l-amber" },
              { time: "1:00", title: "Bible Teaching", color: "border-l-teal" },
              { time: "1:10", title: "Integration — FAITH Process", color: "border-l-coral" },
              { time: "1:28", title: "Ending Prayer", color: "border-l-sky" },
              { time: "1:29", title: "Announcements", color: "border-l-amber" },
            ].map(({ time, title, color }) => (
              <div key={time} className={`border-l-4 ${color} rounded-r-xl bg-white/5 p-5`}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-white/50">{time}</span>
                  <h3 className="font-bold text-white">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-white/35 italic">
                  Lesson content will appear here once KF{lessonNumber} document is imported.
                </p>
              </div>
            ))}
          </div>

          {/* Recording */}
          <div className="mt-10 rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
            <h3 className="font-bold text-white">Recording</h3>
            <p className="mt-2 text-sm text-white/40">
              Audio recording link will be available here.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            {prevLesson !== null ? (
              <Link href={`/kf/meetings/kf${prevLesson}`} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-teal hover:text-teal-light">
                &larr; KF{prevLesson}
              </Link>
            ) : <div />}
            <Link href="/kf/meetings" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
              All Meetings
            </Link>
            {nextLesson !== null ? (
              <Link href={`/kf/meetings/kf${nextLesson}`} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-teal hover:text-teal-light">
                KF{nextLesson} &rarr;
              </Link>
            ) : <div />}
          </div>

          <div className="mt-10 text-center text-xs text-white/20">
            karisfellowships.com &middot; &copy; Karis Fellowships International
          </div>
        </div>
      </section>
    </div>
  );
}
