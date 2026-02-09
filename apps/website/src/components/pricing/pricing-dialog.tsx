"use client";

import { useEffect, useState, ReactNode } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PricingCards } from "./pricing-cards";
import { PricingBenefits } from "./pricing-benefits";
import { usePricingStore } from "@/store/use-pricing-store";
import { useUserStore } from "@/store/use-user-store";
import type { CorePackage } from "@/types/pricing";
import Image from "next/image";
import {
  Rocket,
  ArrowLeft,
  CreditCard,
  Bitcoin,
  Loader2,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supportedCryptos } from "./constants";
import { useRouter } from "next/navigation";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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
          hideClose={view !== "packages"}
          className="max-w-[420px] bg-transparent border-none shadow-none ring-0 p-0 overflow-visible dialog-glitch-advanced gap-0"
        >
          <div className="dialog-inner-content relative w-full bg-zinc-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] backdrop-blur-2xl ring-1 ring-white/5 overflow-hidden rounded-[inherit] flex flex-col">
            <DialogTitle className="sr-only">
              {view === "packages" ? "Purchase Cores" : "Select Payment Method"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Select a package to purchase Core energy for your Discord server.
            </DialogDescription>

            {view === "packages" ? (
              <>
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
                    onPayment={handlePaymentInitiation}
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
            ) : view === "payment_pending" ? (
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
                  onClick={() => {
                    if (session?.user?.id) {
                      fetchUser(session.user.id, true);
                    }
                    setOpen(false);
                  }}
                >
                  Return to Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-zinc-950/40 backdrop-blur-md shrink-0">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl w-9 h-9 bg-zinc-900 border border-white/5 hover:border-cyan-500/30 text-zinc-400 hover:text-white transition-all shadow-lg"
                      onClick={() => setView("packages")}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                      <h2
                        className={cn(
                          "text-sm font-black text-white tracking-widest uppercase",
                          audiowide.className
                        )}
                      >
                        Payment Protocol
                      </h2>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        {selectedPackage?.name} — {selectedPackage?.totalCores}{" "}
                        Cores
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-lg font-black text-white",
                      audiowide.className
                    )}
                  >
                    ${selectedPackage?.price}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 border border-white/5 p-1 rounded-2xl">
                      <TabsTrigger
                        value="card"
                        className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-cyan-400 font-black uppercase tracking-widest text-[10px] transition-all"
                      >
                        Card / PayPal
                      </TabsTrigger>
                      <TabsTrigger
                        value="crypto"
                        className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-cyan-400 font-black uppercase tracking-widest text-[10px] transition-all"
                      >
                        Crypto
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="card"
                      className="mt-8 space-y-6 outline-none"
                    >
                      <Button
                        className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] group transition-all active:scale-95 shadow-2xl"
                        onClick={handleStripePayment}
                        disabled={loadingStripe}
                      >
                        {loadingStripe ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            Initialize Transfer
                          </>
                        )}
                      </Button>
                      <p className="text-[9px] text-zinc-600 text-center tracking-[0.3em] uppercase font-black opacity-60">
                        Processing via Stripe Security Layers
                      </p>
                    </TabsContent>
                    <TabsContent value="crypto" className="mt-8 outline-none">
                      <div className="grid grid-cols-2 gap-4">
                        {supportedCryptos.map((crypto) => {
                          const isCurrentLoading =
                            loadingCryptoId === crypto.id;
                          return (
                            <button
                              key={crypto.id}
                              className="h-auto py-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden group bg-zinc-900/40 border border-white/5 rounded-[1.5rem] transition-all hover:border-cyan-500/30 hover:bg-zinc-900/80 active:scale-95 shadow-lg disabled:opacity-50"
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
                                <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
                              ) : (
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black text-white shadow-2xl transition-transform group-hover:scale-110 duration-300"
                                  style={{
                                    backgroundColor: crypto.color,
                                    boxShadow: `0 0 15px ${crypto.color}44`,
                                  }}
                                >
                                  {crypto.id === "BTC" ? (
                                    <Bitcoin className="w-7 h-7" />
                                  ) : (
                                    <span className="text-sm">
                                      {crypto.icon}
                                    </span>
                                  )}
                                </div>
                              )}
                              <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest transition-colors">
                                {crypto.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-8 text-[9px] text-center text-zinc-600 uppercase tracking-[0.3em] font-black opacity-60">
                        Tactical Delivery Post-Chain Confirmation
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
