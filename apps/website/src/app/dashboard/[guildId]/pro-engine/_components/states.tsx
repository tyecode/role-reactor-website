"use client";

import { Shield, Calendar, Zap, Lock, AlertTriangle } from "lucide-react";
import { Audiowide } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface ProEngineActiveAlertProps {
  isCancelled: boolean;
  premiumStatus: any;
}

export function ProEngineActiveAlert({
  isCancelled,
  premiumStatus,
}: ProEngineActiveAlertProps) {
  return (
    <Card className="relative overflow-hidden border-white/5 bg-zinc-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/3 bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8">
        <div className="space-y-2 max-w-2xl min-w-0 w-full">
          <h3
            className={cn(
              "text-xl font-black uppercase tracking-widest text-white flex items-center gap-3",
              audiowide.className
            )}
          >
            PRO ENGINE CORE
          </h3>
          <p className="text-sm font-medium text-zinc-500 leading-relaxed wrap-break-word">
            Pro Engine system is active and tracking activity across your
            community. Advanced automation and premium features are fully
            operational.
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.15)] shrink-0">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_10px_cyan]"></span>
          </div>
          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </Card>
  );
}

interface ProEngineLockedAlertProps {
  onUnlock: () => void;
}

export function ProEngineLockedAlert({ onUnlock }: ProEngineLockedAlertProps) {
  return (
    <Card
      className="relative overflow-hidden border-amber-500/20 bg-zinc-950 group cursor-pointer hover:border-amber-500/40 transition-all duration-500"
      onClick={onUnlock}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/3 bg-amber-500/5 blur-[80px] pointer-events-none group-hover:bg-amber-500/10 transition-all" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8">
        <div className="flex items-center gap-5 w-full min-w-0">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-500">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-base font-black text-amber-500 tracking-wider mb-1 truncate",
                audiowide.className
              )}
            >
              PRO ENGINE LOCKED
            </h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider group-hover:text-zinc-400 transition-colors wrap-break-word">
              Enable Pro Engine to unlock advanced server management
              capabilities.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex shrink-0 font-black uppercase text-[10px] bg-transparent border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 hover:border-amber-500 shadow-[0_0_0_rgba(245,158,11,0)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300"
          >
            Unlock Now
          </Button>
        </div>
      </div>
    </Card>
  );
}

interface ProEngineCancelledAlertProps {
  expiresAt: string;
  cost?: number;
  onReactivate: () => void;
}

export function ProEngineCancelledAlert({
  expiresAt,
  cost,
  onReactivate,
}: ProEngineCancelledAlertProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
      <Card
        variant="default"
        className="bg-blue-500/5 border-blue-500/10 relative overflow-hidden group hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-500"
      >
        <div className="flex items-center gap-5 relative z-10 py-5 px-6">
          <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-1">
              Subscription Cancelled
            </h3>
            <p className="text-[10px] text-blue-400/60 font-medium leading-relaxed uppercase tracking-wider">
              All features remain active until{" "}
              {new Date(expiresAt).toLocaleDateString()}. Auto-renewal will cost{" "}
              {cost || 50} Cores/month starting then.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-black uppercase text-[10px] border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
            onClick={onReactivate}
          >
            Re-activate
          </Button>
        </div>
      </Card>
    </div>
  );
}

import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

interface LockedStateProps {
  onActivate: () => void;
}

export function LockedState({ onActivate }: LockedStateProps) {
  return (
    <Card
      variant="cyberpunk"
      className="relative overflow-hidden min-h-[450px] w-full group flex flex-col items-center justify-center"
    >
      <CyberpunkBackground
        showGrid={true}
        gridColor="#f59e0b"
        gridOpacity={0.03}
        showScanlines={true}
        showNoise={true}
        primaryGlow="rgba(245, 158, 11, 0.12)"
        secondaryGlow="rgba(245, 158, 11, 0.05)"
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 py-12">
        {/* Status Badge */}
        <div className="mb-12">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span
              className={cn(
                "text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] whitespace-nowrap",
                audiowide.className
              )}
            >
              System Status: Locked
            </span>
          </div>
        </div>

        {/* Hexagon/Icon Container */}
        <div className="relative mb-8 group-hover:scale-110 transition-transform duration-700">
          <div className="absolute -inset-10 bg-amber-600/20 blur-[60px] rounded-full opacity-50 animate-pulse" />
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Layered Borders */}
            <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
            <div className="absolute inset-2 border border-amber-500/30 rounded-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

            <div className="relative w-16 h-16 rounded-2xl bg-zinc-950 border border-amber-500/40 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-transparent" />
              <Lock className="w-7 h-7 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-4 mb-10 w-full flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-6 w-full max-w-lg relative">
            {/* Balanced Decorative Lines */}
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-amber-500/40 to-amber-500/10" />
            <h3
              className={cn(
                "text-2xl sm:text-3xl font-black text-white uppercase tracking-[0.1em] drop-shadow-sm whitespace-nowrap px-4",
                audiowide.className
              )}
            >
              Pro Engine Locked
            </h3>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-amber-500/40 to-amber-500/10" />
          </div>
          <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-md mx-auto">
            Advanced system modules are currently dormant. Activate Pro Engine
            to synchronize historical analytics and unlock modular command
            control.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative group/btn">
          <div className="absolute -inset-4 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          <Button
            variant="neon"
            size="lg"
            onClick={onActivate}
            className="h-14 px-10 relative z-10 bg-amber-500 hover:bg-amber-400 text-black border-none"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 fill-black" />
              <span
                className={cn(
                  "text-sm font-black uppercase tracking-[0.2em]",
                  audiowide.className
                )}
              >
                Sync Pro Engine
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Background Decorative */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-amber-500/20 to-amber-500/10" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600/5 blur-3xl pointer-events-none" />
    </Card>
  );
}
