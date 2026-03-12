import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  XPSettings,
  LeaderboardEntry,
  XPSettingsSchema,
  LeaderboardEntrySchema,
} from "@/types/settings";

export type { XPSettings, LeaderboardEntry };
import { z } from "zod";

interface GuildXPData {
  leaderboard: LeaderboardEntry[];
  settings: XPSettings | null;
  isXpDisabled: boolean;
}

interface XPState {
  // Per-guild data cache
  dataCache: Record<string, GuildXPData>;

  // Status
  isLoading: boolean;
  isError: Error | null;
  lastFetched: Record<string, number>; // guildId -> timestamp

  // Actions
  fetchXPData: (guildId: string, force?: boolean) => Promise<void>;
  updateSettings: (guildId: string, settings: Partial<XPSettings>) => void;
  clearCache: (guildId?: string) => void;

  // Helpers
  getGuildData: (guildId: string) => GuildXPData;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const DEFAULT_GUILD_DATA: GuildXPData = {
  leaderboard: [],
  settings: null,
  isXpDisabled: false,
};

export const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      dataCache: {},
      isLoading: false,
      isError: null,
      lastFetched: {},

      getGuildData: (guildId: string) => {
        return get().dataCache[guildId] ?? DEFAULT_GUILD_DATA;
      },

      fetchXPData: async (guildId: string, force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetch = state.lastFetched[guildId] || 0;
        const cached = state.dataCache[guildId];

        // Return if data is fresh and not forced
        if (
          !force &&
          cached &&
          cached.leaderboard.length > 0 &&
          cached.settings &&
          now - lastFetch < CACHE_DURATION
        ) {
          return;
        }

        set({ isLoading: true, isError: null });

        try {
          // Parallel fetching of leaderboard and settings
          const [leaderboardRes, settingsRes] = await Promise.all([
            fetch(`/api/guilds/${guildId}/leaderboard?limit=100&source=dashboard`),
            fetch(`/api/guilds/${guildId}/settings`),
          ]);

          // Handle Leaderboard Response
          let leaderboardData: LeaderboardEntry[] = [];
          if (leaderboardRes.ok) {
            const data = await leaderboardRes.json();
            const leaderboardJson =
              data.status === "success"
                ? data.data?.leaderboard || data.leaderboard
                : data.leaderboard || data;

            const result = z
              .array(LeaderboardEntrySchema)
              .safeParse(leaderboardJson);
            if (result.success) {
              leaderboardData = result.data;
            } else {
              console.warn(
                "XP Store: Leaderboard validation failed",
                result.error.format()
              );
              // Fallback to empty instead of crashing if possible
            }
          }

          // Handle Settings Response
          let settingsData: XPSettings | null = null;
          if (settingsRes.ok) {
            const data = await settingsRes.json();
            if (data.status === "success" && data.settings?.experienceSystem) {
              const result = XPSettingsSchema.safeParse(
                data.settings.experienceSystem
              );
              if (result.success) {
                settingsData = result.data;
              } else {
                console.warn(
                  "XP Store: Settings validation failed",
                  result.error.format()
                );
              }
            }
          }

          // Determine XP disabled from settings (core toggle), not from
          // the leaderboard API which returns 403 for both "XP core off"
          // AND "public leaderboard off".
          const xpDisabled = settingsData ? !settingsData.enabled : leaderboardData.length === 0;

          set({
            dataCache: {
              ...get().dataCache,
              [guildId]: {
                leaderboard: leaderboardData,
                settings: settingsData,
                isXpDisabled: xpDisabled,
              },
            },
            lastFetched: { ...get().lastFetched, [guildId]: now },
            isLoading: false,
          });
        } catch (error) {
          console.error("XP Store: Fetch failed", error);
          set({
            isError:
              error instanceof Error
                ? error
                : new Error("Failed to synchronize XP data"),
            isLoading: false,
          });
        }
      },

      updateSettings: (guildId, newSettings) => {
        const cached = get().dataCache[guildId];
        if (!cached?.settings) return;

        set({
          dataCache: {
            ...get().dataCache,
            [guildId]: {
              ...cached,
              settings: { ...cached.settings, ...newSettings },
            },
          },
        });
      },

      clearCache: (guildId) => {
        if (guildId) {
          const newLastFetched = { ...get().lastFetched };
          const newDataCache = { ...get().dataCache };
          delete newLastFetched[guildId];
          delete newDataCache[guildId];
          set({ lastFetched: newLastFetched, dataCache: newDataCache });
        } else {
          set({ lastFetched: {}, dataCache: {} });
        }
      },
    }),
    {
      name: "xp-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dataCache: state.dataCache,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
