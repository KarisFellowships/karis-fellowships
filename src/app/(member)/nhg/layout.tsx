import { requireTier } from "@/lib/require-tier";

// Defense-in-depth: the NHG area must not rely on middleware (proxy.ts) alone.
// Re-verify server-side that the caller is signed in, active, and an allowed
// tier. The nhg_paid -> /nhg/payment-required gate stays in middleware; this
// layout also wraps that page, so it must NOT itself redirect unpaid nhg users
// (that would loop). Document files are independently protected by /api/documents.
export default async function NHGLayout({ children }: { children: React.ReactNode }) {
  await requireTier(["nhg", "kf", "admin"]);
  return <>{children}</>;
}
