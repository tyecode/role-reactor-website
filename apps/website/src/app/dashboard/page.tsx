import { auth } from "@/auth";
import { OverviewLanding } from "@/components/dashboard/overview-landing";

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <OverviewLanding />
    </div>
  );
}
