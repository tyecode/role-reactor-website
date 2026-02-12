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

interface CommandData {
  name: string;
  count: number;
}

export function CommandUsageChart({ data }: { data: CommandData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data.slice(0, 10)}
        layout="vertical"
        margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#27272a"
          horizontal={true}
          vertical={false}
        />
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#71717a"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={80}
          tickFormatter={(value) => `/${value.toUpperCase()}`}
          style={{ fontFamily: "monospace", fontWeight: "bold" }}
        />
        <Tooltip
          cursor={{ fill: "rgba(6,182,212,0.05)" }}
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            borderColor: "rgba(6,182,212,0.2)",
            borderRadius: "12px",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
          itemStyle={{ color: "#06b6d4" }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
          {data.map((_, index) => (
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
