import { requireKF } from "@/lib/require-tier";

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  await requireKF();
  return <>{children}</>;
}
