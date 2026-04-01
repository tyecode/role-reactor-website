import type { Metadata } from "next";
import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { PageHeader } from "@/app/dashboard/_components/page-header";

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
  const session = await auth();
  const userId = session?.user?.id;

  try {
    return await botFetchJson<LogsResponse>("/logs?limit=1000", { userId });
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    return null;
  }
}

function LogsLoader() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
      <NodeLoader
        title="Loading Dashboard"
        subtitle="Synchronizing your data..."
      />
    </div>
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
      <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase ml-1 mb-3">
        Live Feed // {data.path}
      </p>
      <SystemLogsTerminal initialLogs={data.logs} />
    </>
  );
}

export default async function AdminLogsPage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Admin Monitoring"
        categoryIcon={Terminal}
        title="System Logs"
        description="Monitor real-time system events and diagnostic output from the bot instance."
      />

      <Suspense fallback={<LogsLoader />}>
        <LogsContent />
      </Suspense>
    </div>
  );
}
