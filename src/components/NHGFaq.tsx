"use client";

import { useState } from "react";
import { nhgCard } from "@/lib/nhg-surface";

const faqs = [
  {
    question: "What are the meetings like?",
    answer: [
      "The meetings consist of three parts: the reading of the Introduction, the reading of the Reading Guide, and the discussion.",
      "The Introduction is read at the beginning of the meeting and sets the tone for the study. The Reading Guide is read next and provides questions and prompts to help you engage with the material. The discussion follows, where you can share your thoughts, questions, and insights.",
      "Meetings are about 1.5 hours long. You are welcome to listen the first time if you prefer — there is no pressure to share.",
    ],
  },
  {
    question: "What can I expect at the first meeting?",
    answer: [
      "The first meeting is an introductory meeting. You will hear a brief overview of the study, meet the facilitator and other participants, and get oriented to the format.",
      "You do not need to have finished the reading before the first meeting, but it helps to have started.",
    ],
  },
  {
    question: "A Few Pointers",
    answer: [
      "Please use the 1991 edition of Neurosis and Human Growth. Other editions have different page numbers and will not match the reading guides.",
      "Use the notation system in the reading guides — underline, circle, star, and question-mark — as you read. This helps you engage with the material and prepares you for discussion.",
      "Plan to spend 2-3 hours per reading guide. The first two weeks are the most reading-intensive.",
    ],
  },
  {
    question: "KF Eligibility Policy",
    answer: [
      "To be eligible for Karis Fellowships, you must attend at least 7 out of 8 weekly NHG meetings (or 5 out of 6 intensive meetings) and complete at least 10 out of 11 study guides.",
      "If you miss more than the allowed number of meetings or guides, you are welcome to re-take the NHG Book Study in a future session.",
    ],
  },
];

export default function NHGFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`${nhgCard} p-8`}>
      <h2 className="font-serif text-2xl font-medium text-white">FAQs &amp; Tips</h2>
      <div className="mt-4 divide-y divide-white/10">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-serif text-base text-white/85">{faq.question}</span>
              <svg
                className={`h-4 w-4 shrink-0 text-violet-light/50 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                openIndex === i ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3">
                  {faq.answer.map((para, j) => (
                    <p key={j} className="text-sm leading-[1.8] text-white/70">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
