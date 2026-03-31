"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PaymentData {
  createdAt: string;
  amount: number;
}

interface ChartDataPoint {
  date: string;
  amount: number;
}

export function RevenueAreaChart({ data }: { data: PaymentData[] }) {
  // Prep data for chart (aggregation by day)
  const chartData = data
    .reduce((acc: ChartDataPoint[], payment) => {
      const date = new Date(payment.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.amount += payment.amount;
      } else {
        acc.push({ date, amount: payment.amount });
      }
      return acc;
    }, [])
    .reverse();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="h-full w-full bg-zinc-900/10 animate-pulse rounded-xl" />
    );

  return (
    <div className="h-full w-full min-h-75">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="date"
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
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
            labelStyle={{
              color: "#10b981",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAmount)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
