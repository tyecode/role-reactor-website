"use client";

import { useState, use, useEffect } from "react";
import { Audiowide } from "next/font/google";
import { BarChart3, Crown, Lock, Zap, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useServerStore } from "@/store/use-server-store";
import { useProEngineStore } from "@/store/use-pro-engine-store";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { ErrorView } from "@/components/common/error-view";
import { NodeLoader } from "@/components/common/node-loader";
import { PremiumGuard } from "@/app/dashboard/_components/premium-guard";
import { toast } from "@/lib/toast";

import { AnalyticsStats } from "./_components/analytics-stats";
import { GrowthChart } from "./_components/growth-chart";
import { TopMembers } from "./_components/top-members";
import { ActivityBreakdown } from "./_components/activity-breakdown";
import { DailyTrends } from "./_components/daily-trends";

import useSWR from "swr";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FREE_MAX_DAYS = 7;

interface AnalyticsPageProps {
  params: Promise<{ guildId: string }>;
}

export default function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { guildId } = use(params);
  const [days, setDays] = useState(FREE_MAX_DAYS);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const { data: session } = useSession();

  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);
  const guildName = activeGuild?.name || "this server";

  // Premium status
  const { settingsCache, fetchSettings } = useProEngineStore();
  const proData = settingsCache[guildId] ?? null;
  const isPremium = proData?.isPremium?.pro || false;

  useEffect(() => {
    if (guildId) {
      fetchSettings(guildId);
    }
  }, [guildId, fetchSettings]);

  // Force free users to 7D
  const effectiveDays = isPremium ? days : FREE_MAX_DAYS;

  const { data, error, isLoading } = useSWR(
    `/api/guilds/${guildId}/analytics?days=${effectiveDays}`,
    fetcher,
    {
      refreshInterval: isPremium ? 120000 : 0, // Auto-refresh only for Pro
      revalidateOnFocus: true,
    }
  );

  const history = data?.history || [];
  const activityStats = data?.activityStats || {
    totalMessages: 0,
    totalVoiceMinutes: 0,
    totalCommands: 0,
  };
  const topMembers = data?.topMembers || { chatters: [], voiceUsers: [] };

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
      await fetchSettings(guildId, true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Activation error";
      console.error("Failed to activate premium:", err);
      toast.error(message);
    } finally {
      setIsActivating(false);
    }
  };

  const handleExportCSV = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }

    if (!history || history.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    // Build CSV content
    const headers = [
      "Date",
      "Joins",
      "Leaves",
      "Net Growth",
      "Messages",
      "Voice Minutes",
      "Commands",
      "Automated Roles",
    ];

    interface AnalyticsDay {
      date?: string;
      label?: string;
      joins?: number;
      leaves?: number;
      messages?: number;
      voiceMinutes?: number;
      commands?: number;
      roleReactions?: number;
    }

    const rows = history.map((day: AnalyticsDay) => [
      day.date ?? day.label ?? "",
      day.joins ?? 0,
      day.leaves ?? 0,
      (day.joins ?? 0) - (day.leaves ?? 0),
      day.messages ?? 0,
      day.voiceMinutes ?? 0,
      day.commands ?? 0,
      day.roleReactions ?? 0,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row: (string | number)[]) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `analytics_${guildId}_${effectiveDays}d.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  if (isLoading && !data) {
    return (
      <NodeLoader
        title="Loading Analytics"
        subtitle="Synchronizing data streams..."
      />
    );
  }

  if (error && !data) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          category="Server Insights"
          categoryIcon={BarChart3}
          title="Analytics"
          description="Track server growth and activity for"
          serverName={guildName}
        />
        <ErrorView
          title="Data Unavailable"
          message="Failed to load analytics data. The bot may be offline."
          showHome={false}
        />
      </div>
    );
  }

  const timeRanges = [
    { label: "7D", value: 7, free: true },
    { label: "14D", value: 14, free: false },
    { label: "30D", value: 30, free: false },
    { label: "90D", value: 90, free: false },
  ];

  return (
    <>
      <PremiumGuard
        open={showPremiumModal}
        onOpenChange={setShowPremiumModal}
        onActivate={handleActivatePremium}
        isActivating={isActivating}
        title="UNLOCK ANALYTICS"
        description="Get deeper insights with extended time ranges, detailed activity stats, and auto-refreshing data."
        features={[
          "30 & 90 Day History",
          "Activity Breakdown",
          "Auto-Refresh Data",
          "Top Members Panel",
        ]}
      />

      <div className="space-y-6 w-full">
        <PageHeader
          category="Server Insights"
          categoryIcon={BarChart3}
          title="Analytics"
          description="Track server growth and activity for"
          serverName={guildName}
        >
          <div className="flex items-center gap-1 bg-zinc-900/50 border border-white/5 rounded-xl p-1">
            {timeRanges.map((range) => {
              const locked = !range.free && !isPremium;
              return (
                <Button
                  key={range.value}
                  variant={
                    effectiveDays === range.value ? "secondary" : "ghost"
                  }
                  size="sm"
                  onClick={() => {
                    if (locked) {
                      setShowPremiumModal(true);
                    } else {
                      setDays(range.value);
                    }
                  }}
                  className={cn(
                    "h-8 px-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all relative",
                    audiowide.className,
                    effectiveDays === range.value
                      ? "bg-cyan-500/15 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] border border-cyan-500/20"
                      : locked
                        ? "text-zinc-500 hover:text-amber-400/80 hover:bg-amber-500/10 border border-transparent cursor-pointer"
                        : "text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 cursor-pointer"
                  )}
                >
                  {locked && (
                    <Lock className="w-2.5 h-2.5 mr-1 text-amber-500" />
                  )}
                  {range.label}
                </Button>
              );
            })}

            <div className="w-px h-6 bg-white/10 mx-1" />

            <Button
              variant="default"
              size="sm"
              onClick={handleExportCSV}
              className={cn(
                "h-8 px-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all",
                audiowide.className,
                isPremium
                  ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                  : "bg-zinc-800/30 text-zinc-500 hover:text-amber-400/80 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20"
              )}
            >
              {!isPremium && (
                <Lock className="w-2.5 h-2.5 mr-1.5 text-amber-500" />
              )}
              <Download
                className="w-3.5 h-3.5 mr-1.5"
              />
              {isPremium ? "Export CSV" : "Export"}
            </Button>
          </div>
        </PageHeader>

        {/* Stats Overview — Net Growth free, rest gated */}
        <AnalyticsStats
          activityStats={activityStats}
          history={history}
          isPremium={isPremium}
          onUpgrade={() => setShowPremiumModal(true)}
        />

        {/* Growth Chart — always visible */}
        <GrowthChart history={history} days={effectiveDays} />

        {/* Top Members — Pro only */}
        <TopMembers
          chatters={topMembers.chatters}
          voiceUsers={topMembers.voiceUsers}
          isPremium={isPremium}
          onUpgrade={() => setShowPremiumModal(true)}
        />

        {/* Daily Trends — Pro only */}
        <DailyTrends
          history={history}
          isPremium={isPremium}
          onUpgrade={() => setShowPremiumModal(true)}
        />

        {/* Activity Breakdown — Pro only */}
        <ActivityBreakdown
          activityStats={activityStats}
          isPremium={isPremium}
          onUpgrade={() => setShowPremiumModal(true)}
        />

        {/* Pro Upsell Banner — only for free users */}
        {!isPremium && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-zinc-900/50 p-6">
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/5 via-transparent to-cyan-500/5" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500/20 to-cyan-500/20 flex items-center justify-center border border-amber-500/20">
                  <Crown className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3
                    className={cn(
                      "text-sm font-bold text-white uppercase tracking-wider",
                      audiowide.className
                    )}
                  >
                    Unlock Full Analytics
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Extended time ranges, detailed activity stats, top members,
                    and auto-refreshing data.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPremiumModal(true)}
                className="bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-300 font-black uppercase tracking-widest text-[10px] shrink-0"
              >
                <Zap className="w-3.5 h-3.5 mr-2 fill-current" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
