"use client";

import {
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Settings,
} from "lucide-react";
import { Audiowide } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface FeaturesGridProps {
  isPremium: boolean;
}

export function FeaturesGrid({ isPremium }: FeaturesGridProps) {
  const features = [
    {
      icon: Sparkles,
      title: "Advanced Selection Modes",
      description: "Unique and Verify modes for sophisticated role management",
      status: isPremium ? "active" : "locked",
      color: "cyan",
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get help faster with dedicated premium support",
      status: isPremium ? "active" : "locked",
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Deep insights into server engagement and activity",
      status: isPremium ? "active" : "locked",
      color: "cyan",
    },
    {
      icon: Users,
      title: "Enhanced XP System",
      description: "Advanced leveling features and customization",
      status: isPremium ? "active" : "locked",
      color: "cyan",
    },
    {
      icon: Rocket,
      title: "Early Access",
      description: "Be the first to try new features and updates",
      status: isPremium ? "active" : "locked",
      color: "cyan",
    },
    {
      icon: Settings,
      title: "Advanced Configuration",
      description: "Fine-tune every aspect of your bot experience",
      status: isPremium ? "active" : "locked",
      color: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2
          className={cn(
            "text-lg font-bold text-white flex items-center gap-3",
            audiowide.className
          )}
        >
          <Sparkles className="text-purple-500 w-5 h-5" />
          {isPremium ? "Active Features" : "Available Features"}
        </h2>
        {!isPremium && (
          <Badge
            variant="outline"
            className="text-xs font-black uppercase border-amber-500/30 text-amber-400"
          >
            Locked
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature.title} className="h-full">
            <Card
              className={cn(
                "group relative h-full transition-all duration-500 overflow-hidden border-white/5 bg-black/40 hover:bg-black/60",
                feature.status !== "active" &&
                  "opacity-50 grayscale hover:grayscale-0",
                "hover:border-white/10"
              )}
            >
              <CardContent className="p-6 flex items-start gap-5">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg border shrink-0",
                    feature.status === "active"
                      ? "bg-cyan-500/5 border-cyan-500/20 text-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
                      : "bg-zinc-900/50 text-zinc-600 border-white/5"
                  )}
                >
                  <feature.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "font-bold truncate text-[11px] uppercase tracking-[0.15em] leading-tight",
                        audiowide.className,
                        feature.status === "active"
                          ? "text-white group-hover:text-cyan-400 transition-colors"
                          : "text-zinc-500"
                      )}
                    >
                      {feature.title}
                    </h3>
                    {feature.status === "active" && (
                      <div className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </div>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-[10px] leading-relaxed font-bold uppercase tracking-wider line-clamp-2",
                      feature.status === "active"
                        ? "text-zinc-500 group-hover:text-zinc-400 transition-colors"
                        : "text-zinc-700"
                    )}
                  >
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
