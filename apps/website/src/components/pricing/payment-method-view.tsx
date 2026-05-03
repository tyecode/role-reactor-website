"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
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
  onCryptoPayment: (currency: string, provider: string) => void;
  loadingCryptoId: string | null;
  playConfirm: () => void;
}

export function PaymentMethodView({
  selectedPackage,
  onBack,
  onCryptoPayment,
  loadingCryptoId,
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
              {selectedPackage.name}
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
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase mb-2">
            Order Summary
          </span>
          <div className="bg-zinc-950/40 rounded-xl border border-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Base Cores</span>
              <span className="text-white font-bold">
                {selectedPackage.baseCores.toLocaleString()}
              </span>
            </div>
            {selectedPackage.bonusCores > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Bonus Cores</span>
                <span className="text-emerald-400 font-bold">
                  +{selectedPackage.bonusCores.toLocaleString()}
                </span>
              </div>
            )}
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold">Total Cores</span>
              <span className="text-cyan-400 font-black">
                {selectedPackage.totalCores.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-600">
              <span>Rate</span>
              <span>{selectedPackage.valuePerDollar}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase mb-2">
              Select Currency
            </span>
            <div className="grid grid-cols-3 gap-3">
              {supportedCryptos.map((crypto) => {
                const isCurrentLoading = loadingCryptoId === crypto.id;
                return (
                  <Button
                    key={crypto.id}
                    variant="secondary"
                    className="h-auto md:h-auto py-5 flex flex-col items-center justify-center gap-3 rounded-xl group"
                    onClick={() => {
                      playConfirm();
                      onCryptoPayment(crypto.id, "plisio");
                    }}
                    disabled={!!loadingCryptoId}
                  >
                    {isCurrentLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
                    ) : (
                      <div
                        className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110 duration-300"
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
          </div>

          <p className="pt-2 text-[9px] text-center text-zinc-600 uppercase tracking-[0.3em] font-black opacity-60">
            Delivered after network confirmation
          </p>
        </div>
      </div>
    </div>
  );
}
