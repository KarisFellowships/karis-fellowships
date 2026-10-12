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

// The ONE Toolbox tool that is the main topic of a lesson's TOOLBOX segment,
// shown as an extra resource card. Sarah's rule: one extra document per week, so
// the cards always stay on ONE row (Love or Pride? counts as that document on
// KF0–2). Same files as the Toolbox page. Each label is split across two lines
// (like the other cards) so every card keeps the same height. Tools with a typed
// Word version get a PDF · Word card; PDF-only tools get a single-link card.
// Chosen by reading each lesson's TOOLBOX segment: the tool it introduces or
// walks through. Tools only reviewed, previewed ("next week…"), or suggested in
// passing don't get a card.
interface LessonWorksheet {
  label: [string, string];
  pdf: string;
  docx?: string;
}
const TOOLBOX = "/docs/toolbox";
const TAPPING: LessonWorksheet = { label: ["Tapping", "Protocol"], pdf: `${TOOLBOX}/healing-integration/Tapping-Detailed-Version-2022z.pdf` };
const TWO_PATHS_FLOWCHART: LessonWorksheet = { label: ["Two Paths", "Flowchart"], pdf: `${TOOLBOX}/worksheets/Two-Paths-Flow-Chart-v2.pdf` };
const TWO_PATHS_WORKSHEET: LessonWorksheet = {
  label: ["Two Paths", "Worksheet"],
  pdf: `${TOOLBOX}/worksheets/Two-Paths-Wksht-PDF-2021z.pdf`,
  docx: `${TOOLBOX}/worksheets/Two-Paths-Wksht-Typed-2021z.docx`,
};
const SHOULDS_WORKSHEET: LessonWorksheet = {
  label: ["Shoulds", "Worksheet"],
  pdf: `${TOOLBOX}/worksheets/Shoulds-Wksht-2021z-PDF.pdf`,
  docx: `${TOOLBOX}/worksheets/Shoulds-Wksht-typing-2021z.docx`,
};
const CLAIM_BLAME_WORKSHEET: LessonWorksheet = { label: ["Claim/Blame", "Worksheet"], pdf: `${TOOLBOX}/worksheets/Claim.Blm_.-Wkst-for-PDF-2021z-.pdf` };
// The Toolbox has a condensed (web) and an expanded TAT; the card links the condensed one.
const TAT: LessonWorksheet = { label: ["TAT", ""], pdf: `${TOOLBOX}/healing-integration/TAT-Cndsd-Web-Version-FINI-2021z.pdf` };
const SUFFERING_WORKSHEET: LessonWorksheet = {
  label: ["Suffering", "Worksheet"],
  pdf: `${TOOLBOX}/worksheets/Suffering-wkst-master-PDF-2021z.pdf`,
  docx: `${TOOLBOX}/worksheets/Suffering-wkst-master-typed-2021z (2).docx`,
};

const LESSON_TOOL: Record<number, LessonWorksheet> = {
  3: TAPPING, // introduced: "you will find the Tapping Protocol" under Toolbox
  4: TAPPING, // first series taught
  5: TAPPING, // second series taught
  6: TWO_PATHS_FLOWCHART, // flowchart introduced ("This valuable tool…")
  7: TWO_PATHS_FLOWCHART, // "have your Two Paths Flowchart handy"
  8: TWO_PATHS_FLOWCHART,
  9: TWO_PATHS_FLOWCHART,
  10: TWO_PATHS_WORKSHEET, // worksheet introduced (flowchart reviewed)
  11: TWO_PATHS_WORKSHEET, // steps 1–6
  12: TWO_PATHS_WORKSHEET, // steps 7–10
  13: TWO_PATHS_WORKSHEET,
  14: SHOULDS_WORKSHEET, // Part One
  15: SHOULDS_WORKSHEET, // Part Two
  16: SHOULDS_WORKSHEET, // Part 3
  17: CLAIM_BLAME_WORKSHEET, // introduced: "begin this week to explore the Claim and Blame Worksheet"
  18: CLAIM_BLAME_WORKSHEET, // taught
  23: TAT, // introduced, with instructions under Toolbox
  24: TWO_PATHS_WORKSHEET, // Toolbox + Bible Teaching both use it
  25: TAT, // "In this lesson, we will learn the T-A-T"
  26: TAT, // "We will now use the T-A-T to explore the issue of money"
  27: TAT, // "We will now use the T-A-T to explore the taboo"
  29: SUFFERING_WORKSHEET, // taught
  30: SUFFERING_WORKSHEET,
  31: TAT, // "You can use the T-A-T to unload trauma" — practiced in the meeting
};

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
  // The "Love or Pride?" list is introduced at the KF Introductory Meeting and
  // KF1 and is KF2's Toolbox topic — it's the one extra document on those weeks.
  // (Later lessons mention it in passing; their extra card is that week's tool.)
  const showLoveOrPride = num <= 2;
  const tool = LESSON_TOOL[num];
  const worksheets = tool && !showLoveOrPride ? [tool] : [];
  // Resource cards rendered below (Call Info is added by CallInfoRow) — keep in
  // sync with the cards in the JSX so the row layout never leaves a gap.
  const cardCount =
    (hasMeetingPdf ? 1 : 0) + (hasExpandedPdf ? 1 : 0) + 1 /* Prep Guide */ +
    (showLoveOrPride ? 1 : 0) + worksheets.length + 1 /* Schedule */ + 1 /* Facilitator Qs */;

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
            <CallInfoRow cardCount={cardCount} phone={phoneNumber(codes)} meetings={kfMeetings(codes)}>
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
                <a href={docUrl("/docs/kf-resources/KF-MPG-typed-2021 (1).docx")} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-teal-light">Word</a>
              </div>
            </div>

            {/* Love or Pride? — PDF (shown where the lesson references it) */}
            {showLoveOrPride && (
              <a href={docUrl("/docs/nhg/kf-intro/Love-or-Pride-FINI-2021.pdf")} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <svg className={`${iconClass} text-coral/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span className={labelClass}>Love or <br className="hidden sm:block" />Pride?</span>
                <span className={hintClass}>PDF</span>
              </a>
            )}

            {/* Lesson Toolbox tools. PDF-only tools: a single-link card (like Love or
                Pride?). Tools with a Word version — phones: one-line card linking the
                PDF (the name plus "PDF · Word" is too wide for one row, and the other
                cards are one row); sm+: PDF + Word, same layout as the Prep Guide
                card. The "contents" wrappers keep each card a direct grid item. */}
            {worksheets.filter((w) => !w.docx).map((w) => (
              <a key={w.pdf} href={docUrl(w.pdf)} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <svg className={`${iconClass} text-emerald-300/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                <span className={labelClass}>{w.label[0]} <br className="hidden sm:block" />{w.label[1]}</span>
                <span className={hintClass}>PDF</span>
              </a>
            ))}
            {worksheets.filter((w) => w.docx).map((w) => (
              <div key={`${w.pdf}-phone`} className="contents sm:hidden">
                <a href={docUrl(w.pdf)} target="_blank" rel="noopener noreferrer" className={cardClass}>
                  <svg className={`${iconClass} text-emerald-300/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  <span className={labelClass}>{w.label[0]} {w.label[1]}</span>
                  <span className={hintClass}>PDF</span>
                </a>
              </div>
            ))}
            {worksheets.filter((w) => w.docx).map((w) => (
              <div key={w.pdf} className="hidden sm:contents">
              <div className={cardClass}>
                <svg className={`${iconClass} text-emerald-300/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                <span className={labelClass}>{w.label[0]} <br className="hidden sm:block" />{w.label[1]}</span>
                <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] sm:mt-1 sm:gap-3">
                  <a href={docUrl(w.pdf)} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-teal-light">PDF</a>
                  <span className="text-white/20">&middot;</span>
                  <a href={docUrl(w.docx!)} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-teal-light">Word</a>
                </div>
              </div>
              </div>
            ))}

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
              <Link href={`/kf/meetings/kf${prevLesson}`} className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.09] hover:text-teal-light">
                &larr; KF{prevLesson}
              </Link>
            ) : <div />}
            <Link href="/kf/meetings" className="text-sm font-medium text-teal-light transition-colors hover:text-teal">
              All Meetings
            </Link>
            {nextLesson !== null ? (
              <Link href={`/kf/meetings/kf${nextLesson}`} className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.09] hover:text-teal-light">
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
