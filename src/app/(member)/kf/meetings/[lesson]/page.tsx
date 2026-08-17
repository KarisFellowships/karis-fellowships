import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import lessonsData from "@/data/lessons.json";
import { getAllLessons } from "@/lib/date-engine";
import CallInfoRow from "@/components/CallInfoRow";
import { getMeetingCodes, phoneNumber, kfMeetings } from "@/lib/meeting-codes";
import { requireKF } from "@/lib/require-tier";
import LessonContent from "@/components/LessonContent";
import { docUrl } from "@/lib/storage-url";
import { cardClass, iconClass, labelClass, hintClass } from "@/lib/lesson-card-styles";

interface Props {
  params: Promise<{ lesson: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { lesson } = await params;
  await requireKF();
  const lessonNumber = lesson.replace("kf", "");
  const num = parseInt(lessonNumber);
  const prevLesson = num > 0 ? num - 1 : null;
  const nextLesson = num < 52 ? num + 1 : null;

  const lessonData = (lessonsData as Record<string, { meetingFile?: string; expandedFile?: string; meetingDocx?: string; expandedDocx?: string }>)[lessonNumber];

  const allLessons = await getAllLessons();
  const thisLesson = allLessons.find((l) => l.lessonNumber === num);
  const dateRange = thisLesson?.dateRange ?? "";
  const codes = await getMeetingCodes();

  const htmlPath = path.join(process.cwd(), "src", "data", "lessons-html", `kf${lessonNumber}.html`);
  let lessonHtml = "";
  try {
    lessonHtml = fs.readFileSync(htmlPath, "utf-8");
    lessonHtml = lessonHtml.replace(
      /<p><strong>(\d+:\d{2}\s)/g,
      '<p class="lesson-section-heading"><strong>$1'
    );
  } catch {
    lessonHtml = "<p>Lesson content is being prepared.</p>";
  }

  const hasMeetingPdf = lessonData?.meetingFile;
  const hasExpandedPdf = lessonData?.expandedFile;

  return (
    <div className="min-h-screen bg-[#4a5568]">
      {/* Cinematic banner — the image runs behind the title AND the resource cards,
          then fades into the page just before the teaching content. */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image src="/misty-valley-dawn.jpg" alt="Misty valley at dawn" fill priority className="object-cover object-[50%_35%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pt-40 sm:pt-48">
          <div className="mx-auto max-w-[66rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75 drop-shadow sm:text-[13px]">
              {dateRange}
            </p>
            <h1 className="mt-3.5 font-serif text-4xl font-medium leading-[1.03] text-white drop-shadow-xl sm:text-5xl lg:text-6xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
              {num === 0 ? "KF Introductory Meeting" : `KF${lessonNumber} Meeting`}
            </h1>
          </div>
          {/* Resource cards, sitting over the fading banner */}
          <div className="mx-auto mt-10 max-w-[66rem] pb-3 sm:mt-12">
            {/* Resource cards + Call Info (Call Info is the last card; its panel expands below the row) */}
            <CallInfoRow phone={phoneNumber(codes)} meetings={kfMeetings(codes)}>
            {/* Meeting Version — PDF only */}
            {hasMeetingPdf && (
              <a href={docUrl(`/docs/lessons/kf${lessonNumber}-meeting.pdf`)} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <svg className={`${iconClass} text-teal-light/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className={labelClass}>Meeting <br className="hidden sm:block" />Version</span>
                <span className={hintClass}>PDF</span>
              </a>
            )}

            {/* Expanded Version — PDF only */}
            {hasExpandedPdf && (
              <a href={docUrl(`/docs/lessons/kf${lessonNumber}-expanded.pdf`)} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <svg className={`${iconClass} text-amber/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <span className={labelClass}>Expanded <br className="hidden sm:block" />Version</span>
                <span className={hintClass}>PDF</span>
              </a>
            )}

            {/* Prep Guide — PDF + Word */}
            <div className={cardClass}>
              <svg className={`${iconClass} text-violet-light/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              <span className={labelClass}>Prep Guide</span>
              <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] sm:mt-2 sm:gap-3">
                <a href={docUrl("/docs/kf-resources/meeting-prep-guide.pdf")} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-teal-light">PDF</a>
                <span className="text-white/20">&middot;</span>
                <a href={docUrl("/docs/kf-resources/KF-MPG-typed-2021.docx")} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-teal-light">Word</a>
              </div>
            </div>

            {/* Meeting Schedule — PDF only */}
            <a href={docUrl("/docs/kf-resources/KF-Meeting-Schedule.pdf")} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <svg className={`${iconClass} text-sky/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className={labelClass}>Meeting <br className="hidden sm:block" />Schedule</span>
              <span className={hintClass}>PDF</span>
            </a>

            {/* Facilitator Questions — PDF only (matches this lesson) */}
            <a href={docUrl(`/docs/questions/kf${lessonNumber}-questions.pdf`)} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <svg className={`${iconClass} text-coral/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className={labelClass}>Facilitator <br className="hidden sm:block" />Questions</span>
              <span className={hintClass}>PDF</span>
            </a>
            </CallInfoRow>
          </div>
        </div>
      </div>

      {/* Teaching + navigation on the plain page background */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[66rem] space-y-3">
          {/* Full lesson content from DOCX */}
          <LessonContent html={lessonHtml} />

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            {prevLesson !== null ? (
              <Link href={`/kf/meetings/kf${prevLesson}`} className="rounded-xl bg-[#1e293b] px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-[#243044] hover:text-teal-light">
                &larr; KF{prevLesson}
              </Link>
            ) : <div />}
            <Link href="/kf/meetings" className="text-sm font-medium text-teal-light transition-colors hover:text-teal">
              All Meetings
            </Link>
            {nextLesson !== null ? (
              <Link href={`/kf/meetings/kf${nextLesson}`} className="rounded-xl bg-[#1e293b] px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-[#243044] hover:text-teal-light">
                KF{nextLesson} &rarr;
              </Link>
            ) : <div />}
          </div>

          <div className="pt-6 text-center text-xs text-white/25">
            karisfellowships.com &middot; &copy; Karis Fellowships International
          </div>
        </div>
      </section>
    </div>
  );
}
