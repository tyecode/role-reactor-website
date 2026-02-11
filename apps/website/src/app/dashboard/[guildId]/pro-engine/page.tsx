"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PageHeader } from "@/components/dashboard/page-header";
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
        <PageHeader
          category="Premium Features"
          categoryIcon={Crown}
          title="Pro Engine"
          badge={
            isPremium
              ? { icon: Zap, label: "STABLE LINK", variant: "yellow" }
              : undefined
          }
          description={
            isPremium
              ? "High-performance features successfully linked to"
              : "Premium capabilities restricted. Access Pro functionalities for"
          }
          serverName={activeGuild?.name || "Target Node"}
        >
          {!isPremium && (
            <Button
              variant="glitch"
              size="lg"
              data-text="Activate Pro Engine"
              onClick={() => setShowActivationModal(true)}
              className="px-8 shrink-0"
            >
              <Zap className="w-4 h-4 mr-2 fill-current" />
              Activate Pro Engine
            </Button>
          )}
        </PageHeader>

        {/* Status Section */}
        {isPremium ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              variant="success"
              className="border-emerald-500/30 bg-emerald-500/5 py-6"
            >
              <Shield className="w-6 h-6" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <AlertTitle
                    className={cn(
                      "text-base font-black text-emerald-400 tracking-wider",
                      audiowide.className
                    )}
                  >
                    PRO ENGINE ACTIVE
                  </AlertTitle>
                  {premiumStatus?.subscription && (
                    <AlertDescription className="text-[10px] text-emerald-500/60 font-black uppercase tracking-widest flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-emerald-400/70" />
                        Next Renewal:{" "}
                        {new Date(
                          premiumStatus.subscription.expiresAt
                        ).toLocaleDateString()}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-emerald-500/30" />
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-emerald-400/70" />
                        Auto-renewal: Active
                      </span>
                    </AlertDescription>
                  )}
                </div>
                <Badge className="bg-emerald-500 text-emerald-950 border-none font-black uppercase text-[10px] px-3 py-1 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  Enabled
                </Badge>
              </div>
            </Alert>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              variant="warning"
              className="border-amber-500/20 bg-amber-500/5 group cursor-pointer py-6"
              onClick={() => setShowActivationModal(true)}
            >
              <Lock className="w-6 h-6" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <AlertTitle
                    className={cn(
                      "text-base font-black text-amber-500 tracking-wider",
                      audiowide.className
                    )}
                  >
                    PRO ENGINE LOCKED
                  </AlertTitle>
                  <AlertDescription className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                    Enable Pro Engine to unlock advanced server management
                    capabilities.
                  </AlertDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-amber-950 font-black uppercase text-[10px]"
                >
                  Unlock Now
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}

        {/* Subscription Details (Premium Only) */}
        {isPremium && premiumStatus?.subscription && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Calendar,
                label: "Date Activated",
                value: new Date(
                  premiumStatus.subscription.activatedAt
                ).toLocaleDateString(),
                color: "blue",
                glow: "rgba(59, 130, 246, 0.5)",
              },
              {
                icon: Zap,
                label: "Subscription Cost",
                value: "50 Cores / Month",
                color: "purple",
                glow: "rgba(168, 85, 247, 0.5)",
              },
              {
                icon: CheckCircle2,
                label: "Auto-Renew",
                value: "Enabled",
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
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

              <h3
                className={cn(
                  "text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2.5",
                  audiowide.className
                )}
              >
                <Settings className="w-4 h-4 text-zinc-700" />
                Management Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert
                  variant="info"
                  className="py-2.5 bg-cyan-500/5 border-cyan-500/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  <AlertTitle className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-0 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                    Subscription Active
                  </AlertTitle>
                  <AlertDescription className="text-[10px] text-cyan-500/60 font-medium leading-relaxed uppercase tracking-wider">
                    Your server connection will remain active until the end of
                    the current billing cycle.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col justify-center gap-3">
                  <Button
                    variant="destructive-glitch"
                    data-text="Cancel Subscription"
                    className="w-full"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Subscription
                  </Button>
                  <p className="text-[9px] text-zinc-700 text-center font-bold uppercase tracking-widest italic">
                    * Cancellation will disable premium features immediately
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
