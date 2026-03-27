"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Trophy, Loader2, Users } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";

interface GuildResult {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
  totalXP?: number;
  rankedCount?: number;
  rank?: number;
}

const formatCompactNumber = (number: number) => {
  if (number < 1000) return number.toString();
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
};

const getRankStyles = (rank: number) => {
  const brandStyles = {
    avatar: "ring-white/10 group-hover:ring-emerald-500/50",
    text: "group-hover:text-emerald-400"
  };

  switch (rank) {
    case 1:
      return {
        badge: "text-amber-300 bg-amber-500/20 border-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.2)]",
        ...brandStyles
      };
    case 2:
      return {
        badge: "text-zinc-200 bg-zinc-400/20 border-zinc-400/40 shadow-[0_0_20px_rgba(161,161,170,0.2)]",
        ...brandStyles
      };
    case 3:
      return {
        badge: "text-orange-300 bg-orange-500/20 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.2)]",
        ...brandStyles
      };
    default:
      return {
        badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
        ...brandStyles
      };
  }
};

export function ServerSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<GuildResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Debounce the input query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch results
  useEffect(() => {
    const controller = new AbortController();

    async function searchGuilds() {
      if (!debouncedQuery) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      setIsLoading(true);
      setHasSearched(true);
      try {
        const res = await fetch(
          `/api/leaderboards/search?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal }
        );
        if (res.ok) {
          const json = await res.json();
          if (!controller.signal.aborted) {
            if (json.guilds) {
              setResults(json.guilds);
            } else {
              setResults([]);
            }
          }
        } else {
          if (!controller.signal.aborted) setResults([]);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Search error:", error);
        setResults([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    searchGuilds();
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div
      className="w-full max-w-2xl mx-auto space-y-6"
      ref={searchContainerRef}
    >
      {/* Search Bar */}
      <div className="relative group z-20">
        <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 blur-lg transition duration-500 group-focus-within:opacity-100" />
        <div className="relative flex items-center bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-500/50 shadow-2xl transition-all">
          <div className="px-5 text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for a server..."
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-lg h-16 placeholder:text-zinc-600/80 font-medium text-white px-4"
          />
          {isLoading && (
            <div className="pr-5 text-emerald-400">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Results Dropdown / Inline Grid */}
      <AnimatePresence mode="popLayout">
        {hasSearched && (query.length > 0 || isFocused) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {results.length > 0
              ? results.map((guild, index) => {
                  const styles = getRankStyles(guild.rank || 0);
                  return (
                    <motion.div
                      key={guild.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/leaderboards/${guild.id}`}>
                        <div className="group flex items-center p-3 rounded-xl border border-white/5 bg-zinc-900/60 backdrop-blur-sm hover:bg-zinc-800/80 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all gap-4 overflow-hidden relative">
                          {/* Avatar */}
                          <Avatar
                            className={cn(
                              "h-12 w-12 rounded-lg ring-1 transition-all shrink-0 bg-zinc-900",
                              styles.avatar
                            )}
                          >
                            <AvatarImage
                              src={guild.icon || ""}
                              alt={guild.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-zinc-950 text-zinc-400 font-bold rounded-lg uppercase">
                              {guild.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>

                          {/* Info */}
                          <div className="flex-1 min-w-0 pr-2 text-left">
                            <h4
                              className={cn(
                                "text-white text-sm md:text-base font-bold truncate transition-colors text-left",
                                styles.text,
                                audiowide.className
                              )}
                            >
                              {guild.name}
                            </h4>
                            <div className="flex items-center justify-start gap-2.5 mt-1">
                              <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-tight">
                                <Users className="w-3 h-3 text-emerald-500/50" />
                                {guild.memberCount.toLocaleString()}
                              </span>
                              {guild.rankedCount !== undefined && (
                                <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-tight">
                                  <Trophy className="w-3 h-3 text-emerald-500/50" />
                                  {guild.rankedCount}
                                </span>
                              )}
                              {guild.totalXP !== undefined && (
                                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-tight bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">
                                  {formatCompactNumber(guild.totalXP)} XP
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Global Rank Badge */}
                          {guild.rank && (
                            <div className="shrink-0 self-start mt-0.5">
                              <span
                                className={cn(
                                  "text-xs font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider transition-all duration-500",
                                  styles.badge,
                                  audiowide.className
                                )}
                              >
                                #{guild.rank}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              : !isLoading && (
                  <div className="col-span-full py-8 text-center text-zinc-500 font-medium bg-zinc-900/30 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2">
                    <Search className="w-8 h-8 opacity-20" />
                    <p>No public leaderboards found</p>
                  </div>
                )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
