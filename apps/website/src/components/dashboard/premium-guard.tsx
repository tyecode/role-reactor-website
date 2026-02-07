"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, CheckCircle2, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumGuardProps {
  isPremium: boolean;
  children: ReactNode;
  onActivate: () => void;
  isActivating?: boolean;
  title?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  subText?: string;
}

export function PremiumGuard({
  isPremium,
  children,
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
}: PremiumGuardProps) {
  return (
    <div
      className={cn(
        "relative w-full transition-all duration-300",
        !isPremium ? "h-[80vh] overflow-hidden" : "h-auto"
      )}
    >
      {!isPremium && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-black/60 rounded-xl h-full w-full">
          <Card className="max-w-md w-full bg-zinc-950/90 border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] animate-in fade-in zoom-in duration-500 rounded-3xl overflow-hidden relative backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none" />

            <CardContent className="p-6 text-center space-y-6 relative">
              <div className="relative mx-auto">
                <div className="w-16 h-16 bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                  <Crown className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                  {title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-[280px] mx-auto font-medium">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-black/40 px-3 py-2.5 rounded-lg border border-white/5 flex items-center gap-2.5 hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-blue-500/20 transition-colors">
                      <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" />
                    </div>
                    <span className="text-[10px] text-zinc-300 font-bold bg-transparent truncate">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  size="lg"
                  disabled={isActivating}
                  onClick={onActivate}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm h-12 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] border-t border-white/20 group transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {isActivating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-white" />
                      {buttonText}
                    </div>
                  )}
                </Button>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                  {subText}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div
        className={cn(
          "transition-all duration-500 h-full",
          !isPremium && "blur-sm opacity-50 pointer-events-none select-none"
        )}
      >
        {children}
      </div>
    </div>
  );
}
