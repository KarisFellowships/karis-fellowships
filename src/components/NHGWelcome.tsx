"use client";

import { useState } from "react";
import ExpandableSection from "./ExpandableSection";

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

export default function NHGWelcome({ syllabusUrl, nextStudyDate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl bg-violet/15 overflow-hidden shrink-0 transition-all duration-500 ${open ? "" : "sm:max-w-[160px]"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-violet/[0.06]"
      >
        <h2 className="font-bold text-charcoal text-base whitespace-nowrap">
          Start Here
        </h2>
        <svg
          className={`h-4 w-4 shrink-0 text-charcoal/30 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
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
        className={`grid transition-all duration-700 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-violet/10 px-5 pb-6 pt-5">
            <div className="space-y-5">
              {/* Step 1 */}
              <div className="flex gap-4">
                <span className="font-serif text-3xl font-extralight text-violet/25">1</span>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-semibold text-charcoal">
                    <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet">Buy the Book</a>
                  </h3>
                  <p className="mt-1 text-sm leading-[1.8] text-slate">
                    You need the 1991 edition of{" "}
                    <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="italic text-violet/70 underline decoration-violet/20 underline-offset-2 transition-colors hover:text-violet">Neurosis and Human Growth</a>{" "}
                    by Karen Horney.
                  </p>
                  <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-teal/15 px-4 py-2 text-xs font-semibold text-teal-dark transition-all hover:bg-teal/25">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Buy on Amazon
                  </a>
                  <ExpandableSection collapsedLabel="More options">
                    <div className="space-y-2 text-sm leading-[1.8] text-slate">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Public library &mdash; but you need the book for at least 8 weeks</li>
                        <li><a href="https://www.audible.com/pd/Neurosis-and-Human-Growth-Audiobook/B002V8MWUC" target="_blank" rel="noopener noreferrer" className="text-violet/70 underline underline-offset-2 decoration-violet/20 hover:text-violet transition-colors">Audible.com</a> &mdash; audio supplement; first-time members get one audiobook free</li>
                      </ul>
                    </div>
                  </ExpandableSection>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <span className="font-serif text-3xl font-extralight text-violet/25">2</span>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-semibold text-charcoal">Download Syllabus &amp; Start Reading</h3>
                  <p className="mt-1 text-sm leading-[1.8] text-slate">
                    You can always find your reading guides in the NHG menu below.
                  </p>
                  <a href={syllabusUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-violet/15 px-4 py-2 text-xs font-semibold text-violet transition-all hover:bg-violet/25">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    NHG Syllabus
                  </a>
                  <ExpandableSection collapsedLabel="Reading tip">
                    <p className="text-sm leading-[1.8] text-slate">
                      The reading load during the first two weeks is more intense, so please be kind to yourself and start early. Plan to spend 2-3 hours for the first week (Introduction &amp; Chapter 1) and 4-6 hours for the second week (Chapters 2 &amp; 3).
                    </p>
                  </ExpandableSection>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <span className="font-serif text-3xl font-extralight text-violet/25">3</span>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-semibold text-charcoal">Prepare to Call in to a Meeting</h3>
                  <p className="mt-1 text-sm leading-[1.8] text-slate">
                    You will call a long-distance US number for meetings. The phone number and access codes are in the call info card on this page.
                  </p>
                  <ExpandableSection collapsedLabel="Calling options">
                    <div className="space-y-2 text-sm leading-[1.8] text-slate">
                      <p>If you&apos;re not sure how to call affordably from your location, consider these options:</p>
                      <ul className="list-disc space-y-1 pl-5">
                        <li><a href="https://www.skype.com" target="_blank" rel="noopener noreferrer" className="text-violet/70 underline underline-offset-2 decoration-violet/20 hover:text-violet transition-colors">Skype</a> &mdash; 2.3 cents/min or $2.99/month</li>
                        <li><a href="https://voice.google.com" target="_blank" rel="noopener noreferrer" className="text-violet/70 underline underline-offset-2 decoration-violet/20 hover:text-violet transition-colors">Google Voice</a> &mdash; free calls to our number</li>
                        <li>WePhone &mdash; 1 cent/minute</li>
                        <li>ViberOut &mdash; 1.9 cents/minute</li>
                      </ul>
                    </div>
                  </ExpandableSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
