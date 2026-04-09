"use client";

import { useEffect, useRef, useState } from "react";
import { Megaphone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { links } from "@/constants/links";

interface PropellerAdBlockProps {
  zoneId: string;
  style?: React.CSSProperties;
  className?: string;
  hide?: boolean;
  variant?: "default" | "sidebar";
}

export function PropellerAdBlock({
  zoneId,
  style,
  className,
  hide,
  variant = "default",
}: PropellerAdBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hide || typeof window === "undefined" || !zoneId) return;

    setIsLoading(true);
    setAdFailed(false);

    // Clear any existing content
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    try {
      const script = document.createElement("script");
      script.setAttribute("data-cfasync", "false");
      script.type = "text/javascript";
      script.src = `https://nap5k.com/pwa/${zoneId}`;
      script.async = true;

      script.onload = () => {
        console.log(`PropellerAds zone ${zoneId} loaded successfully`);
        setIsLoading(false);
      };

      script.onerror = (error) => {
        console.error(`PropellerAds zone ${zoneId} failed to load:`, error);
        setAdFailed(true);
        setIsLoading(false);
      };

      containerRef.current?.appendChild(script);

      return () => {
        const container = containerRef.current;
        if (container?.contains(script)) {
          script.remove();
        }
      };
    } catch (error) {
      console.error(
        `Error creating PropellerAds script for zone ${zoneId}:`,
        error
      );
      setAdFailed(true);
      setIsLoading(false);
    }
  }, [zoneId, hide]);

  if (hide) return null;

  // Show loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-sm",
          "flex flex-col items-center justify-center transition-all duration-500",
          variant === "sidebar" ? "p-4 min-h-[140px]" : "p-6 min-h-[100px]",
          className
        )}
        style={style}
      >
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg" />
          <div className="w-16 h-2 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  if (adFailed) {
    const isSidebar = variant === "sidebar";

    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-sm",
          "flex flex-col items-center justify-center transition-all duration-500",
          isSidebar ? "p-4 min-h-[140px]" : "p-6 min-h-[100px]",
          className
        )}
        style={style}
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />

        <div
          className={cn(
            "relative z-10 flex flex-col items-center isolate",
            isSidebar ? "gap-2" : "gap-3"
          )}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400/50 animate-pulse" />
            <div
              className={cn(
                "uppercase font-black tracking-[0.3em] text-zinc-500 m-0! p-0! leading-none",
                isSidebar ? "text-[8px]" : "text-[9px]",
                audiowide.className
              )}
            >
              AD SPACE
            </div>
          </div>

          <div
            className={cn(
              "text-zinc-500 font-bold uppercase tracking-widest text-center m-0! p-0! leading-tight opacity-80",
              isSidebar ? "text-[8px] max-w-[120px]" : "text-[10px] max-w-md"
            )}
          >
            Advertisement
          </div>

          <a
            href={links.support}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-black text-cyan-400/80 hover:text-cyan-400 uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 no-underline! leading-none hover:scale-105",
              isSidebar ? "mt-1 text-[7.5px]" : "mt-3 text-[8.5px]"
            )}
          >
            <Megaphone className={isSidebar ? "w-2.5 h-2.5" : "w-3 h-3"} />
            <span className="border-b border-cyan-400/30">Partner with us</span>
          </a>
        </div>

        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 rounded-br-xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center w-full",
        className
      )}
      style={style}
    />
  );
}
