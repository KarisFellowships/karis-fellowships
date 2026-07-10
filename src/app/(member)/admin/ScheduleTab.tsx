"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScheduleInfo {
  totalRows: number;
  minYear: number | null;
  maxYear: number | null;
}

export default function ScheduleTab() {
  const [info, setInfo] = useState<ScheduleInfo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchInfo = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/schedule");
      if (res.ok) setInfo(await res.json());
    } catch {
      // leave info null
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    setIsError(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/schedule", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage(`Updated ${data.rowsUpserted} rows (${data.minYear}–${data.maxYear}). Dates are live on the site.`);
        await fetchInfo();
      } else {
        setIsError(true);
        setMessage(`Error: ${data.error ?? "could not process the file"}`);
      }
    } catch (err) {
      setIsError(true);
      setMessage(`Error: ${(err as Error).message}`);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="rounded-2xl bg-[#1e293b] p-5">
      <p className="text-sm text-white/50">
        Upload the current <span className="font-semibold text-white/70">KF Date Projection.xlsx</span> to refresh every
        KF weekly-meeting date on the site. The file is read and the schedule table is updated automatically — you don&apos;t
        need a developer.
      </p>

      <div className="mt-4 rounded-lg bg-[#0f172a] px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-white/35">Current schedule</p>
        <p className="mt-1 text-sm text-white/80">
          {info
            ? info.totalRows > 0
              ? `${info.totalRows.toLocaleString()} dates on file, spanning ${info.minYear}–${info.maxYear}.`
              : "No schedule loaded yet."
            : "Loading..."}
        </p>
      </div>

      <div className="mt-4">
        <label className={`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal/80 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? "Processing..." : "Upload KF Date Projection.xlsx"}
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {message && (
        <p className={`mt-3 text-xs font-medium ${isError ? "text-red-300" : "text-teal-light"}`}>{message}</p>
      )}

      <p className="mt-4 text-xs text-white/30">
        Tip: the spreadsheet must keep its current layout — the year columns across the top and the KF0–KF52 rows down the
        side. Existing dates for a given lesson and year are replaced; nothing else is touched.
      </p>
    </div>
  );
}
