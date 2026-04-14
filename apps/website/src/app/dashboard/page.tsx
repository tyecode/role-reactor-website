import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { OverviewLanding } from "@/app/dashboard/_components/overview-landing";
import { SystemHealth } from "@/app/dashboard/_components/system-health";
import { isDeveloper } from "@/lib/admin";
import { getManageableGuilds } from "@/lib/server/guilds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Zap, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  // 1. Basic auth check
  if (!session?.user) {
    notFound();
  }

  // 2. Developer/Admin View Fast-Pass
  if (isDeveloper(session.user)) {
    return (
      <div className="space-y-6 w-full">
        {/* Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OverviewNavCard
            title="Global Statistics"
            description="Global bot statistics, server count and user growth metrics."
            href="/dashboard/stats"
            icon={BarChart3}
            color="cyan"
            stats="2.4k GUILDS"
          />
          <OverviewNavCard
            title="Revenue & Billing"
            description="Revenue tracking, payment history and system financial health."
            href="/dashboard/revenue"
            icon={Zap}
            color="emerald"
            stats="$12.5k TOTAL"
          />
          <OverviewNavCard
            title="System Analytics"
            description="Internal command analytics and module utilization logs."
            href="/dashboard/commands"
            icon={Terminal}
            color="fuchsia"
            stats="450k USES"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* System Health */}
          <SystemHealth />

          {/* Console Logs Preview */}
          <Card
            variant="cyberpunk"
            className="bg-black/60 border-white/5 font-mono"
          >
            <CardHeader className="border-b border-white/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Terminal className="size-4" />
                  Terminal Logs
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-[10px] border-cyan-500/30 text-cyan-400"
                >
                  LIVE_FEED
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-[11px] leading-tight">
              <p className="text-emerald-500/80">
                [12:51:22] <span className="text-zinc-500">INFO:</span> Gateway
                connection established @ shard 0
              </p>
              <p className="text-cyan-500/80">
                [12:51:24] <span className="text-zinc-500">INFO:</span> Syncing
                42 application commands...
              </p>
              <p className="text-emerald-500/80">
                [12:52:05] <span className="text-zinc-500">INFO:</span> Payment
                validated // TX: knot_7f8a9...
              </p>
              <p className="text-cyan-500/80">
                [12:53:11] <span className="text-zinc-500">INFO:</span> AI
                processing complete for request ID 235088...
              </p>
              <p className="text-cyan-500/80">
                [12:54:42] <span className="text-zinc-500">INFO:</span>{" "}
                Calculated stats for 2,412 guilds in 142ms
              </p>
              <div className="flex items-center gap-1 animate-pulse text-cyan-500 mt-4">
                <div className="w-1.5 h-3 bg-current" />
                <span>_</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 3. Regular User View Fast-Pass
  // We check if they have guilds with the bot installed on the server
  const { installedGuildIds } = await getManageableGuilds();

  if (installedGuildIds.length > 0) {
    // Instant redirect to the first installed guild found
    redirect(`/dashboard/${installedGuildIds[0]}`);
  }

  // 4. Default: Show Onboarding
  return (
    <div className="space-y-6 w-full">
      <OverviewLanding />
    </div>
  );
}

interface OverviewNavCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cyan" | "emerald" | "fuchsia";
  stats: string;
}

function OverviewNavCard({
  title,
  description,
  href,
  icon: Icon,
  color,
  stats,
}: OverviewNavCardProps) {
  const colors = {
    cyan: "text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/50 bg-cyan-500/5",
    emerald:
      "text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/50 bg-emerald-500/5",
    fuchsia:
      "text-fuchsia-400 border-fuchsia-500/20 group-hover:border-fuchsia-500/50 bg-fuchsia-500/5",
  };

  return (
    <Link href={href}>
      <Card
        variant="cyberpunk"
        className={cn(
          "group h-full transition-all duration-500",
          colors[color as keyof typeof colors]
        )}
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
              <Icon className="size-5" />
            </div>
            <ArrowRight className="size-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
          <CardTitle className="text-lg uppercase italic font-black">
            {title}
          </CardTitle>
          <CardDescription className="text-[10px] font-medium leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-current animate-pulse" />
            <span className="text-xs font-mono font-black tracking-widest uppercase">
              {stats}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
