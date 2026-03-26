"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  serverName: string;
}

export function ShareButton({ url, serverName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${serverName} Leaderboard`,
          text: `Check out the XP leaderboard for ${serverName}!`,
          url,
        });
        return;
      } catch {
        // User cancelled or API not supported — fall through to clipboard
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-sm uppercase tracking-wider transition-all duration-300",
        copied
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
          : "border-white/10 bg-white/5 text-zinc-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
      )}
      title="Share this leaderboard"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </>
      )}
    </button>
  );
}
