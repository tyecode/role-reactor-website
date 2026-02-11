"use client";

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        "bg-zinc-900/40 backdrop-blur-sm",
        "border border-white/5",
        "group/skeleton",
        "after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/[0.02] after:to-transparent after:pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Shimmer Effect - Neutralized and subtle for a premium feel */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />

      {/* Subtle Scanline Texture (Non-animated) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_4px)]" />

      {/* Noise layer for deep texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

export { Skeleton };
