import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { OverviewLanding } from "@/components/dashboard/overview-landing";

export default async function DashboardPage() {
  const session = await auth();

  // Basic auth check (layout handles !session, but we check user)
  if (!session?.user) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <OverviewLanding />
    </div>
  );
}
