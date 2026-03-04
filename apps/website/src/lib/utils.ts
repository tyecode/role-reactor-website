import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Specialized Tailwind Merge configuration for Role Reactor's custom theme.
 * This ensures that custom animations (like animate-tv-flicker) and
 * theme-specific classes are merged correctly without conflicts.
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Explicitly including custom animation tokens defined in global.css @theme
      animate: [
        "fade-in-up",
        "tv-flicker",
        "skeleton-glitch",
        "bg-move-1",
        "bg-move-2",
        "bg-move-3",
        "glitch-jitter",
        "scanlines",
        "dialog-glitch-in",
        "dialog-glitch-out",
        "alert-glitch-in",
        "alert-glitch-out",
      ],
    },
  },
});

/**
 * Merges class names and handles Tailwind conflicts efficiently.
 * Optimized for Next.js 15+ and Tailwind CSS v4.
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

/**
 * Dedents a multi-line template string, useful for formatting bot messages
 * or code snippets.
 */
export function dedent(str: string) {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;

  const indent = Math.min(...match.map((x) => x.length));
  const re = new RegExp(`^[ \\t]{${indent}}`, "gm");
  return str.replace(re, "").trim();
}

/**
 * Formats a number into a localized string with suffixes (e.g., 1.2k, 1M).
 */
export function formatCompactNumber(number: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

/**
 * Formats a currency value for the dashboard (USD).
 */
export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
/**
 * Resolves a Discord image URL.
 * Handles both full URLs and hashes.
 */
export function getDiscordImageUrl(
  type: "avatars" | "icons" | "splashes" | "banners",
  id: string,
  hash: string | null | undefined,
  size: number = 128
) {
  if (!hash) return null;

  // If it's already a full URL, return it as is
  if (hash.startsWith("http")) return hash;

  // Split out extension if present in the hash itself
  const [cleanHash, ext] = hash.split(".");
  const format = ext || (cleanHash.startsWith("a_") ? "gif" : "png");

  return `https://cdn.discordapp.com/${type}/${id}/${cleanHash}.${format}?size=${size}`;
}
