"use client";

import { Loader2, Check, Star, Sparkles, Zap, Crown } from "lucide-react";
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
import type { CorePackage, PricingData, Promotion } from "@/types/pricing";

interface PricingCardsProps {
  packages: CorePackage[];
  pricingData?: PricingData | null;
  onPayment: (packageId: string, amount: number) => void;
  loadingPackageId: string | null;
  isLoading?: boolean;
}

// Icon mapping for packages
const packageIcons: Record<string, React.ReactNode> = {
  Starter: <Sparkles className="w-5 h-5" />,
  Basic: <Zap className="w-5 h-5" />,
  Pro: <Star className="w-5 h-5" />,
  Ultimate: <Crown className="w-5 h-5" />,
};

export function PricingCards({
  packages,
  pricingData,
  onPayment,
  loadingPackageId,
  isLoading = false,
}: PricingCardsProps) {
  const { data: session, status } = useSession();

  // Find active promotions
  const activePromotion = pricingData?.promotions?.find(
    (p: Promotion) => p.active
  );
  const firstPurchaseBonus =
    pricingData?.user?.eligibleForFirstPurchaseBonus &&
    pricingData?.promotions?.find((p: Promotion) => p.type === "first_purchase");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="relative h-full bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl animate-pulse"
          >
            <CardHeader className="text-center pb-4">
              <div className="h-8 bg-gray-700/50 rounded w-24 mx-auto mb-2" />
              <div className="h-12 bg-gray-700/50 rounded w-16 mx-auto mb-2" />
              <div className="h-4 bg-gray-700/50 rounded w-32 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-6 bg-gray-700/50 rounded w-28 mx-auto" />
              <div className="h-4 bg-gray-700/50 rounded w-full" />
              <div className="h-4 bg-gray-700/50 rounded w-3/4 mx-auto" />
            </CardContent>
            <CardFooter>
              <div className="h-12 bg-gray-700/50 rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Active Promotions Banner */}
      {(activePromotion || firstPurchaseBonus) && (
        <div className="mb-8 p-4 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 text-yellow-200">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">
              {firstPurchaseBonus
                ? `🎉 ${firstPurchaseBonus.description}`
                : activePromotion?.description}
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {packages.map((pkg) => {
          const isLoading = loadingPackageId === pkg.id;
          const isPopular = pkg.popular;

          return (
            <Card
              key={pkg.id}
              className={`relative h-full bg-gray-900/60 backdrop-blur-sm border rounded-xl transition-all duration-300 hover:bg-gray-900/80 hover:scale-[1.02] ${
                isPopular
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : "border-gray-700/50 hover:border-gray-600/50"
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <CardHeader className="text-center pb-4 pt-6">
                {/* Package Name with Icon */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className={`${
                      isPopular ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    {packageIcons[pkg.name] || <Star className="w-5 h-5" />}
                  </span>
                  <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                    {pkg.name}
                  </span>
                </div>

                {/* Price */}
                <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-1">
                  ${pkg.price}
                </CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  one-time payment
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center space-y-4 px-4">
                {/* Total Cores */}
                <div className="py-3 px-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {pkg.totalCores} Cores
                  </div>
                  {pkg.bonusCores > 0 && (
                    <div className="text-xs text-green-400 mt-1">
                      +{pkg.bonusCores} bonus Cores included!
                    </div>
                  )}
                </div>

                {/* Value Per Dollar */}
                <div className="text-xs text-gray-400">
                  {pkg.valuePerDollar}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Never expires</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Instant delivery</span>
                  </div>
                  {pkg.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center justify-center gap-2 text-sm text-blue-300"
                    >
                      <Check className="w-4 h-4 text-blue-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Estimated Usage */}
                <div className="text-xs text-gray-500 pt-2">
                  {pkg.estimatedUsage}
                </div>
              </CardContent>

              <CardFooter className="pt-4 pb-6 px-4">
                {/* Button */}
                <Button
                  onClick={() => {
                    if (!session?.user?.id) {
                      signIn("discord", {
                        callbackUrl: window.location.href,
                      });
                    } else {
                      onPayment(pkg.id, pkg.price);
                    }
                  }}
                  disabled={loadingPackageId !== null || status === "loading"}
                  variant={!session?.user?.id ? "outline" : "default"}
                  className={`w-full font-medium py-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    !session?.user?.id
                      ? ""
                      : isPopular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white"
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
                    <>Get {pkg.totalCores} Cores</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* User Balance Info */}
      {pricingData?.user && (
        <div className="text-center text-sm text-gray-400 mb-8">
          <span>Your current balance: </span>
          <span className="font-semibold text-blue-400">
            {pricingData.user.currentCredits} Cores
          </span>
        </div>
      )}
    </>
  );
}
