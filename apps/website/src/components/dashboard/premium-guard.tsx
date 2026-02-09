"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Crown, CheckCircle2, Loader2, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface PremiumGuardProps {
  isPremium?: boolean;
  children?: ReactNode;
  onActivate: () => void;
  isActivating?: boolean;
  title?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  subText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PremiumGuard({
  onActivate,
  isActivating = false,
  title = "ACTIVATE PRO ENGINE",
  description = "Unlock full potential with our Pro functionalities.",
  features = [
    "Full Feature Access",
    "Priority Support",
    "No Restrictions",
    "Early Access",
  ],
  buttonText = "UNLOCK FOR 50 CORES",
  subText = "Deducts 50 Cores every 30 days",
  open,
  onOpenChange,
}: PremiumGuardProps) {
  const params = useParams();
  const guildId = params.guildId as string;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px] bg-zinc-950 border-cyan-500/20 p-0 shadow-[0_0_100px_rgba(6,182,212,0.3),0_0_50px_rgba(0,0,0,1)] gap-0 rounded-3xl! backdrop-blur-2xl ring-2 ring-cyan-500/10 overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>

        {/* Animated Background Effects */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        <DialogHeader className="px-8 pt-8 pb-4 relative overflow-hidden">
          {/* Enhanced Background Crown Glow */}
          <div className="absolute top-0 right-0 p-8 opacity-20 blur-2xl pointer-events-none animate-pulse">
            <Crown className="w-32 h-32 text-cyan-400" />
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-30 pointer-events-none">
            <Crown className="w-24 h-24 text-cyan-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]" />
          </div>

          <div className="flex flex-col relative z-10">
            <h3
              className={cn(
                "text-xl font-black text-white tracking-widest leading-none flex items-center gap-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]",
                audiowide.className
              )}
            >
              <Zap className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              {title}
            </h3>
            <p className="text-[10px] text-zinc-400 mt-3 font-bold uppercase tracking-wider leading-relaxed">
              {description}
            </p>
          </div>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-6">
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="bg-zinc-900/40 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-2.5 hover:bg-zinc-900/80 hover:border-cyan-500/20 transition-all group/item"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-500/20 transition-colors border border-cyan-500/20">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider truncate">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Activation Button */}
          <Button
            size="lg"
            disabled={isActivating}
            onClick={onActivate}
            className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] group transition-all active:scale-95 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            {isActivating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Zap className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                {buttonText}
              </>
            )}
          </Button>

          <p className="text-[9px] text-zinc-600 text-center tracking-[0.3em] uppercase font-black opacity-60">
            {subText}
          </p>

          {/* Learn More Link */}
          {guildId && (
            <Link
              href={`/dashboard/${guildId}/pro-engine`}
              onClick={() => onOpenChange?.(false)}
              className="flex items-center justify-center gap-2 text-[10px] text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-widest transition-colors group/link"
            >
              <span>Learn more about Pro Engine</span>
              <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
