import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DiscordRole, DiscordChannel } from "@/types/discord";

export interface PremiumStatus {
  isPremium: {
    pro: boolean;
  };
  subscription?: {
    activatedAt: string;
    expiresAt: string;
    autoRenew: boolean;
  };
}

interface GuildData {
  roles: DiscordRole[] | null;
  channels: DiscordChannel[] | null;
  settings: PremiumStatus | null;
  lastFetched: {
    roles?: number;
    channels?: number;
    settings?: number;
  };
}

interface GuildState {
  guildData: Record<string, GuildData>;
  isLoading: Record<
    string,
    { roles?: boolean; channels?: boolean; settings?: boolean }
  >;
  errors: Record<
    string,
    { roles?: string; channels?: string; settings?: string }
  >;

  // Actions
  fetchRoles: (guildId: string, force?: boolean) => Promise<void>;
  fetchChannels: (guildId: string, force?: boolean) => Promise<void>;
  fetchSettings: (guildId: string, force?: boolean) => Promise<void>;
  clearCache: (guildId?: string) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGuildStore = create<GuildState>()(
  persist(
    (set, get) => ({
      guildData: {},
      isLoading: {},
      errors: {},

      fetchRoles: async (guildId: string, force = false) => {
        const state = get();
        const guild = state.guildData[guildId] || {
          roles: null,
          channels: null,
          settings: null,
          lastFetched: {},
        };
        const now = Date.now();

        if (
          !force &&
          guild.roles &&
          guild.lastFetched.roles &&
          now - guild.lastFetched.roles < CACHE_DURATION
        ) {
          // If already false, don't trigger a re-render
          if (state.isLoading[guildId]?.roles !== false) {
            set((s) => ({
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], roles: false },
              },
            }));
          }
          return;
        }

        // If already loading, don't trigger another set
        if (state.isLoading[guildId]?.roles === true) return;

        set((s) => ({
          isLoading: {
            ...s.isLoading,
            [guildId]: { ...s.isLoading[guildId], roles: true },
          },
          errors: {
            ...s.errors,
            [guildId]: { ...s.errors[guildId], roles: undefined },
          },
        }));

        try {
          const res = await fetch(`/api/guilds/${guildId}/roles`);
          if (res.ok) {
            const data = await res.json();
            set((s) => ({
              guildData: {
                ...s.guildData,
                [guildId]: {
                  ...(s.guildData[guildId] || {
                    roles: null,
                    channels: null,
                    settings: null,
                    lastFetched: {},
                  }),
                  roles: Array.isArray(data) ? data : [],
                  lastFetched: {
                    ...(s.guildData[guildId]?.lastFetched || {}),
                    roles: Date.now(),
                  },
                },
              },
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], roles: false },
              },
            }));
          } else {
            set((s) => ({
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], roles: false },
              },
              errors: {
                ...s.errors,
                [guildId]: {
                  ...s.errors[guildId],
                  roles: "Failed to fetch roles",
                },
              },
            }));
          }
        } catch {
          set((s) => ({
            isLoading: {
              ...s.isLoading,
              [guildId]: { ...s.isLoading[guildId], roles: false },
            },
            errors: {
              ...s.errors,
              [guildId]: { ...s.errors[guildId], roles: "Connection error" },
            },
          }));
        }
      },

      fetchChannels: async (guildId: string, force = false) => {
        const state = get();
        const guild = state.guildData[guildId] || {
          roles: null,
          channels: null,
          settings: null,
          lastFetched: {},
        };
        const now = Date.now();

        if (
          !force &&
          guild.channels &&
          guild.lastFetched.channels &&
          now - guild.lastFetched.channels < CACHE_DURATION
        ) {
          if (state.isLoading[guildId]?.channels !== false) {
            set((s) => ({
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], channels: false },
              },
            }));
          }
          return;
        }

        if (state.isLoading[guildId]?.channels === true) return;

        set((s) => ({
          isLoading: {
            ...s.isLoading,
            [guildId]: { ...s.isLoading[guildId], channels: true },
          },
          errors: {
            ...s.errors,
            [guildId]: { ...s.errors[guildId], channels: undefined },
          },
        }));

        try {
          const res = await fetch(`/api/guilds/${guildId}/channels`);
          if (res.ok) {
            const data = await res.json();
            set((s) => ({
              guildData: {
                ...s.guildData,
                [guildId]: {
                  ...(s.guildData[guildId] || {
                    roles: null,
                    channels: null,
                    settings: null,
                    lastFetched: {},
                  }),
                  channels: Array.isArray(data) ? data : [],
                  lastFetched: {
                    ...(s.guildData[guildId]?.lastFetched || {}),
                    channels: Date.now(),
                  },
                },
              },
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], channels: false },
              },
            }));
          } else {
            set((s) => ({
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], channels: false },
              },
              errors: {
                ...s.errors,
                [guildId]: {
                  ...s.errors[guildId],
                  channels: "Failed to fetch channels",
                },
              },
            }));
          }
        } catch {
          set((s) => ({
            isLoading: {
              ...s.isLoading,
              [guildId]: { ...s.isLoading[guildId], channels: false },
            },
            errors: {
              ...s.errors,
              [guildId]: { ...s.errors[guildId], channels: "Connection error" },
            },
          }));
        }
      },

      fetchSettings: async (guildId: string, force = false) => {
        const state = get();
        const guild = state.guildData[guildId] || {
          roles: null,
          channels: null,
          settings: null,
          lastFetched: {},
        };
        const now = Date.now();

        if (
          !force &&
          guild.settings &&
          guild.lastFetched.settings &&
          now - guild.lastFetched.settings < CACHE_DURATION
        ) {
          if (state.isLoading[guildId]?.settings !== false) {
            set((s) => ({
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], settings: false },
              },
            }));
          }
          return;
        }

        if (state.isLoading[guildId]?.settings === true) return;

        set((s) => ({
          isLoading: {
            ...s.isLoading,
            [guildId]: { ...s.isLoading[guildId], settings: true },
          },
          errors: {
            ...s.errors,
            [guildId]: { ...s.errors[guildId], settings: undefined },
          },
        }));

        try {
          const res = await fetch(`/api/guilds/${guildId}/settings`);
          if (res.ok) {
            const data = await res.json();
            set((s) => ({
              guildData: {
                ...s.guildData,
                [guildId]: {
                  ...(s.guildData[guildId] || {
                    roles: null,
                    channels: null,
                    settings: null,
                    lastFetched: {},
                  }),
                  settings: data,
                  lastFetched: {
                    ...(s.guildData[guildId]?.lastFetched || {}),
                    settings: Date.now(),
                  },
                },
              },
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], settings: false },
              },
            }));
          } else {
            set((s) => ({
              isLoading: {
                ...s.isLoading,
                [guildId]: { ...s.isLoading[guildId], settings: false },
              },
              errors: {
                ...s.errors,
                [guildId]: {
                  ...s.errors[guildId],
                  settings: "Failed to fetch settings",
                },
              },
            }));
          }
        } catch {
          set((s) => ({
            isLoading: {
              ...s.isLoading,
              [guildId]: { ...s.isLoading[guildId], settings: false },
            },
            errors: {
              ...s.errors,
              [guildId]: { ...s.errors[guildId], settings: "Connection error" },
            },
          }));
        }
      },

      clearCache: (guildId?: string) => {
        if (guildId) {
          set((s) => {
            const newData = { ...s.guildData };
            delete newData[guildId];
            return { guildData: newData };
          });
        } else {
          set({ guildData: {} });
        }
      },
    }),
    {
      name: "guild-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        guildData: state.guildData,
      }),
    }
  )
);
