"use client";

import { Loader2, Zap, Sparkles } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import type { CorePackage, PricingData, Promotion } from "@/types/pricing";

interface PricingCardsProps {
  packages: CorePackage[];
  pricingData?: PricingData | null;
  onPayment: (packageId: string, amount: number) => void;
  loadingPackageId: string | null;
  isLoading?: boolean;
}

export function PricingCards({
  packages,
  pricingData,
  onPayment,
  loadingPackageId,
  isLoading = false,
}: PricingCardsProps) {
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800/50"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {packages.map((pkg) => {
        const isProcessing = loadingPackageId === pkg.id;
        const bonusPercent =
          pkg.bonusCores > 0
            ? Math.round((pkg.bonusCores / pkg.baseCores) * 100)
            : 0;

        return (
          <button
            key={pkg.id}
            onClick={() => {
              if (!session?.user?.id) {
                signIn("discord", { callbackUrl: window.location.href });
              } else {
                onPayment(pkg.id, pkg.price);
              }
            }}
            disabled={
              isProcessing || (loadingPackageId !== null && !isProcessing)
            }
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden",
              "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80",
              isProcessing && "opacity-80 cursor-wait",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {/* Background Gradient Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Left Side: Price & Badge */}
            <div className="flex flex-col items-start gap-1 z-10">
              {bonusPercent > 0 && (
                <div className="flex items-center gap-1 bg-green-900/30 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-900/50 uppercase tracking-wide">
                  +{bonusPercent}%
                  <Zap className="w-2.5 h-2.5 fill-current" />
                </div>
              )}
              <div className="text-xl font-bold text-white">
                ${pkg.price}{" "}
                <span className="text-sm font-normal text-zinc-500 ml-0.5">
                  US
                </span>
              </div>
            </div>

            {/* Right Side: Cores */}
            <div className="flex flex-col items-end z-10">
              {bonusPercent > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 line-through font-mono opacity-60">
                  {pkg.baseCores} <Zap className="w-2 h-2" />
                </div>
              )}
              <div className="flex items-center gap-1.5">
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                ) : (
                  <>
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent filter drop-shadow-sm">
                      {pkg.totalCores}
                    </span>
                    <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500 drop-shadow-lg shadow-orange-500/50" />
                  </>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
