import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LeaderboardEntry } from "@/types/discord";

interface XPSettings {
  enabled: boolean;
  messageXP: boolean;
  commandXP: boolean;
  roleXP: boolean;
  voiceXP: boolean;
  messageXPAmount: { min: number; max: number };
  roleXPAmount: number;
  commandXPAmount: { base: number };
  voiceXPAmount: number;
  messageCooldown: number;
  commandCooldown: number;
  levelUpMessages: boolean;
  levelUpChannel?: string;
}

interface XPState {
  // Data
  leaderboard: LeaderboardEntry[];
  settings: XPSettings | null;

  // Status
  isLoading: boolean;
  isError: Error | null;
  isXpDisabled: boolean;
  lastFetched: Record<string, number>; // guildId -> timestamp

  // Actions
  fetchXPData: (guildId: string, force?: boolean) => Promise<void>;
  updateSettings: (guildId: string, settings: Partial<XPSettings>) => void;
  clearCache: (guildId?: string) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      leaderboard: [],
      settings: null,
      isLoading: false,
      isError: null,
      isXpDisabled: false,
      lastFetched: {},

      fetchXPData: async (guildId: string, force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetch = state.lastFetched[guildId] || 0;

        // Return if data is fresh and not forced
        if (
          !force &&
          state.leaderboard.length > 0 &&
          state.settings &&
          now - lastFetch < CACHE_DURATION
        ) {
          return;
        }

        set({ isLoading: true, isError: null, isXpDisabled: false });

        try {
          // Parallel fetching of leaderboard and settings
          const [leaderboardRes, settingsRes] = await Promise.all([
            fetch(`/api/guilds/${guildId}/leaderboard?limit=100`),
            fetch(`/api/guilds/${guildId}/settings`),
          ]);

          // Handle Leaderboard Response
          let leaderboardData: LeaderboardEntry[] = [];
          if (leaderboardRes.ok) {
            const data = await leaderboardRes.json();
            if (data.status === "success") {
              leaderboardData =
                data.data?.leaderboard || data.leaderboard || [];
            }
          } else if (leaderboardRes.status === 403) {
            const errorData = await leaderboardRes.json().catch(() => ({}));
            if (errorData.hint === "XP_DISABLED") {
              set({ isXpDisabled: true });
            }
          }

          // Handle Settings Response
          let settingsData: XPSettings | null = null;
          if (settingsRes.ok) {
            const data = await settingsRes.json();
            if (data.status === "success" && data.settings?.experienceSystem) {
              settingsData = data.settings.experienceSystem;
            }
          }

          set({
            leaderboard: leaderboardData,
            settings: settingsData,
            lastFetched: { ...state.lastFetched, [guildId]: now },
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
        const currentSettings = get().settings;
        if (!currentSettings) return;

        set({
          settings: { ...currentSettings, ...newSettings },
        });
      },

      clearCache: (guildId) => {
        if (guildId) {
          const newLastFetched = { ...get().lastFetched };
          delete newLastFetched[guildId];
          set({ lastFetched: newLastFetched });
        } else {
          set({ lastFetched: {}, leaderboard: [], settings: null });
        }
      },
    }),
    {
      name: "xp-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        leaderboard: state.leaderboard,
        settings: state.settings,
        lastFetched: state.lastFetched,
        isXpDisabled: state.isXpDisabled,
      }),
    }
  )
);
