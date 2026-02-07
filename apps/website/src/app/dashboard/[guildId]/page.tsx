import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  Zap,
  ShieldCheck,
  Settings2,
  Hash,
  Shield,
  Activity,
  Crown,
} from "lucide-react";
import { auth } from "@/auth";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";

async function getGuildStats(guildId: string) {
  try {
    const res = await botFetch(`${API_PREFIX}/guilds/${guildId}/settings`, {
      next: { revalidate: 0 }, // Disable cache for live updates
    });
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
  await auth();
  const guildResponse = await getGuildStats(guildId);

  const { settings, guildStats, isPremium } = guildResponse || {};

  const stats = [
    {
      label: "Total Members",
      value: guildStats?.memberCount?.toLocaleString() || "0",
      icon: Users,
      trend: "+12.5%",
    },
    {
      label: "Active Roles",
      value: guildStats?.roleCount?.toLocaleString() || "0",
      icon: Shield,
      trend: "Stable",
    },
    {
      label: "XP Multiplier",
      value: settings?.xpMultiplier ? `${settings.xpMultiplier}x` : "1.0x",
      icon: Zap,
      trend: "Active",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-2xl border-2 border-white/5 shadow-2xl">
            <AvatarImage
              src={
                settings?.icon
                  ? `https://cdn.discordapp.com/icons/${guildId}/${settings.icon}.png`
                  : undefined
              }
              alt={settings?.name || "Server"}
            />
            <AvatarFallback className="bg-linear-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold">
              {settings?.name?.charAt(0) || "S"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
              {settings?.name || "Server Overview"}
              {isPremium && (
                <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              )}
            </h1>
            <p className="text-zinc-400 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Bot Active • ID: {guildId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl h-12 px-6 gap-2 border-white/5 font-bold"
            asChild
          >
            <Link href={`/dashboard/${guildId}/settings`}>
              <Settings2 className="w-4 h-4" />
              Settings
            </Link>
          </Button>
          <Button
            size="lg"
            className="rounded-xl h-12 px-8 font-bold shadow-lg shadow-blue-500/20"
            asChild
          >
            <Link
              href={`https://discord.com/channels/${guildId}`}
              target="_blank"
            >
              Open Discord
            </Link>
          </Button>
        </div>
      </div>

      {!guildResponse && <BotInviteCard guildId={guildId} />}

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="bg-zinc-900/40 border-white/5 backdrop-blur-sm group hover:border-blue-500/30 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </CardTitle>
              <stat.icon className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white tabular-nums tracking-tight">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Activity placeholder or feature highlights */}
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Server Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-blue-500">
                  <Hash className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    No Recent Events
                  </h3>
                  <p className="text-zinc-500 max-w-xs mx-auto text-sm">
                    Detailed activity logs will appear here as your community
                    interacts with the bot modules.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions / Status */}
          <Card className="bg-linear-to-br from-blue-600/10 to-purple-600/10 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Premium Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Current Plan</span>
                  <span className="text-xs font-black uppercase text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                    {isPremium ? "Premium" : "Free"}
                  </span>
                </div>
                <p className="text-sm text-white font-medium">
                  {isPremium
                    ? "All advanced modules unlocked"
                    : "Upgrade to unlock advanced modules"}
                </p>
              </div>
              <Button
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-11"
                asChild
              >
                <Link href="/pricing">
                  {isPremium ? "Manage Subscription" : "Upgrade Server"}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Module Status List */}
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Module Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  {
                    name: "XP & Levels",
                    status: settings?.xpEnabled ? "Enabled" : "Disabled",
                    color: settings?.xpEnabled ? "green" : "zinc",
                  },
                  { name: "Reaction Roles", status: "Active", color: "green" },
                  { name: "Welcome System", status: "Upcoming", color: "blue" },
                ].map((module, i) => (
                  <Link
                    key={i}
                    href={`/dashboard/${guildId}/${module.name.toLowerCase().split(" ")[0]}`}
                    className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {module.name}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-${module.color}-500/10 text-${module.color}-500`}
                    >
                      {module.status}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
