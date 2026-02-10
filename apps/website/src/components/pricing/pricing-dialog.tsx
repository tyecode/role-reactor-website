"use client";

import { useEffect, useState, ReactNode } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePricingStore } from "@/store/use-pricing-store";
import { useUserStore } from "@/store/use-user-store";
import type { CorePackage } from "@/types/pricing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUiSound } from "@/hooks/use-ui-sound";
import { X } from "lucide-react";

// Sub-components
import { PackagesView } from "./packages-view";
import { PaymentMethodView } from "./payment-method-view";
import { PaymentPendingView } from "./payment-pending-view";

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
  const router = useRouter();
  const { playBeep, playConfirm, playSwitch } = useUiSound();
  const [internalOpen, setInternalOpen] = useState(false);
  const [view, setView] = useState<"packages" | "payment" | "payment_pending">(
    "packages"
  );

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = setControlledOpen ?? setInternalOpen;

  const {
    data: pricingData,
    isLoading: isStoreLoading,
    fetchPricing,
  } = usePricingStore();

  const { updateBalance, fetchUser } = useUserStore();

  const packages = pricingData?.packages || [];
  const loading = isStoreLoading;

  useEffect(() => {
    if (pricingData?.user?.currentCredits) {
      updateBalance(pricingData.user.currentCredits);
    }
  }, [pricingData?.user, updateBalance]);

  const [selectedPackage, setSelectedPackage] = useState<CorePackage | null>(
    null
  );
  const [loadingPackageId] = useState<string | null>(null);
  const [loadingCryptoId, setLoadingCryptoId] = useState<string | null>(null);
  const [loadingStripe, setLoadingStripe] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPricing(session?.user?.id);
      setView("packages");
    }
  }, [isOpen, fetchPricing, session?.user?.id]);

  const handlePaymentInitiation = (packageId: string) => {
    if (!session?.user?.id) {
      signIn("discord", { callbackUrl: window.location.href });
      return;
    }

    const pkg = packages.find((p) => p.id === packageId);
    if (pkg) {
      playSwitch();
      setSelectedPackage(pkg);
      setView("payment");
    }
  };

  const handleStripePayment = async () => {
    if (!selectedPackage) return;
    try {
      playConfirm();
      setLoadingStripe(true);
      const params = new URLSearchParams({
        package: selectedPackage.id,
        amount: selectedPackage.price.toString(),
        cores: selectedPackage.totalCores.toString(),
        name: selectedPackage.name,
      });
      router.push(`/checkout?${params.toString()}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStripe(false);
    }
  };

  const handleCryptoPayment = async (currency: string) => {
    if (!selectedPackage) return;

    setLoadingCryptoId(currency);

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPackage.price,
          packageId: selectedPackage.id,
          currency,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        await response.text();
        throw new Error(`Invalid response from server (${response.status})`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            data.error ||
            data.message ||
            "Failed to create payment"
        );
      }

      const paymentUrl = data.data?.paymentUrl || data.data?.invoiceUrl;
      if (paymentUrl) {
        window.open(paymentUrl, "_blank", "noopener,noreferrer");
        setView("payment_pending");
      } else {
        throw new Error("No payment URL received from server");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(err instanceof Error ? err.message : "Failed to create payment");
    } finally {
      setLoadingCryptoId(null);
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 bg-zinc-900 border border-white/5 hover:border-cyan-500/30 transition-all rounded-xl h-9"
                >
                  <Image
                    src="/images/cores/core_energy.png"
                    width={18}
                    height={18}
                    alt="Core"
                    className="drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]"
                  />
                  <span className="font-bold text-xs uppercase tracking-widest text-zinc-300">
                    Get Cores
                  </span>
                </Button>
              )) as React.ReactElement
            }
          </DialogTrigger>
        )}
        <DialogContent
          hideClose={true}
          className="max-w-[420px] bg-transparent! border-none shadow-none ring-0 p-0 overflow-visible dialog-glitch-advanced gap-0 rounded-3xl!"
        >
          <div className="dialog-inner-content relative w-full bg-zinc-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] backdrop-blur-2xl ring-1 ring-white/5 overflow-hidden rounded-3xl! flex flex-col">
            {view === "packages" && (
              <DialogClose className="absolute right-4 top-4 rounded-xl p-2 opacity-70 bg-zinc-900 border border-white/10 transition-all hover:opacity-100 hover:bg-zinc-800 hover:border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:pointer-events-none text-zinc-400 hover:text-white hover:shadow-[0_0_10px_-2px_rgba(6,182,212,0.3)] z-50">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            )}
            <DialogTitle className="sr-only">
              {view === "packages" ? "Purchase Cores" : "Select Payment Method"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Select a package to purchase Core energy for your Discord server.
            </DialogDescription>

            {view === "packages" ? (
              <PackagesView
                packages={packages}
                pricingData={pricingData}
                onPaymentInitiation={handlePaymentInitiation}
                loadingPackageId={loadingPackageId}
                loading={loading}
              />
            ) : view === "payment_pending" ? (
              <PaymentPendingView
                onReturn={() => {
                  if (session?.user?.id) {
                    fetchUser(session.user.id, true);
                  }
                  setOpen(false);
                }}
              />
            ) : (
              selectedPackage && (
                <PaymentMethodView
                  selectedPackage={selectedPackage}
                  onBack={() => {
                    playSwitch();
                    setView("packages");
                  }}
                  onStripePayment={handleStripePayment}
                  onCryptoPayment={handleCryptoPayment}
                  loadingStripe={loadingStripe}
                  loadingCryptoId={loadingCryptoId}
                  playBeep={playBeep}
                  playConfirm={playConfirm}
                />
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
