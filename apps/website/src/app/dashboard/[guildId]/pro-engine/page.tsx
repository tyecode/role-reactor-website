"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Crown, Zap } from "lucide-react";
import useSWR from "swr";
import { toast } from "@/lib/toast";

import { PageHeader } from "@/app/dashboard/_components/page-header";
import { useServerStore } from "@/store/use-server-store";
import { useUserStore } from "@/store/use-user-store";
import { useSession } from "next-auth/react";
import { ErrorView } from "@/components/common/error-view";
import { PremiumGuard } from "@/app/dashboard/_components/premium-guard";

import { FeaturesGrid } from "./_components/features";
import { ProEngineSettings } from "./_components/settings";
import {
  ProEngineActiveAlert,
  ProEngineLockedAlert,
  ProEngineCancelledAlert,
} from "./_components/states";

// Re-using SubscriptionStats component if it exists.
// Note: In previous file views, it was imported from "./stats".
import { SubscriptionStats } from "./_components/stats";
import ProEngineLoading from "./loading";

interface GuildSettings {
  isPremium: {
    pro: boolean;
  };
  subscription?: {
    expiresAt: string;
    activatedAt: string;
    cancelled?: boolean;
    cancelledAt?: string;
    autoRenew?: boolean;
    cost?: number;
    period?: string;
    payerUserId?: string;
  };
}

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      let errorMsg = "Failed to fetch data";
      try {
        const error = await res.json();
        errorMsg =
          error.message ||
          error.error ||
          `Error ${res.status}: ${res.statusText}`;
      } catch {
        errorMsg = `Error ${res.status}: ${res.statusText}`;
      }
      throw new Error(errorMsg);
    }
    return res.json();
  } catch (err) {
    console.error("Pro Engine Settings Fetch Error:", err);
    throw err;
  }
};

export default function ProEnginePage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const searchParams = useSearchParams();
  const activateQuery = searchParams.get("activate");
  const router = useRouter();

  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);
  const guildName = activeGuild?.name || "this server";

  const [isPending, startTransition] = useTransition();
  const [showActivationModal, setShowActivationModal] = useState(
    activateQuery === "true"
  );
  const [isActivating, setIsActivating] = useState(false);

  // Fetch settings from API
  // We assume /api/guilds/[guildId]/settings returns the guild settings object
  // directly or wrapped in data.
  const { data, error, isLoading, mutate } = useSWR<GuildSettings>(
    guildId ? `/api/guilds/${guildId}/settings` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const premiumStatus = data;
  const isPremium = premiumStatus?.isPremium?.pro || false;
  const isCancelled = premiumStatus?.subscription?.cancelled || false;

  const { data: session } = useSession();
  const { fetchUser } = useUserStore();

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Pro Engine activated successfully!");
        setShowActivationModal(false);

        // Refresh guild data
        mutate();

        // Refresh user balance immediately
        if (session?.user?.id) {
          await fetchUser(session.user.id, true);
        }

        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to activate Pro Engine");
      }
    } catch (err) {
      console.error("Activation error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsActivating(false);
    }
  };

  if (isLoading && !data) {
    return <ProEngineLoading />;
  }

  if (error && !data) {
    return (
      <div className="space-y-8 pb-12 w-full min-w-0 overflow-x-hidden">
        <PageHeader
          category="System Configuration"
          categoryIcon={Crown}
          title="Pro Engine"
          serverName={guildName}
          description={""}
        />
        <ErrorView
          title="Failed to Load Settings"
          message={error.message || "Could not retrieve Pro Engine status."}
          onRetry={() => mutate()}
          showHome={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="System Configuration"
        categoryIcon={Crown}
        title="Pro Engine"
        badge={
          isPremium
            ? { icon: Zap, label: "PRO STATUS", variant: "yellow" }
            : undefined
        }
        description={
          isPremium
            ? "Advanced system capabilities active for"
            : "Unlock premium capabilities and granular control for"
        }
        serverName={guildName}
      />

      <div className="space-y-8">
        {/* Status Alerts */}
        {isPremium ? (
          <ProEngineActiveAlert
            isCancelled={isCancelled}
            premiumStatus={premiumStatus}
          />
        ) : (
          <ProEngineLockedAlert onUnlock={() => setShowActivationModal(true)} />
        )}

        {isPremium && isCancelled && premiumStatus?.subscription?.expiresAt && (
          <ProEngineCancelledAlert
            expiresAt={premiumStatus.subscription.expiresAt}
            cost={premiumStatus.subscription.cost}
            onReactivate={() => setShowActivationModal(true)}
          />
        )}

        {/* Premium Management & Stats */}
        {isPremium && premiumStatus?.subscription && (
          <>
            <SubscriptionStats
              premiumStatus={premiumStatus}
              isCancelled={isCancelled}
            />
            <ProEngineSettings
              guildId={guildId}
              premiumStatus={premiumStatus}
              isCancelled={isCancelled}
              onSubscriptionCancelled={() => {
                // Optimistically update local data to show "cancelled" state immediately
                mutate(
                  {
                    ...data!,
                    subscription: {
                      ...data!.subscription!,
                      cancelled: true,
                    },
                  },
                  { revalidate: false }
                );

                // Then fetch from server to be sure
                mutate();
                router.refresh();
              }}
            />
          </>
        )}

        {/* Features List */}
        <FeaturesGrid isPremium={isPremium} />
      </div>

      <PremiumGuard
        open={showActivationModal}
        onOpenChange={setShowActivationModal}
        isActivating={isActivating || isPending}
        onActivate={handleActivate}
        title={
          isPremium && isCancelled
            ? "RESTORE ACTIVE STATUS"
            : "ACTIVATE PRO ENGINE"
        }
        description={
          isPremium && isCancelled
            ? "Re-activate your subscription. Detailed billing will resume on your next renewal date."
            : "Unlock all premium features for this server with a single click."
        }
        buttonText={
          isPremium && isCancelled ? "ENABLE AUTO-RENEW" : "UNLOCK FOR 50 CORES"
        }
        subText={
          isPremium && isCancelled
            ? `Auto-renewal: ${premiumStatus?.subscription?.cost || 50} Cores/month`
            : "Deducts 50 Cores every 30 days"
        }
      />
    </div>
  );
}
