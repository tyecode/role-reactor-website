"use client";

import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface StatusModuleProps {
  daysRem: number;
  hoursRem: number;
  minutesRem: number;
  progressPercent: number;
}

export function StatusModule({
  daysRem,
  hoursRem,
  minutesRem,
  progressPercent,
}: StatusModuleProps) {
  return (
    <Card
      variant="cyberpunk"
      showGrid
      className="border-cyan-500/20 group/status min-h-50 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]"
      contentClassName="p-6 sm:p-7 flex flex-col justify-between"
    >
      {/* Internal HUD FX - Custom Overrides */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-3xl pointer-events-none group-hover/status:bg-cyan-500/10 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-px h-1/2 bg-linear-to-t from-cyan-500/50 via-cyan-500/10 to-transparent" />
      <div className="absolute top-0 left-0 w-1/2 h-px bg-linear-to-r from-cyan-500/50 via-cyan-500/10 to-transparent" />

      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-cyan-500/5 border-l-[3px] border-cyan-500 shadow-[2px_0_10px_-2px_rgba(6,182,212,0.5)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
              </span>
              <span className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.25em]">
                Subscription Active
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-nowrap items-center justify-around gap-1 bg-cyan-500/5 p-3 sm:p-4 rounded-lg border border-cyan-500/10 overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]",
                    audiowide.className
                  )}
                >
                  {daysRem}
                </span>
                <span className="text-[7px] sm:text-[8px] text-cyan-400 font-black uppercase tracking-widest opacity-80 shrink-0">
                  Days
                </span>
              </div>
            </div>

            <div className="w-px h-6 sm:h-8 bg-linear-to-b from-transparent via-cyan-500/30 to-transparent self-center -rotate-12 shrink-0" />

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]",
                    audiowide.className
                  )}
                >
                  {hoursRem}
                </span>
                <span className="text-[7px] sm:text-[8px] text-cyan-400 font-black uppercase tracking-widest opacity-80 shrink-0">
                  Hrs
                </span>
              </div>
            </div>

            <div className="w-px h-6 sm:h-8 bg-linear-to-b from-transparent via-cyan-500/30 to-transparent self-center -rotate-12 shrink-0" />

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]",
                    audiowide.className
                  )}
                >
                  {minutesRem}
                </span>
                <span className="text-[7px] sm:text-[8px] text-cyan-400 font-black uppercase tracking-widest opacity-80 shrink-0">
                  Min
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex gap-2 justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400/50">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-cyan-500/40 rounded-full" />
                Time Remaining Breakdown
              </div>
              <span className="font-mono">{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900/80 rounded-sm overflow-hidden border border-white/5 shadow-inner relative group/bar">
              <div
                className="h-full bg-linear-to-r from-cyan-600 via-cyan-400 to-white shadow-[0_0_20px_rgba(6,182,212,1)] transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Dynamic Scanning Pulse */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-cyan-500/20"
              />
            ))}
          </div>
          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest leading-relaxed">
            Pro Engine <span className="text-cyan-400/80">Capabilities</span>{" "}
            Operational
          </p>
        </div>
      </div>
    </Card>
  );
}
