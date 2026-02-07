"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { PricingCards } from "@/components/ui/pricing-cards";
import { PricingBenefits } from "@/components/ui/pricing-benefits";
import type { CorePackage } from "@/types/pricing";

import { usePricingStore } from "@/store/use-pricing-store";
import { useSession } from "next-auth/react";

interface PricingModalProps {
  trigger: ReactNode;
}

export function PricingModal({ trigger }: PricingModalProps) {
  const { data: session } = useSession();
  const { data, isLoading, fetchPricing } = usePricingStore();

  const [loadingPackageId, setLoadingPackageId] = useState<string | null>(null);
  const packages = data?.packages || [];
  const loading = isLoading;

  useEffect(() => {
    fetchPricing(session?.user?.id);
  }, [fetchPricing, session?.user?.id]);

  const router = useRouter();

  const handlePayment = (packageId: string, amount: number) => {
    setLoadingPackageId(packageId);

    // Find selected package to get details if needed, but we essentially just need values for URL
    const pkg = packages.find((p: CorePackage) => p.id === packageId);
    if (!pkg) return;

    const params = new URLSearchParams({
      package: packageId,
      amount: amount.toString(),
      cores: pkg.totalCores.toString(),
      name: pkg.name,
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[400px] bg-black border-zinc-800 p-0 shadow-3xl overflow-hidden gap-0 rounded-[40px] ring-1 ring-zinc-800/50">
        <DialogTitle className="sr-only">Purchase Cores</DialogTitle>

        <DialogHeader className="px-6 pt-8 pb-4">
          <div className="flex flex-col">
            <DialogTitle className="text-xl font-black text-white tracking-tight leading-none">
              What's included
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Benefits Section */}
        <PricingBenefits />

        <div className="px-4 pb-6 pt-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
          ) : (
            <PricingCards
              packages={packages}
              onPayment={handlePayment}
              loadingPackageId={loadingPackageId}
            />
          )}

          <p className="text-[10px] text-zinc-600 text-center mt-4 px-4 leading-tight">
            By buying Cores, you agree to our terms of service. Cores are
            non-refundable.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
