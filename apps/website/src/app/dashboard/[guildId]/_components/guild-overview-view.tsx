"use client";
import { useState, useEffect } from "react";

import { GuildHero } from "./guild-hero";
import { useServerStore } from "@/store/use-server-store";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Rocket, Cable, TrendingUp } from "lucide-react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";

import { cn, getDiscordImageUrl } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_GROWTH_DATA = [
  { label: "Day 1", joins: 0, leaves: 0 },
  { label: "Day 2", joins: 0, leaves: 0 },
  { label: "Day 3", joins: 0, leaves: 0 },
  { label: "Day 4", joins: 0, leaves: 0 },
  { label: "Day 5", joins: 0, leaves: 0 },
  { label: "Day 6", joins: 0, leaves: 0 },
  { label: "Day 7", joins: 0, leaves: 0 },
];

interface GuildOverviewProps {
  guildId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guildStats: any;
  isPremium: boolean;
}

import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function GuildOverviewView({
  guildId,
  settings: initialSettings,
  guildStats: initialGuildStats,
  isPremium: initialIsPremium,
}: GuildOverviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { data } = useSWR(`/api/guilds/${guildId}/settings`, fetcher, {
    fallbackData: {
      settings: initialSettings,
      guildStats: initialGuildStats,
      isPremium: initialIsPremium,
    },
    refreshInterval: 60000,
    revalidateOnFocus: true,
  });

  const settings = data?.settings || initialSettings;
  const guildStats = data?.guildStats || initialGuildStats;
  const isPremium = data?.isPremium ?? initialIsPremium;

  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  const guildName = activeGuild?.name || settings?.name || "Node Hub";
  const guildIcon = activeGuild?.icon || settings?.icon;

  const growthData =
    guildStats?.growthHistory?.length > 0
      ? guildStats.growthHistory
      : DEFAULT_GROWTH_DATA;

  const onlineCount =
    guildStats?.onlineCount ??
    guildStats?.presence_count ??
    guildStats?.approximate_presence_count ??
    0;
  const memberCount = guildStats?.memberCount || 1;
  const onlinePercentage = (onlineCount / memberCount) * 100;
  let onlineStatusText = "Systems Idle";

  if (onlineCount > 0) {
    if (onlinePercentage > 40) onlineStatusText = "High Traffic";
    else if (onlinePercentage > 20) onlineStatusText = "Moderate Activity";
    else if (onlinePercentage > 5) onlineStatusText = "Low Activity";
  } else {
    onlineStatusText = "Server Inactive";
  }

  const stats = [
    {
      label: "Total Members",
      value:
        (
          guildStats?.humanCount ??
          (guildStats?.memberCount || 0) - (guildStats?.botCount || 0)
        ).toLocaleString() || "0",
      icon: Users,
      trend:
        guildStats?.growth?.new7d > 0
          ? `+${guildStats.growth.new7d} this week`
          : "Stable",
      trendUp: guildStats?.growth?.new7d > 0,
      color: "cyan",
    },
    {
      label: "Server Boosts",
      value: guildStats?.premiumSubscriptionCount?.toString() || "0",
      icon: Rocket,
      trend: `Level ${guildStats?.premiumTier || 0}`,
      trendUp: null,
      color: "fuchsia",
    },
    {
      label: "Online Now",
      value: onlineCount.toLocaleString(),
      icon: Cable,
      trend: onlineStatusText,
      trendUp: null,
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Premium Banner (if visible) */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            variant="cyberpunk"
            className="p-6 flex items-center justify-between border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-blue-600/10 opacity-50" />
            <div className="flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
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
                    variant="pro"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30"
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
              variant="neon"
              size="lg"
              className="z-10 bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/20"
              asChild
            >
              <Link href="/pricing">Upgrade Server</Link>
            </Button>

            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-purple-500/10 to-transparent pointer-events-none" />
          </Card>
        </motion.div>
      )}

      {/* Hero Header */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <GuildHero
          guildName={guildName}
          guildIcon={guildIcon}
          guildId={guildId}
        />

        {/* Recent Arrivals Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          <Card
            variant="glass"
            className="h-full flex flex-col relative overflow-hidden"
          >
            <CyberpunkBackground
              gridSize={24}
              gridOpacity={0.02}
              gridColor="#10b981"
              showGlows={true}
              glowOpacity={0.3}
            />
            <div className="relative z-10 flex flex-col h-full p-6">
              <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users className="w-3 h-3 text-cyan-400" /> Recent Arrivals
              </h3>

              <div className="space-y-2 pb-2 flex-1 overflow-y-auto pr-1 custom-scrollbar max-h-[300px] xl:max-h-none">
                {guildStats?.recentMembers?.length > 0 ? (
                  guildStats.recentMembers.map(
                    (member: {
                      userId: string;
                      username: string;
                      avatar: string;
                      joinedAt: string;
                    }) => (
                      <Link
                        key={member.userId}
                        href={`https://discord.com/users/${member.userId}`}
                        target="_blank"
                        className="block"
                      >
                        <Card
                          variant="glass"
                          className="p-2.5 transition-all group cursor-pointer flex-1"
                          contentClassName="flex-row items-center gap-3"
                        >
                          <Avatar variant="cyber" size="sm">
                            <AvatarImage
                              src={
                                getDiscordImageUrl(
                                  "avatars",
                                  member.userId,
                                  member.avatar,
                                  64
                                ) || undefined
                              }
                              alt={member.username}
                              width={32}
                              height={32}
                            />
                            <AvatarFallback>
                              {member.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col z-10 relative">
                            <span className="text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                              {member.username}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Joined{" "}
                              {new Date(member.joinedAt).toLocaleDateString(
                                [],
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}{" "}
                              •{" "}
                              {new Date(member.joinedAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </Card>
                      </Link>
                    )
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 opacity-40">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center mb-4">
                      <Users className="w-5 h-5 text-zinc-600" />
                    </div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      No Recent Joins
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-5 space-y-3 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                    Member Split
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 text-[10px] font-black">
                      {guildStats?.humanCount || 0}H
                    </span>
                    <span className="text-zinc-700 text-[10px] font-black">
                      /
                    </span>
                    <span className="text-fuchsia-400 text-[10px] font-black">
                      {guildStats?.botCount || 0}B
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                    Growth Trend
                  </span>
                  <Badge variant="accent" className="py-1">
                    +{guildStats?.growth?.new24h || 0} TODAY
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={cn(i === 2 ? "sm:col-span-2 xl:col-span-1" : "")}
          >
            <Card
              variant="stat"
              className="group transition-all duration-300 h-full"
            >
              <div
                className={cn(
                  "absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity",
                  stat.color === "cyan"
                    ? "text-cyan-500"
                    : stat.color === "fuchsia"
                      ? "text-fuchsia-500"
                      : stat.color === "emerald"
                        ? "text-emerald-500"
                        : "text-zinc-500"
                )}
              >
                <stat.icon className="w-24 h-24 -mt-6 -mr-6 rotate-12" />
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-2.5 rounded-md bg-linear-to-br border border-white/5 shadow-inner",
                      stat.color === "cyan"
                        ? "from-cyan-500/20 to-blue-500/20 text-cyan-400"
                        : stat.color === "fuchsia"
                          ? "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-400"
                          : stat.color === "emerald"
                            ? "from-emerald-500/20 to-teal-500/20 text-emerald-400"
                            : "from-zinc-500/20 to-slate-500/20 text-zinc-400"
                    )}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  {stat.trend && (
                    <Badge
                      variant={
                        stat.trendUp === true
                          ? "success"
                          : stat.trendUp === false
                            ? "destructive"
                            : stat.color === "fuchsia"
                              ? "info"
                              : stat.color === "cyan"
                                ? "accent"
                                : stat.color === "emerald"
                                  ? "success"
                                  : "outline"
                      }
                      className="tabular-nums border-none"
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

      {/* Main Content Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-emerald-500 w-5 h-5" /> Server Growth
            Insights
          </h2>
        </div>
        <Card variant="glass">
          <CyberpunkBackground
            gridSize={24}
            gridOpacity={0.02}
            gridColor="#00ffff"
            showGlows={true}
            glowOpacity={0.4}
          />
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Member Growth Trend
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  Last 14 Days • Joins vs Leaves
                </p>
              </div>
              <div className="flex items-center gap-6 bg-zinc-950/40 px-4 py-2 rounded-md border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  <span className="text-[11px] text-zinc-300 font-black uppercase tracking-wider">
                    Joins
                  </span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.4)]" />
                  <span className="text-[11px] text-zinc-300 font-black uppercase tracking-wider">
                    Leaves
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              {!isMounted ? (
                <div className="h-full w-full bg-cyan-500/5 animate-pulse rounded-xl border border-cyan-500/10" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient
                        id="colorJoins"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#06b6d4"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#06b6d4"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorLeaves"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#d946ef"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#d946ef"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#ffffff05"
                    />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#71717a",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#71717a",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                      tickFormatter={(value) => (value === 0 ? "" : value)}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-zinc-950 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                              <p className="text-[10px] font-black text-zinc-500 uppercase mb-3 px-1 border-b border-white/5 pb-2">
                                {label}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-6">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    <span className="text-xs font-bold text-zinc-300">
                                      Joins
                                    </span>
                                  </div>
                                  <span className="text-xs font-black text-white bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                                    {payload[0].value}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-6">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                                    <span className="text-xs font-bold text-zinc-300">
                                      Leaves
                                    </span>
                                  </div>
                                  <span className="text-xs font-black text-white bg-fuchsia-500/10 px-1.5 py-0.5 rounded border border-fuchsia-500/20">
                                    {payload[1].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="joins"
                      stroke="#06b6d4"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorJoins)"
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="leaves"
                      stroke="#d946ef"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorLeaves)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
