"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Activity,
} from "lucide-react";
import { Audiowide } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { useProEngineStore } from "@/store/use-pro-engine-store";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface ProEngineSettingsProps {
  guildId: string;
  premiumStatus: any;
  isCancelled: boolean;
  onSubscriptionCancelled: () => void;
}

export function ProEngineSettings({
  guildId,
  premiumStatus,
  isCancelled,
  onSubscriptionCancelled,
}: ProEngineSettingsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { settings, fetchSettings, updateLocalSettings } = useProEngineStore();
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Calculate days remaining
  const expiresAt = premiumStatus?.subscription?.expiresAt
    ? new Date(premiumStatus.subscription.expiresAt)
    : new Date();
  const today = new Date();
  const timeDiff = expiresAt.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));

  // Calculate progress bar width
  const progressPercent = Math.min(
    100,
    Math.max(0, (daysRemaining / 30) * 100)
  );

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId: "pro_engine",
          userId: premiumStatus?.subscription?.payerUserId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.data?.message || "Subscription cancelled.");
        setShowCancelConfirm(false);

        // Optimistic update
        if (settings) {
          updateLocalSettings({
            subscription: {
              ...settings.subscription!,
              cancelled: true,
            },
          });
        }

        // Notify parent if needed (the page might need to trigger router.refresh)
        onSubscriptionCancelled();

        // Refresh from server
        await fetchSettings(guildId, true);
        startTransition(() => {
          router.refresh();
        });
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsCancelling(false);
    }
  };

  // Determine if cancelled
  const showCancelledState = isCancelled;

  if (showCancelledState) {
    return null;
  }

  return (
    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      {/* Ambient Glow */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 via-purple-500/10 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />

      <Card className="relative bg-black/80 border-white/5 backdrop-blur-xl overflow-hidden rounded-2xl">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

        <CardContent className="p-6 sm:p-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-zinc-900/50 rounded-xl border border-white/10 shadow-inner">
                <Settings className="w-5 h-5 text-cyan-500 animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="space-y-0.5">
                <h3
                  className={cn(
                    "text-sm font-black text-white tracking-widest uppercase flex items-center gap-2",
                    audiowide.className
                  )}
                >
                  System Configuration
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono tracking-wide">
                  SERVER ID: <span className="text-zinc-400">{guildId}</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-emerald-500/80 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
              <Activity className="w-3 h-3" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Status Module */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-cyan-950/10 to-black border border-cyan-500/20 p-6 flex flex-col justify-between group/status min-h-[160px]">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover/status:opacity-100 transition-opacity duration-500">
                <Zap className="w-16 h-16 text-cyan-500/5 -rotate-12" />
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Subscription Active
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl text-white font-medium tabular-nums tracking-tighter">
                      {daysRemaining}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                      Days Remaining
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                  Pro Engine capabilities are fully operational.
                </p>
              </div>
            </div>

            {/* Right: Danger/Action Module */}
            <div className="rounded-xl border border-red-500/10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-red-950/5 via-black to-black p-6 flex flex-col justify-center gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded bg-red-500/10 text-red-500">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <h4
                  className={cn(
                    "text-xs text-red-500/80 font-black uppercase tracking-widest",
                    audiowide.className
                  )}
                >
                  Danger Zone
                </h4>
              </div>

              {showCancelConfirm ? (
                <div className="space-y-3 bg-red-500/5 p-4 rounded-lg border border-red-500/10 animate-in fade-in slide-in-from-right-2">
                  <p className="text-[10px] text-red-200/80 font-medium text-center leading-relaxed">
                    Confirm cancellation? Active until{" "}
                    {expiresAt.toLocaleDateString()}.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 h-8 text-[10px] font-black uppercase tracking-widest"
                      onClick={handleCancel}
                      disabled={isCancelling || isPending}
                    >
                      {isCancelling ? "..." : "Confirm"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8 text-[10px] font-black uppercase tracking-widest hover:bg-white/5"
                      onClick={() => setShowCancelConfirm(false)}
                      disabled={isCancelling}
                    >
                      Abort
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    Downgrading will lock advanced modules and analytics at the
                    end of the current billing period.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 group/btn"
                    onClick={() => setShowCancelConfirm(true)}
                  >
                    <XCircle className="w-4 h-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Cancel Subscription
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
