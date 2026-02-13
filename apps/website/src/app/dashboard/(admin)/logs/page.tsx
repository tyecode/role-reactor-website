import type { Metadata } from "next";
import { botFetchJson } from "@/lib/bot-fetch";

export const metadata: Metadata = {
  title: "System Logs | Admin Console",
  description: "Real-time system logs and diagnostic data",
};
import { Card, CardContent } from "@/components/ui/card";
import { SystemLogsTerminal } from "./_components/logs-terminal";
import { Terminal, AlertTriangle } from "lucide-react";
import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

interface LogsResponse {
  logs: string[];
  path: string;
  totalLines: number;
}

async function getLogs() {
  try {
    return await botFetchJson<LogsResponse>("/logs?limit=1000");
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    return null;
  }
}

function LogsLoader() {
  return (
    <NodeLoader title="Terminal Uplink" subtitle="Streaming_System_Logs..." />
  );
}

async function LogsContent() {
  const data = await getLogs();

  if (!data) {
    return (
      <Card variant="cyberpunk" className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="size-6 text-red-500 shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="font-mono text-sm text-red-500 font-bold uppercase">
                Connection Failure
              </p>
              <p className="text-zinc-400 text-xs">
                Unable to retrieve system logs. The internal logging service may
                be offline or unreachable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase ml-1 mb-6">
        Live Feed // {data.path}
      </p>
      <SystemLogsTerminal initialLogs={data.logs} />
    </>
  );
}

export default async function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-cyan-500 shadow-cyan-500/20 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center gap-3">
          <Terminal className="size-8" />
          System Logs
        </h1>
      </div>

      <Suspense fallback={<LogsLoader />}>
        <LogsContent />
      </Suspense>
    </div>
  );
}
