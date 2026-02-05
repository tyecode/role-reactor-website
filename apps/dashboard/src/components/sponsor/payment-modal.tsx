"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@role-reactor/ui/components/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@role-reactor/ui/components/tabs";
import { Button } from "@role-reactor/ui/components/button";
import { Loader2, CreditCard, Bitcoin } from "lucide-react";
import type { CorePackage } from "@/types/pricing";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: CorePackage | null;
  userId: string;
  onCryptoPayment: (packageId: string, amount: number) => Promise<void>;
  onSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  selectedPackage,

  onCryptoPayment,
}: PaymentModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!selectedPackage) return null;

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      // Redirect to checkout page with query params
      const params = new URLSearchParams({
        package: selectedPackage.id,
        amount: selectedPackage.price.toString(),
        cores: selectedPackage.totalCores.toString(),
        name: selectedPackage.name,
      });

      router.push(`/checkout?${params.toString()}`);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Purchase</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div>
              <h3 className="font-semibold">{selectedPackage.name} Package</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPackage.totalCores} Cores
              </p>
            </div>
            <div className="text-xl font-bold">${selectedPackage.price}</div>
          </div>

          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">Card / PayPal</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            <TabsContent value="card" className="mt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleStripePayment}
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Card
              </Button>
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Secured by Stripe & PayPal
              </p>
            </TabsContent>
            <TabsContent value="crypto" className="mt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={() =>
                  onCryptoPayment(selectedPackage.id, selectedPackage.price)
                }
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Bitcoin className="mr-2 h-4 w-4" />
                Pay with Crypto
              </Button>
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Bitcoin, Ethereum, LTC, and more
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
