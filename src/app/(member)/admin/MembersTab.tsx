"use client";

import { useState, useMemo } from "react";

interface Member {
  id: string;
  email: string;
  name: string | null;
  tier: string;
  active: boolean;
  nhg_paid: boolean;
  created_at: string;
}

export default function MembersTab({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = members;
    if (filterTier !== "all") {
      list = list.filter((m) => m.tier === filterTier);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.email.toLowerCase().includes(q) ||
          (m.name && m.name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [members, search, filterTier]);

  async function updateMember(userId: string, updates: { tier?: string; active?: boolean }) {
    setLoading(userId);
    try {
      const res = await fetch("/api/admin/update-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, updates }),
      });
      if (res.ok) {
        setMembers((prev) =>
          prev.map((m) => (m.id === userId ? { ...m, ...updates } : m))
        );
      }
    } finally {
      setLoading(null);
    }
  }

  const tierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      admin: "bg-violet-500/20 text-violet-300",
      kf: "bg-teal/20 text-teal-light",
      nhg: "bg-amber-500/20 text-amber-300",
    };
    return (
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${styles[tier] ?? "bg-gray-500/20 text-gray-400"}`}>
        {tier}
      </span>
    );
  };

  return (
    <div className="rounded-2xl bg-[#1e293b] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-teal/50"
          />
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-sm text-white outline-none focus:border-teal/50"
          >
            <option value="all">All tiers</option>
            <option value="admin">Admin</option>
            <option value="kf">KF</option>
            <option value="nhg">NHG</option>
          </select>
        </div>
        <p className="text-xs text-white/40">{filtered.length} member{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Tier</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">NHG Paid</th>
              <th className="px-3 py-2">Joined</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                <td className="px-3 py-3 text-white/80">{m.name ?? "—"}</td>
                <td className="px-3 py-3 text-white/60">{m.email}</td>
                <td className="px-3 py-3">{tierBadge(m.tier)}</td>
                <td className="px-3 py-3">
                  <span className={`text-xs font-semibold ${m.active ? "text-emerald-400" : "text-red-400"}`}>
                    {m.active ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="px-3 py-3 text-white/60">{m.nhg_paid ? "Yes" : "No"}</td>
                <td className="px-3 py-3 text-white/40 text-xs">
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    {m.tier === "nhg" && (
                      <ActionBtn
                        label="↑ KF"
                        loading={loading === m.id}
                        onClick={() => updateMember(m.id, { tier: "kf" })}
                        className="bg-teal/20 text-teal-light hover:bg-teal/40"
                      />
                    )}
                    {m.tier === "kf" && (
                      <ActionBtn
                        label="↓ NHG"
                        loading={loading === m.id}
                        onClick={() => updateMember(m.id, { tier: "nhg" })}
                        className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/40"
                      />
                    )}
                    <ActionBtn
                      label={m.active ? "Suspend" : "Activate"}
                      loading={loading === m.id}
                      onClick={() => updateMember(m.id, { active: !m.active })}
                      className={m.active ? "bg-red-500/20 text-red-300 hover:bg-red-500/40" : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40"}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-sm text-white/30">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionBtn({
  label,
  loading,
  onClick,
  className,
}: {
  label: string;
  loading: boolean;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors disabled:opacity-50 ${className}`}
    >
      {loading ? "..." : label}
    </button>
  );
}
