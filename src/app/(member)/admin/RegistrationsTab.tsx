"use client";

import { useState, useEffect, useCallback } from "react";

interface Registration {
  id: string;
  email: string;
  name: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  phone: string | null;
  meeting_choice: string | null;
  karis_link: string | null;
  hope_to_gain: string | null;
  registered_before: string | null;
  questions_comments: string | null;
  created_at: string;
}

const CSV_COLUMNS: { key: keyof Registration; label: string }[] = [
  { key: "created_at", label: "Registered" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "meeting_choice", label: "Meeting Choice" },
  { key: "karis_link", label: "Karis Link" },
  { key: "registered_before", label: "Registered Before" },
  { key: "hope_to_gain", label: "Hope To Gain" },
  { key: "questions_comments", label: "Questions/Comments" },
];

function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export default function RegistrationsTab() {
  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.ok) {
        const d = await res.json();
        setRows(d.rows ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  function fmtDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso;
    }
  }

  function exportCsv() {
    const header = CSV_COLUMNS.map((c) => csvEscape(c.label)).join(",");
    const lines = rows.map((r) =>
      CSV_COLUMNS.map((c) => csvEscape(r[c.key])).join(",")
    );
    const csv = [header, ...lines].join("\r\n");
    // Leading BOM so Excel opens UTF-8 correctly.
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kf-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl bg-[#1e293b] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          {rows.length} registration{rows.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={exportCsv}
          disabled={loading || rows.length === 0}
          className={`rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal/80 ${loading || rows.length === 0 ? "opacity-50 pointer-events-none" : ""}`}
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="mt-6 text-center text-sm text-white/30">Loading registrations...</div>
      ) : rows.length === 0 ? (
        <div className="mt-6 text-center text-sm text-white/30">No registrations yet.</div>
      ) : (
        <div className="mt-4 space-y-2">
          {rows.map((r) => {
            const isOpen = expanded === r.id;
            return (
              <div key={r.id} className="rounded-lg bg-[#0f172a]">
                <button
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white/85">{r.name || "(no name)"}</p>
                    <p className="truncate text-xs text-white/40">
                      {r.email}
                      {r.meeting_choice ? ` · ${r.meeting_choice}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-white/30">{fmtDate(r.created_at)}</span>
                    <svg className={`h-4 w-4 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-4 py-3">
                    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      <Field label="Phone" value={r.phone} />
                      <Field label="Location" value={[r.city, r.state, r.country].filter(Boolean).join(", ")} />
                      <Field label="Meeting choice" value={r.meeting_choice} />
                      <Field label="Registered before" value={r.registered_before} />
                      <Field label="Karis link" value={r.karis_link} full />
                      <Field label="Hope to gain" value={r.hope_to_gain} full />
                      <Field label="Questions / comments" value={r.questions_comments} full />
                    </dl>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, full }: { label: string; value: string | null; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-[11px] uppercase tracking-wide text-white/35">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap text-sm text-white/75">{value || "—"}</dd>
    </div>
  );
}
