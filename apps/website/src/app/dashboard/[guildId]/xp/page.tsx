"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trophy,
  Loader2,
  AlertCircle,
  TrendingUp,
  Medal,
  Users,
  Settings,
} from "lucide-react";
import { useServerStore } from "@/store/use-server-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { XPSettingsTab } from "./settings-tab";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  userId: string;
  totalXP: number;
  level: number;
  user: {
    username: string;
    discriminator: string;
    avatar: string | null;
    bot: boolean;
  };
}

function XPPageContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { isLoading: isStoreLoading } = useServerStore();

  const [activeTab, setActiveTab] = useState("leaderboard");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsInvite, setNeedsInvite] = useState(false);
  const [isXpDisabled, setIsXpDisabled] = useState(false);

  useEffect(() => {
    if (!guildId) return;

    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      setNeedsInvite(false);
      setIsXpDisabled(false);

      try {
        const response = await fetch(
          `/api/guilds/${guildId}/leaderboard?limit=50`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          if (response.status === 404) {
            setNeedsInvite(true);
            return;
          }

          if (errorData.hint === "XP_DISABLED") {
            setIsXpDisabled(true);
            return;
          }

          throw new Error(errorData.error || "Failed to fetch leaderboard");
        }

        const data = await response.json();
        const leaderboardData = data.data?.leaderboard || data.leaderboard;

        if (data.status === "success" && Array.isArray(leaderboardData)) {
          setLeaderboard(leaderboardData);
        } else {
          throw new Error(data.message || "Failed to load data");
        }
      } catch (err: any) {
        console.error("Error fetching leaderboard:", err);
        setError(
          err.message ||
            "Failed to load leaderboard. Please make sure the bot is online."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [guildId]);

  if (isStoreLoading) {
    return <XPPageSkeleton />;
  }

  if (needsInvite) {
    return <BotInviteCard guildId={guildId} />;
  }

  if (!guildId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-2xl">
            <Users className="w-12 h-12 text-primary" />
          </div>
        </div>
        <div className="max-w-sm space-y-2">
          <h2 className="text-2xl font-bold text-white">Select a Server</h2>
          <p className="text-muted-foreground">
            Please choose a server from the sidebar to manage its XP system and
            view the rankings.
          </p>
        </div>
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header with Stats Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            Active Ranking
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-4">
            XP & Levels
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Monitor community engagement and reward your most active members
            automatically.
          </p>
        </div>

        {!loading && !error && leaderboard.length > 0 && (
          <div className="flex gap-4">
            <div className="bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-2 backdrop-blur-md">
              <div className="text-[10px] uppercase text-muted-foreground font-bold leading-tight">
                Total Ranked
              </div>
              <div className="text-xl font-bold text-white">
                {leaderboard.length}
              </div>
            </div>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900/80 p-1 text-muted-foreground border border-white/5 backdrop-blur-xl mb-8">
          <TabsTrigger
            value="leaderboard"
            className="rounded-md px-8 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg mr-1"
          >
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-md px-8 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="leaderboard"
          className="mt-0 focus-visible:outline-none"
        >
          {loading ? (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-48 rounded-xl bg-zinc-900/50"
                  />
                ))}
              </div>
              <Skeleton className="h-[400px] rounded-xl bg-zinc-900/50" />
            </div>
          ) : isXpDisabled ? (
            <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-white/10 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full" />
                <div className="relative p-6 bg-zinc-900 border border-white/5 rounded-2xl shadow-2xl">
                  <TrendingUp className="w-12 h-12 text-yellow-500/50" />
                </div>
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="text-2xl font-bold text-white">
                  XP System Disabled
                </h3>
                <p className="text-muted-foreground">
                  The leveling system is currently turned off for this server.
                  Enable it in the settings tab to start tracking member
                  engagement.
                </p>
              </div>
              <Button
                onClick={() => setActiveTab("settings")}
                className="bg-zinc-800 hover:bg-zinc-700 text-white gap-2"
              >
                <Settings className="w-4 h-4" />
                Configure XP Settings
              </Button>
            </div>
          ) : error ? (
            <Alert
              variant="destructive"
              className="bg-red-500/10 border-red-500/20 text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : leaderboard.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-xl border border-dashed border-white/10 text-muted-foreground">
              <Trophy className="w-12 h-12 mb-4 opacity-20" />
              <p>No activity recorded yet for this server.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Podium View */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Second Place */}
                <div className="order-2 md:order-1 h-full flex items-end">
                  {topThree[1] && <PodiumCard entry={topThree[1]} rank={2} />}
                </div>

                {/* First Place */}
                <div className="order-1 md:order-2 h-full">
                  {topThree[0] && (
                    <PodiumCard entry={topThree[0]} rank={1} isFeatured />
                  )}
                </div>

                {/* Third Place */}
                <div className="order-3 h-full flex items-end">
                  {topThree[2] && <PodiumCard entry={topThree[2]} rank={3} />}
                </div>
              </div>

              {/* Rankings List (Showing Everyone) */}
              {leaderboard.length > 0 && (
                <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-2xl overflow-hidden rounded-xl">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2 text-white">
                      <Medal className="w-5 h-5 text-muted-foreground" />
                      Rankings
                    </CardTitle>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y divide-white/3">
                      {leaderboard.map((entry, index) => (
                        <div
                          key={entry.userId}
                          className="flex items-center gap-4 p-4 hover:bg-white/2 transition-colors group cursor-default"
                        >
                          <div className="w-10 font-mono font-bold text-muted-foreground text-center">
                            #{index + 1}
                          </div>

                          <Avatar className="h-10 w-10 ring-1 ring-white/10 group-hover:ring-primary/30 transition-all">
                            <AvatarImage src={entry.user.avatar || undefined} />
                            <AvatarFallback className="bg-zinc-800 text-xs">
                              {entry.user.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate text-white group-hover:text-primary transition-colors">
                              {entry.user.username}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[10px] font-bold text-primary uppercase">
                                Level {entry.level}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {entry.totalXP.toLocaleString()} XP
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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

export default function XPPage() {
  return (
    <Suspense fallback={<XPPageSkeleton />}>
      <XPPageContent />
    </Suspense>
  );
}

function XPPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32 bg-zinc-900" />
          <Skeleton className="h-10 w-64 bg-zinc-900" />
          <Skeleton className="h-4 w-96 bg-zinc-900" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <Skeleton className="h-12 w-64 rounded-lg bg-zinc-900" />

      <div className="space-y-10">
        {/* Podium Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <Skeleton className="h-64 rounded-xl bg-zinc-900/50" />
          <Skeleton className="h-80 rounded-xl bg-zinc-900/50" />
          <Skeleton className="h-64 rounded-xl bg-zinc-900/50" />
        </div>

        {/* List Skeleton */}
        <div className="rounded-xl border border-white/5 bg-zinc-900/40 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <Skeleton className="h-6 w-32 bg-zinc-900" />
          </div>
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-md bg-zinc-900" />
                <Skeleton className="h-10 w-10 rounded-full bg-zinc-900" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 bg-zinc-900" />
                  <Skeleton className="h-3 w-20 bg-zinc-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({
  entry,
  rank,
  isFeatured,
}: {
  entry: LeaderboardEntry;
  rank: number;
  isFeatured?: boolean;
}) {
  const rankColors = {
    1: "from-yellow-500/20 to-yellow-600/5 text-yellow-500 border-yellow-500/30 shadow-yellow-500/10",
    2: "from-zinc-400/20 to-zinc-500/5 text-zinc-400 border-zinc-400/30 shadow-zinc-400/10",
    3: "from-amber-700/20 to-amber-800/5 text-amber-700 border-amber-800/30 shadow-amber-800/10",
  };

  const medalIcons = {
    1: <Trophy className="w-6 h-6" />,
    2: <Medal className="w-5 h-5" />,
    3: <Medal className="w-5 h-5" />,
  };

  return (
    <div
      className={cn(
        "w-full rounded-xl border bg-linear-to-b backdrop-blur-xl relative transition-all duration-500 hover:scale-[1.02] overflow-hidden",
        rankColors[rank as keyof typeof rankColors],
        isFeatured ? "p-8 md:-mt-6 shadow-2xl" : "p-6 shadow-xl"
      )}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12">
          <Trophy className="w-24 h-24" />
        </div>
      )}

      <div className="relative flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div
            className={cn(
              "absolute -inset-1 rounded-full blur-md opacity-40",
              rank === 1
                ? "bg-yellow-500"
                : rank === 2
                  ? "bg-zinc-400"
                  : "bg-amber-700"
            )}
          />
          <Avatar
            className={cn(
              "border-2 relative",
              isFeatured
                ? "h-24 w-24 border-yellow-500/50"
                : "h-16 w-16 border-white/10"
            )}
          >
            <AvatarImage src={entry.user.avatar || undefined} />
            <AvatarFallback className="bg-zinc-900 text-lg">
              {entry.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-zinc-900 bg-current flex items-center justify-center text-zinc-900 flex-none",
              isFeatured && "w-10 h-10 -bottom-1 -right-1"
            )}
          >
            {medalIcons[rank as keyof typeof medalIcons]}
          </div>
        </div>

        <div className="space-y-1 w-full overflow-hidden">
          <div
            className={cn(
              "font-black truncate text-white tracking-widest uppercase",
              isFeatured ? "text-xl" : "text-sm"
            )}
          >
            {entry.user.username}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
              Rank #{rank}
            </div>
            <div className="bg-white/5 border border-white/5 rounded-md px-4 py-1 flex items-center gap-3">
              <span className="text-xs font-black text-white">
                LVL {entry.level}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-[10px] font-mono text-muted-foreground">
                {entry.totalXP.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
