import { requireKF } from "@/lib/require-tier";

export default async function ToolboxLayout({ children }: { children: React.ReactNode }) {
  await requireKF();
  return <>{children}</>;
}
