"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Zap,
  CheckCircle2,
  Sparkles,
  Shield,
  Rocket,
  TrendingUp,
  Users,
  Settings,
  Calendar,
  XCircle,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "motion/react";
import { PremiumGuard } from "@/components/dashboard/premium-guard";
import { Audiowide } from "next/font/google";
import { useServerStore } from "@/store/use-server-store";
import { useGuildStore } from "@/store/use-guild-store";
import { Skeleton } from "@/components/ui/skeleton";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ProEnginePage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  const { guildData, fetchSettings, isLoading: storeLoading } = useGuildStore();
  const premiumStatus = guildData[guildId]?.settings || null;
  // Only show skeleton if we are loading AND don't have data yet
  const isLoading =
    (storeLoading[guildId]?.settings ?? true) &&
    (guildData[guildId]?.settings === null ||
      guildData[guildId]?.settings === undefined);

  const [showActivationModal, setShowActivationModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    if (guildId) {
      fetchSettings(guildId);
    }
  }, [guildId, fetchSettings]);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Pro Engine activated successfully!");
        setShowActivationModal(false);
        // Refresh status in store
        await fetchSettings(guildId, true);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to activate Pro Engine");
      }
    } catch (error) {
      console.error("Activation error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsActivating(false);
    }
  };

  const isPremium = premiumStatus?.isPremium?.pro || false;

  const features = [
    {
      icon: Sparkles,
      title: "Advanced Selection Modes",
      description: "Unique and Verify modes for sophisticated role management",
      status: isPremium ? "active" : "locked",
      color: "amber",
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get help faster with dedicated premium support",
      status: isPremium ? "active" : "locked",
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Deep insights into server engagement and activity",
      status: isPremium ? "active" : "locked",
      color: "green",
    },
    {
      icon: Users,
      title: "Enhanced XP System",
      description: "Advanced leveling features and customization",
      status: isPremium ? "active" : "locked",
      color: "purple",
    },
    {
      icon: Rocket,
      title: "Early Access",
      description: "Be the first to try new features and updates",
      status: isPremium ? "active" : "locked",
      color: "pink",
    },
    {
      icon: Settings,
      title: "Advanced Configuration",
      description: "Fine-tune every aspect of your bot experience",
      status: isPremium ? "active" : "locked",
      color: "cyan",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12 w-full min-w-0 overflow-x-hidden">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 flex-1">
            <Skeleton className="h-4 w-32 bg-zinc-800" />
            <Skeleton className="h-12 w-64 bg-zinc-800 rounded-lg" />
            <Skeleton className="h-4 w-96 bg-zinc-800" />
          </div>
          <Skeleton className="h-11 w-48 rounded-lg bg-zinc-800" />
        </div>

        {/* Status Card Skeleton */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl bg-zinc-800" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-48 bg-zinc-800" />
              <Skeleton className="h-3 w-64 bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Features Grid Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48 bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-zinc-900/40 border border-white/5 p-5 flex items-start gap-4"
              >
                <Skeleton className="w-11 h-11 rounded-xl bg-zinc-800 shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                  <Skeleton className="h-3 w-full bg-zinc-800" />
                  <Skeleton className="h-3 w-2/3 bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
        {/* Page Header - Matching Command Settings Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest">
              <Crown className="w-4 h-4" />
              Premium Features
            </div>
            <h1
              className={cn(
                "text-3xl md:text-5xl font-black text-white tracking-tight flex flex-wrap items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                audiowide.className
              )}
            >
              <span className="bg-linear-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
                Pro Engine
              </span>
              {isPremium && (
                <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-2 py-1 text-[10px] font-black items-center gap-1.5 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  STABLE LINK
                </Badge>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
              <p className="max-w-xl leading-relaxed text-xs md:text-sm text-zinc-500">
                {isPremium
                  ? `PREMIUM_HANDSHAKE: ACTIVE // High-performance features successfully linked to ${activeGuild?.name || "Target Node"}.`
                  : `UPLINK_REQUIRED: Premium capabilities restricted. Access Pro functionalities for ${activeGuild?.name || "Local Node"}.`}
              </p>
            </div>
          </div>

          {!isPremium && (
            <Button
              variant="glitch"
              size="lg"
              onClick={() => setShowActivationModal(true)}
              className="px-8"
            >
              <Zap className="w-4 h-4 mr-2 fill-current" />
              Activate Pro Engine
            </Button>
          )}
        </div>

        {/* Status Banner */}
        {isPremium ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="relative overflow-hidden rounded-2xl bg-zinc-950/50 border-emerald-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <CardContent className="p-6">
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-transparent to-emerald-500/5" />
                <div className="absolute -top-px -left-px w-20 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <Shield className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-base font-black text-emerald-400 tracking-wider",
                          audiowide.className
                        )}
                      >
                        UPLINK STABILIZED
                      </h3>
                      {premiumStatus?.subscription && (
                        <div className="text-[10px] text-emerald-500/60 font-black uppercase tracking-widest flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            EXPIRY:{" "}
                            {new Date(premiumStatus.subscription.expiresAt)
                              .toLocaleDateString()
                              .replace(/\//g, ".")}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-zinc-800" />
                          <span className="flex items-center gap-1.5 text-emerald-500/40">
                            <Zap className="w-3 h-3" />
                            SYNC_MODE: AUTO
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge className="bg-emerald-500 text-emerald-950 border-none font-black uppercase text-[10px] px-3 py-1 items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-pulse" />
                      ACTIVE
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              className="relative overflow-hidden rounded-2xl bg-zinc-950/20 border-amber-500/10 backdrop-blur-xl group cursor-pointer"
              onClick={() => setShowActivationModal(true)}
            >
              <CardContent className="p-6">
                <div className="absolute inset-0 bg-linear-to-r from-amber-500/2 via-transparent to-amber-500/2" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 shadow-inner group-hover:border-amber-500/30 transition-colors">
                    <Lock className="w-6 h-6 text-zinc-600 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "text-base font-black text-zinc-400 uppercase tracking-wider group-hover:text-amber-500 transition-colors",
                        audiowide.className
                      )}
                    >
                      ACCESS_DENIED: PREMIUM_LOCKED
                    </h3>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mt-1.5">
                      CRITICAL: Establish Pro Uplink to authorize advanced
                      capabilities
                    </p>
                  </div>
                  <Button variant="neon" size="sm">
                    Authorize
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Subscription Details (Premium Only) */}
        {isPremium && premiumStatus?.subscription && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Calendar,
                label: "SYNC_START",
                value: new Date(premiumStatus.subscription.activatedAt)
                  .toLocaleDateString()
                  .replace(/\//g, "."),
                color: "blue",
                glow: "rgba(59, 130, 246, 0.5)",
              },
              {
                icon: Zap,
                label: "FUEL_BURN",
                value: "50 CORES / 30D",
                color: "purple",
                glow: "rgba(168, 85, 247, 0.5)",
              },
              {
                icon: CheckCircle2,
                label: "UPLINK_STATUS",
                value: "AUTO_RENEW",
                color: "green",
                glow: "rgba(34, 197, 94, 0.5)",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Card className="group relative overflow-hidden rounded-2xl bg-zinc-950/40 border-white/5 backdrop-blur-xl transition-all hover:bg-zinc-900/60 hover:border-white/10">
                  <CardContent className="p-4">
                    <div className="absolute top-0 right-0 p-2 opacity-5 transition-opacity group-hover:opacity-10">
                      <stat.icon className="w-12 h-12" />
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border transition-all",
                          stat.color === "blue" &&
                            "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                          stat.color === "purple" &&
                            "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                          stat.color === "green" &&
                            "bg-green-500/10 border-green-500/20 text-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                        )}
                      >
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] font-black mb-0.5">
                          {stat.label}
                        </p>
                        <p
                          className={cn(
                            "text-sm font-black tracking-tight uppercase",
                            audiowide.className
                          )}
                        >
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Features Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-500 w-5 h-5" />
              {isPremium ? "Active Features" : "Available Features"}
            </h2>
            {!isPremium && (
              <Badge
                variant="outline"
                className="text-xs font-black uppercase border-amber-500/30 text-amber-400"
              >
                Locked
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="h-full"
              >
                <Card
                  className={cn(
                    "group relative h-full transition-all duration-500 backdrop-blur-xl rounded-2xl overflow-hidden border",
                    feature.status === "active"
                      ? "border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                      : "border-white/5 bg-zinc-950/20 opacity-40 cursor-not-allowed border-dashed"
                  )}
                >
                  <CardContent className="p-5 flex items-start gap-4">
                    {/* Neon side accent */}
                    {feature.status === "active" && (
                      <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-cyan-500/0 group-hover:bg-cyan-500/50 transition-all opacity-0 group-hover:opacity-100" />
                    )}

                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-lg border shrink-0",
                        feature.status === "active"
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-zinc-950 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                          : "bg-zinc-900 text-zinc-600 border-white/5"
                      )}
                    >
                      <feature.icon className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={cn(
                            "font-bold truncate text-[13px] uppercase tracking-wide",
                            audiowide.className,
                            feature.status === "active"
                              ? "text-white group-hover:text-cyan-400 transition-colors"
                              : "text-zinc-600 italic"
                          )}
                        >
                          {feature.title}
                        </h3>
                        {feature.status === "active" ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse shrink-0" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-[10px] leading-relaxed font-bold uppercase tracking-wider line-clamp-2",
                          feature.status === "active"
                            ? "text-zinc-500"
                            : "text-zinc-600/50"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Management Section (Premium Only) */}
        {isPremium && (
          <Card className="relative overflow-hidden rounded-2xl bg-zinc-950/40 border-white/5 backdrop-blur-xl">
            <CardContent className="p-6 space-y-6">
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

              <h3
                className={cn(
                  "text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2.5",
                  audiowide.className
                )}
              >
                <Settings className="w-4 h-4 text-zinc-700" />
                TERMINAL_MANAGEMENT
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CheckCircle2 className="w-8 h-8 text-cyan-500" />
                  </div>
                  <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                    Subscription Policy
                  </h4>
                  <p className="text-[10px] text-cyan-500/60 font-medium leading-relaxed uppercase tracking-wider">
                    Automatic data synchronization active. Node connection will
                    persist until end of cycle.
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-3">
                  <Button variant="destructive-glitch" className="w-full">
                    <XCircle className="w-4 h-4 mr-2" />
                    Terminate Link
                  </Button>
                  <p className="text-[9px] text-zinc-700 text-center font-bold uppercase tracking-widest italic">
                    * Action will disable premium node capabilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Activation Modal */}
      <PremiumGuard
        open={showActivationModal}
        onOpenChange={setShowActivationModal}
        isActivating={isActivating}
        onActivate={handleActivate}
        title="ACTIVATE PRO ENGINE"
        description="Unlock all premium features for this server with a single click."
      />
    </>
  );
}
