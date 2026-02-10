"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Zap, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { PricingBenefits } from "./pricing-benefits";
import { PricingCards } from "./pricing-cards";
import type { CorePackage, PricingData } from "@/types/pricing";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface PackagesViewProps {
  packages: CorePackage[];
  pricingData: PricingData | null;
  onPaymentInitiation: (packageId: string) => void;
  loadingPackageId: string | null;
  loading: boolean;
}

export function PackagesView({
  packages,
  pricingData,
  onPaymentInitiation,
  loadingPackageId,
  loading,
}: PackagesViewProps) {
  return (
    <>
      <DialogTitle className="sr-only">Purchase Cores</DialogTitle>
      <DialogDescription className="sr-only">
        Select a package to purchase Core energy for your Discord server.
      </DialogDescription>

      <DialogHeader className="px-8 pt-8 pb-4 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
          <Rocket className="w-24 h-24 text-cyan-500" />
        </div>
        <div className="flex flex-col relative z-10">
          <h3
            className={cn(
              "text-xl font-black text-white tracking-widest leading-none flex items-center gap-3",
              audiowide.className
            )}
          >
            <Zap className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            CHARGE CORES
          </h3>
        </div>
      </DialogHeader>

      {/* Benefits Section */}
      <PricingBenefits />

      <div className="px-6 pb-6 pt-1 max-h-[60vh] overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <PricingCards
          packages={packages}
          pricingData={pricingData}
          onPayment={onPaymentInitiation}
          loadingPackageId={loadingPackageId}
          isLoading={loading && packages.length === 0}
        />

        <p className="text-[9px] text-zinc-600 text-center mt-4 px-4 leading-relaxed font-bold uppercase tracking-widest opacity-60">
          Transactions secured via encrypted protocols.
          <br />
          Cores are non-refundable digital assets.
        </p>
      </div>
    </>
  );
}
