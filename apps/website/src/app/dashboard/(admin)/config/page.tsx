import type { Metadata } from "next";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { Activity } from "lucide-react";
import { SystemHealthViewer } from "./_components/health-viewer";

export const metadata: Metadata = {
  title: "System Health | Admin Console",
  description: "Monitor system health and core operations",
};

export default function SystemHealthPage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Admin Monitoring"
        categoryIcon={Activity}
        title="System Health"
        description="Monitor real-time system performance, resource utilization, and operational status."
      />
      <SystemHealthViewer />
    </div>
  );
}
