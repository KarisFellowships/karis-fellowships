import Link from "next/link";
import type { Announcement } from "@/lib/announcements";

// Renders a date-driven announcement. If the announcement's linkText appears in
// the sentence, that phrase becomes the link; otherwise the link is appended.
export default function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  const tone = announcement.tone ?? "amber";
  const box = tone === "teal" ? "border-teal/30 bg-teal/15" : "border-amber/30 bg-amber/15";
  const linkColor = tone === "teal" ? "text-teal-light" : "text-amber";
  const iconColor = tone === "teal" ? "text-teal-light" : "text-amber";
  const linkClass = `font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 ${linkColor}`;

  const { text, linkText, linkHref } = announcement;

  let content: React.ReactNode = text;
  if (linkText && linkHref && text.includes(linkText)) {
    const idx = text.indexOf(linkText);
    content = (
      <>
        {text.slice(0, idx)}
        <Link href={linkHref} className={linkClass}>{linkText}</Link>
        {text.slice(idx + linkText.length)}
      </>
    );
  } else if (linkText && linkHref) {
    content = (
      <>
        {text}{" "}
        <Link href={linkHref} className={linkClass}>{linkText} &rarr;</Link>
      </>
    );
  }

  return (
    <div className={`mb-6 flex items-start gap-3 rounded-2xl border ${box} px-5 py-3.5 backdrop-blur-sm shadow-lg shadow-black/10`} role="status">
      <svg className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
      <p className="text-sm font-medium leading-relaxed text-white/90">{content}</p>
    </div>
  );
}
