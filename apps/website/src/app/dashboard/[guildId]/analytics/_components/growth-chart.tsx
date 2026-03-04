"use client";

import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface GrowthChartProps {
  history: Array<{
    date: string;
    label: string;
    joins: number;
    leaves: number;
    members: number;
  }>;
  days: number;
}

export function GrowthChart({ history, days }: GrowthChartProps) {
  const hasData = history.some((d) => d.joins > 0 || d.leaves > 0);

  // Custom tooltip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900/95 border border-white/10 rounded-lg p-3 shadow-xl backdrop-blur-xl">
          <p
            className={cn(
              "text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2",
              audiowide.className
            )}
          >
            {label}
          </p>
          {payload.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (entry: any) => (
              <div
                key={entry.dataKey}
                className="flex items-center justify-between gap-4 text-xs"
              >
                <span className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-zinc-300 capitalize font-semibold">
                    {entry.dataKey}
                  </span>
                </span>
                <span
                  className="font-black tabular-nums"
                  style={{ color: entry.color }}
                >
                  {entry.value}
                </span>
              </div>
            )
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card variant="cyberpunk" className="overflow-hidden">
      <CyberpunkBackground />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3
              className={cn(
                "text-lg font-bold text-white",
                audiowide.className
              )}
            >
              Server Growth
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Member joins and leaves over the past {days} days
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Joins
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Leaves
              </span>
            </div>
          </div>
        </div>

        {!hasData ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p
                className={cn(
                  "text-zinc-600 text-sm font-bold",
                  audiowide.className
                )}
              >
                NO DATA YET
              </p>
              <p className="text-zinc-700 text-xs mt-1">
                Growth data will appear as members join and leave.
              </p>
            </div>
          </div>
        ) : days <= 14 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history} barCategoryGap="20%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#52525b", fontWeight: 700 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#52525b", fontWeight: 700 }}
                  width={30}
                  allowDecimals={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="joins" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leaves" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="joinsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="leavesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#52525b", fontWeight: 700 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#52525b", fontWeight: 700 }}
                  width={30}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="joins"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#joinsGrad)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#10b981",
                    stroke: "#064e3b",
                    strokeWidth: 2,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leaves"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="url(#leavesGrad)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#f43f5e",
                    stroke: "#4c0519",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
