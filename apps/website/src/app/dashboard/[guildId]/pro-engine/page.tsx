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
                "text-3xl md:text-5xl font-black text-white tracking-tight flex flex-wrap items-center gap-3",
                audiowide.className
              )}
            >
              <span>Pro Engine</span>
              {isPremium && (
                <Badge className="bg-linear-to-r from-yellow-500 to-amber-500 text-black border-none px-2 py-1 text-[10px] font-black items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ACTIVE
                </Badge>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
              <p className="max-w-xl leading-relaxed text-xs md:text-sm">
                {isPremium
                  ? `Premium features are active for ${activeGuild?.name || "this server"}.`
                  : `Unlock all premium features for ${activeGuild?.name || "this server"}.`}
              </p>
            </div>
          </div>

          {!isPremium && (
            <Button
              onClick={() => setShowActivationModal(true)}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black h-11 px-6 rounded-lg shadow-lg shadow-blue-500/20 border-t border-white/20 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 mr-2 fill-white" />
              Activate Pro Engine
            </Button>
          )}
        </div>

        {/* Status Banner */}
        {isPremium ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-green-500/20 p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-green-600/10 to-emerald-600/10 opacity-50" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-green-400 uppercase tracking-wider">
                    Pro Engine Active
                  </h3>
                  {premiumStatus?.subscription && (
                    <p className="text-xs text-green-400/70 flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3" />
                      Renews on{" "}
                      {new Date(
                        premiumStatus.subscription.expiresAt
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-black uppercase text-xs px-3 py-1">
                Active
              </Badge>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-amber-500/20 p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-600/10 to-orange-600/10 opacity-50" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                <Lock className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider">
                  Premium Features Locked
                </h3>
                <p className="text-xs text-amber-400/70 mt-1">
                  Activate Pro Engine to unlock all premium features for this
                  server
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscription Details (Premium Only) */}
        {isPremium && premiumStatus?.subscription && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Calendar,
                label: "Activated",
                value: new Date(
                  premiumStatus.subscription.activatedAt
                ).toLocaleDateString(),
                color: "blue",
              },
              {
                icon: Zap,
                label: "Cost",
                value: "50 Cores / 30 days",
                color: "purple",
              },
              {
                icon: CheckCircle2,
                label: "Status",
                value: "Auto-Renew",
                color: "green",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border",
                          stat.color === "blue" &&
                            "bg-blue-500/10 border-blue-500/20",
                          stat.color === "purple" &&
                            "bg-purple-500/10 border-purple-500/20",
                          stat.color === "green" &&
                            "bg-green-500/10 border-green-500/20"
                        )}
                      >
                        <stat.icon
                          className={cn(
                            "w-5 h-5",
                            stat.color === "blue" && "text-blue-400",
                            stat.color === "purple" && "text-purple-400",
                            stat.color === "green" && "text-green-400"
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-0.5">
                          {stat.label}
                        </p>
                        <p
                          className={cn(
                            "text-sm font-black",
                            stat.color === "green"
                              ? "text-green-400"
                              : "text-white"
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
                    "group h-full transition-all duration-300 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl",
                    feature.status === "active"
                      ? "border-white/5 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-blue-500/20"
                      : "border-white/5 bg-zinc-950/20 opacity-40 cursor-not-allowed border-dashed"
                  )}
                >
                  <CardContent className="p-5 flex items-start gap-4 h-full relative">
                    {feature.status === "active" && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-lg border shrink-0",
                        feature.status === "active"
                          ? "bg-blue-500/10 border-white/5 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white"
                          : "bg-zinc-900 text-zinc-600 border-white/5"
                      )}
                    >
                      <feature.icon className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={cn(
                            "font-bold truncate",
                            audiowide.className,
                            feature.status === "active"
                              ? "text-white group-hover:text-blue-400 transition-colors"
                              : "text-zinc-400"
                          )}
                        >
                          {feature.title}
                        </h3>
                        {feature.status === "active" ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse shrink-0" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-zinc-800 shrink-0" />
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-[11px] leading-relaxed font-medium line-clamp-2",
                          feature.status === "active"
                            ? "text-zinc-500"
                            : "text-zinc-600"
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
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Subscription Management
              </h3>

              <div className="flex items-start gap-2 bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-400/80 leading-relaxed">
                  Your subscription will automatically renew every 30 days. You
                  can cancel anytime without losing access until the end of your
                  current billing period.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full bg-red-500/5 border-red-500/20 hover:bg-red-500/10 text-red-400 hover:text-red-300 font-bold h-11"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Subscription
              </Button>
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
