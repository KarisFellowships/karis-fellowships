import PageHeader from "@/components/PageHeader";
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
        accent="sage"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Prayer */}
          <div className="rounded-2xl bg-gradient-to-r from-sage-muted/50 to-gold-light/30 p-6 text-center italic text-foreground/80">
            <p>Karis is an invitation to a relationship based on mutual generosity.</p>
            <p className="mt-3 text-sm">
              &ldquo;Search me, O God, and know my heart. Examine me and know my
              thoughts. See if there is any way in me that causes pain, and lead
              me in the ways of eternity.&rdquo;
            </p>
            <p className="mt-1 text-xs text-foreground/50">Psalm 139:23-24</p>
          </div>

          {/* Lesson sections placeholder */}
          <div className="mt-10 space-y-6">
            {[
              { time: "0:01", title: "Opening", color: "border-l-sage" },
              { time: "0:02", title: "Presenting", color: "border-l-sage" },
              { time: "0:06", title: "Karis Circulation", color: "border-l-gold" },
              { time: "0:07", title: "Guidelines & Limitations", color: "border-l-gold" },
              { time: "0:08", title: "Mindfulness & Meditation Training", color: "border-l-sky" },
              { time: "0:20", title: "Karis Confession", color: "border-l-terracotta" },
              { time: "0:21", title: "Toolbox", color: "border-l-terracotta" },
              { time: "0:30", title: "Sharing", color: "border-l-plum" },
              { time: "1:00", title: "Bible Teaching", color: "border-l-sage" },
              { time: "1:10", title: "Integration — FAITH Process", color: "border-l-gold" },
              { time: "1:28", title: "Ending Prayer", color: "border-l-sky" },
              { time: "1:29", title: "Announcements", color: "border-l-terracotta" },
            ].map(({ time, title, color }) => (
              <div key={time} className={`border-l-4 ${color} rounded-r-xl bg-white p-5 shadow-sm`}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs font-bold text-foreground/50">{time}</span>
                  <h3 className="font-bold text-foreground">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-foreground/50 italic">
                  Lesson content will appear here once KF{lessonNumber} document is imported.
                </p>
              </div>
            ))}
          </div>

          {/* Recording */}
          <div className="mt-10 rounded-xl bg-sky-light/50 p-5">
            <h3 className="font-bold text-foreground">Recording</h3>
            <p className="mt-2 text-sm text-foreground/60">
              Audio recording link will be available here.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            {prevLesson !== null ? (
              <Link href={`/kf/meetings/kf${prevLesson}`} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-sage hover:text-sage">
                &larr; KF{prevLesson}
              </Link>
            ) : <div />}
            <Link href="/kf/meetings" className="text-sm font-medium text-sage hover:text-sage-hover transition-colors">
              All Meetings
            </Link>
            {nextLesson !== null ? (
              <Link href={`/kf/meetings/kf${nextLesson}`} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-sage hover:text-sage">
                KF{nextLesson} &rarr;
              </Link>
            ) : <div />}
          </div>

          {/* Copyright */}
          <div className="mt-10 text-center text-xs text-foreground/40">
            karisfellowships.com &middot; &copy;2021 Nancy Diven
          </div>
        </div>
      </section>
    </>
  );
}
