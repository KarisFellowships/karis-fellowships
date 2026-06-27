"use client";

import { useState } from "react";
import MembersTab from "./MembersTab";
import DocumentsTab from "./DocumentsTab";

interface Member {
  id: string;
  email: string;
  name: string | null;
  tier: string;
  active: boolean;
  nhg_paid: boolean;
  kf_invited: boolean;
  kf_registered_year: number | null;
  created_at: string;
}

const tabs = [
  { id: "members", label: "Members" },
  { id: "documents", label: "Documents" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminPanel({ initialMembers }: { initialMembers: Member[] }) {
  const [activeTab, setActiveTab] = useState<TabId>("members");

  return (
    <>
      <div className="flex gap-1 rounded-xl bg-[#1e293b] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-teal text-white shadow"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "members" && <MembersTab initialMembers={initialMembers} />}
        {activeTab === "documents" && <DocumentsTab />}
      </div>
    </>
  );
}
