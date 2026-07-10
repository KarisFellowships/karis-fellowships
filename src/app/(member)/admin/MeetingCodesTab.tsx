"use client";

import { useState, useEffect, useCallback } from "react";

interface CodeRow {
  id: string;
  section: string;
  label: string;
  time_label: string | null;
  code: string;
  sort: number;
}

const SECTION_LABELS: Record<string, string> = {
  general: "General",
  kf: "KF Weekly Meetings",
  nhg: "Neurotic Habits Group",
  romans: "Romans",
  hpkp: "HPKP",
};
const SECTION_ORDER = ["general", "kf", "nhg", "romans", "hpkp"];

export default function MeetingCodesTab() {
  const [rows, setRows] = useState<CodeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/meeting-codes");
      if (res.ok) {
        const data = await res.json();
        setRows(data.rows ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  function update(id: string, field: "label" | "time_label" | "code", value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    setMessage(null);
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/meeting-codes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rows: rows.map((r) => ({
            id: r.id,
            label: r.label,
            time_label: r.time_label,
            code: r.code,
          })),
        }),
      });
      if (res.ok) {
        setMessage("Saved. Changes are live on the site.");
        await fetchRows();
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage(`Error: ${data.error ?? "could not save"}`);
      }
    } finally {
      setSaving(false);
    }
  }

  const grouped = SECTION_ORDER.map((section) => ({
    section,
    label: SECTION_LABELS[section] ?? section,
    items: rows.filter((r) => r.section === section),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="rounded-2xl bg-[#1e293b] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          Dial-in codes shown across the site. Edit and save — updates are live immediately, no redeploy.
        </p>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className={`ml-4 shrink-0 rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal/80 ${saving || loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {message && (
        <p className={`mt-3 text-xs font-medium ${message.startsWith("Error") ? "text-red-300" : "text-teal-light"}`}>
          {message}
        </p>
      )}

      {loading ? (
        <div className="mt-6 text-center text-sm text-white/30">Loading codes...</div>
      ) : (
        <div className="mt-4 space-y-5">
          {grouped.map((group) => (
            <div key={group.section}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-light/70">{group.label}</p>
              <div className="space-y-2">
                {group.items.map((r) => (
                  <div key={r.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-[#0f172a] px-3 py-2.5">
                    <input
                      value={r.label}
                      onChange={(e) => update(r.id, "label", e.target.value)}
                      className="min-w-[8rem] flex-1 rounded-md bg-[#1e293b] px-3 py-1.5 text-sm text-white/90 outline-none ring-1 ring-white/10 focus:ring-teal/50"
                      placeholder="Label"
                    />
                    {r.section === "kf" && (
                      <input
                        value={r.time_label ?? ""}
                        onChange={(e) => update(r.id, "time_label", e.target.value)}
                        className="min-w-[8rem] flex-1 rounded-md bg-[#1e293b] px-3 py-1.5 text-sm text-white/70 outline-none ring-1 ring-white/10 focus:ring-teal/50"
                        placeholder="Time (e.g. 8:00 am CST)"
                      />
                    )}
                    <input
                      value={r.code}
                      onChange={(e) => update(r.id, "code", e.target.value)}
                      className="min-w-[9rem] flex-1 rounded-md bg-[#1e293b] px-3 py-1.5 font-mono text-sm font-bold text-teal-light/90 outline-none ring-1 ring-white/10 focus:ring-teal/50"
                      placeholder="Code"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
