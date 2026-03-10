"use client";

import { Calendar, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Audiowide } from "next/font/google";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProEngineSettings } from "@/store/use-pro-engine-store";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface SubscriptionStatsProps {
  premiumStatus: ProEngineSettings;
  isCancelled: boolean;
}

export function SubscriptionStats({
  premiumStatus,
  isCancelled,
}: SubscriptionStatsProps) {
  if (!premiumStatus?.subscription) return null;

  const stats = [
    {
      icon: Calendar,
      label: "Date Activated",
      value: new Date(
        premiumStatus.subscription.activatedAt
      ).toLocaleDateString(),
      color: "blue",
    },
    {
      icon: Zap,
      label: "Plan Cost",
      value: `${premiumStatus.premiumConfig?.PRO?.cost ?? premiumStatus.subscription.cost ?? 15} Cores`,
      sub: `/${premiumStatus.premiumConfig?.PRO?.period ?? premiumStatus.subscription.period ?? "week"}`,
      color: "purple",
    },
    {
      icon: isCancelled ? AlertTriangle : CheckCircle2,
      label: "Status",
      value: isCancelled ? "Cancelled" : "Active",
      sub: isCancelled ? "Ends soon" : "Auto-renews",
      color: isCancelled ? "amber" : "green",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            "animate-in fade-in slide-in-from-bottom-4 duration-500 min-w-0 h-full",
            i === 2 && "md:col-span-2 lg:col-span-1"
          )}
          style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
        >
          <Card
            variant="stat"
            className={cn(
              "p-5 flex flex-col justify-center min-h-[100px] h-full",
              stat.color === "blue" &&
                "border-blue-500/20 hover:border-blue-500/40",
              stat.color === "purple" &&
                "border-purple-500/20 hover:border-purple-500/40",
              stat.color === "green" &&
                "border-emerald-500/20 hover:border-emerald-500/40",
              stat.color === "amber" &&
                "border-amber-500/20 hover:border-amber-500/40"
            )}
          >
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <stat.icon
                className={cn(
                  "w-20 h-20 rotate-12",
                  stat.color === "blue" && "text-blue-500",
                  stat.color === "purple" && "text-purple-500",
                  stat.color === "green" && "text-emerald-500",
                  stat.color === "amber" && "text-amber-500"
                )}
              />
            </div>
            <div className="flex items-center gap-2 text-zinc-500 mb-2 relative z-10">
              <stat.icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  stat.color === "blue" && "text-blue-500",
                  stat.color === "purple" && "text-purple-500",
                  stat.color === "green" && "text-emerald-500",
                  stat.color === "amber" && "text-amber-500"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest truncate",
                  audiowide.className
                )}
              >
                {stat.label}
              </span>
            </div>
            <div
              className={cn(
                "text-xl sm:text-2xl font-black text-white relative z-10 tabular-nums flex flex-wrap items-baseline gap-x-2 gap-y-1",
                audiowide.className
              )}
            >
              <span className="truncate max-w-full">{stat.value}</span>
              {stat.sub && (
                <span className="text-xs text-zinc-500 truncate">
                  {stat.sub}
                </span>
              )}
            </div>
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent to-transparent",
                stat.color === "blue" && "via-blue-500/20",
                stat.color === "purple" && "via-purple-500/20",
                stat.color === "green" && "via-emerald-500/20",
                stat.color === "amber" && "via-amber-500/20"
              )}
            />
          </Card>
        </div>
      ))}
    </div>
  );
}
