import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProSubscription {
  expiresAt: string;
  activatedAt: string;
  cancelled?: boolean;
  cancelledAt?: string;
  autoRenew?: boolean;
  cost?: number;
  period?: string;
  payerUserId?: string;
}

// ProEngineSettings now reflects the full response from the settings endpoint
export type ProEngineSettings = any;

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

          const data = await res.json();

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
              isPremium: {
                ...currentData.isPremium,
                ...(newSettings.isPremium || {}),
              },
              subscription: newSettings.subscription
                ? { ...currentData.subscription!, ...newSettings.subscription }
                : currentData.subscription,
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
