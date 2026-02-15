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

export function XPDisabledState({ onEnable }: { onEnable: () => void }) {
  return (
    <Card
      variant="cyberpunk"
      showGrid
      className="flex flex-col items-center justify-center py-24 text-center border-dashed"
    >
      <div className="absolute inset-0 bg-linear-to-b from-red-500/5 to-transparent pointer-events-none" />
      <div className="p-8 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl relative group">
        <div className="absolute -inset-4 bg-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Lock className="w-16 h-16 text-zinc-700 group-hover:text-red-500 transition-colors" />
      </div>
      <div className="max-w-md space-y-3 relative z-10">
        <h3
          className={cn(
            "text-3xl font-black text-white uppercase tracking-widest",
            audiowide.className
          )}
        >
          XP System Offline
        </h3>
        <p className="text-zinc-500 font-bold text-sm leading-relaxed">
          The leveling system is currently disabled for this server. Enable it
          to start tracking user activity.
        </p>
      </div>
      <Button
        variant="cyber"
        onClick={onEnable}
        className="h-14 px-10 tracking-widest"
      >
        Configure Settings
        <Zap className="ml-2 w-4 h-4 fill-black group-hover:animate-pulse" />
      </Button>
    </Card>
  );
}

export function EmptyState() {
  return (
    <Card
      variant="cyberpunk"
      showGrid
      className="flex flex-col items-center justify-center py-24 text-center border-dashed"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-zinc-500/5 blur-3xl rounded-full" />
        <Trophy className="w-20 h-20 text-zinc-800 animate-pulse" />
      </div>
      <div className="max-w-md space-y-3">
        <h3
          className={cn(
            "text-2xl font-black text-white uppercase tracking-widest",
            audiowide.className
          )}
        >
          No Rankings Yet
        </h3>
        <p className="text-zinc-500 font-bold text-sm leading-relaxed">
          Wait for users to chat or interact to see them appear here.
        </p>
      </div>
    </Card>
  );
}
