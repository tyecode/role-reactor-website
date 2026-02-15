"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Settings,
  Calendar,
  Zap,
  CheckCircle2,
  Lock,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "motion/react";
import { PremiumGuard } from "../../../_components/premium-guard";
import { Audiowide } from "next/font/google";
import { useRouter } from "next/navigation";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface ProEngineViewProps {
  guildId: string;
  initialPremiumStatus: any;
  showActivationInitially?: boolean;
}

export function ProEngineView({
  guildId,
  initialPremiumStatus,
  showActivationInitially = false,
}: ProEngineViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showActivationModal, setShowActivationModal] = useState(
    showActivationInitially
  );
  const [isActivating, setIsActivating] = useState(false);

  const isPremium = initialPremiumStatus?.isPremium?.pro || false;
  const premiumStatus = initialPremiumStatus;

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Pro Engine activated successfully!");
        setShowActivationModal(false);
        startTransition(() => {
          router.refresh();
        });
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

  return (
    <>
      <div className="space-y-8 w-full min-w-0">
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
                <Badge
                  variant="pro"
                  className="px-3 py-1 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
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
                  className="font-black uppercase text-[10px]"
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
                <Card
                  variant="stat"
                  className="hover:bg-zinc-900/60 hover:border-white/10"
                >
                  <CardContent className="p-6">
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
        <div className="space-y-8">
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
                  variant="cyberpunk"
                  className={cn(
                    "group relative h-full transition-all duration-500",
                    feature.status !== "active" &&
                      "opacity-40 cursor-not-allowed border-dashed"
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
          <Card variant="cyberpunk" className="overflow-hidden relative">
            <CardContent className="p-6 space-y-6">
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

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

      <PremiumGuard
        open={showActivationModal}
        onOpenChange={setShowActivationModal}
        isActivating={isActivating || isPending}
        onActivate={handleActivate}
        title="ACTIVATE PRO ENGINE"
        description="Unlock all premium features for this server with a single click."
      />
    </>
  );
}
