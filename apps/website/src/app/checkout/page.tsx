"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@role-reactor/ui/components/button";
import { PayPalButton } from "./components/paypal-button";
import { useSession } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const packageId = searchParams.get("package");
  const amount = searchParams.get("amount");
  const cores = searchParams.get("cores");
  const packageName = searchParams.get("name");

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Redirect if missing required parameters
    if (!packageId || !amount || !session?.user?.id) {
      router.push("/sponsor");
    }
  }, [packageId, amount, session, router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = async (details: any) => {
    setIsProcessing(true);
    console.log("Payment successful:", details);

    // Here you would typically:
    // 1. Call your backend to verify the payment
    // 2. Allocate credits to the user
    // 3. Redirect to success page

    // For now, redirect to sponsor page with success message
    router.push("/sponsor?success=true");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    console.error("Payment error:", error);
    setIsProcessing(false);
  };

  if (!session?.user?.id || !packageId || !amount) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/sponsor")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold font-heading">
                Secure Checkout
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete your purchase safely with PayPal
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="grid gap-6">
          {/* Order Summary Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-heading mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Package</span>
                <span className="font-semibold">
                  {packageName || packageId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cores</span>
                <span className="font-semibold">{cores} Cores</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${amount} USD
                </span>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-heading mb-4">
              Payment Method
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Choose your preferred payment method below. All transactions are
              secured by PayPal.
            </p>

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                <p className="text-sm text-muted-foreground">
                  Processing your payment...
                </p>
              </div>
            ) : (
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                  currency: "USD",
                  intent: "capture",
                  components: "buttons",
                  vault: false,
                }}
              >
                <PayPalButton
                  amount={parseFloat(amount)}
                  packageId={packageId}
                  userId={session.user.id}
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              </PayPalScriptProvider>
            )}
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="uppercase tracking-wider font-medium">
              Secure 256-bit encrypted checkout
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
