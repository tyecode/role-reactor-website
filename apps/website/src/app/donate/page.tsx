"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { toast } from "@/lib/toast";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface BmacData {
  code: string;
  username: string;
  buyMeACoffeeUrl: string;
  expiresAt: string;
}

const rateCard = [
  { min: 1, max: 4, rate: 15 },
  { min: 5, max: 9, rate: 15 },
  { min: 10, max: 24, rate: 18 },
  { min: 25, max: 49, rate: 22 },
  { min: 50, max: 99, rate: 25 },
  { min: 100, max: Infinity, rate: 28 },
];

export default function DonatePage() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<BmacData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("discord", { callbackUrl: "/donate" });
    }
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const generateCode = async () => {
      try {
        const response = await fetch("/api/payments/buymeacoffee", {
          method: "POST",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to generate code");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to generate code");
        toast.error("Failed to generate payment code");
      } finally {
        setLoading(false);
      }
    };

    generateCode();
  }, [status]);

  const copyToClipboard = async (text: string, type: "code" | "name") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedName(true);
        setTimeout(() => setCopiedName(false), 2000);
      }
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Generating your code...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs text-red-400 uppercase tracking-widest">
            {error || "Failed to load"}
          </p>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Go Home
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 mb-4"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FFDD00]">
                <Coffee className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Buy Me a Coffee
                </h1>
                <p className="text-zinc-400 text-sm">
                  Donate any amount, get Cores instantly
                </p>
              </div>
            </div>
          </div>

          {/* Rate Card */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-800 mb-6">
            <h2 className="text-sm font-black text-zinc-400 tracking-widest uppercase mb-4">
              Rate Card
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {rateCard.map((tier, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
                >
                  <div className="text-xs text-zinc-500">
                    ${tier.min}
                    {tier.max !== Infinity ? `-${tier.max}` : "+"}
                  </div>
                  <div className="text-lg font-bold text-cyan-400">
                    {tier.rate} cores/$
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code & Username */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-800 mb-6 space-y-4">
            {/* Unique Code */}
            <div>
              <h3 className="text-xs font-black text-zinc-400 tracking-widest uppercase mb-2">
                Your Unique Code
              </h3>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-3 flex items-center justify-between">
                <span
                  className={cn(
                    "text-xl font-black text-white tracking-widest",
                    audiowide.className
                  )}
                >
                  {data.code}
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-lg w-8 h-8"
                  onClick={() => copyToClipboard(data.code, "code")}
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Discord Name */}
            <div>
              <h3 className="text-xs font-black text-zinc-400 tracking-widest uppercase mb-2">
                Your Discord Name
              </h3>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-3 flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {data.username}
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-lg w-8 h-8"
                  onClick={() => copyToClipboard(data.username, "name")}
                >
                  {copiedName ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Instructions with Image Placeholders */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-800 mb-6">
            <h2 className="text-sm font-black text-zinc-400 tracking-widest uppercase mb-4">
              How to Donate
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg">1.</span>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Click &quot;Donate&quot; below to open Buy Me a Coffee
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      A new tab will open with the donation page
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex items-center justify-center min-h-[120px]">
                  <div className="text-center">
                    <Coffee className="w-8 h-8 text-[#FFDD00] mx-auto mb-2" />
                    <p className="text-xs text-zinc-500">
                      Image: BMAC donation page
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg">2.</span>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Enter any dollar amount
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Minimum $1 — more dollars = more Cores
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex items-center justify-center min-h-[120px]">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">$5</div>
                    <p className="text-xs text-zinc-500">
                      Image: Amount input field
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg">3.</span>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Paste your code in &quot;Say something nice...&quot;
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      This links your donation to your account
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex items-center justify-center min-h-[120px]">
                  <div className="text-center">
                    <div
                      className={cn(
                        "text-lg font-black text-cyan-400 tracking-widest mb-2",
                        audiowide.className
                      )}
                    >
                      {data.code}
                    </div>
                    <p className="text-xs text-zinc-500">
                      Image: Message field with code
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg">4.</span>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Put your Discord name in &quot;Name or @yoursocial&quot;
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Secondary verification (log only)
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex items-center justify-center min-h-[120px]">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white mb-2">
                      {data.username}
                    </div>
                    <p className="text-xs text-zinc-500">
                      Image: Name field with Discord username
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg">5.</span>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Complete the donation
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Cores are added automatically within seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={data.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black transition-all">
                <span className="mr-2">☕</span>
                Donate on Buy Me a Coffee
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>

            <Button
              variant="secondary"
              className="w-full h-10 rounded-xl font-black uppercase tracking-widest text-[10px] border border-white/5"
              onClick={() => router.push("/")}
            >
              I&apos;ve completed payment
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-[9px] text-zinc-600 text-center mt-6 leading-relaxed font-bold uppercase tracking-widest">
            Cores are non-refundable digital assets.
            <br />
            Delivery is automatic after donation confirmation.
          </p>
        </div>
      </div>
    </main>
  );
}
