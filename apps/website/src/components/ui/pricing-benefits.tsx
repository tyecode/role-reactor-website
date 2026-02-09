"use client";

import { Zap, Shield, Trophy } from "lucide-react";

export function PricingBenefits() {
  return (
    <div className="relative mx-6 mb-2 p-3 rounded-2xl border border-white/5 bg-zinc-950/40 overflow-hidden group backdrop-blur-md">
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#00ffff_1px,transparent_1px),linear-gradient(to_bottom,#00ffff_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Neon Glows */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-cyan-500/15 transition-colors duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-fuchsia-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-fuchsia-500/15 transition-colors duration-500" />

      <div className="relative z-10">
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2.5 text-white group/item">
            <div className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300 group-hover/item:text-white transition-colors">
              Premium Automation Tools
            </span>
          </li>
          <li className="flex items-center gap-2.5 text-white group/item">
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
      <div className="flex justify-center gap-1.5 mt-2">
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
        <span className="w-3 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300" />
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
      </div>
    </div>
  );
}
