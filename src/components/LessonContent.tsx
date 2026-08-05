"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { meetingScheduleNotes } from "@/data/meeting-schedule";

interface Props {
  html: string;
}

const chevronSvg = `<svg class="lesson-section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

function extractSectionKey(headingHtml: string): string | null {
  const match = headingHtml.match(/\d+:\d{2}\s*\t?\s*(.+?)\s*<\/strong>/);
  if (!match) return null;
  const raw = match[1]
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .trim()
    .replace(/\s+/g, " ");
  return raw;
}

export default function LessonContent({ html }: Props) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [footnotesOpen, setFootnotesOpen] = useState(false);
  const footnotesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleFootnoteClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#endnote-"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#endnote-")) return;
      if (!footnotesOpen) {
        setFootnotesOpen(true);
        requestAnimationFrame(() => {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        e.preventDefault();
      }
    };
    document.addEventListener("click", handleFootnoteClick);
    return () => document.removeEventListener("click", handleFootnoteClick);
  }, [footnotesOpen]);

  // Open external hyperlinks (http/https) in a new tab so members don't lose
  // their place. Internal footnote anchors (#endnote-…) are left untouched.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }, [footnotesOpen]);

  const { bodyHtml, footnotesHtml } = useMemo(() => {
    const olIdx = html.lastIndexOf("<ol>");
    if (olIdx === -1) return { bodyHtml: html, footnotesHtml: "" };
    return {
      bodyHtml: html.substring(0, olIdx),
      footnotesHtml: html.substring(olIdx),
    };
  }, [html]);

  const segments = useMemo(() => {
    const parts: { type: "content" | "heading"; html: string; sectionKey?: string }[] = [];
    const regex = /<p class="lesson-section-heading">([\s\S]*?)<\/p>/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(bodyHtml)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "content", html: bodyHtml.substring(lastIndex, match.index) });
      }
      const sectionKey = extractSectionKey(match[0]);
      parts.push({ type: "heading", html: match[0], sectionKey: sectionKey ?? undefined });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < bodyHtml.length) {
      parts.push({ type: "content", html: bodyHtml.substring(lastIndex) });
    }
    return parts;
  }, [bodyHtml]);

  return (
    <div ref={contentRef} className="rounded-xl bg-[#f5f3ef] p-8 sm:p-12">
      <div className="lesson-content lesson-content--light">
        {segments.map((seg, i) => {
          if (seg.type === "content") {
            return <div key={i} dangerouslySetInnerHTML={{ __html: seg.html }} />;
          }

          const key = seg.sectionKey ?? `heading-${i}`;
          const notes = seg.sectionKey ? meetingScheduleNotes[seg.sectionKey] : undefined;
          const hasNotes = notes && notes.length > 0;
          const isOpen = openSections.has(key);

          return (
            <div key={i}>
              <div
                className="lesson-section-heading"
                onClick={hasNotes ? () => toggleSection(key) : undefined}
                style={hasNotes ? undefined : { cursor: "default" }}
                dangerouslySetInnerHTML={{
                  __html: seg.html
                    .replace('<p class="lesson-section-heading">', "")
                    .replace(/<\/p>$/, "")
                    + (hasNotes ? chevronSvg.replace(
                        'class="lesson-section-chevron"',
                        `class="lesson-section-chevron${isOpen ? " lesson-section-chevron--open" : ""}"`
                      ) : ""),
                }}
              />
              {isOpen && hasNotes && (
                <div className="schedule-note-panel">
                  {notes.map((line, j) => (
                    <p key={j} style={{ marginLeft: 0, marginBottom: "0.375rem" }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {footnotesHtml && (
          <div ref={footnotesRef}>
            <div
              className="footnotes-toggle"
              onClick={() => setFootnotesOpen(!footnotesOpen)}
            >
              <span className="footnotes-toggle-label">Footnotes</span>
              <svg
                className={`lesson-section-chevron${footnotesOpen ? " lesson-section-chevron--open" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            {footnotesOpen && (
              <div
                className="schedule-note-panel"
                style={{ background: "#f0ece6" }}
                dangerouslySetInnerHTML={{ __html: footnotesHtml }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
