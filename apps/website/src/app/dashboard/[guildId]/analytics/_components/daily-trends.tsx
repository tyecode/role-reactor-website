"use client";

import { useMemo, useState, useEffect } from "react";
import { Audiowide } from "next/font/google";
import {
  MessageSquare,
  Mic,
  Terminal,
  Crown,
  MousePointerClick,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface DailyTrendsProps {
  history: Array<{
    date: string;
    label: string;
    messages?: number;
    voiceMinutes?: number;
    commands?: number;
    roleReactions?: number;
  }>;
  isPremium: boolean;
  onUpgrade?: () => void;
}

type TabType = "messages" | "voice" | "commands" | "reactions";

export function DailyTrends({
  history,
  isPremium,
  onUpgrade,
}: DailyTrendsProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeTab, setActiveTab] = useState<TabType>("messages");

  // Ensure 'label' (e.g. "Mar 1") exists for the X-axis mapping
  const data = useMemo(() => {
    return history.map((d) => ({
      ...d,
      messages: d.messages || 0,
      voiceMinutes: d.voiceMinutes || 0,
      commands: d.commands || 0,
      roleReactions: d.roleReactions || 0,
    }));
  }, [history]);

  const tabs = [
    {
      id: "messages" as TabType,
      label: "Messages",
      icon: MessageSquare,
      color: "#06b6d4", // cyan
      dataKey: "messages",
    },
    {
      id: "voice" as TabType,
      label: "Voice",
      icon: Mic,
      color: "#a855f7", // purple
      dataKey: "voiceMinutes",
    },
    {
      id: "commands" as TabType,
      label: "Commands",
      icon: Terminal,
      color: "#f59e0b", // amber
      dataKey: "commands",
    },
    {
      id: "reactions" as TabType,
      label: "Automated Roles",
      icon: MousePointerClick,
      color: "#10b981", // emerald
      dataKey: "roleReactions",
    },
  ];

  const activeConfig = tabs.find((t) => t.id === activeTab)!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ dataKey: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900/95 border border-white/10 rounded-lg p-3 shadow-xl backdrop-blur-xl">
          <p
            className={cn(
              "text-[10px] font-black uppercase tracking-wider mb-2 text-zinc-400",
              audiowide.className
            )}
          >
            {label}
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeConfig.color }}
            />
            <span className="text-zinc-300 text-xs font-bold uppercase tracking-wide">
              {activeConfig.label}:
            </span>
            <span
              className={cn(
                "text-white font-black text-sm ml-auto tabular-nums",
                audiowide.className
              )}
            >
              {payload[0].value.toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const hasData =
    Math.max(
      ...data.map(
        (d) => (d[activeConfig.dataKey as keyof typeof d] as number) || 0
      )
    ) > 0;

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
              Unlock Daily Trends
            </span>
          </button>
        </div>
      )}

      <Card variant="cyberpunk" className="overflow-hidden">
        <CyberpunkBackground />
        <CardContent className="p-0 relative z-10 flex flex-col lg:flex-row h-auto lg:h-87.5">
          <ScrollArea
            type="auto"
            className="w-full max-w-full lg:w-64 bg-zinc-900/50 border-b lg:border-b-0 lg:border-l-[3px] border-white/5 shrink-0"
          >
            <div className="flex lg:flex-col gap-2 p-2 w-max lg:w-full">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 lg:px-3 py-3 rounded-lg transition-all w-auto lg:w-full text-left shrink-0",
                      "border-b-[3px] lg:border-b-0 lg:border-l-[3px]",
                      isActive
                        ? "bg-white/5 shadow-inner"
                        : "hover:bg-white/2 border-transparent lg:border-transparent"
                    )}
                    style={isActive ? { borderColor: tab.color } : {}}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: isActive ? tab.color : "#71717a" }}
                    />
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-wider",
                        audiowide.className,
                        isActive
                          ? "text-white"
                          : "text-zinc-500 group-hover:text-zinc-300"
                      )}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" className="lg:hidden" />
          </ScrollArea>

          {/* Chart Area */}
          <div className="flex-1 p-6 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3
                  className={cn(
                    "text-sm font-bold text-white uppercase tracking-wider",
                    audiowide.className
                  )}
                >
                  Daily {activeConfig.label}
                </h3>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  Track engagement volume over time
                </p>
              </div>
            </div>

            <div className="flex-1 min-h-75 lg:min-h-0 relative">
              {!isMounted ? (
                <div className="absolute inset-0 bg-zinc-900/10 animate-pulse rounded-xl" />
              ) : !hasData ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p
                    className={cn(
                      "text-zinc-600 text-xs font-bold",
                      audiowide.className
                    )}
                  >
                    NO DAILY ACTIVITY YET
                  </p>
                  <p className="text-zinc-700 text-[10px] mt-1">
                    Activity history will build up over time.
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id={`gradient-${activeConfig.id}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={activeConfig.color}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={activeConfig.color}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        className="stroke-zinc-800/50"
                      />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#71717a",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#71717a",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                        tickFormatter={(v) =>
                          v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
                        }
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                          stroke: activeConfig.color,
                          strokeWidth: 1,
                          strokeDasharray: "3 3",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey={activeConfig.dataKey}
                        stroke={activeConfig.color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#gradient-${activeConfig.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
