/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PremiumGuard } from "../premium-guard";

import { useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  CircleHelp,
  MessageCircle,
  UserCircle,
  Zap,
  HelpCircle,
  Sparkles,
  UserPlus,
  Trophy,
  BarChart,
  Signal,
  Vote,
  Gamepad2,
  Server,
  LifeBuoy,
  User,
  Split,
  AlertCircle,
  Terminal,
  Lock,
  Crown,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const iconMap: Record<string, any> = {
  "8ball": CircleHelp,
  ask: MessageCircle,
  avatar: UserCircle,
  core: Zap,
  help: HelpCircle,
  imagine: Sparkles,
  invite: UserPlus,
  leaderboard: Trophy,
  level: BarChart,
  ping: Signal,
  poll: Vote,
  rps: Gamepad2,
  serverinfo: Server,
  support: LifeBuoy,
  userinfo: User,
  wyr: Split,
};

const categoryIconMap: Record<string, any> = {
  Admin: Shield,
  Developer: Terminal,
  General: HelpCircle,
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

interface CommandListProps {
  guildId: string;
  title?: React.ReactNode;
  description?: string;
}

export function CommandList({ guildId }: CommandListProps) {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { data, error, mutate, isLoading } = useSWR(
    `/api/guilds/${guildId}/settings`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const toggleCommand = async (commandName: string) => {
    if (!data || data.status !== "success") return;

    // Safety check: if not premium, don't allow toggling
    if (!data.isPremium?.pro) {
      setShowPremiumModal(true);
      return;
    }

    const currentDisabled = data.settings.disabledCommands || [];
    const isCurrentlyDisabled = currentDisabled.includes(commandName);

    let newDisabled;
    if (isCurrentlyDisabled) {
      newDisabled = currentDisabled.filter(
        (name: string) => name !== commandName
      );
    } else {
      newDisabled = [...currentDisabled, commandName];
    }

    // Optimistic update
    mutate(
      {
        ...data,
        settings: {
          ...data.settings,
          disabledCommands: newDisabled,
        },
      },
      false
    );

    try {
      const res = await fetch(`/api/guilds/${guildId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabledCommands: newDisabled }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Update failed");
      }

      mutate(); // Revalidate
    } catch (err: any) {
      console.error("Failed to update settings:", err);
      toast.error(err.message || "Failed to update command status");
      mutate(); // Revert on error
    }
  };

  const handleActivatePremium = async () => {
    if (!session?.user?.id || isActivating) return;

    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId: "pro_engine",
          userId: session.user.id,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Activation failed");

      toast.success("✨ Pro Engine unlocked!");
      mutate(); // Refresh status
    } catch (err: any) {
      console.error("Failed to activate premium:", err);
      toast.error(err.message || "Insufficient Cores or activation error");
    } finally {
      setIsActivating(false);
    }
  };

  // No early return for isLoading - we render the structure normally
  // and only skeletonize the results and status.

  // We handle error/loading inline below

  const commands = data?.availableCommands || [];
  const disabledCommands = data?.settings?.disabledCommands || [];
  const isPremium = data?.isPremium?.pro;
  const subscription = data?.premiumFeatures?.pro_engine;

  const filteredCommands = commands.filter(
    (cmd: any) =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category?.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce(
    (acc: any, cmd: any) => {
      const cat = cmd.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(cmd);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const sortedCategories = Object.keys(groupedCommands).sort();

  return (
    <>
      <PremiumGuard
        open={showPremiumModal}
        onOpenChange={setShowPremiumModal}
        onActivate={handleActivatePremium}
        isActivating={isActivating}
        title="ACTIVATE PRO ENGINE"
        description="Take full control of your server's slash commands. Hide what you don't need and keep your menu clean."
        features={[
          "Toggle Any Command",
          "Declutter Slash Menu",
          "Instant Updates",
          "Server Protection",
        ]}
      />

      <div className="space-y-8 relative animate-in fade-in slide-in-from-bottom-2 duration-700 pb-20">
        {/* Search & Status Bar */}
        <div className="sticky top-4 z-40 flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden group/search">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/search:text-cyan-400 transition-colors" />
            <Input
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "pl-11 bg-zinc-900/50 border-white/5 h-12 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all rounded-xl font-bold placeholder:text-zinc-700 tracking-wide text-zinc-300",
                audiowide.className
              )}
            />
          </div>

          <div className="flex items-center gap-3 text-sm whitespace-nowrap overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {isLoading ? (
              <div className="flex gap-3">
                <Skeleton className="h-8 w-24 rounded-lg border border-white/5" />
                <Skeleton className="h-8 w-24 rounded-lg border border-white/5" />
              </div>
            ) : isPremium ? (
              <>
                <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 px-4 py-1.5 rounded-lg shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)] backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Active:
                  </span>
                  <span
                    className={cn(
                      "text-emerald-300 font-bold",
                      audiowide.className
                    )}
                  >
                    {commands.length - disabledCommands.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-red-500/5 border border-red-500/20 px-4 py-1.5 rounded-lg shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)] backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                  <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                    Disabled:
                  </span>
                  <span
                    className={cn(
                      "text-red-300 font-bold",
                      audiowide.className
                    )}
                  >
                    {disabledCommands.length}
                  </span>
                </div>

                {subscription?.nextDeductionDate && (
                  <div className="flex items-center gap-2 bg-blue-500/5 border border-blue-500/20 px-4 py-1.5 rounded-lg shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)] backdrop-blur-md">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                      Renews:
                    </span>
                    <span
                      className={cn(
                        "text-blue-300 font-bold text-[10px]",
                        audiowide.className
                      )}
                    >
                      {new Date(
                        subscription.nextDeductionDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="bg-amber-500/5 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 uppercase tracking-widest font-black text-[10px]"
                onClick={() => setShowPremiumModal(true)}
              >
                <Crown className="w-3.5 h-3.5 mr-2" />
                Locked
              </Button>
            )}
          </div>
        </div>

        <div className="relative space-y-16">
          {isLoading ? (
            <div className="space-y-12">
              {[...Array(2)].map((_, sectionIdx) => (
                <div key={sectionIdx} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg border border-white/5" />
                    <Skeleton className="h-8 w-48 border border-white/5" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-32 rounded-2xl bg-zinc-900/20 border border-white/5 p-5 space-y-4 overflow-hidden relative group/item"
                      >
                        <div className="flex items-start justify-between relative z-10">
                          <Skeleton className="h-10 w-10 rounded-xl border border-white/5" />
                          <Skeleton className="h-5 w-10 rounded-full border border-white/5" />
                        </div>
                        <div className="space-y-2 relative z-10">
                          <Skeleton className="h-4 w-24 border border-white/5" />
                          <Skeleton className="h-3 w-full border border-white/5" />
                        </div>

                        {/* Background subtle pulse for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : error || data?.status !== "success" ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <Card className="bg-red-950/10 border-red-500/30 backdrop-blur-xl rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

                <CardContent className="p-16 text-center space-y-8 relative z-10">
                  <div className="w-24 h-24 bg-red-500/10 rounded-3xl border border-red-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                  </div>

                  <div className="space-y-3">
                    <h3
                      className={cn(
                        "text-3xl font-black text-white tracking-tight uppercase",
                        audiowide.className
                      )}
                    >
                      Connection Error
                    </h3>
                    <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed text-sm font-medium tracking-wide">
                      We couldn't connect to the bot instance. Please ensure the
                      bot is online and try again.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => mutate()}
                      className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest h-11 px-8 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Retry Connection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {sortedCategories.map((category) => {
                const CategoryIcon = categoryIconMap[category] || Terminal;
                return (
                  <div
                    key={category}
                    className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                  >
                    <div className="flex items-center gap-4 group/cat">
                      <div className="p-2.5 bg-zinc-900 rounded-xl border border-white/10 text-cyan-500 group-hover/cat:border-cyan-500/50 group-hover/cat:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h3
                        className={cn(
                          "text-xl font-black text-white tracking-widest uppercase flex items-center gap-4",
                          audiowide.className
                        )}
                      >
                        {category}
                      </h3>
                      <div className="h-px bg-gradient-to-r from-cyan-500/50 via-zinc-800 to-transparent flex-1 opacity-30 group-hover/cat:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {groupedCommands[category].map((cmd: any) => {
                        const Icon = iconMap[cmd.name] || Terminal;
                        const isDisabled = disabledCommands.includes(cmd.name);

                        return (
                          <div
                            key={cmd.name}
                            className={cn(
                              "group relative p-5 rounded-2xl border transition-all duration-300 backdrop-blur-sm overflow-hidden",
                              isDisabled
                                ? "bg-zinc-950/40 border-white/5 opacity-60 grayscale-[0.8]"
                                : "bg-zinc-900/40 border-white/10 hover:border-cyan-500/30 hover:bg-zinc-900/60 hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                            )}
                          >
                            <div className="flex flex-row items-start justify-between gap-4 mb-4">
                              <div
                                className={cn(
                                  "p-3 rounded-xl transition-all duration-300 border",
                                  isDisabled
                                    ? "bg-zinc-800/50 border-white/5 text-zinc-500"
                                    : "bg-cyan-500/5 border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                )}
                              >
                                <Icon className="w-5 h-5" />
                              </div>

                              <button
                                onClick={() => toggleCommand(cmd.name)}
                                className={cn(
                                  "w-12 h-6 rounded-full relative transition-all duration-300 p-0.5 border",
                                  isDisabled
                                    ? "bg-zinc-950 border-zinc-700"
                                    : "bg-cyan-950/50 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                )}
                              >
                                <div className="absolute inset-0 rounded-full bg-cyan-500/10 opacity-0 transition-opacity" />
                                <div
                                  className={cn(
                                    "w-4 h-4 rounded-full transition-all duration-300 shadow-sm relative z-10",
                                    isDisabled
                                      ? "translate-x-1 bg-zinc-600"
                                      : "translate-x-7 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                                  )}
                                />
                              </button>
                            </div>

                            <div className="space-y-2 relative z-10">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={cn(
                                    "text-sm font-black text-white truncate transition-colors uppercase tracking-wider",
                                    !isDisabled && "group-hover:text-cyan-400",
                                    audiowide.className
                                  )}
                                >
                                  /{cmd.name}
                                </h4>
                                {isDisabled && (
                                  <Lock className="w-3 h-3 text-zinc-600" />
                                )}
                              </div>
                              <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed font-medium h-8 group-hover:text-zinc-400 transition-colors">
                                {cmd.description}
                              </p>
                            </div>

                            {/* Hover Effects */}
                            {!isDisabled && (
                              <>
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredCommands.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10 group">
                  <div className="w-20 h-20 bg-zinc-800/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Search className="w-8 h-8 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                  </div>
                  <h4
                    className={cn(
                      "text-xl text-white font-black mb-2 uppercase tracking-widest",
                      audiowide.className
                    )}
                  >
                    No results found
                  </h4>
                  <p className="text-zinc-500 text-sm font-medium max-w-xs mx-auto mb-6">
                    We couldn't find any commands matching your search.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearch("")}
                    className="text-cyan-500 hover:text-cyan-400 uppercase tracking-widest font-bold"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
