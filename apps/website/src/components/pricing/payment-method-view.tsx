"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CreditCard, Bitcoin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { supportedCryptos } from "./constants";
import type { CorePackage } from "@/types/pricing";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface PaymentMethodViewProps {
  selectedPackage: CorePackage;
  onBack: () => void;
  onStripePayment: () => void;
  onCryptoPayment: (currency: string) => void;
  loadingStripe: boolean;
  loadingCryptoId: string | null;
  playBeep: () => void;
  playConfirm: () => void;
}

export function PaymentMethodView({
  selectedPackage,
  onBack,
  onStripePayment,
  onCryptoPayment,
  loadingStripe,
  loadingCryptoId,
  playBeep,
  playConfirm,
}: PaymentMethodViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-zinc-950/40 backdrop-blur-md shrink-0 rounded-t-3xl!">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl w-9 h-9 bg-zinc-900 border border-white/5 hover:border-cyan-500/30 text-zinc-400 hover:text-white transition-all shadow-lg"
            onClick={onBack}
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
              {selectedPackage.name} — {selectedPackage.totalCores} Cores
            </p>
          </div>
        </div>
        <div
          className={cn("text-lg font-black text-white", audiowide.className)}
        >
          ${selectedPackage.price}
        </div>
      </div>

      <div className="p-8 space-y-6">
        <Tabs
          defaultValue="card"
          className="w-full"
          onValueChange={() => playBeep()}
        >
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
          <TabsContent value="card" className="mt-8 space-y-6 outline-none">
            <Button
              className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] group transition-all active:scale-95 shadow-2xl"
              onClick={onStripePayment}
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
                const isCurrentLoading = loadingCryptoId === crypto.id;
                return (
                  <button
                    key={crypto.id}
                    className="h-auto py-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden group bg-zinc-900/40 border border-white/5 rounded-[1.5rem] transition-all hover:border-cyan-500/30 hover:bg-zinc-900/80 active:scale-95 shadow-lg disabled:opacity-50"
                    onClick={() => {
                      playConfirm();
                      onCryptoPayment(crypto.id);
                    }}
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
                          <span className="text-sm">{crypto.icon}</span>
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
  );
}
