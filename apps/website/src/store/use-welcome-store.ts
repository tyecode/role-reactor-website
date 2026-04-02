import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";

/**
 * Welcome System Schemas
 */
export const WelcomeSettingsSchema = z.object({
  enabled: z.boolean().default(false),
  channelId: z.string().nullable().optional().default(null),
  message: z.string().optional().default("Welcome {user} to {server}! 🎉"),
  autoRoleId: z.string().nullable().optional().default(null),
  embed: z.boolean().optional().default(false),
});

export type WelcomeSettings = z.infer<typeof WelcomeSettingsSchema>;

interface GuildWelcomeData {
  settings: WelcomeSettings | null;
  isLoading: boolean;
  isError: Error | null;
}

interface WelcomeState {
  // Per-guild data cache
  dataCache: Record<string, GuildWelcomeData>;

  // Status
  lastFetched: Record<string, number>; // guildId -> timestamp

  // Actions
  fetchWelcomeData: (guildId: string, force?: boolean) => Promise<void>;
  updateSettings: (guildId: string, settings: Partial<WelcomeSettings>) => void;
  clearCache: (guildId?: string) => void;

  // Helpers
  getGuildData: (guildId: string) => GuildWelcomeData;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const DEFAULT_WELCOME_SETTINGS: WelcomeSettings = {
  enabled: false,
  channelId: null,
  message: "Welcome {user} to {server}! 🎉",
  autoRoleId: null,
  embed: false,
};

const DEFAULT_GUILD_DATA: GuildWelcomeData = {
  settings: null,
  isLoading: false,
  isError: null,
};

export const useWelcomeStore = create<WelcomeState>()(
  persist(
    (set, get) => ({
      dataCache: {},
      lastFetched: {},

      getGuildData: (guildId: string) => {
        return get().dataCache[guildId] ?? DEFAULT_GUILD_DATA;
      },

      fetchWelcomeData: async (guildId: string, force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetch = state.lastFetched[guildId] || 0;
        const cached = state.dataCache[guildId];

        // Return if data is fresh and not forced
        if (!force && cached?.settings && now - lastFetch < CACHE_DURATION) {
          return;
        }

        // Update loading state
        set({
          dataCache: {
            ...get().dataCache,
            [guildId]: {
              ...DEFAULT_GUILD_DATA,
              isLoading: true,
            },
          },
        });

        try {
          const response = await fetch(`/api/guilds/${guildId}/settings`);

          // Handle non-OK responses gracefully
          if (!response.ok) {
            // Try to parse error response, but handle HTML error pages
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
              const errorData = await response.json();
              throw new Error(
                errorData.message ||
                  errorData.error ||
                  `Server error: ${response.status}`
              );
            } else {
              // HTML error page or service unavailable
              if (response.status === 503) {
                throw new Error(
                  "Bot service is currently unavailable. Please try again later."
                );
              }
              throw new Error(`Server error: ${response.status}`);
            }
          }

          const data = await response.json();

          let settingsData: WelcomeSettings | null = null;

          // Try multiple possible locations for welcome settings
          const welcomeData =
            data.settings?.welcomeSystem ||
            data.welcomeSystem ||
            data.settings?.welcome ||
            null;

          console.log("[Welcome Store] Raw welcomeData:", welcomeData);

          if (welcomeData) {
            const result = WelcomeSettingsSchema.safeParse(welcomeData);
            if (result.success) {
              settingsData = result.data;
              console.log("[Welcome Store] Parsed settings:", settingsData);
            } else {
              console.warn(
                "Welcome Store: Settings validation failed",
                result.error.format()
              );
              // Use partial data if validation fails
              settingsData = {
                ...DEFAULT_WELCOME_SETTINGS,
                ...welcomeData,
              } as WelcomeSettings;
            }
          } else {
            // No welcome settings exist yet - use defaults
            console.log(
              "Welcome Store: No welcome settings found in API, using defaults"
            );
            settingsData = DEFAULT_WELCOME_SETTINGS;
          }

          set({
            dataCache: {
              ...get().dataCache,
              [guildId]: {
                settings: settingsData,
                isLoading: false,
                isError: null,
              },
            },
            lastFetched: { ...get().lastFetched, [guildId]: now },
          });
        } catch (error) {
          console.error("Welcome Store: Fetch failed", error);
          set({
            dataCache: {
              ...get().dataCache,
              [guildId]: {
                settings: null,
                isLoading: false,
                isError:
                  error instanceof Error
                    ? error
                    : new Error("Failed to load welcome settings"),
              },
            },
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
      name: "welcome-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dataCache: state.dataCache,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
