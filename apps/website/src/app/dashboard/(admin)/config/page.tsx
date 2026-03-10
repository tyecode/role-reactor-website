import type { Metadata } from "next";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "System Health | Admin Console",
  description: "Monitor system health and core operations",
};
import { Activity } from "lucide-react";
import { SystemHealthViewer } from "./_components/health-viewer";

import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

function HealthLoader() {
  return (
    <NodeLoader
      title="System Diagnosis"
      subtitle="Analyzing operational status..."
    />
  );
}

export default function SystemHealthPage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Admin Monitoring"
        categoryIcon={Activity}
        title="System Health"
        description="Monitor real-time system performance, resource utilization, and operational status."
      />

      <Card
        variant="cyberpunk"
        className="border-white/10 bg-black/80 backdrop-blur-xl"
      >
        <CardHeader className="border-b border-white/5 pb-4 bg-zinc-950/50">
          <CardTitle className="text-lg italic font-mono flex items-center gap-2">
            <Activity className="size-4 text-cyan-500" />
            Live System Metrics
          </CardTitle>
          <CardDescription className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            Click refresh to update metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Suspense fallback={<HealthLoader />}>
            <SystemHealthViewer />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
