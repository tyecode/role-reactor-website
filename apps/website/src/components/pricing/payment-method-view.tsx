"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
      <DialogHeader className="px-8 py-6 flex-row items-center justify-between border-b border-white/5 bg-zinc-950/40 backdrop-blur-md shrink-0 rounded-t-2xl! space-y-0">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-xl w-9 h-9"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex flex-col">
            <DialogTitle variant="glitch" className="text-sm">
              Confirm Payment
            </DialogTitle>
            <DialogDescription
              variant="glitch"
              className="text-[10px] opacity-60"
            >
              {selectedPackage.name} — {selectedPackage.totalCores} Cores
            </DialogDescription>
          </div>
        </div>
        <div
          className={cn("text-lg font-black text-white", audiowide.className)}
        >
          ${selectedPackage.price}
        </div>
      </DialogHeader>

      <div className="p-8 space-y-6">
        <Tabs
          defaultValue="card"
          className="w-full"
          onValueChange={() => playBeep()}
        >
          <TabsList variant="glitch" className="w-full">
            <TabsTrigger variant="glitch" value="card">
              Card / PayPal
            </TabsTrigger>
            <TabsTrigger variant="glitch" value="crypto">
              Crypto
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="card"
            className="mt-8 space-y-6 outline-none text-center"
          >
            <Button
              variant="glitch"
              size="lg"
              className="w-full h-12"
              onClick={onStripePayment}
              disabled={loadingStripe}
              data-text="Proceed to Checkout"
            >
              {loadingStripe ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-3" />
                  Proceed to Checkout
                </>
              )}
            </Button>
            <p className="text-[9px] text-zinc-600 tracking-[0.3em] uppercase font-black opacity-60">
              Securely processed by Stripe
            </p>
          </TabsContent>
          <TabsContent value="crypto" className="mt-8 outline-none">
            <div className="grid grid-cols-3 gap-4">
              {supportedCryptos.map((crypto) => {
                const isCurrentLoading = loadingCryptoId === crypto.id;
                return (
                  <Button
                    key={crypto.id}
                    variant="secondary"
                    className="h-auto py-5 flex flex-col items-center justify-center gap-3 rounded-xl"
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
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110 duration-300"
                        style={{
                          backgroundColor: crypto.color,
                          boxShadow: `0 0 15px ${crypto.color}44`,
                        }}
                      >
                        <crypto.icon className="w-12 h-12 scale-150" />
                      </div>
                    )}
                    <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest transition-colors">
                      {crypto.name}
                    </span>
                  </Button>
                );
              })}
            </div>
            <p className="mt-8 text-[9px] text-center text-zinc-600 uppercase tracking-[0.3em] font-black opacity-60">
              Delivered after network confirmation
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
