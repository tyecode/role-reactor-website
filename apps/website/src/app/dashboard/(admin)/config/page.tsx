import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Activity } from "lucide-react";
import { SystemHealthViewer } from "./health-viewer";

import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

export const metadata = {
  title: "System Health // Role Reactor",
  description: "Real-time system health and performance metrics.",
};

function HealthLoader() {
  return (
    <NodeLoader
      title="Health Check-up"
      subtitle="Scanning_System_Vitality..."
    />
  );
}

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-cyan-500 shadow-cyan-500/20 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center gap-3">
          <Activity className="size-8" />
          System Health
        </h1>
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase ml-1">
          Real-Time Monitoring // Performance Metrics
        </p>
      </div>

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
