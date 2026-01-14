"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { SponsorContainer } from "./components/sponsor-container";
import { PaymentInfo } from "./components/payment-info";
import { PricingCards } from "./components/pricing-cards";
import { SupporterLeaderboard } from "./components/supporter-leaderboard";
import { PricingFAQ } from "./components/pricing-faq";
import { defaultPackages } from "./components/constants";
import type { CorePackage, PricingData } from "@/types/pricing";

interface Supporter {
  userId: string;
  username: string | null;
  totalDonated: number;
  totalCores: number;
  paymentCount: number;
  rank: number;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function PaymentStatusHandler({
  onPaymentStatus,
  fetchSupporters,
}: {
  onPaymentStatus: (status: string | null) => void;
  fetchSupporters: () => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      onPaymentStatus("success");
      window.history.replaceState({}, "", "/sponsor");
      // Refresh supporters after successful payment
      fetchSupporters();
    } else if (payment === "cancelled") {
      onPaymentStatus("cancelled");
      window.history.replaceState({}, "", "/sponsor");
    }
  }, [searchParams, fetchSupporters, onPaymentStatus]);

  return null;
}

export default function SponsorPage() {
  const { data: session } = useSession();
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPackageId, setLoadingPackageId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [packages, setPackages] = useState<CorePackage[]>(defaultPackages);
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [pricingLoading, setPricingLoading] = useState(true);

  // Fetch pricing data from API
  const fetchPricing = useCallback(async () => {
    try {
      setPricingLoading(true);
      const url = session?.user?.id
        ? `/api/pricing?user_id=${session.user.id}`
        : "/api/pricing";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success && data.data) {
        setPricingData(data.data);
        if (data.data.packages && data.data.packages.length > 0) {
          setPackages(data.data.packages);
        }
      }
    } catch (error) {
      console.error("Error fetching pricing:", error);
      // Keep using default packages on error
    } finally {
      setPricingLoading(false);
    }
  }, [session?.user?.id]);

  const fetchSupporters = useCallback(async () => {
    try {
      const response = await fetch("/api/supporters");
      const data = await response.json();

      if (data.success) {
        setSupporters(data.data.supporters || []);
        setTotalRaised(data.data.totalRaised || 0);
      }
    } catch (error) {
      console.error("Error fetching supporters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPricing();
    fetchSupporters();
  }, [fetchPricing, fetchSupporters]);

  const handlePaymentStatus = useCallback((status: string | null) => {
    setPaymentStatus(status);
  }, []);

  const handlePayment = async (
    packageId: string,
    amount: number
  ): Promise<void> => {
    if (!session?.user?.id) {
      // Redirect to login
      signIn("discord", {
        callbackUrl: window.location.href,
      });
      return;
    }

    setLoadingPackageId(packageId);
    setError(null);

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          packageId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to create payment";
        const details = data.details
          ? `\nDetails: ${JSON.stringify(data.details, null, 2)}`
          : "";
        throw new Error(`${errorMsg}${details}`);
      }

      // Handle different payment URL responses
      const paymentUrl = data.data?.paymentUrl || data.data?.invoiceUrl;

      if (data.success && paymentUrl) {
        // Redirect to payment page
        window.location.href = paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Failed to create payment");
      setLoadingPackageId(null);
    }
  };

  return (
    <SponsorContainer>
      {/* Payment Status Handler wrapped in Suspense */}
      <Suspense fallback={null}>
        <PaymentStatusHandler
          onPaymentStatus={handlePaymentStatus}
          fetchSupporters={fetchSupporters}
        />
      </Suspense>

      {/* Payment Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 opacity-30" />

        <div className="max-w-[1400px] mx-auto relative z-10 px-4">
          <PaymentInfo paymentStatus={paymentStatus} error={error} />
          <PricingCards
            packages={packages}
            pricingData={pricingData}
            onPayment={handlePayment}
            loadingPackageId={loadingPackageId}
            isLoading={pricingLoading}
          />
        </div>
      </section>

      {/* Supporter Leaderboard */}
      <SupporterLeaderboard
        supporters={supporters}
        totalRaised={totalRaised}
        loading={loading}
      />

      {/* FAQ */}
      <PricingFAQ />
    </SponsorContainer>
  );
}
