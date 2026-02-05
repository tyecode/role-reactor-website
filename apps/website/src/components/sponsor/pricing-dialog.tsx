"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@role-reactor/ui/components/dialog";
import { Button } from "@role-reactor/ui/components/button";
import { defaultPackages } from "@/components/sponsor/constants";
import { PricingCards } from "@/components/sponsor/pricing-cards";
import { PaymentModal } from "@/components/sponsor/payment-modal";
import type { CorePackage, PricingData } from "@/types/pricing";
import { Zap } from "lucide-react";

interface PricingDialogProps {
  children?: ReactNode;
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PricingDialog({
  children,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PricingDialogProps) {
  const { data: session } = useSession();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = setControlledOpen ?? setInternalOpen;

  const [packages, setPackages] = useState<CorePackage[]>(defaultPackages);
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CorePackage | null>(
    null,
  );
  const [loadingPackageId, setLoadingPackageId] = useState<string | null>(null);

  const fetchPricing = useCallback(async () => {
    try {
      setLoading(true);
      const url = session?.user?.id
        ? `/api/pricing?user_id=${session.user.id}`
        : "/api/pricing";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success && data.data) {
        setPricingData(data.data);
        if (data.data.packages && data.data.packages.length > 0) {
          setPackages(data.data.packages);
        }
      }
    } catch (error) {
      console.error("Error fetching pricing:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (isOpen) {
      fetchPricing();
    }
  }, [isOpen, fetchPricing]);

  const handlePayment = async (packageId: string) => {
    if (!session?.user?.id) {
      signIn("discord", { callbackUrl: window.location.href });
      return;
    }

    const pkg = packages.find((p) => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
      setIsPaymentModalOpen(true);
    }
  };

  const handleCryptoPayment = async (packageId: string, amount: number) => {
    setLoadingPackageId(packageId);
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, packageId }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create payment");

      const paymentUrl = data.data?.paymentUrl || data.data?.invoiceUrl;
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (err) {
      console.error("Payment error:", err);
      setLoadingPackageId(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        {trigger ? (
          <DialogTrigger asChild>{trigger as React.ReactElement}</DialogTrigger>
        ) : (
          <DialogTrigger asChild>
            {
              (children || (
                <Button variant="ghost" size="sm" className="gap-2">
                  <Zap
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                  />
                  <span>Get Cores</span>
                </Button>
              )) as React.ReactElement
            }
          </DialogTrigger>
        )}
        <DialogContent className="max-w-[400px] bg-black border-zinc-800 p-0 shadow-2xl overflow-hidden gap-0 rounded-4xl">
          {/* Header Section */}
          <div className="bg-zinc-900 mx-4 mt-4 mb-2 p-5 rounded-3xl border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">
              What's included
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-zinc-400"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span>Fast Generation</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400" />
                </div>
                <span>Priority Queue</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-zinc-400"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <span>High Quality Models</span>
              </li>
            </ul>

            {/* Fake Pagination Dots */}
            <div className="flex justify-center gap-1.5 mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>
          </div>

          <div className="px-4 pb-6 pt-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <PricingCards
              packages={packages}
              pricingData={pricingData}
              onPayment={handlePayment}
              loadingPackageId={loadingPackageId}
              isLoading={loading}
            />

            <p className="text-[10px] text-zinc-600 text-center mt-4 px-4 leading-tight">
              By buying Cores, you agree to our terms of service. Cores are
              non-refundable.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {session?.user?.id && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          selectedPackage={selectedPackage}
          userId={session.user.id}
          onCryptoPayment={handleCryptoPayment}
          onSuccess={() => {
            setIsPaymentModalOpen(false);
            setOpen(false);
            fetchPricing();
          }}
        />
      )}
    </>
  );
}
