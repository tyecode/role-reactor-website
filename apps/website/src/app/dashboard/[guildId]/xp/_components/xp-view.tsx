"use client";

import { useState } from "react";
import {
  Trophy,
  Settings as SettingsIcon,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { XPSettingsTab } from "./settings-tab";
import { LeaderboardEntry } from "@/types/discord";
import { NodeLoader } from "@/components/common/node-loader";

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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 min-w-0">
        <TabsList className="bg-zinc-900/80 border border-white/5 p-1 h-auto rounded-xl backdrop-blur-xl w-full sm:w-auto flex min-w-0">
          <TabsTrigger
            value="leaderboard"
            className="flex-1 sm:flex-none rounded-lg px-2 sm:px-6 py-2 text-[11px] sm:text-sm font-bold data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-w-0"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="truncate">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 sm:flex-none rounded-lg px-2 sm:px-6 py-2 text-[11px] sm:text-sm font-bold data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-w-0"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span className="truncate">Settings</span>
          </TabsTrigger>
        </TabsList>

        {activeTab === "leaderboard" && (
          <div className="relative w-full sm:w-64 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-900/50 border-white/10 rounded-xl focus-visible:ring-blue-500/50 h-9 text-xs sm:text-sm placeholder:text-zinc-600 w-full"
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
          <ErrorState message={error} />
        ) : leaderboard.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {/* Stats Grid - Matches Overview Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Champion Card */}
              <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-yellow-500/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy className="w-24 h-24 rotate-12 text-yellow-500" />
                </div>
                <div className="p-4 sm:p-6 flex items-center gap-4 relative">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 bg-yellow-500/10 blur-lg rounded-full animate-pulse" />
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-yellow-500/30 shadow-lg relative z-10">
                      <AvatarImage
                        src={leaderboard[0]?.user.avatar || undefined}
                      />
                      <AvatarFallback className="bg-yellow-950 text-yellow-500 font-bold text-xs">
                        {(leaderboard[0]?.user.username || "?")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full border border-yellow-400 shadow-sm z-20">
                      #1
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-yellow-500/80 uppercase tracking-widest mb-0.5">
                      Top Player
                    </div>
                    <div
                      className="font-bold text-white truncate text-sm"
                      title={leaderboard[0]?.user.username}
                    >
                      {leaderboard[0]?.user.username || "TBA"}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono truncate">
                      Lvl {leaderboard[0]?.level || 0} •{" "}
                      {leaderboard[0]?.totalXP.toLocaleString()} XP
                    </div>
                  </div>
                </div>
              </Card>

              {/* Active Users */}
              <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden group min-h-[90px] sm:min-h-[100px]">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-16 h-16 sm:w-20 sm:h-20 rotate-12 text-blue-500" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Active Members
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white relative z-10 tabular-nums">
                  {leaderboard.length.toLocaleString()}
                </div>
              </Card>

              {/* Average Level */}
              <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden group min-h-[90px] sm:min-h-[100px]">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap className="w-16 h-16 sm:w-20 sm:h-20 rotate-12 text-blue-500" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Average Level
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white relative z-10 tabular-nums">
                  {averageLevel}
                </div>
              </Card>

              {/* Total XP */}
              <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden group min-h-[90px] sm:min-h-[100px]">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy className="w-16 h-16 sm:w-20 sm:h-20 rotate-12 text-purple-500" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
                  <Trophy className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Server XP
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white relative z-10 tabular-nums">
                  {(
                    leaderboard.reduce(
                      (acc: number, curr: LeaderboardEntry) =>
                        acc + curr.totalXP,
                      0
                    ) / 1000
                  ).toFixed(1)}
                  k
                </div>
              </Card>
            </div>

            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md overflow-hidden rounded-xl w-full">
              <div className="p-0 overflow-x-auto">
                <div className="min-w-[300px]">
                  <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-3 text-[10px] uppercase font-bold text-zinc-500 tracking-widest border-b border-white/5 bg-white/[0.02] min-w-0">
                    <div className="col-span-2 sm:col-span-1 text-center font-black">
                      #
                    </div>
                    <div className="col-span-7 sm:col-span-9 md:col-span-5">
                      User Profile
                    </div>
                    <div className="hidden md:block md:col-span-4 text-right">
                      Progress
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-right">
                      XP
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
                        let rankStyles =
                          "text-zinc-400 border-white/10 bg-zinc-900";
                        if (actualRank === 1)
                          rankStyles =
                            "text-yellow-500 border-yellow-500/20 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.1)] font-bold";
                        if (actualRank === 2)
                          rankStyles =
                            "text-zinc-300 border-zinc-400/20 bg-zinc-400/10 font-bold";
                        if (actualRank === 3)
                          rankStyles =
                            "text-orange-400 border-orange-500/20 bg-orange-500/10 font-bold";

                        // Deterministic progress for UI flair
                        const progress = (entry.totalXP % 1000) / 10;

                        return (
                          <motion.div
                            key={entry.userId}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className={cn(
                              "grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group relative min-w-0",
                              isTop3 && "bg-white/[0.01]"
                            )}
                          >
                            <div className="col-span-2 sm:col-span-1 flex justify-center">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full p-0 font-mono text-[9px] sm:text-[10px] tabular-nums transition-all duration-300 group-hover:scale-110",
                                  rankStyles
                                )}
                              >
                                #{actualRank}
                              </Badge>
                            </div>

                            <div className="col-span-7 sm:col-span-9 md:col-span-5 flex items-center gap-2 sm:gap-3 min-w-0">
                              <Avatar
                                className={cn(
                                  "h-7 w-7 sm:h-9 sm:w-9 shrink-0 border transition-all duration-300 group-hover:border-white/20",
                                  isTop3 ? "border-white/20" : "border-white/5"
                                )}
                              >
                                <AvatarImage
                                  src={entry.user.avatar || undefined}
                                />
                                <AvatarFallback className="bg-zinc-800 font-bold text-[8px] sm:text-[10px] text-zinc-500">
                                  {entry.user.username
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="truncate min-w-0 flex flex-col">
                                <div
                                  className={cn(
                                    "font-bold transition-colors truncate text-[11px] sm:text-sm",
                                    isTop3 ? "text-white" : "text-zinc-300"
                                  )}
                                >
                                  {entry.user.username}
                                </div>
                                <div className="text-[8px] sm:text-[10px] text-zinc-500 font-mono flex items-center gap-1 sm:gap-2">
                                  Lvl {entry.level}
                                  {isTop3 && (
                                    <Badge className="hidden sm:inline-flex bg-zinc-800 text-zinc-400 border-white/5 text-[8px] h-3 px-1">
                                      ELITE
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="hidden md:flex md:col-span-4 flex-col justify-center gap-2 px-2">
                              <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-white/5">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    isTop3
                                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                      : "bg-blue-600 opacity-60"
                                  )}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <div className="flex justify-between items-center text-[8px] uppercase tracking-widest font-bold text-zinc-600">
                                <span>Progress</span>
                                <span>{progress.toFixed(0)}%</span>
                              </div>
                            </div>

                            <div className="col-span-3 sm:col-span-2 text-right font-mono text-[10px] sm:text-xs text-zinc-400 group-hover:text-white transition-colors tabular-nums">
                              {entry.totalXP.toLocaleString()}
                            </div>
                          </motion.div>
                        );
                      }
                    )}

                    {searchQuery && filteredLeaderboard.length === 0 && (
                      <div className="py-12 text-center text-zinc-500 text-sm">
                        No users found matching "{searchQuery}"
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
      title="Syncing XP Nodes"
      subtitle="Retrieving_Leaderboard_Data..."
    />
  );
}

function XPDisabledState({ onEnable }: { onEnable: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-white/10 text-center space-y-6">
      <div className="p-6 bg-zinc-900 rounded-full border border-white/5 shadow-2xl">
        <Zap className="w-12 h-12 text-zinc-700" />
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="text-2xl font-bold text-white">XP System Offline</h3>
        <p className="text-zinc-500">
          The leveling system is currently disabled for this server. Enable it
          to start tracking user activity.
        </p>
      </div>
      <Button
        onClick={onEnable}
        className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
      >
        Configure Settings
      </Button>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Alert
      variant="error"
      className="bg-red-500/10 border-red-500/20 text-red-400 rounded-xl"
    >
      <AlertTitle>Error loading leaderboard</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-white/10 text-center space-y-6">
      <Trophy className="w-16 h-16 text-zinc-800" />
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-white">No Rankings Yet</h3>
        <p className="text-zinc-500">
          Wait for users to chat or interact to see them appear here.
        </p>
      </div>
    </div>
  );
}
