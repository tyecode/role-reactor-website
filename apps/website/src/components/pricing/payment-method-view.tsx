"use client";

import { useState } from "react";

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
  playBeep: () => void;
  playConfirm: () => void;
}

export function PaymentMethodView({
  selectedPackage,
  onBack,
  onCryptoPayment,
  loadingCryptoId,
  playBeep,
  playConfirm,
}: PaymentMethodViewProps) {
  const [provider, setProvider] = useState<"plisio" | "knot">("plisio");

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
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">
              Payment Network
            </span>
            <div className="grid grid-cols-2 gap-2 bg-zinc-950/40 p-1 rounded-xl border border-white/5 relative">
              <button
                onClick={() => {
                  playBeep();
                  setProvider("plisio");
                }}
                className={cn(
                  "text-[10px] font-black py-2.5 rounded-lg transition-all tracking-widest uppercase relative z-10",
                  provider === "plisio"
                    ? "text-cyan-300"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Plisio
              </button>
              <button
                disabled
                title="Coming Soon"
                onClick={(e) => {
                  e.preventDefault(); // Do nothing while disabled
                }}
                className={cn(
                  "text-[10px] font-black py-2.5 rounded-lg tracking-widest uppercase relative z-10 cursor-not-allowed",
                  provider === "knot"
                    ? "text-purple-300"
                    : "text-zinc-500 opacity-50"
                )}
              >
                KnotEngine
              </button>

              {/* Sliding indicator background */}
              <div
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-6px)] rounded-lg transition-all duration-300 ease-in-out border",
                  provider === "plisio"
                    ? "left-1 bg-cyan-950/30 border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                    : "left-[calc(50%+2px)] bg-purple-950/30 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase mb-2">
              Select Currency
            </span>
            <div className="grid grid-cols-3 gap-4">
              {supportedCryptos.map((crypto) => {
                const isCurrentLoading = loadingCryptoId === crypto.id;
                return (
                  <Button
                    key={crypto.id}
                    variant="secondary"
                    className="h-auto md:h-auto py-5 flex flex-col items-center justify-center gap-3 rounded-xl"
                    onClick={() => {
                      playConfirm();
                      onCryptoPayment(crypto.id, provider); // You could pass the selected provider here too in the future
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
