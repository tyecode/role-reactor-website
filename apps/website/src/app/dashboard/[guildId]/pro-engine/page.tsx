"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Crown, Zap } from "lucide-react";
import { toast } from "@/lib/toast";
import { useSWRConfig } from "swr";

import { PageHeader } from "@/app/dashboard/_components/page-header";
import { useServerStore } from "@/store/use-server-store";
import { useUserStore } from "@/store/use-user-store";
import { useProEngineStore } from "@/store/use-pro-engine-store";
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
import { calculateSubscriptionProgress } from "@/lib/premium-utils";

export default function ProEnginePage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const searchParams = useSearchParams();
  const activateQuery = searchParams.get("activate");
  const router = useRouter();

  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);
  const guildName = activeGuild?.name || "this server";

  const { data: session } = useSession();
  const { user, fetchUser, isLoading: isUserLoading } = useUserStore();
  const { settingsCache, isError, fetchSettings, updateLocalSettings } =
    useProEngineStore();

  // Get settings for THIS specific guild (not a stale previous guild)
  const settings = settingsCache[guildId] ?? null;

  const [showActivationModal, setShowActivationModal] = useState(
    activateQuery === "true"
  );
  const [isActivating, setIsActivating] = useState(false);

  // Derived State
  const premiumStatus = settings;
  const isPremium = premiumStatus?.isPremium?.pro || false;
  const isCancelled = premiumStatus?.subscription?.cancelled || false;

  // Show loading when no cached data for THIS guild, or user not loaded yet
  const isGlobalLoading = !settings || (!user && isUserLoading);

  // Fetch fresh data on mount or when guildId changes (server switch).
  // If we have cached data for this guild, UI renders instantly while
  // the background refresh completes silently.
  useEffect(() => {
    if (guildId && session?.user?.id) {
      fetchSettings(guildId, true); // force refresh in background
      fetchUser(session.user.id);
    }
  }, [guildId, session?.user?.id, fetchSettings, fetchUser]);

  const { mutate } = useSWRConfig();

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Pro Engine activated successfully!");
        setShowActivationModal(false);

        // Refresh settings and user balance in parallel
        await Promise.all([
          fetchSettings(guildId, true),
          session?.user?.id
            ? fetchUser(session.user.id, true)
            : Promise.resolve(),
          mutate("/api/user/balance"), // Force SWR balance components to update
        ]);

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

  if (isGlobalLoading) {
    return <ProEngineLoading />;
  }

  if (isError && !settings) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          category="System Configuration"
          categoryIcon={Crown}
          title="Pro Engine"
          serverName={guildName}
          description={""}
        />
        <ErrorView
          title="Failed to Load Settings"
          message={isError.message || "Could not retrieve Pro Engine status."}
          onRetry={() => fetchSettings(guildId, true)}
          showHome={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
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

      <div className="space-y-4">
        {/* Status Alerts */}
        {isPremium ? (
          <ProEngineActiveAlert
            isCancelled={isCancelled}
            expiresAt={premiumStatus.subscription.expiresAt}
          />
        ) : (
          <ProEngineLockedAlert onUnlock={() => setShowActivationModal(true)} />
        )}
        {isPremium && isCancelled && premiumStatus?.subscription?.expiresAt && (
          <ProEngineCancelledAlert
            expiresAt={premiumStatus.subscription.expiresAt}
            cost={premiumStatus.subscription.cost}
            period={premiumStatus.subscription.period}
            newCost={premiumStatus?.premiumConfig?.PRO?.cost}
            newPeriod={premiumStatus?.premiumConfig?.PRO?.period}
            progress={
              calculateSubscriptionProgress(
                premiumStatus.subscription.expiresAt,
                premiumStatus.subscription.lastDeductionDate,
                premiumStatus?.premiumConfig?.PRO?.periodDays ?? 7
              ).progress
            }
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
                // Optimistically update local data
                if (settings) {
                  updateLocalSettings({
                    subscription: {
                      ...settings.subscription!,
                      cancelled: true,
                    },
                  });
                }

                // Refresh from server
                fetchSettings(guildId, true);
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
        isActivating={isActivating}
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
          isPremium && isCancelled
            ? "ENABLE AUTO-RENEW"
            : `UNLOCK FOR ${premiumStatus?.premiumConfig?.PRO?.cost ?? 15} CORES`
        }
        subText={
          isPremium && isCancelled
            ? `New terms: ${premiumStatus?.premiumConfig?.PRO?.cost ?? 15} Cores/${premiumStatus?.premiumConfig?.PRO?.period ?? "week"}`
            : `Deducts ${premiumStatus?.premiumConfig?.PRO?.cost ?? 15} Cores every ${premiumStatus?.premiumConfig?.PRO?.periodDays ?? 7} days`
        }
      />
    </div>
  );
}
