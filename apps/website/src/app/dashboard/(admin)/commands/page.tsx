import type { Metadata } from "next";
import { botFetchJson } from "@/lib/bot-fetch";

export const metadata: Metadata = {
  title: "Command Intelligence | Admin Console",
  description: "Configure global system commands and responses",
};
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Terminal,
  Activity,
  Cpu,
  Layers,
  Zap,
  MousePointer2,
  ListFilter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CommandUsageChart } from "./_components/command-chart";
import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

interface CommandUsage {
  commands: Array<{
    name: string;
    count: number;
    lastUsed?: string;
  }>;
  summary: {
    totalCommands: number;
    totalExecutions: number;
  };
}

async function getCommandUsage() {
  try {
    return await botFetchJson<CommandUsage>("/commands/usage?limit=20");
  } catch (error) {
    console.error("Failed to fetch command usage:", error);
    return null;
  }
}

function CommandsLoader() {
  return (
    <NodeLoader
      title="Syncing Logic Nodes"
      subtitle="Retrieving_Global_Usage_Stats..."
    />
  );
}

async function CommandsContent() {
  const usage = await getCommandUsage();

  if (!usage) {
    return (
      <Card variant="cyberpunk" className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-red-500 font-mono text-sm font-black uppercase">
            <Activity className="size-5 animate-pulse" />
            <span>Process monitoring disrupted // API down</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Module Executions"
          value={usage.summary.totalExecutions.toLocaleString()}
          icon={Cpu}
          description="Total logical operations processed"
          color="cyan"
        />
        <MetricCard
          title="Active Modules"
          value={usage.summary.totalCommands.toString()}
          icon={Layers}
          description="Registered system capabilities"
          color="fuchsia"
        />
        <MetricCard
          title="Avg Priority"
          value="LEVEL-01"
          icon={Activity}
          description="Global system response priority"
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Full Usage Chart */}
        <Card showGrid className="h-fit">
          <CardHeader>
            <CardTitle>Temporal Execution Matrix</CardTitle>
            <CardDescription>
              Global module utilization across all sectors
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[450px] pt-4">
            <CommandUsageChart data={usage.commands} />
          </CardContent>
        </Card>

        {/* Breakdown List */}
        <div className="space-y-6">
          <Card variant="cyberpunk" className="bg-zinc-950/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl italic">
                  Capability Feed
                </CardTitle>
                <CardDescription>
                  Real-time module utilization stats
                </CardDescription>
              </div>
              <ListFilter className="size-4 text-zinc-600" />
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {usage.commands.map((cmd, idx) => (
                <div
                  key={cmd.name}
                  className="group flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/20 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-zinc-600 font-black w-4">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="p-2 bg-zinc-900 rounded group-hover:scale-110 transition-transform">
                      <Terminal className="size-4 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-zinc-100 uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                        /{cmd.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="text-[8px] h-3 px-1 border-zinc-800 text-zinc-600 font-black tracking-widest uppercase"
                        >
                          STABLE
                        </Badge>
                        <span className="text-[9px] text-zinc-700 font-mono italic">
                          Sector {100 + idx}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-lg font-black font-mono text-white tracking-tighter">
                        {cmd.count.toLocaleString()}
                      </span>
                      <Zap className="size-3 text-amber-500 animate-pulse" />
                    </div>
                    <p className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">
                      Invocations
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Hint Card */}
          <Card variant="glass" className="border-cyan-500/10 bg-cyan-500/5">
            <CardContent className="pt-6 flex gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-full h-fit self-start">
                <MousePointer2 className="size-5 text-cyan-400" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                  Developer Tip
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                  Module performance is currently within optimal parameters.
                  High-usage modules (/{usage.commands[0]?.name}) should be
                  monitored for rate limit threshold breaches in Tier 2 sectors.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default async function AdminCommandsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-cyan-500 shadow-cyan-500/20 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center gap-3">
          <Activity className="size-8" />
          Command Analytics
        </h1>
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase ml-1">
          Logic Execution Matrix // Global Scope
        </p>
      </div>

      <Suspense fallback={<CommandsLoader />}>
        <CommandsContent />
      </Suspense>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  color = "cyan",
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color?: "cyan" | "fuchsia" | "emerald";
}) {
  const colorMap = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    fuchsia: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  };

  return (
    <Card variant="cyberpunk" className="group">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-black mb-1">
              {title}
            </p>
            <h2 className="text-3xl font-black tracking-tighter text-white font-mono italic">
              {value}
            </h2>
          </div>
          <div
            className={cn(
              "p-2 rounded-lg border",
              colorMap[color as keyof typeof colorMap]
            )}
          >
            <Icon className="size-5" />
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 mt-4 pt-4 border-t border-white/5 italic">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
