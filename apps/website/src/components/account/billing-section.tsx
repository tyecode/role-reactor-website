"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Zap,
  Plus,
  Gift,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PricingDialog } from "@/components/pricing/pricing-dialog";
import Image from "next/image";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { useUserStore } from "@/store/use-user-store";

interface Transaction {
  paymentId: string;
  provider: "plisio" | "top.gg" | "premium_system" | "admin_adjustment";
  type?: string;
  amount: number;
  coresGranted: number;
  status: string;
  createdAt: string;
  currency?: string;
}

export function BillingSection() {
  const { data: session } = useSession();
  const { user, fetchUser } = useUserStore();
  const [redeemCode, setRedeemCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchTransactions();
    }
  }, [session?.user?.id]);

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const response = await fetch("/api/user/transactions");
      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleRedeemCode = async () => {
    if (!redeemCode.trim()) {
      toast.error("Please enter a redeem code");
      return;
    }

    if (!session?.user?.id) {
      toast.error("Please sign in to redeem codes");
      return;
    }

    setIsRedeeming(true);
    try {
      const response = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: redeemCode.trim(),
          userId: session.user.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`Successfully redeemed! ${data.message || ""}`);
        setRedeemCode("");
        await fetchUser(session.user.id, true);
        fetchTransactions(); // Refresh transactions
      } else {
        toast.error(data.error || "Invalid or expired code");
      }
    } catch {
      toast.error("Failed to redeem code. Please try again.");
    } finally {
      setIsRedeeming(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed" || status === "success") {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
    if (status === "pending" || status === "processing") {
      return <Clock className="w-4 h-4 text-yellow-400" />;
    }
    return <XCircle className="w-4 h-4 text-red-400" />;
  };

  const getProviderBadge = (provider: string) => {
    if (provider === "top.gg") {
      return (
        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30">
          Vote Reward
        </Badge>
      );
    }
    if (provider === "premium_system") {
      return (
        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30">
          Pro Engine
        </Badge>
      );
    }
    if (provider === "admin_adjustment") {
      return (
        <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30">
          Admin
        </Badge>
      );
    }
    return (
      <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30">
        Crypto
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Core Balance Card */}
      <Card className="bg-zinc-950/50 border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white font-bold text-lg flex items-center gap-2">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                Your Core Balance
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Global energy credits for powering Pro Engine across servers
              </CardDescription>
            </div>
            <PricingDialog>
              <Button
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Cores
              </Button>
            </PricingDialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-zinc-900/50 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-lg" />
                  <div className="w-16 h-16 relative z-10 drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] overflow-hidden rounded-full">
                    <Image
                      src="/images/cores/core_energy.png"
                      alt="Cores"
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                </div>
                <div>
                  <div
                    className={cn(
                      "text-4xl font-black text-white",
                      audiowide.className
                    )}
                  >
                    {(user?.currentCredits ?? 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-zinc-500 font-medium mt-1">
                    Available Cores
                  </div>
                </div>
              </div>
              <PricingDialog>
                <Button
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                >
                  Top Up
                </Button>
              </PricingDialog>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div className="text-xs text-zinc-400 space-y-1">
                <p>
                  Cores are global and can be used to activate Pro Engine on any
                  server you manage.
                </p>
                <p className="text-zinc-500">
                  Pro Engine subscriptions are managed separately for each
                  server.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History Card */}
      <Card className="bg-zinc-950/50 border-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-zinc-700/50 rounded-lg">
              <Clock className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <CardTitle className="text-white font-bold text-lg">
                Transaction History
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Your past core purchases and redemptions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingTransactions ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-zinc-500 text-sm">
                Loading transactions...
              </div>
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.slice(0, 10).map((tx, index) => (
                <div
                  key={tx.paymentId || index}
                  className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(tx.status)}
                      {getProviderBadge(tx.provider)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        +{tx.coresGranted.toLocaleString()} Cores
                      </div>
                      <div className="text-xs text-zinc-500">
                        {formatDate(tx.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {tx.amount > 0 ? (
                      <>
                        <div className="text-white font-mono text-sm">
                          ${tx.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-zinc-500 uppercase">
                          {tx.currency || "USD"}
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-zinc-500">Free</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="p-4 bg-zinc-900 rounded-full inline-block mb-4">
                <Clock className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                No Transactions Yet
              </h3>
              <p className="text-zinc-500 text-sm mb-4">
                Your purchase history will appear here
              </p>
              <PricingDialog>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Get Your First Cores
                </Button>
              </PricingDialog>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Redeem Code Card */}
      <Card className="bg-zinc-950/50 border-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Gift className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-white font-bold text-lg">
                Redeem Code
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Have a promo code? Enter it here for free cores
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your code..."
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
              className="flex-1 bg-zinc-900/50 border-white/10 text-white font-mono uppercase tracking-wider h-11"
              disabled={isRedeeming}
            />
            <Button
              onClick={handleRedeemCode}
              disabled={isRedeeming || !redeemCode.trim()}
              className="bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] h-11 px-6"
            >
              {isRedeeming ? "Redeeming..." : "Redeem"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
