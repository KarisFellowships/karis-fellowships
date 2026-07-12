import { requireKF } from "@/lib/require-tier";

export default async function OtherStudiesLayout({ children }: { children: React.ReactNode }) {
  await requireKF();
  return <>{children}</>;
}
