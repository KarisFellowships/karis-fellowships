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
    <>
      <PageHeader
        title={`KF${lessonNumber} Meeting`}
        subtitle="Meeting Version of Teachings"
        accent="teal"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* PDF download buttons */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-teal-hover hover:-translate-y-0.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Meeting PDF
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-teal px-5 py-2.5 text-sm font-bold text-teal transition-all hover:bg-teal-muted hover:-translate-y-0.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Expanded PDF
            </button>
          </div>

          {/* Opening prayer */}
          <div className="rounded-2xl bg-gradient-to-r from-teal-muted/50 to-sky-light/30 p-6 text-center italic text-slate">
            <p>Karis is an invitation to a relationship based on mutual generosity.</p>
            <p className="mt-3 text-sm">
              &ldquo;Search me, O God, and know my heart. Examine me and know my
              thoughts. See if there is any way in me that causes pain, and lead
              me in the ways of eternity.&rdquo;
            </p>
            <p className="mt-1 text-xs text-slate/50">Psalm 139:23-24</p>
          </div>

          {/* Lesson sections */}
          <div className="mt-10 space-y-6">
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
              <div key={time} className={`border-l-4 ${color} rounded-r-xl bg-white p-5 shadow-sm`}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-light px-2.5 py-0.5 text-xs font-bold text-slate">{time}</span>
                  <h3 className="font-bold text-foreground">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate italic">
                  Lesson content will appear here once KF{lessonNumber} document is imported.
                </p>
              </div>
            ))}
          </div>

          {/* Recording */}
          <div className="mt-10 rounded-xl bg-sky-light/50 p-5">
            <h3 className="font-bold text-foreground">Recording</h3>
            <p className="mt-2 text-sm text-slate">
              Audio recording link will be available here.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            {prevLesson !== null ? (
              <Link href={`/kf/meetings/kf${prevLesson}`} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-slate transition-colors hover:border-teal hover:text-teal">
                &larr; KF{prevLesson}
              </Link>
            ) : <div />}
            <Link href="/kf/meetings" className="text-sm font-medium text-teal hover:text-teal-hover transition-colors">
              All Meetings
            </Link>
            {nextLesson !== null ? (
              <Link href={`/kf/meetings/kf${nextLesson}`} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-slate transition-colors hover:border-teal hover:text-teal">
                KF{nextLesson} &rarr;
              </Link>
            ) : <div />}
          </div>

          <div className="mt-10 text-center text-xs text-slate/40">
            karisfellowships.com &middot; &copy;2021 Nancy Diven
          </div>
        </div>
      </section>
    </>
  );
}
