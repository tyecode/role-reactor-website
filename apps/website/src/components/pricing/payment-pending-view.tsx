"use client";

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface PaymentPendingViewProps {
  onReturn: () => void;
}

export function PaymentPendingView({ onReturn }: PaymentPendingViewProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center p-12 text-center space-y-6 relative overflow-hidden min-h-[400px] [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)]" />
      <div className="w-20 h-20 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-2 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)] relative z-10 animate-pulse">
        <Rocket className="w-10 h-10" />
      </div>
      <div className="space-y-2 relative z-10">
        <h3
          className={cn(
            "text-xl font-black text-white tracking-widest",
            audiowide.className
          )}
        >
          LINK ESTABLISHED
        </h3>
        <p className="text-xs text-zinc-500 max-w-[280px] font-bold uppercase tracking-wider leading-relaxed">
          External payment window opened.
          <br />
          Energy transfer will begin upon confirmation.
        </p>
      </div>
      <Button
        className="w-full max-w-[180px] mt-6 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-xl h-12 font-black uppercase tracking-widest text-xs relative z-10 transition-all hover:border-cyan-500/30"
        onClick={onReturn}
      >
        Return to Dashboard
      </Button>
    </div>
  );
}
