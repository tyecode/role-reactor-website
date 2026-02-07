"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@role-reactor/ui/lib/utils"; // Assuming utils exist in ui package
import { useSession } from "next-auth/react";
import { PricingModal } from "./pricing-modal";

export function CoreBalance() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }

    async function fetchBalance() {
      try {
        const res = await fetch("/api/user/balance");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setBalance(data.balance);
          }
        }
      } catch (error) {
        console.error("Failed to fetch balance in header", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();

    // Refresh every 60s
    const interval = setInterval(fetchBalance, 60000);
    return () => clearInterval(interval);
  }, [session]);

  if (!session?.user) return null;

  return (
    <div className="flex items-center bg-black/40 border border-white/5 rounded-full p-1 pl-3 gap-3 backdrop-blur-md">
      {/* Icon */}
      <div className="relative w-5 h-5 flex-shrink-0">
        <Image
          src="/images/cores/core_basic.png" // Using basic as it's likely blue
          alt="Cores"
          fill
          className="object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        />
      </div>

      {/* Number */}
      <span
        className={cn(
          "font-bold text-base font-mono min-w-[20px] text-center",
          loading ? "opacity-50" : "text-white"
        )}
      >
        {loading ? "..." : (balance ?? 0)}
      </span>

      {/* Plus Button with Modal */}
      <PricingModal
        trigger={
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-white/10 cursor-pointer">
            <Plus className="w-4 h-4" />
          </div>
        }
      />
    </div>
  );
}
