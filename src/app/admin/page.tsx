import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-dark pt-8">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        <p className="mt-2 text-white/50">
          Manage members, content, and email communications.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            { icon: "👥", title: "Members", desc: "View all members, upgrade NHG to KF, suspend or remove access.", note: "Member management will connect to Supabase.", color: "border-teal/30" },
            { icon: "📝", title: "Content", desc: "Edit lessons, upload documents, manage toolbox resources via Sanity Studio.", note: "Will link to Sanity Studio once configured.", color: "border-coral/30" },
            { icon: "✉️", title: "Email", desc: "Send broadcast emails, edit templates, preview upcoming automated sends.", note: "Email system will connect to Resend.", color: "border-amber/30" },
            { icon: "📅", title: "Schedule", desc: "View and manage the KF date schedule and lesson assignments.", note: "Date engine will pull from Supabase schedule table.", color: "border-sky/30" },
          ].map(({ icon, title, desc, note, color }) => (
            <div key={title} className={`rounded-2xl border-2 ${color} bg-white/5 p-6`}>
              <div className="text-2xl">{icon}</div>
              <h2 className="mt-4 text-xl font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm text-white/50">{desc}</p>
              <div className="mt-4 rounded-lg bg-white/5 p-4 text-sm text-white/30">{note}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
