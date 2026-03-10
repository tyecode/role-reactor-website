import type { Metadata } from "next";
import { botFetchJson } from "@/lib/bot-fetch";
import { PageHeader } from "@/app/dashboard/_components/page-header";

export const metadata: Metadata = {
  title: "Global Stats | Admin Console",
  description: "Global system performance and metrics",
};
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Server,
  Activity,
  Terminal,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { cn, formatCompactNumber } from "@/lib/utils";
import { StatsChart } from "./_components/stats-chart";
import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

interface BotStats {
  bot: {
    id: string;
    username: string;
    tag: string;
  };
  statistics: {
    guilds: number;
    users: number;
  };
}

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

async function getStats() {
  try {
    return await botFetchJson<BotStats>("/stats", {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
  } catch (error) {
    console.error("Failed to fetch bot stats:", error);
    return null;
  }
}

async function getCommandUsage() {
  try {
    return await botFetchJson<CommandUsage>("/commands/usage?limit=5", {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
  } catch (error) {
    console.error("Failed to fetch command usage:", error);
    return null;
  }
}

function StatsLoader() {
  return (
    <NodeLoader
      title="Fetching Statistics"
      subtitle="Synchronizing system analytics..."
    />
  );
}

async function StatsContent() {
  const [stats, usage] = await Promise.all([getStats(), getCommandUsage()]);

  if (!stats) {
    return (
      <Card variant="cyberpunk" className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-red-500">
            <Activity className="size-5 animate-pulse" />
            <p className="font-mono text-sm uppercase font-bold">
              Service Unavailable // Unable to fetch data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Guilds"
          value={formatCompactNumber(stats.statistics.guilds)}
          icon={Server}
          description="Total Discord installations"
          trend="+2.4%"
          color="cyan"
        />
        <StatCard
          title="Total Users"
          value={formatCompactNumber(stats.statistics.users)}
          icon={Users}
          description="Unique users across all servers"
          trend="+5.1%"
          color="fuchsia"
        />
        <StatCard
          title="Executions"
          value={formatCompactNumber(usage?.summary.totalExecutions || 0)}
          icon={Terminal}
          description="Total commands processed"
          trend="+12%"
          color="emerald"
        />
        <StatCard
          title="System Status"
          value="OPTIMAL"
          icon={ShieldCheck}
          description="All processes operational"
          color="amber"
          isStatus
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Command Usage Chart */}
        <Card showGrid className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>
                  Most utilized features in the last 24h
                </CardDescription>
              </div>
              <Terminal className="size-5 text-cyan-500 opacity-50" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <StatsChart data={usage?.commands || []} />
          </CardContent>
        </Card>

        {/* Top Commands List */}
        <Card variant="cyberpunk">
          <CardHeader>
            <CardTitle className="text-lg">Popular Features</CardTitle>
            <CardDescription>Most active modules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {usage?.commands.map((cmd) => (
              <div
                key={cmd.name}
                className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
                    <Terminal className="size-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-zinc-200 uppercase">
                      {cmd.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 italic uppercase tracking-tighter">
                      High usage
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cyan-400 font-mono">
                    {formatCompactNumber(cmd.count)}
                  </p>
                  <p className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase">
                    USES
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default async function AdminStatsPage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Admin Monitoring"
        categoryIcon={Activity}
        title="Global Statistics"
        description="Monitor system-wide bot performance and user growth metrics."
      />

      <Suspense fallback={<StatsLoader />}>
        <StatsContent />
      </Suspense>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "cyan",
  isStatus = false,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  trend?: string;
  color?: "cyan" | "fuchsia" | "emerald" | "amber";
  isStatus?: boolean;
}) {
  const colorMap = {
    cyan: "text-cyan-400 shadow-cyan-400/20",
    fuchsia: "text-fuchsia-400 shadow-fuchsia-400/20",
    emerald: "text-emerald-400 shadow-emerald-400/20",
    amber: "text-amber-400 shadow-amber-400/20",
  };

  const bgMap = {
    cyan: "bg-cyan-400/10 border-cyan-400/20",
    fuchsia: "bg-fuchsia-400/10 border-fuchsia-400/20",
    emerald: "bg-emerald-400/10 border-emerald-400/20",
    amber: "bg-amber-400/10 border-amber-400/20",
  };

  return (
    <Card
      variant="cyberpunk"
      className="group border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
    >
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "p-2 rounded-lg border transition-all duration-500 group-hover:scale-110",
              bgMap[color]
            )}
          >
            <Icon className={cn("size-5", colorMap[color])} />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
              <ArrowUpRight className="size-3" />
              {trend}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
            {title}
          </p>
          <h2
            className={cn(
              "text-3xl font-black tracking-tighter font-mono italic",
              isStatus ? colorMap[color] : "text-white"
            )}
          >
            {value}
          </h2>
        </div>

        <p className="text-[10px] text-zinc-600 font-medium leading-relaxed italic border-t border-white/5 pt-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
