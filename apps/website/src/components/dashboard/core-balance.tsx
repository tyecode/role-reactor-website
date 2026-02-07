"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCoreBalance } from "@/hooks/use-core-balance";
import { PricingDialog } from "@/components/pricing/pricing-dialog";
import { Button } from "@/components/ui/button";

export interface CoreBalanceProps {
  /** Visual variant */
  variant?: "compact" | "full" | "dropdown";
  /** Custom className */
  className?: string;
  /** Core image URL */
  coreImageUrl?: string;
  /** Custom onClick handler (overrides default pricing modal) */
  onClick?: () => void;
  /** Whether to show the plus button */
  showPlusButton?: boolean;
}

export function CoreBalance({
  variant = "full",
  className,
  coreImageUrl = "/images/cores/core_energy.png",
  onClick,
  showPlusButton = true,
}: CoreBalanceProps) {
  const { status } = useSession();
  const { balance, isLoading } = useCoreBalance();

  if (status === "unauthenticated") return null;

  // Loading state skeleton
  if (status === "loading" || isLoading) {
    if (variant === "compact") {
      return (
        <div
          className={cn(
            "h-5 w-12 bg-zinc-800/10 animate-pulse rounded-full",
            className
          )}
        />
      );
    }
    if (variant === "dropdown") {
      return (
        <div
          className={cn(
            "mt-2 h-[58px] w-full bg-zinc-900/50 animate-pulse rounded-lg border border-border/40",
            className
          )}
        />
      );
    }
    return (
      <div
        className={cn(
          "h-8 w-24 bg-black/40 border border-white/5 animate-pulse rounded-full backdrop-blur-md ml-3",
          className
        )}
      />
    );
  }

  // Dropdown variant (for user menu dropdown)
  if (variant === "dropdown") {
    return (
      <div
        className={cn(
          "mt-2 p-3 bg-linear-to-br from-zinc-900 to-black rounded-lg border border-border/40 flex items-center justify-between shadow-inner",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
            {coreImageUrl && (
              <Image
                src={coreImageUrl}
                width={32}
                height={32}
                alt="Cores"
                draggable={false}
                className="select-none"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Your Cores
            </span>
            <span
              className={cn(
                "text-base font-bold leading-tight font-mono text-foreground",
                isLoading && "opacity-50"
              )}
            >
              {isLoading ? "..." : balance}
            </span>
          </div>
        </div>
        {showPlusButton && (
          <Button
            size="sm"
            variant="secondary"
            className="h-7 w-7 p-0 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/5 rounded-lg shrink-0"
            onClick={(e) => {
              e.preventDefault();
              onClick?.();
            }}
            title="Add Cores"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    );
  }

  // Compact variant (for header)
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5 text-muted-foreground",
          className
        )}
      >
        {coreImageUrl && (
          <Image
            src={coreImageUrl}
            width={18}
            height={18}
            alt="Cores"
            draggable={false}
            className="select-none"
          />
        )}
        <span
          className={cn(
            "font-semibold text-foreground font-mono",
            isLoading && "opacity-50"
          )}
        >
          {isLoading ? "..." : balance}
        </span>
        {showPlusButton &&
          (onClick ? (
            <div
              className="bg-primary/20 rounded-full p-0.5 ml-1 cursor-pointer hover:bg-primary/30 transition-colors"
              onClick={onClick}
            >
              <Plus className="w-3 h-3 text-primary" />
            </div>
          ) : (
            <PricingDialog
              trigger={
                <div className="bg-primary/20 rounded-full p-0.5 ml-1 cursor-pointer hover:bg-primary/30 transition-colors">
                  <Plus className="w-3 h-3 text-primary" />
                </div>
              }
            />
          ))}
      </div>
    );
  }

  // Full variant (for dashboard header)
  return (
    <div
      className={cn(
        "flex items-center bg-black/40 border border-white/5 rounded-full px-1.5 py-1 gap-2.5 backdrop-blur-md ml-3",
        className
      )}
    >
      {/* Icon */}
      <div className="relative w-4.5 h-4.5 flex-shrink-0">
        <Image
          src={coreImageUrl}
          alt="Cores"
          fill
          className="object-contain drop-shadow-[0_0_7px_rgba(59,130,246,0.5)]"
        />
      </div>

      {/* Number */}
      <span
        className={cn(
          "font-bold text-sm font-mono min-w-[18px] text-center",
          isLoading ? "opacity-50" : "text-white"
        )}
      >
        {isLoading ? "0" : balance}
      </span>

      {/* Plus Button with Modal */}
      {showPlusButton &&
        (onClick ? (
          <div
            className="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-white/10 cursor-pointer"
            onClick={onClick}
          >
            <Plus className="w-3.5 h-3.5" />
          </div>
        ) : (
          <PricingDialog
            trigger={
              <div className="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-white/10 cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
              </div>
            }
          />
        ))}
    </div>
  );
}
