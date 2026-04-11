"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface StatsData {
  name: string;
  count: number;
}

export function StatsChart({ data }: { data: StatsData[] }) {
  // Handle empty or undefined data
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-zinc-600 text-sm font-mono">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#27272a"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          stroke="#71717a"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.toUpperCase()}
        />
        <YAxis
          stroke="#71717a"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            borderColor: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
          itemStyle={{ color: "#06b6d4" }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#06b6d4" : "#d946ef"}
              fillOpacity={0.8}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
