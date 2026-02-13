"use client";

import { useEffect, useRef } from "react";
import { useServerStore, type DiscordGuild } from "@/store/use-server-store";

interface StoreHydratorProps {
  guilds: DiscordGuild[];
  installedGuildIds: string[];
}

/**
 * A tiny client component that hydrates the Zustand server store
 * with data fetched on the server during the initial render.
 */
export function StoreHydrator({
  guilds,
  installedGuildIds,
}: StoreHydratorProps) {
  const hasHydrated = useRef(false);

  useEffect(() => {
    // We use this pattern to hydrate the store as soon as possible
    if (!hasHydrated.current) {
      // Only update if we actually have data to avoid clearing persisted state
      // if the server fetch failed/returned empty for some reason
      if (guilds.length > 0) {
        useServerStore.setState({
          guilds,
          installedGuildIds,
          isLoading: false,
          isFetching: false,
          lastFetched: Date.now(),
        });
      }
      hasHydrated.current = true;
    }
  }, [guilds, installedGuildIds]);

  return null;
}
