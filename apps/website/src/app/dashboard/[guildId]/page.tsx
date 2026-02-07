import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  Users,
  Zap,
  ShieldCheck,
  TrendingUp,
  Settings2,
} from "lucide-react";
import { auth } from "@/auth";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";

async function getGuildStats(guildId: string) {
  try {
    const res = await botFetch(`${API_PREFIX}/guilds/${guildId}/settings`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch guild stats:", error);
    return null;
  }
}

export default async function GuildOverviewPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  const session = await auth();
  const guildData = await getGuildStats(guildId);
  const settings = guildData?.data?.settings || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Guild Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            Server Management
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-4">
            Dashboard
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Monitor and configure your server's Role Reactor features.
          </p>
        </div>
      </div>

      {/* Feature Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              XP System
            </CardTitle>
            <Trophy
              className={
                settings.xp?.enabled
                  ? "text-yellow-500"
                  : "text-muted-foreground opacity-50"
              }
              size={18}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings.xp?.enabled ? "Enabled" : "Disabled"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active engagement rewards
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reaction Roles
            </CardTitle>
            <ShieldCheck className="text-blue-500" size={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings.reactionRoles?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active role assignments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Premium Status
            </CardTitle>
            <Zap
              className={
                guildData?.data?.isPremium?.pro
                  ? "text-primary"
                  : "text-muted-foreground opacity-50"
              }
              size={18}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guildData?.data?.isPremium?.pro ? "Pro Plan" : "Free"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active subscription
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Settings
            </CardTitle>
            <Settings2 className="text-purple-500" size={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage</div>
            <p className="text-xs text-muted-foreground mt-1">
              Global server preferences
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
