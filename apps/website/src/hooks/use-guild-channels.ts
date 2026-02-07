"use client";

import useSWR from "swr";

export interface GuildChannel {
  id: string;
  name: string;
  type: number;
  parentId?: string;
  position: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch channels");
  const data = await res.json();
  if (data.status !== "success") throw new Error("API returned error");
  return data.channels as GuildChannel[];
};

export function useGuildChannels(guildId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    guildId ? `/api/guilds/${guildId}/channels` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes cache
    }
  );

  return {
    channels: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
