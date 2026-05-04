import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSessionProfile();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
