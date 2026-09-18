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

const MON_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WD_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtDateShort(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return `${WD_SHORT[d.getUTCDay()]}, ${MON_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
}
function fmtTime(hhmm: string | null): string {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}
// Column header from a role label: drop the "#1/#2" suffix and shorten the KF 0
// intro-meeting role names so they fit a narrow column.
function headerLabel(roleLabel: string): string {
  return roleLabel
    .replace(/\s*#\d+$/, "")
    .replace(/^Intro Facilitator$/i, "Facilitator")
    .replace(/^Intro Meeting Support$/i, "Support");
}
function partLabel(part: string): string {
  const t = part.replace(/\bhour\b/i, "Hour");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
// Compact guide link text for the table's Guide column.
function shortGuide(label: string): string {
  const m = label.match(/Week\s+(\d+)/i);
  if (m) return `Wk ${m[1]}`;
  if (/review/i.test(label)) return "Review";
  if (/huddle/i.test(label)) return "Guide";
  return label;
}

// The distinct role columns for a section, taken from the union of its sessions'
// slots (keyed by sort, so 1st-hour roles come before 2nd-hour). Shorter meetings
// simply leave the later columns empty.
function sectionColumns(sess: Session[]): { sort: number; roleLabel: string; part: string | null }[] {
  const map = new Map<number, { sort: number; roleLabel: string; part: string | null }>();
  for (const s of sess) for (const sl of s.slots) {
    if (!map.has(sl.sort)) map.set(sl.sort, { sort: sl.sort, roleLabel: sl.role_label, part: sl.part });
  }
  return [...map.values()].sort((a, b) => a.sort - b.sort);
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

  function renderSlotCell(slot: Slot | undefined) {
    if (!slot) return <span className="text-white/20">—</span>;
    if (activeSlot === slot.id) {
      return (
        <span className="flex items-center justify-center gap-1">
          <input
            autoFocus
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") claim(slot.id);
              if (e.key === "Escape") { setActiveSlot(null); setError(""); }
            }}
            placeholder="Your name"
            aria-label="Your name as shown to other members"
            className="w-24 min-w-0 rounded border border-white/20 bg-white/10 px-1.5 py-1 text-xs text-white outline-none focus:border-teal/60 placeholder:text-white/30"
          />
          <button type="button" onClick={() => claim(slot.id)} disabled={busy || !nameInput.trim()} aria-label="Confirm sign-up" className="rounded bg-teal px-1.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-teal-hover disabled:opacity-50">{busy ? "…" : "✓"}</button>
          <button type="button" onClick={() => { setActiveSlot(null); setError(""); }} disabled={busy} aria-label="Cancel" className="rounded px-1 py-1 text-xs text-white/40 hover:text-white/70">✕</button>
        </span>
      );
    }
    if (slot.display_name) {
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className={`text-sm ${slot.mine ? "font-semibold text-teal-light" : "text-white/90"}`}>{slot.display_name}{slot.mine ? " (you)" : ""}</span>
          {slot.mine && <button type="button" onClick={() => release(slot.id)} disabled={busy} aria-label="Release your slot" className="text-xs text-white/40 transition-colors hover:text-coral disabled:opacity-50">✕</button>}
        </span>
      );
    }
    return (
      <button type="button" onClick={() => { setActiveSlot(slot.id); setNameInput(myName); setError(""); }} className="rounded-md bg-teal/15 px-2.5 py-1 text-xs font-semibold text-teal-light transition-colors hover:bg-teal/25">Sign up</button>
    );
  }

  return (
    <div className="space-y-8">
      {error && <p className="rounded-lg bg-coral/15 px-4 py-3 text-sm text-coral">{error}</p>}

      {groups.map((group) => {
        const cols = sectionColumns(group.sessions);
        const hasParts = cols.some((c) => c.part);
        // Contiguous runs of columns sharing a "part" (1st hour / 2nd hour) for
        // the grouped top header row.
        const partGroups: { label: string; count: number }[] = [];
        if (hasParts) {
          for (const c of cols) {
            const lbl = c.part ?? "";
            const last = partGroups[partGroups.length - 1];
            if (last && last.label === lbl) last.count++;
            else partGroups.push({ label: lbl, count: 1 });
          }
        }
        return (
          <div key={group.section}>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white/45">{group.section}</h3>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03]">
              <table className="w-full border-collapse text-left align-middle">
                <thead>
                  {hasParts && (
                    <tr className="border-b border-white/10 bg-white/[0.04]">
                      <th colSpan={3} />
                      {partGroups.map((pg, i) => (
                        <th key={i} colSpan={pg.count} className="border-l border-white/10 px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-teal-light/70">{partLabel(pg.label)}</th>
                      ))}
                    </tr>
                  )}
                  <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] font-semibold uppercase tracking-wide text-white/45">
                    <th className="px-3 py-2 text-left">Date</th>
                    <th className="min-w-[11rem] px-3 py-2 text-left">Meeting</th>
                    <th className="px-3 py-2 text-left">Guide</th>
                    {cols.map((c, i) => (
                      <th key={c.sort} className={`min-w-[6rem] px-2 py-2 text-center ${hasParts && partGroups.length > 1 && isPartBoundary(cols, i) ? "border-l border-white/10" : ""}`}>{headerLabel(c.roleLabel)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {group.sessions.map((session) => {
                    const bySort = new Map(session.slots.map((sl) => [sl.sort, sl]));
                    return (
                      <tr key={session.id} className="transition-colors hover:bg-white/[0.03]">
                        <td className="whitespace-nowrap px-3 py-2.5 align-top">
                          <div className="text-xs font-semibold uppercase tracking-wide text-teal-light">{fmtDateShort(session.session_date)}</div>
                          {session.start_time && <div className="mt-0.5 text-[11px] text-white/45">{fmtTime(session.start_time)} CT</div>}
                        </td>
                        <td className="min-w-[11rem] px-3 py-2.5 align-top">
                          <span className="font-serif text-sm leading-snug text-white">{session.content}</span>
                        </td>
                        <td className="px-3 py-2.5 align-top">
                          <div className="flex flex-col gap-1">
                            {(session.guides ?? []).map((g) => (
                              <a key={g.label} href={g.href} target="_blank" rel="noopener noreferrer" title={g.label} aria-label={g.label} className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-[#fde68a] transition-colors hover:text-[#fde68a]/80 hover:underline">
                                <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                {shortGuide(g.label)}
                              </a>
                            ))}
                          </div>
                        </td>
                        {cols.map((c, i) => (
                          <td key={c.sort} className={`px-2 py-2.5 text-center align-middle ${hasParts && partGroups.length > 1 && isPartBoundary(cols, i) ? "border-l border-white/10" : ""}`}>
                            {renderSlotCell(bySort.get(c.sort))}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// A column is a "part boundary" (gets a left divider) when its part differs from
// the previous column's — i.e. the 1st-hour → 2nd-hour break.
function isPartBoundary(cols: { part: string | null }[], i: number): boolean {
  return i > 0 && cols[i].part !== cols[i - 1].part;
}
