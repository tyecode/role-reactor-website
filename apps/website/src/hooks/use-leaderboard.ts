"use client";

import useSWR from "swr";
import { LeaderboardEntry } from "@/types/discord";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData.error || "Failed to fetch leaderboard"
    ) as Error & { hint?: string };
    error.hint = errorData.hint;
    throw error;
  }
  const data = await res.json();
  if (data.status !== "success") throw new Error("API returned error");
  return data.data?.leaderboard || data.leaderboard;
};

export function useLeaderboard(guildId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    guildId ? `/api/guilds/${guildId}/leaderboard?limit=100` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 10000, // 10 seconds
    }
  );

  return {
    leaderboard: (data as LeaderboardEntry[]) || [],
    isLoading,
    isError: error,
    isXpDisabled: (error as { hint?: string })?.hint === "XP_DISABLED",
    mutate,
  };
}
