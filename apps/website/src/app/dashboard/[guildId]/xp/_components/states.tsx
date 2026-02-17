"use client";

import { Audiowide } from "next/font/google";
import { Trophy, Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

export function XPDisabledState({ onEnable }: { onEnable: () => void }) {
  return (
    <Card
      variant="cyberpunk"
      className="relative overflow-hidden min-h-[450px] w-full group flex flex-col items-center justify-center"
    >
      <CyberpunkBackground
        showGrid={true}
        gridColor="#f43f5e"
        gridOpacity={0.03}
        showScanlines={true}
        showNoise={true}
        primaryGlow="rgba(244, 63, 94, 0.12)"
        secondaryGlow="rgba(244, 63, 94, 0.05)"
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 py-12">
        {/* Status Badge */}
        <div className="mb-12">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span
              className={cn(
                "text-[10px] font-black text-red-500 uppercase tracking-[0.2em] whitespace-nowrap",
                audiowide.className
              )}
            >
              Module Status: Offline
            </span>
          </div>
        </div>

        {/* Hexagon/Icon Container */}
        <div className="relative mb-8 group-hover:scale-110 transition-transform duration-700">
          <div className="absolute -inset-10 bg-red-600/20 blur-[60px] rounded-full opacity-50 animate-pulse" />
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Layered Borders */}
            <div className="absolute inset-0 border-2 border-red-500/20 rounded-3xl rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
            <div className="absolute inset-2 border border-red-500/30 rounded-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

            <div className="relative w-16 h-16 rounded-2xl bg-zinc-950 border border-red-500/40 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-transparent" />
              <Lock className="w-7 h-7 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-4 mb-10 w-full flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-6 w-full max-w-lg relative">
            {/* Balanced Decorative Lines */}
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-red-500/40 to-red-500/10" />
            <h3
              className={cn(
                "text-2xl sm:text-3xl font-black text-white uppercase tracking-[0.1em] drop-shadow-sm whitespace-nowrap px-4",
                audiowide.className
              )}
            >
              XP System Offline
            </h3>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-red-500/40 to-red-500/10" />
          </div>
          <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-md mx-auto">
            Neural tracking for this server is currently inactive. Initialize
            the module to start recording user engagement and awarding
            experience points.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative group/btn">
          <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          <Button
            variant="neon"
            size="lg"
            onClick={onEnable}
            className="h-14 px-10 relative z-10 bg-cyan-500 hover:bg-cyan-400 text-black border-none"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 fill-black" />
              <span
                className={cn(
                  "text-sm font-black uppercase tracking-[0.2em]",
                  audiowide.className
                )}
              >
                Initialize System
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Background Decorative */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/5 blur-3xl pointer-events-none" />
    </Card>
  );
}

export function EmptyState() {
  return (
    <Card
      variant="cyberpunk"
      className="relative overflow-hidden min-h-[450px] flex flex-col items-center justify-center p-8 text-center group"
    >
      <CyberpunkBackground
        showGrid={true}
        gridColor="#06b6d4"
        gridOpacity={0.03}
        primaryGlow="rgba(6, 182, 212, 0.1)"
        secondaryGlow="rgba(168, 85, 247, 0.05)"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute -inset-10 bg-cyan-500/10 blur-[60px] rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl bg-zinc-950/80 border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-cyan-500/30 transition-colors duration-500">
            <Trophy className="w-10 h-10 text-cyan-500 animate-bounce-slow" />
          </div>
        </div>

        <div className="space-y-3 max-w-sm">
          <h3
            className={cn(
              "text-3xl font-black text-white uppercase tracking-widest",
              audiowide.className
            )}
          >
            No Rankings
          </h3>
          <p className="text-zinc-500 font-medium text-sm leading-relaxed">
            The database is currently clear. Rankings will propagate as users
            synchronize with the engagement network.
          </p>
        </div>
      </div>
    </Card>
  );
}
