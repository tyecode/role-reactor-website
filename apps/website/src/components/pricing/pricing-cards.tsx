import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import type { CorePackage, PricingData } from "@/types/pricing";

interface PricingCardsProps {
  packages: CorePackage[];
  pricingData?: PricingData | null;
  onPayment: (packageId: string, amount: number) => void;
  loadingPackageId: string | null;
  isLoading?: boolean;
}

export function PricingCards({
  packages,
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
              "w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 group relative overflow-hidden",
              "bg-zinc-900/40 border-zinc-800/60 hover:border-blue-500/30 hover:bg-zinc-800/60",
              "hover:shadow-[0_0_15px_rgba(59,130,146,0.05)]",
              isProcessing && "opacity-80 cursor-wait",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {/* Background Light Effect */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Left Side: Price & Badge */}
            <div className="flex flex-col items-start gap-1 z-10">
              {bonusPercent > 0 && (
                <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-blue-500/20 uppercase tracking-tight">
                  +{bonusPercent}% Bonus
                </div>
              )}
              <div className="text-lg font-bold text-white tracking-tight flex items-center gap-1">
                <span className="text-zinc-400 text-xs font-medium">$</span>
                {pkg.price}
                <span className="text-[9px] uppercase font-bold text-zinc-500 ml-1 tracking-widest">
                  USD
                </span>
              </div>
            </div>

            {/* Right Side: Cores */}
            <div className="flex flex-col items-end z-10">
              {bonusPercent > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 line-through font-medium opacity-70">
                  {pkg.baseCores}
                </div>
              )}
              <div className="flex items-center gap-2">
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                ) : (
                  <>
                    <span className="text-xl font-black bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                      {pkg.totalCores}
                    </span>
                    <div className="relative">
                      <Image
                        src="/images/cores/core_energy.png"
                        width={20}
                        height={20}
                        alt="Cores"
                        className="relative"
                      />
                    </div>
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
