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

export interface ProEngineSettings {
  isPremium: {
    pro: boolean;
  };
  subscription?: ProSubscription;
}

interface ProEngineState {
  settings: ProEngineSettings | null;
  isLoading: boolean;
  isError: Error | null;
  lastFetched: Record<string, number>; // guildId -> timestamp

  // Actions
  fetchSettings: (guildId: string, force?: boolean) => Promise<void>;
  updateLocalSettings: (settings: Partial<ProEngineSettings>) => void;
  clearCache: (guildId?: string) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useProEngineStore = create<ProEngineState>()(
  persist(
    (set, get) => ({
      settings: null,
      isLoading: false,
      isError: null,
      lastFetched: {},

      fetchSettings: async (guildId: string, force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetch = state.lastFetched[guildId] || 0;

        if (!force && state.settings && now - lastFetch < CACHE_DURATION) {
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
          // Extract settings from response wrapper if needed (bot API usually returns { status, settings })
          const settingsData = data.settings || data;

          set({
            settings: settingsData,
            lastFetched: { ...state.lastFetched, [guildId]: now },
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
        const currentData = get().settings;
        if (!currentData) return;

        set({
          settings: {
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
        });
      },

      clearCache: (guildId) => {
        if (guildId) {
          const newLastFetched = { ...get().lastFetched };
          delete newLastFetched[guildId];
          set({ lastFetched: newLastFetched, settings: null });
        } else {
          set({ lastFetched: {}, settings: null });
        }
      },
    }),
    {
      name: "pro-engine-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
