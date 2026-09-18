"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Slot {
  id: string;
  role_label: string;
  part: string | null;
  slot_index: number;
  sort: number;
  display_name: string | null;
  mine: boolean;
}
interface Guide {
  label: string;
  href: string;
}
interface Session {
  id: string;
  section: string;
  content: string;
  session_date: string;
  start_time: string | null;
  end_time: string | null;
  duration_minutes: number | null;
  sort: number;
  slots: Slot[];
  guides?: Guide[];
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
function fmtTime(hhmm: string | null): string {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}
function fmtRange(s: string | null, e: string | null): string {
  if (!s) return "";
  return `${fmtTime(s)}${e ? ` – ${fmtTime(e)}` : ""} CT`;
}
function roleText(slot: Slot): string {
  return slot.part ? `${slot.role_label} · ${slot.part}` : slot.role_label;
}

export default function FacilitatorSignup({ sessions, myName }: { sessions: Session[]; myName: string }) {
  const router = useRouter();
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState(myName);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function claim(slotId: string) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/nhg/facilitator/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, displayName: nameInput.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); setBusy(false); return; }
      setActiveSlot(null);
      setBusy(false);
      router.refresh();
    } catch { setError("Something went wrong. Please try again."); setBusy(false); }
  }

  async function release(slotId: string) {
    if (!confirm("Release this slot? It will become open for others to sign up.")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/nhg/facilitator/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); setBusy(false); return; }
      setBusy(false);
      router.refresh();
    } catch { setError("Something went wrong. Please try again."); setBusy(false); }
  }

  // Group sessions by section, preserving order.
  const groups: { section: string; sessions: Session[] }[] = [];
  for (const s of sessions) {
    const g = groups.find((x) => x.section === s.section);
    if (g) g.sessions.push(s);
    else groups.push({ section: s.section, sessions: [s] });
  }

  return (
    <div className="space-y-8">
      {error && <p className="rounded-lg bg-coral/15 px-4 py-3 text-sm text-coral">{error}</p>}

      {groups.map((group) => {
        const multi = group.sessions.length > 1;
        return (
        <div key={group.section}>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">{group.section}</h4>
          <div className={multi ? "mt-3 grid gap-4 lg:grid-cols-2 lg:items-start" : "mt-3 space-y-4"}>
            {group.sessions.map((session) => {
              const openCount = session.slots.filter((sl) => !sl.display_name).length;
              return (
                <div key={session.id} className="rounded-2xl border border-white/15 bg-white/[0.12] p-4 shadow-lg shadow-black/10 backdrop-blur-md sm:p-5">
                  {/* Header: date + content + time */}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wide text-teal-light">{fmtDate(session.session_date)}</span>
                      <h5 className="font-serif text-base leading-snug text-white sm:text-lg">{session.content}</h5>
                    </div>
                    <span className="shrink-0 text-xs text-white/50">
                      {fmtRange(session.start_time, session.end_time)}
                      {openCount > 0 && <span className="ml-1.5 font-semibold text-amber">· {openCount} open</span>}
                    </span>
                  </div>

                  {/* Prominent guide(s) */}
                  {session.guides && session.guides.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {session.guides.map((g) => (
                        <a
                          key={g.label}
                          href={g.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#fde68a]/15 px-4 py-2.5 text-sm font-bold text-[#fde68a] ring-1 ring-[#fde68a]/30 transition-all hover:bg-[#fde68a]/25 hover:-translate-y-0.5"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          {g.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Slots — compact rows (cards are narrow when two-up, so no wasted space) */}
                  <ul className="mt-4 divide-y divide-white/10">
                    {session.slots.map((slot) => (
                      <li key={slot.id} className="py-2.5">
                        {activeSlot === slot.id ? (
                          <div>
                            <p className="text-xs font-medium text-white/55">{roleText(slot)}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="First name + last initial"
                                aria-label="Your name as shown to other members"
                                className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-white outline-none focus:border-teal/50 placeholder:text-white/30"
                              />
                              <button type="button" onClick={() => claim(slot.id)} disabled={busy || !nameInput.trim()} className="shrink-0 rounded-md bg-teal px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-hover disabled:opacity-50">{busy ? "…" : "Confirm"}</button>
                              <button type="button" onClick={() => { setActiveSlot(null); setError(""); }} disabled={busy} className="shrink-0 rounded-md px-2 py-1.5 text-xs text-white/50 hover:text-white/80">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-medium text-white/55">{roleText(slot)}</span>
                            {slot.display_name ? (
                              <span className="flex min-w-0 items-center gap-2">
                                <span className={`truncate text-sm font-semibold ${slot.mine ? "text-teal-light" : "text-white"}`}>{slot.display_name}{slot.mine ? " (you)" : ""}</span>
                                {slot.mine && <button type="button" onClick={() => release(slot.id)} disabled={busy} className="shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium text-white/50 transition-colors hover:text-coral disabled:opacity-50">Release</button>}
                              </span>
                            ) : (
                              <button type="button" onClick={() => { setActiveSlot(slot.id); setNameInput(myName); setError(""); }} className="shrink-0 rounded-md bg-teal/15 px-3 py-1.5 text-xs font-semibold text-teal-light transition-colors hover:bg-teal/25">Sign up</button>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        );
      })}
    </div>
  );
}
