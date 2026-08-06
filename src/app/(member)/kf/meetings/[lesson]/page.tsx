import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import lessonsData from "@/data/lessons.json";
import { getAllLessons } from "@/lib/date-engine";
import CallInfoToggle from "@/components/CallInfoToggle";
import { getMeetingCodes, phoneNumber, kfMeetings } from "@/lib/meeting-codes";
import { requireKF } from "@/lib/require-tier";
import LessonContent from "@/components/LessonContent";
import { docUrl } from "@/lib/storage-url";

interface Props {
  params: Promise<{ lesson: string }>;
}

const downloadIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

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
  const hasExpandedDocx = lessonData?.expandedDocx;

  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      {/* Vibrant water header */}
      <section className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/ocean-horizon.jpg" alt="Ocean horizon" fill className="object-cover brightness-125 saturate-[1.2] contrast-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-[60rem]">
            <p className="text-sm font-semibold text-white/90 drop-shadow-md">{dateRange}</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-white drop-shadow-md sm:text-4xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              {num === 0 ? "KF Introductory Meeting" : `KF${lessonNumber} Meeting`}
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-[60rem] space-y-3">
          {/* 4 resource boxes */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Meeting Version */}
            <div className="rounded-xl bg-[#1e293b] p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Meeting Version</h3>
              <div className="mt-3 flex gap-2">
                {hasMeetingPdf && (
                  <a href={docUrl(`/docs/lessons/kf${lessonNumber}-meeting.pdf`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-teal/15 px-3 py-2 text-xs font-semibold text-teal-light transition-all hover:bg-teal/25">
                    {downloadIcon} PDF
                  </a>
                )}
              </div>
            </div>

            {/* Expanded Version */}
            <div className="rounded-xl bg-[#1e293b] p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Expanded Version</h3>
              <div className="mt-3 flex gap-2">
                {hasExpandedPdf && (
                  <a href={docUrl(`/docs/lessons/kf${lessonNumber}-expanded.pdf`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-amber/15 px-3 py-2 text-xs font-semibold text-amber transition-all hover:bg-amber/25">
                    {downloadIcon} PDF
                  </a>
                )}
                {hasExpandedDocx && (
                  <a href={docUrl(`/docs/lessons/kf${lessonNumber}-expanded.docx`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-amber/15 px-3 py-2 text-xs font-semibold text-amber transition-all hover:bg-amber/25">
                    {downloadIcon} DOC
                  </a>
                )}
              </div>
            </div>

            {/* Meeting Prep Guide */}
            <div className="rounded-xl bg-[#1e293b] p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Prep Guide</h3>
              <div className="mt-3 flex gap-2">
                <a href={docUrl("/docs/kf-resources/meeting-prep-guide.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-violet/15 px-3 py-2 text-xs font-semibold text-violet-light transition-all hover:bg-violet/25">
                  {downloadIcon} PDF
                </a>
                <a href={docUrl("/docs/kf-resources/KF-MPG-typed-2021.docx")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-violet/15 px-3 py-2 text-xs font-semibold text-violet-light transition-all hover:bg-violet/25">
                  {downloadIcon} DOC
                </a>
              </div>
            </div>

            {/* Meeting Schedule */}
            <div className="rounded-xl bg-[#1e293b] p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Meeting Schedule</h3>
              <div className="mt-3">
                <a href={docUrl("/docs/kf-resources/KF-Meeting-Schedule.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-sky/15 px-3 py-2 text-xs font-semibold text-sky transition-all hover:bg-sky/25">
                  {downloadIcon} Open
                </a>
              </div>
            </div>
          </div>

          {/* Call Info toggle */}
          <CallInfoToggle phone={phoneNumber(codes)} meetings={kfMeetings(codes)} />

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
