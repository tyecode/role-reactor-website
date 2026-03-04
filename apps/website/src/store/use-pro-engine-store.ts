import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProEngineSettingsSchema } from "@/types/settings";
export type { ProEngineSettings, ProSubscription } from "@/types/settings";
import type { ProEngineSettings } from "@/types/settings";

interface ProEngineState {
  // Per-guild settings cache
  settingsCache: Record<string, ProEngineSettings>;
  currentGuildId: string | null;
  isLoading: boolean;
  isError: Error | null;
  lastFetched: Record<string, number>; // guildId -> timestamp

  // Computed getter — returns settings for the current guild
  settings: ProEngineSettings | null;

  // Actions
  fetchSettings: (guildId: string, force?: boolean) => Promise<void>;
  updateLocalSettings: (settings: Partial<ProEngineSettings>) => void;
  clearCache: (guildId?: string) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useProEngineStore = create<ProEngineState>()(
  persist(
    (set, get) => ({
      settingsCache: {},
      currentGuildId: null,
      isLoading: false,
      isError: null,
      lastFetched: {},

      // Derived: returns settings for the current guild
      get settings() {
        const state = get();
        if (!state.currentGuildId) return null;
        return state.settingsCache[state.currentGuildId] ?? null;
      },

      fetchSettings: async (guildId: string, force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetch = state.lastFetched[guildId] || 0;
        const cachedSettings = state.settingsCache[guildId];

        // Always update currentGuildId so UI knows which guild we're viewing
        if (state.currentGuildId !== guildId) {
          set({ currentGuildId: guildId });
        }

        // Skip fetch if cache is still fresh
        if (!force && cachedSettings && now - lastFetch < CACHE_DURATION) {
          return;
        }

        set({ isLoading: true, isError: null });

        try {
          const res = await fetch(`/api/guilds/${guildId}/settings`);
          if (!res.ok) {
            let errorMsg = "Failed to fetch settings";
            try {
              const error = await res.json();
              errorMsg = error.message || error.error || `Error ${res.status}`;
            } catch {
              errorMsg = `Error ${res.status}: ${res.statusText}`;
            }
            throw new Error(errorMsg);
          }

          const json = await res.json();
          const result = ProEngineSettingsSchema.safeParse(json);

          if (!result.success) {
            console.error(
              "Pro Engine Store: Validation failed",
              result.error.format()
            );
            throw new Error("Invalid settings data received from server");
          }

          const data = result.data;

          set({
            settingsCache: { ...get().settingsCache, [guildId]: data },
            lastFetched: { ...get().lastFetched, [guildId]: now },
            currentGuildId: guildId,
            isLoading: false,
          });
        } catch (error) {
          console.error("Pro Engine Store: Fetch failed", error);
          set({
            isError:
              error instanceof Error
                ? error
                : new Error("Failed to synchronize settings"),
            isLoading: false,
          });
        }
      },

      updateLocalSettings: (newSettings) => {
        const state = get();
        const guildId = state.currentGuildId;
        if (!guildId) return;

        const currentData = state.settingsCache[guildId];
        if (!currentData) return;

        set({
          settingsCache: {
            ...state.settingsCache,
            [guildId]: {
              ...currentData,
              ...newSettings,
              isPremium:
                typeof currentData?.isPremium === "object"
                  ? {
                      ...currentData.isPremium,
                      ...((newSettings.isPremium as object) || {}),
                    }
                  : {
                      pro: false,
                      ...((newSettings.isPremium as object) || {}),
                    },
              subscription:
                newSettings.subscription && currentData?.subscription
                  ? { ...currentData.subscription, ...newSettings.subscription }
                  : newSettings.subscription || currentData?.subscription,
            },
          },
        });
      },

      clearCache: (guildId) => {
        if (guildId) {
          const newLastFetched = { ...get().lastFetched };
          const newSettingsCache = { ...get().settingsCache };
          delete newLastFetched[guildId];
          delete newSettingsCache[guildId];
          set({
            lastFetched: newLastFetched,
            settingsCache: newSettingsCache,
            ...(get().currentGuildId === guildId
              ? { currentGuildId: null }
              : {}),
          });
        } else {
          set({
            lastFetched: {},
            settingsCache: {},
            currentGuildId: null,
          });
        }
      },
    }),
    {
      name: "pro-engine-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settingsCache: state.settingsCache,
        lastFetched: state.lastFetched,
        currentGuildId: state.currentGuildId,
      }),
    }
  )
);
