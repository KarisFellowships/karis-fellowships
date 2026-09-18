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

export default function FacilitatorSignup({
  sessions,
  myName,
}: {
  sessions: Session[];
  myName: string;
}) {
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
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      setActiveSlot(null);
      setBusy(false);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
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
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      setBusy(false);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  // Group sessions by section, preserving order.
  const groups: { section: string; sessions: Session[] }[] = [];
  for (const s of sessions) {
    const g = groups.find((x) => x.section === s.section);
    if (g) g.sessions.push(s);
    else groups.push({ section: s.section, sessions: [s] });
  }

  return (
    <div className="space-y-10">
      {error && (
        <p className="rounded-lg bg-coral/15 px-4 py-3 text-sm text-coral">{error}</p>
      )}

      {groups.map((group) => (
        <div key={group.section}>
          <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">{group.section}</h2>
          <div className="mt-4 space-y-4">
            {group.sessions.map((session) => {
              const openCount = session.slots.filter((sl) => !sl.display_name).length;
              return (
                <div
                  key={session.id}
                  className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-teal-light">{fmtDate(session.session_date)}</p>
                      <p className="mt-0.5 font-serif text-base text-white sm:text-lg">{session.content}</p>
                    </div>
                    <p className="shrink-0 text-xs text-white/50">
                      {fmtRange(session.start_time, session.end_time)}
                      {openCount > 0 && <span className="ml-2 text-amber">· {openCount} open</span>}
                    </p>
                  </div>

                  <ul className="mt-4 divide-y divide-white/10">
                    {session.slots.map((slot) => (
                      <li key={slot.id} className="flex flex-col gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm text-white/70">{roleText(slot)}</span>

                        {slot.display_name ? (
                          <span className="flex items-center gap-3">
                            <span className={`text-sm font-semibold ${slot.mine ? "text-teal-light" : "text-white"}`}>
                              {slot.display_name}{slot.mine ? " (you)" : ""}
                            </span>
                            {slot.mine && (
                              <button
                                type="button"
                                onClick={() => release(slot.id)}
                                disabled={busy}
                                className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-medium text-white/60 transition-colors hover:border-coral/40 hover:text-coral disabled:opacity-50"
                              >
                                Release
                              </button>
                            )}
                          </span>
                        ) : activeSlot === slot.id ? (
                          <span className="flex flex-wrap items-center gap-2">
                            <input
                              type="text"
                              value={nameInput}
                              onChange={(e) => setNameInput(e.target.value)}
                              placeholder="First name + last initial"
                              aria-label="Your name as shown to other members"
                              className="w-40 rounded-md border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-white outline-none focus:border-teal/50 placeholder:text-white/30"
                            />
                            <button
                              type="button"
                              onClick={() => claim(slot.id)}
                              disabled={busy || !nameInput.trim()}
                              className="rounded-md bg-teal px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-hover disabled:opacity-50"
                            >
                              {busy ? "Signing up…" : "Confirm"}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setActiveSlot(null); setError(""); }}
                              disabled={busy}
                              className="rounded-md px-2 py-1.5 text-xs text-white/50 hover:text-white/80"
                            >
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setActiveSlot(slot.id); setNameInput(myName); setError(""); }}
                            className="self-start rounded-md bg-teal/15 px-3 py-1.5 text-xs font-semibold text-teal-light transition-colors hover:bg-teal/25 sm:self-auto"
                          >
                            Sign up
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
