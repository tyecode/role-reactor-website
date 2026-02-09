"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function GlitchTestPage() {
  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Glitch & Sound Test Lab
        </h1>
        <p className="text-zinc-500 max-w-2xl">
          Use this page to verify that glitch animations and sound effects are
          working exactly as intended. The sounds should only play when the
          specific glitch animations start.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Standard Glitch Test */}
        <div className="p-6 rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <h2 className="text-xl font-bold text-white">Standard Glitch</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Tests the basic <code>dialog-glitch-animation</code> used in most
            standard dialogs.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-6 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                Launch Standard
              </button>
            </DialogTrigger>
            <DialogContent className="dialog-glitch-animation">
              <DialogHeader>
                <DialogTitle>Standard Glitch Protocol</DialogTitle>
                <DialogDescription>
                  This dialog uses the default <code>dialogGlitchIn</code> and{" "}
                  <code>dialogGlitchOut</code> animations.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 text-zinc-400 space-y-2">
                <p>Verify:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>Glitch sound plays instantly on open.</li>
                  <li>
                    Glitch sound plays when clicking the (X) or clicking
                    outside.
                  </li>
                  <li>
                    No sound plays when clicking elements inside the dialog.
                  </li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Advanced Glitch Test */}
        <div className="p-6 rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
            <h2 className="text-xl font-bold text-white">
              Advanced Glitch (RGB Split)
            </h2>
          </div>
          <p className="text-sm text-zinc-400">
            Tests the <code>dialog-glitch-advanced</code> used for premium
            features like Pro Engine.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-6 py-2.5 rounded-xl bg-zinc-800 text-white font-bold border border-white/10 hover:border-fuchsia-500 hover:shadow-[0_0_20px_-5px_rgba(232,121,249,0.3)] transition-all">
                Launch Advanced
              </button>
            </DialogTrigger>
            <DialogContent className="dialog-glitch-advanced max-w-md p-0 bg-black border border-zinc-800 shadow-3xl">
              <div className="dialog-inner-content p-8 space-y-4 bg-zinc-950/50 backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle className="text-fuchsia-500 font-black italic tracking-widest uppercase">
                    Advanced Sync Error
                  </DialogTitle>
                  <DialogDescription className="text-zinc-500">
                    This dialog uses the <code>rgbSplit</code> animation name.
                  </DialogDescription>
                </DialogHeader>
                <div className="border border-fuchsia-500/20 bg-fuchsia-500/5 p-4 rounded-lg">
                  <p className="text-xs text-fuchsia-200 uppercase tracking-widest font-bold mb-2">
                    Technical Specs:
                  </p>
                  <pre className="text-[10px] text-fuchsia-400/70 font-mono">
                    Animation: rgbSplit (steps: 8)
                    <br />
                    Container: dialog-glitch-advanced
                    <br />
                    State: {`{ data-state: "open" }`}
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Grid Lab */}
      <section className="mt-12 space-y-8">
        <div className="flex flex-col gap-2">
          <h2
            className={cn(
              "text-3xl font-black text-white",
              audiowide.className
            )}
          >
            Atmosphere Lab
          </h2>
          <p className="text-zinc-500 font-medium">
            Preview the reusable CyberpunkBackground component with grid and
            neon glows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-48 rounded-3xl border border-white/5 bg-zinc-900/30 overflow-hidden group">
            <CyberpunkBackground
              gridSize={48}
              gridOpacity={0.05}
              gridColor="#00ffff"
              showGlows={true}
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                Cyan Standard (48px)
              </span>
            </div>
          </div>

          <div className="relative h-48 rounded-3xl border border-white/5 bg-zinc-900/30 overflow-hidden group">
            <CyberpunkBackground
              gridSize={12}
              gridOpacity={0.03}
              gridColor="#f5d0fe"
              showGlows={true}
              primaryGlow="rgba(217, 70, 239, 0.1)"
              secondaryGlow="rgba(192, 38, 211, 0.05)"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400">
                Micro Matrix (12px)
              </span>
            </div>
          </div>

          <div className="relative h-48 rounded-3xl border border-white/5 bg-zinc-900/30 overflow-hidden group">
            <CyberpunkBackground
              gridSize={64}
              gridOpacity={0.1}
              gridColor="#3b82f6"
              mask="radial-gradient(circle at center, black, transparent 80%)"
              showGlows={true}
              primaryGlow="rgba(59, 130, 246, 0.2)"
              secondaryGlow="rgba(37, 99, 235, 0.1)"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                Masked Large (64px)
              </span>
            </div>
          </div>

          <div className="relative h-48 rounded-3xl border border-white/5 bg-zinc-900/30 overflow-hidden group">
            <CyberpunkBackground
              showGrid={true}
              gridSize={32}
              gridOpacity={0.05}
              showNoise={true}
              showScanlines={true}
              showGlitchLines={true}
              showGlows={true}
              primaryGlow="rgba(255, 255, 255, 0.05)"
              secondaryGlow="rgba(0, 255, 255, 0.05)"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Old TV mode (CRT)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Integration Test */}
      <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            className="rotate-12"
          >
            <path
              d="M10 10L190 190M190 10L10 190"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white italic tracking-tighter">
            Stress Test: Rapid Switching
          </h2>
          <p className="text-sm text-zinc-500">
            Switching tabs should <strong>NOT</strong> trigger glitch sounds,
            even if tabs have their own entry animations.
          </p>
        </div>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="bg-zinc-950/50 border-zinc-800">
            <TabsTrigger value="status">System Status</TabsTrigger>
            <TabsTrigger value="network">Network Grid</TabsTrigger>
            <TabsTrigger value="security">Security Layer</TabsTrigger>
          </TabsList>
          <TabsContent
            value="status"
            className="mt-6 p-12 border border-white/5 bg-zinc-900/20 rounded-2xl flex flex-col items-center justify-center gap-4 text-center"
          >
            <div className="text-green-500 font-mono text-xs animate-pulse">
              SYSTEM_OPTIMAL_100%
            </div>
            <p className="text-zinc-400">Changing tabs should be silent.</p>
          </TabsContent>
          <TabsContent
            value="network"
            className="mt-6 p-12 border border-white/5 bg-zinc-900/20 rounded-2xl text-center"
          >
            <div className="text-cyan-500 font-mono text-xs">
              GRID_ACTIVE :: NODE_STABLE
            </div>
          </TabsContent>
          <TabsContent
            value="security"
            className="mt-6 p-12 border border-white/5 bg-zinc-900/20 rounded-2xl text-center"
          >
            <div className="text-fuchsia-500 font-mono text-xs">
              FIREWALL_ENABLED :: NO_BREACH
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <div className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">
          Diagnostics Terminal v1.0.4 // Zero Latency Audio Context Locked
        </div>
      </div>
    </div>
  );
}
