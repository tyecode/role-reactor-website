"use client";

import { Card } from "@/components/ui/card";
import { Check, X, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    name: "Reaction Messages",
    free: "3",
    pro: "20",
    category: "Role Reactions",
  },
  {
    name: "Emojis per Message",
    free: "10",
    pro: "20",
    category: "Role Reactions",
  },
  { name: "Active Giveaways", free: "3", pro: "20", category: "Giveaways" },
  { name: "Max Entries", free: "2,500", pro: "50,000", category: "Giveaways" },
  { name: "Max Winners", free: "5", pro: "20", category: "Giveaways" },
  { name: "Level Rewards", free: "5", pro: "Unlimited", category: "Leveling" },
  { name: "Replace Role Mode", free: false, pro: true, category: "Leveling" },
  { name: "Scheduled Roles", free: "25", pro: "500", category: "Automation" },
  { name: "Role Bundles", free: "5", pro: "15", category: "Automation" },
  { name: "Bulk Actions", free: "25", pro: "250", category: "Automation" },
  { name: "Tickets per Month", free: "50", pro: "500", category: "Ticketing" },
  { name: "Categories per Panel", free: "3", pro: "20", category: "Ticketing" },
  {
    name: "Transcript Retention",
    free: "7 days",
    pro: "Unlimited",
    category: "Ticketing",
  },
  {
    name: "Export Formats",
    free: "MD",
    pro: "HTML, JSON",
    category: "Ticketing",
  },
  { name: "Staff Analytics", free: false, pro: true, category: "Ticketing" },
  { name: "Ticket Automation", free: false, pro: true, category: "Ticketing" },
];

const categoryStyles: Record<
  string,
  { bg: string; badge: string; badgeBg: string }
> = {
  "Role Reactions": {
    bg: "bg-cyan-500/5",
    badge: "text-cyan-400",
    badgeBg: "bg-cyan-500/20",
  },
  Giveaways: {
    bg: "bg-pink-500/5",
    badge: "text-pink-400",
    badgeBg: "bg-pink-500/20",
  },
  Leveling: {
    bg: "bg-emerald-500/5",
    badge: "text-emerald-400",
    badgeBg: "bg-emerald-500/20",
  },
  Automation: {
    bg: "bg-purple-500/5",
    badge: "text-purple-400",
    badgeBg: "bg-purple-500/20",
  },
  Ticketing: {
    bg: "bg-amber-500/5",
    badge: "text-amber-400",
    badgeBg: "bg-amber-500/20",
  },
};

export function ProEngineBenefits() {
  return (
    <Card className="border-purple-500/20 bg-zinc-950/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-purple-500/5">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-bold text-white">
            Pro Engine Benefits
          </span>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/50 text-[10px] font-black uppercase tracking-widest text-zinc-500">
        <div className="col-span-5">Feature</div>
        <div className="col-span-3 text-center">Free</div>
        <div className="col-span-4 text-center text-purple-400">Pro Engine</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/5">
        {benefits.map((item, index) => {
          const style = categoryStyles[item.category];
          const isFirstOfCategory =
            index === 0 || benefits[index - 1].category !== item.category;

          return (
            <div
              key={item.name}
              className={cn(
                "grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs",
                isFirstOfCategory && "border-t border-white/5",
                isFirstOfCategory && style.bg
              )}
            >
              {/* Feature Name with Category Badge */}
              <div className="col-span-5 flex items-center gap-2">
                {isFirstOfCategory && (
                  <span
                    className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded shrink-0",
                      style.badgeBg,
                      style.badge
                    )}
                  >
                    {item.category}
                  </span>
                )}
                <span
                  className={cn(
                    "text-zinc-400",
                    isFirstOfCategory && "font-medium"
                  )}
                >
                  {item.name}
                </span>
              </div>

              {/* Free Value */}
              <div className="col-span-3 text-center">
                <span className="text-zinc-600 font-mono text-xs">
                  {typeof item.free === "boolean"
                    ? item.free
                      ? "✅"
                      : "—"
                    : item.free}
                </span>
              </div>

              {/* Pro Value */}
              <div className="col-span-4 text-center flex items-center justify-center gap-1">
                {typeof item.pro === "boolean" ? (
                  item.pro ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <X className="w-4 h-4 text-zinc-700" />
                  )
                ) : (
                  <span className="text-purple-400 font-bold">{item.pro}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
