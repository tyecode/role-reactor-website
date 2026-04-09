"use client";

import { Audiowide } from "next/font/google";
import { MessageSquare, Mic, Terminal, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface ActivityBreakdownProps {
  activityStats: {
    totalMessages: number;
    totalVoiceMinutes: number;
    totalCommands: number;
  };
  isPremium: boolean;
  onUpgrade?: () => void;
}

const COLORS = ["#06b6d4", "#a855f7", "#f59e0b"]; // cyan, purple, amber

export function ActivityBreakdown({
  activityStats,
  isPremium,
  onUpgrade,
}: ActivityBreakdownProps) {
  const total =
    activityStats.totalMessages +
    activityStats.totalVoiceMinutes +
    activityStats.totalCommands;

  const data = [
    {
      name: "Messages",
      value: activityStats.totalMessages,
      icon: MessageSquare,
      color: "#06b6d4",
      percentage:
        total > 0
          ? ((activityStats.totalMessages / total) * 100).toFixed(1)
          : "0",
    },
    {
      name: "Voice (min)",
      value: activityStats.totalVoiceMinutes,
      icon: Mic,
      color: "#a855f7",
      percentage:
        total > 0
          ? ((activityStats.totalVoiceMinutes / total) * 100).toFixed(1)
          : "0",
    },
    {
      name: "Commands",
      value: activityStats.totalCommands,
      icon: Terminal,
      color: "#f59e0b",
      percentage:
        total > 0
          ? ((activityStats.totalCommands / total) * 100).toFixed(1)
          : "0",
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      color: string;
      payload: {
        color: string;
        name: string;
        value: number;
        percentage: string;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-zinc-900/95 border border-white/10 rounded-lg p-3 shadow-xl backdrop-blur-xl">
          <p
            className={cn(
              "text-[10px] font-black uppercase tracking-wider mb-1",
              audiowide.className
            )}
            style={{ color: entry.color }}
          >
            {entry.name}
          </p>
          <p className="text-white font-black text-sm tabular-nums">
            {entry.value.toLocaleString()}
          </p>
          <p className="text-zinc-500 text-[10px] font-bold">
            {entry.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      {/* Premium blur overlay */}
      {!isPremium && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm rounded-2xl">
          <button
            onClick={onUpgrade}
            className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer group"
          >
            <Crown className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span
              className={cn(
                "text-xs font-black text-amber-400 uppercase tracking-widest",
                audiowide.className
              )}
            >
              Unlock with Pro Engine
            </span>
          </button>
        </div>
      )}

      <Card variant="cyberpunk" className="overflow-hidden">
        <CyberpunkBackground />
        <CardContent className="p-6 relative z-10">
          <div className="mb-5">
            <h3
              className={cn(
                "text-sm font-bold text-white uppercase tracking-wider",
                audiowide.className
              )}
            >
              Activity Breakdown
            </h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Distribution of server engagement by type
            </p>
          </div>

          {total === 0 ? (
            <div className="text-center py-12">
              <p
                className={cn(
                  "text-zinc-600 text-xs font-bold",
                  audiowide.className
                )}
              >
                NO ACTIVITY YET
              </p>
              <p className="text-zinc-700 text-[10px] mt-1">
                Data will appear as members use the server.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Donut Chart */}
              <div className="w-45 h-45 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index]}
                          className="transition-opacity hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3 w-full">
                {data.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-800/40 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: item.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono tabular-nums">
                          {item.value.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-black tabular-nums",
                          audiowide.className
                        )}
                        style={{ color: item.color }}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
