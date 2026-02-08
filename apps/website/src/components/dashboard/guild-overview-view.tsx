"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ExternalLink,
  BarChart3,
  Globe,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";
import { useServerStore } from "@/store/use-server-store";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface GuildOverviewProps {
  guildId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guildStats: any;
  isPremium: boolean;
}

export function GuildOverviewView({
  guildId,
  settings,
  guildStats,
  isPremium,
}: GuildOverviewProps) {
  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  const guildName = activeGuild?.name || settings?.name || "Server Overview";
  const guildIcon = activeGuild?.icon || settings?.icon;

  const stats = [
    {
      label: "Total Members",
      value:
        (
          guildStats?.humanCount ??
          (guildStats?.memberCount || 0) - (guildStats?.botCount || 0)
        ).toLocaleString() || "0",
      icon: Users,
      trend: "+12%",
      trendUp: true,
      color: "blue",
    },
    {
      label: "Active Roles",
      value: guildStats?.roleCount?.toLocaleString() || "0",
      icon: Shield,
      trend: "Stable",
      trendUp: null,
      color: "indigo",
    },
    {
      label: "XP Multiplier",
      value: settings?.xpMultiplier ? `${settings.xpMultiplier}x` : "1.0x",
      icon: Zap,
      trend: "Boosted",
      trendUp: true,
      color: "yellow",
    },
  ];

  const modules = [
    {
      name: "XP & Levels",
      desc: "Gamification system with rewards",
      status: settings?.xpEnabled ? "Active" : "Disabled",
      active: settings?.xpEnabled,
      icon: Trophy,
      color: "yellow",
      href: `/dashboard/${guildId}/xp`,
    },
    {
      name: "Reaction Roles",
      desc: "Self-service role assignment",
      status: "Active",
      active: true,
      icon: Shield,
      color: "blue",
      href: `/dashboard/${guildId}/roles`,
    },
    {
      name: "Welcome System",
      desc: "Automated onboarding messages",
      status: "Coming Soon",
      active: false,
      icon: Globe,
      color: "emerald",
      href: "#",
    },
    {
      name: "Analytics",
      desc: "Server growth and insights",
      status: "Premium",
      active: false,
      icon: BarChart3,
      color: "purple",
      href: "#",
    },
  ];

  return (
    <div className="space-y-8 pb-12 w-full min-w-0 overflow-x-hidden">
      {/* Premium Banner (if visible) */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-purple-500/20 p-6 flex items-center justify-between backdrop-blur-xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-50" />
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h3
                className={cn(
                  "text-lg font-bold text-white flex items-center gap-2",
                  audiowide.className
                )}
              >
                Go Premium
                <Badge
                  variant="outline"
                  className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[10px] font-black"
                >
                  PRO
                </Badge>
              </h3>
              <p className="text-zinc-500 text-xs font-medium">
                Unlock advanced automation, unlimited roles, and more.
              </p>
            </div>
          </div>
          <Button
            className="z-10 bg-white text-black hover:bg-zinc-200 font-black h-10 px-6 rounded-lg border-t border-white/50 shadow-xl transition-all active:scale-95"
            asChild
          >
            <Link href="/pricing">Upgrade Server</Link>
          </Button>

          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-purple-500/10 to-transparent pointer-events-none" />
        </motion.div>
      )}

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 backdrop-blur-xl shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />

          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <Avatar className="h-28 w-28 rounded-3xl border-4 border-zinc-900 shadow-2xl z-10 relative">
              <AvatarImage
                src={
                  guildIcon
                    ? `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`
                    : undefined
                }
                alt={guildName}
                className="rounded-none object-cover"
              />
              <AvatarFallback className="rounded-none bg-gradient-to-br from-blue-600 to-purple-600 text-white text-4xl font-black">
                {guildName.charAt(0) || "S"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 text-center md:text-left z-10 flex flex-col justify-center min-w-0">
            <h1
              className={cn(
                "text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 flex flex-wrap items-center justify-center md:justify-start gap-4",
                audiowide.className
              )}
            >
              {guildName}
              {isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black border-none px-2 py-1 text-[10px] font-black items-center gap-1">
                  <Crown className="w-3 h-3 fill-black" /> PRO
                </Badge>
              )}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 font-medium">
              <span className="flex items-center gap-2.5 bg-zinc-950/50 px-4 py-1.5 rounded-full border border-white/5 text-xs text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </span>
                Active System
              </span>
              <span className="flex items-center gap-2 bg-zinc-950/50 px-4 py-1.5 rounded-full border border-white/5 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                NODE_ID: {guildId.slice(0, 8)}...
              </span>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-3 z-10 mt-6 md:mt-0 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-10 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-md rounded-lg font-black uppercase text-[10px] tracking-wider px-4"
              asChild
            >
              <Link href={`/dashboard/${guildId}/settings`}>
                <Settings2 className="w-3.5 h-3.5 mr-2" /> Global Settings
              </Link>
            </Button>
            <Button
              size="sm"
              className="h-10 bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/20 rounded-lg font-black uppercase text-[10px] tracking-wider px-4 border-t border-white/20"
              asChild
            >
              <Link
                href={`https://discord.com/channels/${guildId}`}
                target="_blank"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-2" /> Discord Client
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Quick Actions Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-zinc-900/40 border border-white/5 p-6 backdrop-blur-xl flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity className="w-3 h-3 text-blue-400" /> Operational Context
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">
                  System Uptime
                </span>
                <span className="text-white font-black tabular-nums text-sm">
                  99.9%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">
                  Total Payload
                </span>
                <span className="text-white font-black tabular-nums text-sm">
                  1,240
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">
                  Pulse Latency
                </span>
                <span className="text-emerald-400 font-black text-sm">
                  32ms
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
            <div className="flex items-center justify-between text-[10px] text-zinc-600 font-black uppercase tracking-widest">
              <span>Next Refresh</span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Clock className="w-3 h-3" /> 59s
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Card className="bg-zinc-900/40 border-white/5 group hover:bg-zinc-800/40 hover:border-white/10 transition-all duration-300 overflow-hidden relative">
              <div
                className={cn(
                  "absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity",
                  stat.color === "blue"
                    ? "text-blue-500"
                    : stat.color === "indigo"
                      ? "text-indigo-500"
                      : "text-yellow-500"
                )}
              >
                <stat.icon className="w-24 h-24 -mt-6 -mr-6 rotate-12" />
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-2.5 rounded-xl bg-gradient-to-br border border-white/5 shadow-inner",
                      stat.color === "blue"
                        ? "from-blue-500/20 to-cyan-500/20 text-blue-400"
                        : stat.color === "indigo"
                          ? "from-indigo-500/20 to-purple-500/20 text-indigo-400"
                          : "from-yellow-500/20 to-orange-500/20 text-yellow-400"
                    )}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  {stat.trend && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-none bg-white/5 tabular-nums",
                        stat.trendUp === true
                          ? "text-emerald-400 bg-emerald-500/10"
                          : stat.trendUp === false
                            ? "text-rose-400 bg-rose-500/10"
                            : "text-zinc-400"
                      )}
                    >
                      {stat.trend}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <h3
                    className={cn(
                      "text-3xl font-black tabular-nums tracking-tight text-white",
                      audiowide.className
                    )}
                  >
                    {stat.value}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Feature Status Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-blue-500 w-5 h-5" /> Module Status
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="h-full"
              >
                {module.active ? (
                  <Link href={module.href} className="h-full block">
                    <Card
                      className={cn(
                        "group h-full transition-all duration-300 border-white/5 bg-zinc-900/40 backdrop-blur-xl hover:bg-zinc-800/60 hover:border-blue-500/20 cursor-pointer rounded-2xl overflow-hidden shadow-xl"
                      )}
                    >
                      <CardContent className="p-5 flex items-start gap-4 h-full relative">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-lg border border-white/5 shrink-0 group-hover:scale-110",
                            `bg-${module.color}-500/10 text-${module.color}-400 group-hover:bg-${module.color}-500 group-hover:text-white`
                          )}
                        >
                          <module.icon className="w-5.5 h-5.5" />
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3
                              className={cn(
                                "font-bold text-white group-hover:text-blue-400 transition-colors truncate",
                                audiowide.className
                              )}
                            >
                              {module.name}
                            </h3>
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"
                              )}
                            />
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed font-medium line-clamp-2">
                            {module.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card
                    className={cn(
                      "group h-full transition-all duration-300 border-white/5 bg-zinc-950/20 opacity-40 cursor-not-allowed border-dashed rounded-2xl"
                    )}
                  >
                    <CardContent className="p-5 flex items-start gap-4 h-full">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-lg bg-zinc-900 text-zinc-600 border border-white/5 shrink-0">
                        <module.icon className="w-5.5 h-5.5" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={cn(
                              "font-bold text-zinc-400 truncate",
                              audiowide.className
                            )}
                          >
                            {module.name}
                          </h3>
                          <div className="w-2 h-2 rounded-full bg-zinc-800" />
                        </div>
                        <p className="text-[11px] text-zinc-600 leading-relaxed font-medium line-clamp-2">
                          {module.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Events (Simplified) */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Hash className="text-zinc-500 w-5 h-5" /> Activity Log
          </h2>

          <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl flex flex-col relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Fake terminal look */}
            <div
              className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: "url('/grid.svg')" }}
            />

            <div className="flex flex-col items-center justify-center text-center p-8 space-y-6 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-zinc-500/10 blur-xl rounded-full animate-pulse" />
                <div className="w-20 h-20 rounded-3xl bg-zinc-900/80 border border-white/5 flex items-center justify-center relative shadow-2xl">
                  <Activity className="w-10 h-10 text-zinc-700" />
                </div>
              </div>
              <div className="space-y-2">
                <h3
                  className={cn(
                    "text-lg font-bold text-zinc-400 uppercase tracking-widest",
                    audiowide.className
                  )}
                >
                  Scanner Active
                </h3>
                <p className="text-xs text-zinc-600 max-w-[220px] mx-auto leading-relaxed border-t border-white/5 pt-4">
                  Observing gateway event streams. Awaiting neural triggers from
                  Discord...
                </p>
              </div>
            </div>

            {/* Fake Footer */}
            <div className="bg-zinc-900/80 border-t border-white/5 p-4 flex items-center justify-between text-[9px] text-zinc-600 font-mono tracking-widest">
              <span className="flex items-center gap-2">
                <div className="w-1 h-3 bg-blue-500/40" />
                DASHBOARD_ID_8802
              </span>
              <span className="flex items-center gap-2 font-black">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                LINK_ACTIVE
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
