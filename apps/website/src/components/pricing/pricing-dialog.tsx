"use client";

import { useEffect, useState, ReactNode } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PricingCards } from "@/components/ui/pricing-cards";
import { PricingBenefits } from "@/components/ui/pricing-benefits";
import { usePricingStore } from "@/store/use-pricing-store";
import { useUserStore } from "@/store/use-user-store";
import type { CorePackage } from "@/types/pricing";
import Image from "next/image";
import { Rocket, ArrowLeft, CreditCard, Bitcoin, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supportedCryptos } from "./constants";
import { useRouter } from "next/navigation";

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

  // Sync pricing store user data with user store if pricing fetch returns user data
  useEffect(() => {
    if (pricingData?.user?.currentCredits) {
      updateBalance(pricingData.user.currentCredits);
    }
  }, [pricingData?.user, updateBalance]);

  const [selectedPackage, setSelectedPackage] = useState<CorePackage | null>(
    null
  );
  const [loadingPackageId, setLoadingPackageId] = useState<string | null>(null);
  const [loadingCryptoId, setLoadingCryptoId] = useState<string | null>(null);
  const [loadingStripe, setLoadingStripe] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Using store to fetch (handles caching internally)
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
      setSelectedPackage(pkg);
      setView("payment");
    }
  };

  const handleStripePayment = async () => {
    if (!selectedPackage) return;
    try {
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

  const handleCryptoPayment = async (
    packageId: string,
    amount: number,
    currency?: string
  ) => {
    if (!packageId) return;

    if (currency) setLoadingCryptoId(currency);
    else setLoadingPackageId(packageId);

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, packageId, currency }),
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
      // You might want to show a toast or error message to the user here
      alert(err instanceof Error ? err.message : "Failed to create payment");
    } finally {
      setLoadingCryptoId(null);
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-zinc-800/50 transition-colors"
                >
                  <Image
                    src="/images/cores/core_energy.png"
                    width={18}
                    height={18}
                    alt="Core"
                    draggable={false}
                  />
                  <span className="font-medium">Get Cores</span>
                </Button>
              )) as React.ReactElement
            }
          </DialogTrigger>
        )}
        <DialogContent className="max-w-[400px] bg-black border-zinc-800 p-0 shadow-3xl overflow-hidden gap-0 rounded-[40px] ring-1 ring-zinc-800/50">
          <DialogTitle className="sr-only">
            {view === "packages" ? "Purchase Cores" : "Select Payment Method"}
          </DialogTitle>

          {view === "packages" ? (
            <>
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
                <PricingCards
                  packages={packages}
                  pricingData={pricingData}
                  onPayment={handlePaymentInitiation}
                  loadingPackageId={loadingPackageId}
                  isLoading={loading && packages.length === 0}
                />

                <p className="text-[10px] text-zinc-600 text-center mt-4 px-4 leading-tight">
                  By buying Cores, you agree to our terms of service. Cores are
                  non-refundable.
                </p>
              </div>
            </>
          ) : view === "payment_pending" ? (
            <div className="flex flex-col h-full items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-2">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Payment Tab Opened!
              </h3>
              <p className="text-sm text-zinc-400 max-w-[280px]">
                We've opened a new tab for your payment. Once completed, your
                Cores will be added automatically.
              </p>
              <Button
                className="w-full max-w-[160px] mt-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl h-10"
                onClick={() => {
                  // Force refresh user data when closing after payment
                  if (session?.user?.id) {
                    fetchUser(session.user.id, true);
                  }
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 flex items-center gap-4 border-b border-zinc-800/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-8 h-8 hover:bg-zinc-800"
                  onClick={() => setView("packages")}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Payment Method
                  </h2>
                  <p className="text-[11px] text-zinc-500">
                    {selectedPackage?.name} — {selectedPackage?.totalCores}{" "}
                    Cores for ${selectedPackage?.price}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                    <TabsTrigger
                      value="card"
                      className="rounded-lg data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
                    >
                      Card / PayPal
                    </TabsTrigger>
                    <TabsTrigger
                      value="crypto"
                      className="rounded-lg data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
                    >
                      Crypto
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="card"
                    className="mt-6 space-y-4 outline-none"
                  >
                    <Button
                      className="w-full bg-white text-black hover:bg-zinc-200 h-10 rounded-xl text-sm font-bold group"
                      onClick={handleStripePayment}
                      disabled={loadingStripe}
                    >
                      {loadingStripe ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Pay with Card
                        </>
                      )}
                    </Button>
                    <p className="text-[10px] text-zinc-500 text-center tracking-wide uppercase font-medium">
                      Secured by Stripe & PayPal
                    </p>
                  </TabsContent>
                  <TabsContent value="crypto" className="mt-6 outline-none">
                    <div className="grid grid-cols-2 gap-3">
                      {supportedCryptos.map((crypto) => {
                        const isCurrentLoading = loadingCryptoId === crypto.id;
                        return (
                          <Button
                            key={crypto.id}
                            variant="outline"
                            className="h-auto py-4 flex flex-col gap-2 relative overflow-hidden group hover:border-zinc-700 bg-zinc-900/50 border-zinc-800 rounded-2xl transition-all"
                            onClick={() =>
                              handleCryptoPayment(
                                selectedPackage?.id || "",
                                selectedPackage?.price || 0,
                                crypto.id
                              )
                            }
                            disabled={!!loadingCryptoId}
                          >
                            {isCurrentLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                                style={{
                                  backgroundColor: crypto.color,
                                  boxShadow: `0 0 10px ${crypto.color}33`,
                                }}
                              >
                                {crypto.id === "BTC" ? (
                                  <Bitcoin className="w-6 h-6" />
                                ) : (
                                  crypto.icon
                                )}
                              </div>
                            )}
                            <span className="text-[11px] font-bold text-zinc-300">
                              {crypto.name}
                            </span>
                            <div className="absolute inset-0 bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                          </Button>
                        );
                      })}
                    </div>
                    <p className="mt-6 text-[10px] text-center text-zinc-500 uppercase tracking-widest font-bold opacity-80">
                      Instant Delivery After Confirmation
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
