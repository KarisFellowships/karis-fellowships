import { createAdminClient } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/require-tier";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  await requireAdmin();
  const admin = createAdminClient();

  const { data: members } = await admin
    .from("users")
    .select("id, email, name, tier, active, nhg_paid, kf_invited, kf_registered_year, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="relative z-10" style={{ background: "linear-gradient(135deg, #0a6c6e 0%, #0d9494 50%, #14b8a6 100%)" }}>
        <div className="absolute inset-0 bg-white/[0.06]" />
        <div className="relative px-6 pb-6 pt-10 sm:pt-12 sm:pb-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Administration</p>
            <h1 className="mt-1.5 font-serif text-3xl font-semibold text-white sm:text-4xl">Admin Panel</h1>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 pt-6">
        <div className="mx-auto max-w-7xl">
          <AdminPanel initialMembers={members ?? []} />
        </div>
      </section>
    </div>
  );
}
