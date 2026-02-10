"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    setHex(
      Math.floor(Math.random() * 1000)
        .toString(16)
        .toUpperCase()
    );
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-zinc-900/80 backdrop-blur-[4px]",
        "border border-white/10",
        "group/skeleton",
        "after:absolute after:inset-0 after:bg-linear-to-br after:from-white/[0.02] after:to-transparent after:pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Shimmer Effect - more focused and sharp */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-linear-to-r from-transparent via-cyan-500/[0.05] to-transparent skew-x-12" />

      {/* Edge Highlight - top/left flare */}
      <div className="absolute inset-0 border-t border-l border-white/10 rounded-inherit pointer-events-none" />

      {/* Scanning Line - CSS only, no extra JS needed, uses custom animation from global.css */}
      <div className="absolute inset-x-0 h-[2px] bg-linear-to-r from-transparent via-cyan-400/20 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-glitch-line-move mix-blend-screen" />

      {/* Corner Data Tech Tags - very subtle hex codes only visible on larger UI segments */}
      <div className="absolute top-1 left-2 opacity-0 group-hover/skeleton:opacity-30 transition-opacity duration-700 pointer-events-none">
        <span className="text-[6px] font-mono text-cyan-500 tracking-tighter uppercase">
          0x{hex || "000"}
        </span>
      </div>

      <div className="absolute bottom-1 right-2 opacity-0 group-hover/skeleton:opacity-30 transition-opacity duration-700 pointer-events-none">
        <span className="text-[6px] font-mono text-cyan-500 tracking-tighter uppercase">
          ERR_LCK
        </span>
      </div>

      {/* Glitch Overlay - triggered on hover or periodically if needed */}
      <div className="absolute inset-0 opacity-0 group-hover/skeleton:opacity-[0.1] bg-cyan-500/5 animate-skeleton-glitch pointer-events-none mix-blend-color-dodge transition-opacity duration-300" />

      {/* Noise layer for texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

export { Skeleton };
