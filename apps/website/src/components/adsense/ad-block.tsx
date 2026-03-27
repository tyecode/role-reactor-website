"use client";
import { useEffect, useRef, useState } from "react";
import { Megaphone, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { links } from "@/constants/links";
import Link from "next/link";

interface AdBlockProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: "true" | "false";
  layoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
  hide?: boolean;
  variant?: "default" | "sidebar";
  showRemoveAds?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBlock({
  slot,
  format = "auto",
  responsive = "true",
  layoutKey,
  style,
  className,
  hide,
  variant = "default",
  showRemoveAds = false,
}: AdBlockProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const isDev = process.env.NODE_ENV === "development";
  const adRef = useRef<HTMLModElement>(null);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!publisherId || isDev || hide) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense push error:", err);
      setAdFailed(true);
    }
  }, [publisherId, isDev, hide]);

  if (hide) return null;

  // Premium Placeholder UI
  const Placeholder = ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => {
    const isSidebar = variant === "sidebar";

    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-sm group/ad not-prose",
          "flex flex-col items-center justify-center transition-all duration-500",
          isSidebar ? "p-4 min-h-[140px]" : "p-6 min-h-[100px]",
          className
        )}
        style={style}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 flex flex-col items-center isolate",
            isSidebar ? "gap-2" : "gap-3"
          )}
        >
          <div className="flex items-center gap-2">
            {publisherId ? (
              <Sparkles className="w-3.5 h-3.5 text-cyan-400/50 animate-pulse" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500/50" />
            )}
            <div
              className={cn(
                "uppercase font-black tracking-[0.3em] text-zinc-500 !m-0 !p-0 leading-none",
                isSidebar ? "text-[8px]" : "text-[9px]",
                audiowide.className
              )}
            >
              {title}
            </div>
          </div>

          <div
            className={cn(
              "text-zinc-100 font-black uppercase tracking-widest text-center max-w-md !m-0 !p-0 leading-none drop-shadow-sm",
              isSidebar ? "text-[12px] leading-tight" : "text-[15px]",
              audiowide.className
            )}
          >
            {isSidebar ? "Prime Ad Space" : "Premium Advertising Opportunity"}
          </div>

          <div
            className={cn(
              "flex flex-col items-center",
              isSidebar ? "gap-2" : "gap-3"
            )}
          >
            <div
              className={cn(
                "text-zinc-500 font-bold uppercase tracking-widest text-center !m-0 !p-0 leading-tight opacity-80",
                isSidebar ? "text-[8px] max-w-[120px]" : "text-[10px] max-w-md"
              )}
            >
              {message}
            </div>
            <a
              href={links.support}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-black text-cyan-400/80 hover:text-cyan-400 uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 !no-underline leading-none hover:scale-105",
                isSidebar ? "mt-1 text-[7.5px]" : "mt-3 text-[8.5px]"
              )}
            >
              <Megaphone className={isSidebar ? "w-2.5 h-2.5" : "w-3 h-3"} />
              <span className="border-b border-cyan-400/30">
                Partner with us
              </span>
            </a>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 rounded-br-xl" />
      </div>
    );
  };

  // Show professional placeholder if ad can't load (Dev, Missing ID, or Blocked)
  if (isDev || !publisherId || adFailed) {
    return (
      <Placeholder
        title="PRIME AD SPACE"
        message="Promote your brand to a global network of active Discord communities"
      />
    );
  }

  // Use "rectangle" format automatically for sidebars to prevent infinite vertical skyscraper ads breaking layouts
  const computedFormat =
    variant === "sidebar" && format === "auto" ? "rectangle" : format;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full",
        "has-[ins[data-ad-status=unfilled]]:hidden",
        className
      )}
    >
      <ins
        ref={adRef}
        className={cn(
          "adsbygoogle w-full block bg-transparent",
          variant === "sidebar" && "max-h-[300px] overflow-hidden"
        )}
        style={{ display: "block", ...style }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={computedFormat}
        data-full-width-responsive={responsive}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
      {showRemoveAds && (
        <Link
          href="/premium"
          className="text-[10px] text-zinc-500/70 hover:text-cyan-400/90 font-medium uppercase tracking-widest mt-2 transition-colors"
          prefetch={false}
        >
          Remove Ads — Get Premium
        </Link>
      )}
    </div>
  );
}
