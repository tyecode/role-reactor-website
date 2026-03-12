"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Audiowide } from "next/font/google";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  useProEngineStore,
  type ProEngineSettings,
} from "@/store/use-pro-engine-store";
import { useUiSound } from "@/hooks/use-ui-sound";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface DangerZoneModuleProps {
  guildId: string;
  premiumStatus: ProEngineSettings;
  onSubscriptionCancelled: () => void;
}

export function DangerZoneModule({
  guildId,
  premiumStatus,
  onSubscriptionCancelled,
}: DangerZoneModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { settingsCache, fetchSettings, updateLocalSettings } =
    useProEngineStore();
  const settings = settingsCache[guildId] ?? null;
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const { play, playConfirm, playSwitch, playError, playUiSwitch } =
    useUiSound();

  const handleCancel = useCallback(async () => {
    setIsCancelling(true);
    play("glitch-in", 0.6); // Final action sound
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId: "pro_engine",
          userId: premiumStatus?.subscription?.payerUserId || "",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.data?.message || "Subscription cancelled.");
        setShowCancelConfirm(false);
        playConfirm();

        // Optimistic update
        if (settings) {
          updateLocalSettings({
            subscription: {
              ...settings.subscription!,
              cancelled: true,
            },
          });
        }

        // Notify parent
        onSubscriptionCancelled();

        // Refresh from server
        await fetchSettings(guildId, true);
        startTransition(() => {
          router.refresh();
        });
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to cancel subscription");
        playError();
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      toast.error("An unexpected error occurred");
      playError();
    } finally {
      setIsCancelling(false);
    }
  }, [
    guildId,
    premiumStatus,
    settings,
    updateLocalSettings,
    onSubscriptionCancelled,
    fetchSettings,
    router,
    play,
    playConfirm,
    playError,
  ]);

  // Countdown logic for cancellation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCounting) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsCounting(false);
            handleCancel();
            return 0;
          }
          // Play a high-pitched beep for each second
          play("beep-electric-3", 0.4);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCounting, play, handleCancel]);

  const expiresAt = premiumStatus?.subscription?.expiresAt
    ? new Date(premiumStatus.subscription.expiresAt)
    : new Date();

  return (
    <Card
      variant="cyberpunk"
      showGrid
      className="border-rose-500/20 group/danger min-h-[200px] hover:border-rose-400/40 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.15)]"
      contentClassName="p-6 sm:p-7 flex flex-col justify-between"
    >
      {/* Internal Warning FX - Custom Overrides */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(244,63,94,0.05)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-px h-1/2 bg-linear-to-t from-rose-500/50 via-rose-500/10 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-px bg-linear-to-l from-rose-500/50 via-rose-500/10 to-transparent" />

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-rose-500/5 border-l-[3px] border-rose-500 shadow-[2px_0_10px_-2px_rgba(244,63,94,0.5)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,1)]"></span>
          </span>
          <span className="text-rose-400 text-[9px] font-black uppercase tracking-[0.25em]">
            Danger Zone
          </span>
        </div>

        {showCancelConfirm ? (
          <div className="space-y-4">
            <div className="p-4 rounded-sm bg-rose-500/10 border border-rose-500/20 border-dashed backdrop-blur-sm relative overflow-hidden group/warn">
              <div className="absolute inset-0 bg-rose-500/5 -translate-y-full group-hover/warn:translate-y-0 transition-transform duration-700" />
              <p className="relative z-10 text-[9px] text-rose-100/70 font-black uppercase tracking-[0.2em] text-center leading-relaxed">
                AUTHORIZE PROTOCOL TERMINATION? <br />
                ACCESS RELINQUISH DATE:{" "}
                <span className="text-rose-400">
                  {expiresAt.toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                variant="destructive"
                size="lg"
                className={cn(
                  "w-full shrink-0 font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group/conf-btn",
                  audiowide.className,
                  isCounting &&
                    "bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)] border-red-500"
                )}
                onClick={() => {
                  if (!isCounting && !isCancelling) {
                    setCountdown(5);
                    setIsCounting(true);
                    play("beep-electric-4", 0.5);
                  }
                }}
                disabled={isCancelling || isPending}
              >
                {!isCounting && (
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(239,68,68,0.05),transparent)] -translate-x-full group-hover/conf-btn:animate-[shimmer_3s_infinite]" />
                )}
                <span
                  key={isCounting ? countdown : "idle"}
                  className="relative z-10 tabular-nums text-[11px] tracking-widest"
                >
                  {isCancelling
                    ? "PURGING..."
                    : isCounting
                      ? `PURGE IN ${countdown}S`
                      : "CONFIRM"}
                </span>
              </Button>
              <Button
                variant="ghost-glow"
                size="lg"
                className={cn(
                  "w-full shrink-0 font-black uppercase tracking-[0.2em]",
                  audiowide.className
                )}
                onClick={() => {
                  if (isCounting) {
                    setIsCounting(false);
                    playSwitch();
                  } else {
                    setShowCancelConfirm(false);
                    playSwitch();
                  }
                }}
                disabled={isCancelling}
              >
                <span className="text-[11px]">
                  {isCounting ? "CANCEL" : "ABORT"}
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-[10px] text-zinc-500 leading-relaxed font-black uppercase tracking-wider opacity-80">
              downgrading will deactivate{" "}
              <span className="text-rose-400/60 font-bold">
                advanced modules
              </span>{" "}
              and{" "}
              <span className="text-rose-400/60 font-bold">deep analytics</span>{" "}
              at cycle completion.
            </p>
            <Button
              variant="destructive"
              size="lg"
              className={cn(
                "w-full transition-all duration-300 group/btn relative overflow-hidden",
                audiowide.className
              )}
              onClick={() => {
                setShowCancelConfirm(true);
                playUiSwitch();
              }}
            >
              <XCircle className="w-4 h-4 mr-2 group-hover/btn:rotate-180 transition-transform duration-700 relative z-10" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                Terminate Connection
              </span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
