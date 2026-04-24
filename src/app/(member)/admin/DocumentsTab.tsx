"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface DocFile {
  name: string;
  path: string;
  size: number;
  updated: string;
}

type DocsMap = Record<string, DocFile[]>;

const CATEGORIES = [
  { id: "toolbox", label: "Toolbox" },
  { id: "nhg", label: "NHG Guides" },
  { id: "other-studies", label: "Other Studies" },
  { id: "lessons", label: "KF Lessons" },
  { id: "questions", label: "KF Questions" },
  { id: "kf-resources", label: "KF Resources" },
  { id: "facilitator", label: "Facilitator" },
];

export default function DocumentsTab() {
  const [docs, setDocs] = useState<DocsMap>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("toolbox");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/documents");
      if (res.ok) {
        setDocs(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", activeCategory);
      const res = await fetch("/api/admin/documents", { method: "POST", body: fd });
      if (res.ok) await fetchDocs();
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(path: string) {
    if (!confirm(`Delete ${path}?`)) return;
    setDeleting(path);
    try {
      const res = await fetch("/api/admin/documents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (res.ok) await fetchDocs();
    } finally {
      setDeleting(null);
    }
  }

  function formatSize(bytes: number) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const files = docs[activeCategory] ?? [];

  return (
    <div className="rounded-2xl bg-[#1e293b] p-5">
      <div className="flex flex-wrap gap-1 rounded-lg bg-[#0f172a] p-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? "bg-teal/20 text-teal-light"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-white/40">
          {files.length} file{files.length !== 1 ? "s" : ""} in {activeCategory}
        </p>
        <label className={`cursor-pointer rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal/80 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? "Uploading..." : "Upload File"}
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {loading ? (
        <div className="mt-6 text-center text-sm text-white/30">Loading documents...</div>
      ) : files.length === 0 ? (
        <div className="mt-6 text-center text-sm text-white/30">No documents in this category yet.</div>
      ) : (
        <div className="mt-4 space-y-2">
          {files.map((f) => (
            <div key={f.path} className="flex items-center justify-between rounded-lg bg-[#0f172a] px-4 py-3 transition-colors hover:bg-[#0f172a]/80">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white/80">{f.name}</p>
                <p className="mt-0.5 text-xs text-white/30">
                  {formatSize(f.size)}
                  {f.updated && ` · ${new Date(f.updated).toLocaleDateString()}`}
                </p>
              </div>
              <button
                onClick={() => handleDelete(f.path)}
                disabled={deleting === f.path}
                className="ml-3 rounded-md bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/40 disabled:opacity-50"
              >
                {deleting === f.path ? "..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
