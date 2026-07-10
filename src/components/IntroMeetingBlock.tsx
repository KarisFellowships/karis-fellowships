"use client";

import { useState } from "react";
import Image from "next/image";

const eligibilityIntro =
  "The NHG Study is a prerequisite for KF. To be eligible for KF membership you must:";
const eligibilityItems = [
  "Attend 7 out of the 8 weekly group meetings, or 5 out of the 6 Weekend Intensive meetings. You can make up the weekly meetings that you missed at the Weekend Intensive.",
  "Complete 10 out of the 11 study guides.",
];
const pointers = [
  "Use the 1991 edition of Karen Horney's Neurosis and Human Growth. See the Start Here page for more info.",
  "The notation (39.4) means you'll find the answer to that question on page 39, paragraph 4.",
  "Questions use the same wording as Horney's text to make finding the answers easier.",
  "Most participants answer questions as they read the chapter and spend 2 to 3 hours per reading guide. Give yourself permission to stop at the end of 3 hours, even if you haven't finished.",
  "Be gentle with yourself and consider this a first pass. Just do the best you can with your reading guides and attend the meetings. Nancy's teaching and commentary, the Q&A sessions, and general discussion will go a long way toward your understanding.",
];

const badge =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-[#c084fc] font-serif text-lg font-bold text-white shadow-md shadow-violet/40";

const chevron = (open: boolean) => (
  <svg
    className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function IntroMeetingBlock({
  title,
  date,
  syllabusUrl,
}: {
  title: string;
  date: string;
  syllabusUrl: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#2b2150]">
      <div className="relative aspect-[16/9]">
        <Image
          src="/forest-path.jpg"
          alt="A person walking along a sunlit forest path"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2150] via-[#2b2150]/40 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-flex w-fit items-center rounded-full bg-violet px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet/30">
            {date}
          </span>
          <h3 className="mt-2 font-serif text-2xl font-bold text-white drop-shadow-lg">{title}</h3>
        </div>
      </div>

      <div className="space-y-1 p-4">
        {/* 1. Open Syllabus */}
        <a
          href={syllabusUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
        >
          <span className={badge}>1</span>
          <span className="flex-1 font-serif text-lg font-semibold text-white transition-colors group-hover:text-violet-light">
            Open Syllabus
          </span>
          <svg className="h-4 w-4 shrink-0 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {/* 2. KF Eligibility Policy */}
        <div>
          <button
            onClick={() => toggle(2)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
          >
            <span className={badge}>2</span>
            <span className="flex-1 font-serif text-lg font-semibold text-white">KF Eligibility Policy</span>
            {chevron(open === 2)}
          </button>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              open === 2 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-2 px-3 pb-4 pl-[3.25rem] text-sm leading-[1.8] text-white/70">
                <p>{eligibilityIntro}</p>
                <ol className="list-decimal space-y-1 pl-5">
                  {eligibilityItems.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* 3. A Few Pointers */}
        <div>
          <button
            onClick={() => toggle(3)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
          >
            <span className={badge}>3</span>
            <span className="flex-1 font-serif text-lg font-semibold text-white">A Few Pointers</span>
            {chevron(open === 3)}
          </button>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              open === 3 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-2 px-3 pb-4 pl-[3.25rem] text-sm leading-[1.8] text-white/70">
                {pointers.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
