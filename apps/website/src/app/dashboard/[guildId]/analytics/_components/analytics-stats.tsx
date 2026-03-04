"use client";

import { Audiowide } from "next/font/google";
import {
  MessageSquare,
  Mic,
  Terminal,
  TrendingUp,
  TrendingDown,
  Lock,
  Crown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface AnalyticsStatsProps {
  activityStats: {
    totalMessages: number;
    totalVoiceMinutes: number;
    totalCommands: number;
  };
  history: Array<{
    date: string;
    label: string;
    joins: number;
    leaves: number;
    members: number;
  }>;
  isPremium: boolean;
  onUpgrade?: () => void;
}

export function AnalyticsStats({
  activityStats,
  history,
  isPremium,
  onUpgrade,
}: AnalyticsStatsProps) {
  // Calculate growth stats from history
  const totalJoins = history.reduce((sum, d) => sum + (d.joins || 0), 0);
  const totalLeaves = history.reduce((sum, d) => sum + (d.leaves || 0), 0);
  const netGrowth = totalJoins - totalLeaves;

  // Format voice minutes
  const voiceHours = Math.floor(activityStats.totalVoiceMinutes / 60);
  const voiceRemainder = activityStats.totalVoiceMinutes % 60;
  const voiceDisplay =
    voiceHours > 0 ? `${voiceHours}h ${voiceRemainder}m` : `${voiceRemainder}m`;

  const stats = [
    {
      label: "Net Growth",
      value: netGrowth >= 0 ? `+${netGrowth}` : `${netGrowth}`,
      subtitle: `${totalJoins} joins · ${totalLeaves} leaves`,
      icon: netGrowth >= 0 ? TrendingUp : TrendingDown,
      color: netGrowth >= 0 ? "emerald" : "rose",
      free: true,
    },
    {
      label: "Total Messages",
      value: activityStats.totalMessages.toLocaleString(),
      subtitle: "All-time tracked",
      icon: MessageSquare,
      color: "cyan",
      free: false,
    },
    {
      label: "Voice Activity",
      value: voiceDisplay,
      subtitle: "Total tracked time",
      icon: Mic,
      color: "purple",
      free: false,
    },
    {
      label: "Commands Used",
      value: activityStats.totalCommands.toLocaleString(),
      subtitle: "All-time total",
      icon: Terminal,
      color: "amber",
      free: false,
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500/20 hover:border-emerald-500/40",
    rose: "border-rose-500/20 hover:border-rose-500/40",
    cyan: "border-cyan-500/20 hover:border-cyan-500/40",
    purple: "border-purple-500/20 hover:border-purple-500/40",
    amber: "border-amber-500/20 hover:border-amber-500/40",
  };

  const iconColorMap: Record<string, string> = {
    emerald: "text-emerald-500",
    rose: "text-rose-500",
    cyan: "text-cyan-500",
    purple: "text-purple-500",
    amber: "text-amber-500",
  };

  const lineColorMap: Record<string, string> = {
    emerald: "via-emerald-500/20",
    rose: "via-rose-500/20",
    cyan: "via-cyan-500/20",
    purple: "via-purple-500/20",
    amber: "via-amber-500/20",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const isLocked = !stat.free && !isPremium;

        return (
          <Card
            key={stat.label}
            variant="stat"
            className={cn(
              "p-5 flex flex-col justify-center min-h-[100px] relative overflow-hidden",
              colorMap[stat.color],
              isLocked && "cursor-pointer"
            )}
            onClick={isLocked ? onUpgrade : undefined}
          >
            {/* Background icon */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon
                className={cn("w-20 h-20 rotate-12", iconColorMap[stat.color])}
              />
            </div>

            {/* Premium blur overlay */}
            {isLocked && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-[6px] rounded-xl">
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span
                    className={cn(
                      "text-[9px] font-black text-amber-400 uppercase tracking-widest",
                      audiowide.className
                    )}
                  >
                    Pro Only
                  </span>
                </div>
              </div>
            )}

            {/* Label */}
            <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
              <stat.icon className={cn("w-4 h-4", iconColorMap[stat.color])} />
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  audiowide.className
                )}
              >
                {stat.label}
              </span>
            </div>

            {/* Value */}
            <div
              className={cn(
                "text-3xl font-black text-white relative z-10 tabular-nums",
                audiowide.className
              )}
            >
              {stat.value}
            </div>

            {/* Subtitle */}
            <div className="text-[10px] text-zinc-500 font-bold font-mono mt-1 relative z-10">
              {stat.subtitle}
            </div>

            {/* Bottom line */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent to-transparent",
                lineColorMap[stat.color]
              )}
            />
          </Card>
        );
      })}
    </div>
  );
}
