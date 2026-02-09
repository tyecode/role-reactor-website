"use client";

import { Zap, Shield, Trophy } from "lucide-react";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

export function PricingBenefits() {
  return (
    <div className="relative mx-6 mb-3 p-4 rounded-2xl border border-white/10 bg-zinc-950/50 overflow-hidden group backdrop-blur-md">
      <CyberpunkBackground
        gridSize={24}
        gridOpacity={0.04}
        gridColor="#00ffff"
        showGlows={true}
        primaryGlow="rgba(6, 182, 212, 0.15)"
        secondaryGlow="rgba(217, 70, 239, 0.12)"
        showNoise={true}
        showScanlines={false}
        showGlitchLines={true}
      />

      <div className="relative z-10">
        <ul className="space-y-2">
          <li className="flex items-center gap-3 text-white group/item">
            <div className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300 group-hover/item:text-white transition-colors">
              Premium Automation Tools
            </span>
          </li>
          <li className="flex items-center gap-3 text-white group/item">
            <div className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300 group-hover/item:text-white transition-colors">
              Advanced XP Systems
            </span>
          </li>
          <li className="flex items-center gap-3 text-white group/item">
            <div className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.4)]">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300 group-hover/item:text-white transition-colors">
              Exclusive Ranked Rewards
            </span>
          </li>
        </ul>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-3">
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
        <span className="w-3 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300" />
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
      </div>
    </div>
  );
}
