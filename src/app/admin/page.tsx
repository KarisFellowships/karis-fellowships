import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-cream pt-8">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
        <p className="mt-2 text-slate">
          Manage members, content, and email communications.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-teal/20 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal text-lg text-white">
              👥
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">Members</h2>
            <p className="mt-2 text-sm text-slate">
              View all members, upgrade NHG to KF, suspend or remove access.
            </p>
            <div className="mt-4 rounded-lg bg-slate-light p-4 text-sm text-slate">
              Member management will connect to Supabase.
            </div>
          </div>

          <div className="rounded-2xl border-2 border-coral/20 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral text-lg text-white">
              📝
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">Content</h2>
            <p className="mt-2 text-sm text-slate">
              Edit lessons, upload documents, manage toolbox resources via Sanity Studio.
            </p>
            <div className="mt-4 rounded-lg bg-slate-light p-4 text-sm text-slate">
              Will link to Sanity Studio once configured.
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber/20 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-lg text-white">
              ✉️
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">Email</h2>
            <p className="mt-2 text-sm text-slate">
              Send broadcast emails, edit templates, preview upcoming automated sends.
            </p>
            <div className="mt-4 rounded-lg bg-slate-light p-4 text-sm text-slate">
              Email system will connect to Resend.
            </div>
          </div>

          <div className="rounded-2xl border-2 border-sky/20 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-lg text-white">
              📅
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">Schedule</h2>
            <p className="mt-2 text-sm text-slate">
              View and manage the KF date schedule and lesson assignments.
            </p>
            <div className="mt-4 rounded-lg bg-slate-light p-4 text-sm text-slate">
              Date engine will pull from Supabase schedule table.
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-sm font-medium text-teal hover:text-teal-hover transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
