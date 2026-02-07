"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch settings");
  const data = await res.json();
  if (data.status !== "success") throw new Error("API returned error");
  return data.settings;
};

export function useXPSettings(guildId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    guildId ? `/api/guilds/${guildId}/settings` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch just because you clicked the window
      dedupingInterval: 60000, // Consider data fresh for 1 minute
      fallbackData: null,
    }
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate,
  };
}
