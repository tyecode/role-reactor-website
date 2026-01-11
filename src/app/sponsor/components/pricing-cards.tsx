"use client";

import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useSession, signIn } from "next-auth/react";

interface DonationOption {
  amount: string;
  cores: number;
  coresPerDollar: number;
}

interface PricingCardsProps {
  donationOptions: DonationOption[];
  onPayment: (amount: number) => void;
  loadingAmount: number | null;
}

export function PricingCards({
  donationOptions,
  onPayment,
  loadingAmount,
}: PricingCardsProps) {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {donationOptions.map((option) => {
          const amount = parseFloat(option.amount.replace("$", ""));
          const isLoading = loadingAmount === amount;

          return (
            <Card
              key={option.amount}
              className="relative h-full bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-900/80"
            >
              <CardHeader className="text-center pb-6">
                {/* Price */}
                <CardTitle className="text-5xl font-bold text-white mb-2">
                  {option.amount}
                </CardTitle>
                <CardDescription className="text-sm text-gray-400 mb-6">
                  one-time payment
                </CardDescription>

                {/* Cores */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {option.cores} Cores
                  </div>
                  <CardDescription className="text-xs text-gray-500">
                    ≈ {option.cores} AI avatars
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="text-center space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Never expires</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Instant delivery</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                {/* Button */}
                <Button
                  onClick={() => {
                    if (!session?.user?.id) {
                      signIn("discord", {
                        callbackUrl: window.location.href,
                      });
                    } else {
                      onPayment(amount);
                    }
                  }}
                  disabled={loadingAmount !== null || status === "loading"}
                  variant={!session?.user?.id ? "outline" : "default"}
                  className={`w-full font-medium py-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    !session?.user?.id
                      ? ""
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  }`}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : !session?.user?.id ? (
                    <>Login with Discord</>
                  ) : (
                    <>Support {option.amount}</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}

