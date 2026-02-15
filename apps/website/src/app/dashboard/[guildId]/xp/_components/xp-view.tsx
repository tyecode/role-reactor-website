"use client";

import { useState } from "react";
import {
  Trophy,
  Settings as SettingsIcon,
  Search,
  Users,
  Zap,
  Crown,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Audiowide } from "next/font/google";

import { cn } from "@/lib/utils";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { XPSettingsTab } from "./settings-tab";
import { LeaderboardEntry } from "@/types/discord";
import { NodeLoader } from "@/components/common/node-loader";
import { ErrorView } from "@/components/common/error-view";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface XPViewProps {
  guildId: string;
}

export function XPView({ guildId }: XPViewProps) {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    leaderboard,
    isLoading: leaderboardLoading,
    isError: leaderboardError,
    isXpDisabled,
    mutate,
  } = useLeaderboard(guildId);

  const loading = leaderboardLoading;
  const error = leaderboardError?.message;

  const filteredLeaderboard = leaderboard.filter((entry: LeaderboardEntry) =>
    entry.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const averageLevel =
    leaderboard.length > 0
      ? Math.round(
          leaderboard.reduce(
            (acc: number, curr: LeaderboardEntry) => acc + curr.level,
            0
          ) / leaderboard.length
        )
      : 0;

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full min-w-0"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 min-w-0">
        <TabsList variant="neon" className="w-full sm:w-auto flex min-w-0">
          <TabsTrigger
            value="leaderboard"
            variant="neon"
            className={cn(
              "flex-1 sm:flex-none gap-2 min-w-0",
              audiowide.className
            )}
          >
            <Trophy className="w-4 h-4" />
            <span className="truncate">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            variant="neon-purple"
            className={cn(
              "flex-1 sm:flex-none gap-2 min-w-0",
              audiowide.className
            )}
          >
            <SettingsIcon className="w-4 h-4" />
            <span className="truncate">Settings</span>
          </TabsTrigger>
        </TabsList>

        {activeTab === "leaderboard" && (
          <div className="relative w-full sm:w-72 min-w-0 group/search">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/search:text-cyan-400 transition-colors" />
            <Input
              placeholder="Search operators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="search"
              className={cn("pl-11 w-full", audiowide.className)}
            />
          </div>
        )}
      </div>

      <TabsContent
        value="leaderboard"
        className="mt-0 focus-visible:outline-none min-h-[500px] w-full overflow-hidden"
      >
        {loading ? (
          <LeaderboardSkeleton />
        ) : isXpDisabled ? (
          <XPDisabledState onEnable={() => setActiveTab("settings")} />
        ) : error ? (
          <ErrorView
            title="Update Failed"
            message={error}
            onRetry={() => mutate()}
            showHome={false}
          />
        ) : leaderboard.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Champion Card */}
              <Card
                variant="cyberpunk"
                className="border-amber-500/20 hover:border-amber-500/40"
              >
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Crown className="w-24 h-24 rotate-12 text-amber-500" />
                </div>
                <div className="p-5 flex items-center gap-4 relative">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-2 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
                    <Avatar className="h-12 w-12 border-2 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] relative z-10 rounded-xl">
                      <AvatarImage
                        src={leaderboard[0]?.user.avatar || undefined}
                      />
                      <AvatarFallback className="bg-amber-950 text-amber-500 font-black text-xs">
                        {(leaderboard[0]?.user.username || "?")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-lg border border-amber-400 shadow-[0_0_10px_#f59e0b] z-20">
                      RANK I
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "text-[10px] font-black text-amber-500/80 uppercase tracking-widest mb-0.5",
                        audiowide.className
                      )}
                    >
                      GRAND CHAMPION
                    </div>
                    <div
                      className={cn(
                        "font-black text-white truncate text-sm uppercase tracking-wide",
                        audiowide.className
                      )}
                      title={leaderboard[0]?.user.username}
                    >
                      {leaderboard[0]?.user.username || "TBA"}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-bold font-mono truncate uppercase">
                      Lvl {leaderboard[0]?.level || 0} •{" "}
                      {leaderboard[0]?.totalXP.toLocaleString()} XP
                    </div>
                  </div>
                </div>
              </Card>

              {/* Active Users */}
              <Card
                variant="stat"
                className="border-cyan-500/20 hover:border-cyan-500/40 p-5 flex flex-col justify-center min-h-[100px]"
              >
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-20 h-20 rotate-12 text-cyan-500" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
                  <Users className="w-4 h-4 text-cyan-500" />
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      audiowide.className
                    )}
                  >
                    Total Members
                  </span>
                </div>
                <div
                  className={cn(
                    "text-3xl font-black text-white relative z-10 tabular-nums",
                    audiowide.className
                  )}
                >
                  {leaderboard.length.toLocaleString()}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
              </Card>

              {/* Average Level */}
              <Card
                variant="stat"
                className="border-purple-500/20 hover:border-purple-500/40 p-5 flex flex-col justify-center min-h-[100px]"
              >
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap className="w-20 h-20 rotate-12 text-purple-500" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      audiowide.className
                    )}
                  >
                    Average Level
                  </span>
                </div>
                <div
                  className={cn(
                    "text-3xl font-black text-white relative z-10 tabular-nums",
                    audiowide.className
                  )}
                >
                  {averageLevel}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />
              </Card>

              {/* Total XP */}
              <Card
                variant="stat"
                className="border-emerald-500/20 hover:border-emerald-500/40 p-5 flex flex-col justify-center min-h-[100px]"
              >
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy className="w-20 h-20 rotate-12 text-emerald-500" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      audiowide.className
                    )}
                  >
                    System Energy
                  </span>
                </div>
                <div
                  className={cn(
                    "text-3xl font-black text-white relative z-10 tabular-nums",
                    audiowide.className
                  )}
                >
                  {(
                    leaderboard.reduce(
                      (acc: number, curr: LeaderboardEntry) =>
                        acc + curr.totalXP,
                      0
                    ) / 1000
                  ).toFixed(1)}
                  <span className="text-emerald-500">K</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
              </Card>
            </div>

            <Card variant="cyberpunk" className="w-full shadow-2xl">
              <div className="p-0 overflow-x-auto">
                <div className="min-w-[400px]">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] uppercase font-black text-zinc-500 tracking-widest border-b border-white/5 bg-white/2 min-w-0">
                    <div
                      className={cn(
                        "col-span-1 text-center font-black",
                        audiowide.className
                      )}
                    >
                      #
                    </div>
                    <div
                      className={cn(
                        "col-span-5 sm:col-span-5 md:col-span-5",
                        audiowide.className
                      )}
                    >
                      Community Members
                    </div>
                    <div
                      className={cn(
                        "hidden md:block md:col-span-4 text-right",
                        audiowide.className
                      )}
                    >
                      Level Progress
                    </div>
                    <div
                      className={cn(
                        "col-span-6 sm:col-span-6 md:col-span-2 text-right",
                        audiowide.className
                      )}
                    >
                      Total XP
                    </div>
                  </div>

                  <div className="max-h-[800px] overflow-y-auto overflow-x-hidden custom-scrollbar min-w-0">
                    {(searchQuery ? filteredLeaderboard : leaderboard).map(
                      (entry: LeaderboardEntry, i: number) => {
                        const actualRank = searchQuery
                          ? leaderboard.findIndex(
                              (e: LeaderboardEntry) => e.userId === entry.userId
                            ) + 1
                          : i + 1;

                        const isTop3 = actualRank <= 3;

                        // Deterministic progress for UI flair
                        const progress = (entry.totalXP % 1000) / 10;

                        return (
                          <motion.div
                            key={entry.userId}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.01 }}
                            className={cn(
                              "grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/3 transition-all border-b border-white/5 last:border-0 group relative min-w-0",
                              isTop3 && "bg-white/1"
                            )}
                          >
                            <div className="col-span-1 flex justify-center">
                              <Badge
                                variant={
                                  actualRank === 1
                                    ? "premium"
                                    : actualRank === 2
                                      ? "outline"
                                      : actualRank === 3
                                        ? "outline" // Fallback for bronze as we don't have it, or use manual for now
                                        : "secondary"
                                }
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center rounded-xl p-0 font-black text-[10px] tabular-nums transition-all duration-300 group-hover:scale-110",
                                  actualRank === 2 &&
                                    "text-zinc-300 border-white/20 bg-white/10", // Silver override
                                  actualRank === 3 &&
                                    "text-orange-400 border-orange-500/40 bg-orange-500/20", // Bronze override
                                  actualRank > 3 &&
                                    "text-zinc-500 border-white/10 bg-zinc-900", // Default override
                                  audiowide.className
                                )}
                              >
                                {actualRank}
                              </Badge>
                            </div>

                            <div className="col-span-5 sm:col-span-5 md:col-span-5 flex items-center gap-3 sm:gap-4 min-w-0">
                              <div className="relative shrink-0">
                                {isTop3 && (
                                  <div
                                    className={cn(
                                      "absolute -inset-1 blur-md rounded-lg opacity-40 animate-pulse",
                                      actualRank === 1
                                        ? "bg-amber-500"
                                        : actualRank === 2
                                          ? "bg-zinc-300"
                                          : "bg-orange-500"
                                    )}
                                  />
                                )}
                                <Avatar
                                  className={cn(
                                    "h-10 w-10 sm:h-11 sm:w-11 shrink-0 transition-all duration-300 group-hover:border-white/20 rounded-xl relative z-10",
                                    isTop3
                                      ? "border-2 border-white/20"
                                      : "border border-white/10"
                                  )}
                                >
                                  <AvatarImage
                                    src={entry.user.avatar || undefined}
                                  />
                                  <AvatarFallback className="bg-zinc-900 font-black text-[10px] text-zinc-500">
                                    {entry.user.username
                                      .slice(0, 2)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="truncate min-w-0 flex flex-col">
                                <div
                                  className={cn(
                                    "font-black transition-colors truncate text-sm uppercase tracking-wide",
                                    isTop3
                                      ? "text-white group-hover:text-cyan-400"
                                      : "text-zinc-400 group-hover:text-white",
                                    audiowide.className
                                  )}
                                >
                                  {entry.user.username}
                                </div>
                                <div className="text-[9px] text-zinc-600 font-black flex items-center gap-2 uppercase tracking-tighter">
                                  LEVEL {entry.level}
                                  {isTop3 && (
                                    <Badge
                                      variant="pro"
                                      className="text-[8px] h-4 px-1.5"
                                    >
                                      ELITE
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="hidden md:flex md:col-span-4 flex-col justify-center gap-2.5 px-4">
                              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all duration-1000 relative z-10",
                                    isTop3
                                      ? "bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500"
                                      : "bg-cyan-600 opacity-40 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                  )}
                                  style={{ width: `${progress}%` }}
                                />
                                <div className="absolute inset-0 bg-white/5 animate-pulse" />
                              </div>
                              <div className="flex justify-between items-center text-[8px] uppercase tracking-widest font-black text-zinc-600">
                                <span>Progress</span>
                                <span className="text-zinc-500">
                                  {progress.toFixed(0)}%
                                </span>
                              </div>
                            </div>

                            <div
                              className={cn(
                                "col-span-6 sm:col-span-6 md:col-span-2 text-right font-black text-xs tabular-nums transition-colors tracking-widest",
                                isTop3
                                  ? "text-cyan-400"
                                  : "text-zinc-500 group-hover:text-white",
                                audiowide.className
                              )}
                            >
                              {entry.totalXP.toLocaleString()}
                            </div>

                            {/* Hover accent */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-cyan-500 group-hover:h-1/2 transition-all duration-300 rounded-r-full shadow-[0_0_15px_#06b6d4]" />
                          </motion.div>
                        );
                      }
                    )}

                    {searchQuery && filteredLeaderboard.length === 0 && (
                      <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                          <Search className="w-6 h-6 text-zinc-700" />
                        </div>
                        <h4
                          className={cn(
                            "text-white font-black uppercase tracking-widest",
                            audiowide.className
                          )}
                        >
                          No users found
                        </h4>
                        <p className="text-zinc-500 text-xs font-bold mt-1">
                          We couldn't find any results for "{searchQuery}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </TabsContent>

      <TabsContent value="settings" className="mt-0 focus-visible:outline-none">
        <XPSettingsTab guildId={guildId} />
      </TabsContent>
    </Tabs>
  );
}

function LeaderboardSkeleton() {
  return (
    <NodeLoader
      title="Loading Leaderboard"
      subtitle="Synchronizing player data..."
    />
  );
}

function XPDisabledState({ onEnable }: { onEnable: () => void }) {
  return (
    <Card
      variant="cyberpunk"
      showGrid
      className="flex flex-col items-center justify-center py-24 text-center border-dashed"
    >
      <div className="absolute inset-0 bg-linear-to-b from-red-500/5 to-transparent pointer-events-none" />
      <div className="p-8 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl relative group">
        <div className="absolute -inset-4 bg-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Lock className="w-16 h-16 text-zinc-700 group-hover:text-red-500 transition-colors" />
      </div>
      <div className="max-w-md space-y-3 relative z-10">
        <h3
          className={cn(
            "text-3xl font-black text-white uppercase tracking-widest",
            audiowide.className
          )}
        >
          XP System Offline
        </h3>
        <p className="text-zinc-500 font-bold text-sm leading-relaxed">
          The leveling system is currently disabled for this server. Enable it
          to start tracking user activity.
        </p>
      </div>
      <Button
        variant="cyber"
        onClick={onEnable}
        className="h-14 px-10 tracking-widest"
      >
        Configure Settings
        <Zap className="ml-2 w-4 h-4 fill-black group-hover:animate-pulse" />
      </Button>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card
      variant="cyberpunk"
      showGrid
      className="flex flex-col items-center justify-center py-24 text-center border-dashed"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-zinc-500/5 blur-3xl rounded-full" />
        <Trophy className="w-20 h-20 text-zinc-800 animate-pulse" />
      </div>
      <div className="max-w-md space-y-3">
        <h3
          className={cn(
            "text-2xl font-black text-white uppercase tracking-widest",
            audiowide.className
          )}
        >
          No Rankings Yet
        </h3>
        <p className="text-zinc-500 font-bold text-sm leading-relaxed">
          Wait for users to chat or interact to see them appear here.
        </p>
      </div>
    </Card>
  );
}
