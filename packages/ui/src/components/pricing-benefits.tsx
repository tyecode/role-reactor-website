"use client";

import { ScanFace, Zap, Library } from "lucide-react";

export function PricingBenefits() {
  return (
    <div className="relative mx-6 mb-4 p-4 rounded-[24px] border border-zinc-800/50 bg-zinc-900/50 overflow-hidden group">
      {/* Subtle Gradient Glow matching home page */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/15 transition-colors duration-500" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/15 transition-colors duration-500" />

      <div className="relative z-10">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-white group/item">
            <div className="text-zinc-500 group-hover/item:text-blue-400 transition-colors">
              <ScanFace className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-tight">
              Full AI Feature Access
            </span>
          </li>
          <li className="flex items-center gap-3 text-white group/item">
            <div className="text-zinc-500 group-hover/item:text-yellow-500 transition-colors">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-tight">
              NSFW Generation Unlocked
            </span>
          </li>
          <li className="flex items-center gap-3 text-white group/item">
            <div className="text-zinc-500 group-hover/item:text-purple-400 transition-colors">
              <Library className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-tight">
              Priority Processing Speed
            </span>
          </li>
        </ul>
      </div>

      {/* Fake Pagination Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        <span className="w-1 h-1 rounded-full bg-zinc-700" />
        <span className="w-3 h-1 rounded-full bg-blue-500 transition-all duration-300" />
        <span className="w-1 h-1 rounded-full bg-zinc-700" />
      </div>
    </div>
  );
}
