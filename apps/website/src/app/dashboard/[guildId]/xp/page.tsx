"use client";

import { useState, use } from "react";
import { Audiowide } from "next/font/google";
import { Trophy, Settings as SettingsIcon, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useServerStore } from "@/store/use-server-store";
import type { LeaderboardEntry } from "@/types/discord";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { ErrorView } from "@/components/common/error-view";

import { LeaderboardSkeleton } from "./loading";
import { StatsGrid } from "./_components/stats";
import { LeaderboardList } from "./_components/leaderboard";
import { XPSettingsTab } from "./_components/settings";
import { XPDisabledState, EmptyState } from "./_components/states";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface XPPageProps {
  params: Promise<{ guildId: string }>;
}

export default function XPPage({ params }: XPPageProps) {
  const { guildId } = use(params);
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [searchQuery, setSearchQuery] = useState("");

  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);
  const guildName = activeGuild?.name || "this server";

  const { leaderboard, isLoading, isError, isXpDisabled, mutate } =
    useLeaderboard(guildId);

  const filteredLeaderboard = leaderboard.filter((entry: LeaderboardEntry) =>
    entry.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const averageLevel =
    leaderboard.length > 0
      ? Math.round(
          leaderboard.reduce((acc, curr) => acc + curr.level, 0) /
            leaderboard.length
        )
      : 0;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Engagement Management"
        categoryIcon={Trophy}
        title="XP System"
        description="Monitor community activity and manage leveling rewards for"
        serverName={guildName}
      />

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
          {isLoading ? (
            <LeaderboardSkeleton />
          ) : isXpDisabled ? (
            <XPDisabledState onEnable={() => setActiveTab("settings")} />
          ) : isError ? (
            <ErrorView
              title="Update Failed"
              message={isError.message}
              onRetry={() => mutate()}
              showHome={false}
            />
          ) : leaderboard.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-8">
              <StatsGrid
                leaderboard={leaderboard}
                averageLevel={averageLevel}
              />
              <LeaderboardList
                leaderboard={leaderboard}
                filteredLeaderboard={filteredLeaderboard}
                searchQuery={searchQuery}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="settings"
          className="mt-0 focus-visible:outline-none"
        >
          <XPSettingsTab guildId={guildId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
