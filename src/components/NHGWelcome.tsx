"use client";

import { useState } from "react";
import Image from "next/image";
import ExpandableSection from "./ExpandableSection";
import { nhgCard } from "@/lib/nhg-surface";

const AMAZON_URL =
  "https://www.amazon.com/Neurosis-Human-Growth-Struggle-Self-Realization/dp/0393307751";

function formatStartDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

interface Props {
  syllabusUrl: string;
  nextStudyDate: string | null;
}

const cardWrap = "flex h-full flex-col overflow-hidden rounded-2xl bg-[#241c46] shadow-lg shadow-black/30";
const num = "font-serif text-3xl font-bold leading-none text-white drop-shadow-lg";
const heading = "font-serif text-xl font-bold leading-tight text-white drop-shadow-lg sm:text-2xl";
const body = "text-sm leading-relaxed text-white/75";
const bodyLink = "font-semibold text-violet-light underline decoration-violet-light/40 underline-offset-2 transition-colors hover:text-white";
const pill = "inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#2b2150] transition-all hover:bg-white/90";

export default function NHGWelcome({ syllabusUrl, nextStudyDate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full overflow-hidden ${nhgCard}`}>
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-3 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-light/15">
            <svg className="h-5 w-5 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
          <span className="font-serif text-xl text-white">Start Here</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
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
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-1">
            <div className="grid gap-3 sm:grid-cols-3 sm:items-stretch">
              {/* Step 1 */}
              <div className={cardWrap}>
                <div className="relative aspect-[16/10] bg-[#1a1436]">
                  <Image src="/nhg-book.jpg" alt="Cover of Neurosis and Human Growth by Karen Horney" fill className="object-contain object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241c46] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-baseline gap-2.5 p-4">
                    <span className={num}>1</span>
                    <h3 className={heading}>
                      <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="transition-all hover:underline">Buy the Book</a>
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className={body}>
                    You need the 1991 edition of{" "}
                    <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className={`italic ${bodyLink}`}>Neurosis and Human Growth</a>{" "}
                    by Karen Horney.
                  </p>
                  <div className="mt-auto pt-4">
                    <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className={pill}>
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      Buy on Amazon
                    </a>
                    <ExpandableSection collapsedLabel="More options">
                      <div className="space-y-2 text-sm leading-[1.8] text-white/75">
                        <ul className="list-disc space-y-1 pl-5">
                          <li>Public library &mdash; but you need the book for at least 8 weeks</li>
                          <li><a href="https://www.audible.com/pd/Neurosis-and-Human-Growth-Audiobook/B002V8MWUC" target="_blank" rel="noopener noreferrer" className={bodyLink}>Audible.com</a> &mdash; audio supplement; first-time members get one audiobook free</li>
                        </ul>
                      </div>
                    </ExpandableSection>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={cardWrap}>
                <div className="relative aspect-[16/10]">
                  <Image src="/nhg-read.jpg" alt="A person reading a book by a window" fill className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241c46] via-[#241c46]/40 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 flex items-baseline gap-2.5 p-4">
                    <span className={num}>2</span>
                    <h3 className={heading}>Download Syllabus &amp;<br />Start Reading</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className={body}>
                    You can always find your reading guides in the NHG menu below.
                  </p>
                  <div className="mt-auto pt-4">
                    <a href={syllabusUrl} target="_blank" rel="noopener noreferrer" className={pill}>
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      NHG Syllabus
                    </a>
                    <ExpandableSection collapsedLabel="Reading tip">
                      <p className="text-sm leading-[1.8] text-white/75">
                        The reading load during the first two weeks is more intense, so please be kind to yourself and start early. Plan to spend 2-3 hours for the first week (Introduction &amp; Chapter 1) and 4-6 hours for the second week (Chapters 2 &amp; 3).
                      </p>
                    </ExpandableSection>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={cardWrap}>
                <div className="relative aspect-[16/10]">
                  <Image src="/nhg-call.jpg" alt="A hand dialing a phone beside a warm drink" fill className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241c46] via-[#241c46]/40 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 flex items-baseline gap-2.5 p-4">
                    <span className={num}>3</span>
                    <h3 className={heading}>Prepare to Call<br />into a Meeting</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className={body}>
                    We use a conference call service called StartMeeting. Follow these steps with a landline, cell phone, or any other provider.
                  </p>
                  <div className="mt-auto pt-4">
                    <ExpandableSection collapsedLabel="Call in tips">
                      <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-[1.7] text-white/75">
                        <li>Begin 3 to 5 minutes before the meeting start time.</li>
                        <li>Dial the phone number shown in the Call In Info on this page. You will hear a voice recording that welcomes you to StartMeeting.</li>
                        <li>Slowly enter the Meeting ID (the access code for your study, shown in the Call In Info), followed by the # sign.</li>
                        <li>You can use *6 to mute/unmute yourself on any touch-tone phone during a call.</li>
                      </ol>
                    </ExpandableSection>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
