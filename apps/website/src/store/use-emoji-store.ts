import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DiscordEmoji } from "@/types/discord"; // Assuming types are here or I'll define local

interface EmojiState {
  // Map guildId -> emojis
  guildEmojis: Record<string, DiscordEmoji[]>;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastFetched: Record<string, number>;

  // Actions
  fetchEmojis: (guildId: string, force?: boolean) => Promise<void>;
  getEmojis: (guildId: string) => DiscordEmoji[];
  clearCache: (guildId?: string) => void;
}

export const useEmojiStore = create<EmojiState>()(
  persist(
    (set, get) => ({
      guildEmojis: {},
      isLoading: {},
      errors: {},
      lastFetched: {},

      fetchEmojis: async (guildId: string, force = false) => {
        const { lastFetched, isLoading } = get();

        // 5 minute cache
        const CACHE_DURATION = 5 * 60 * 1000;
        const now = Date.now();
        const last = lastFetched[guildId];

        if (
          !force &&
          !isLoading[guildId] &&
          last &&
          now - last < CACHE_DURATION
        ) {
          return;
        }

        set((state) => ({
          isLoading: { ...state.isLoading, [guildId]: true },
          errors: { ...state.errors, [guildId]: null },
        }));

        try {
          const res = await fetch(`/api/guilds/${guildId}/emojis`);
          if (res.ok) {
            const data = await res.json();
            const emojis = Array.isArray(data) ? data : [];

            set((state) => ({
              guildEmojis: { ...state.guildEmojis, [guildId]: emojis },
              lastFetched: { ...state.lastFetched, [guildId]: Date.now() },
              isLoading: { ...state.isLoading, [guildId]: false },
            }));
          } else {
            const error = await res.json();
            set((state) => ({
              errors: { ...state.errors, [guildId]: error.error || "Failed" },
              isLoading: { ...state.isLoading, [guildId]: false },
            }));
          }
        } catch (err) {
          console.error("Failed to fetch emojis:", err);
          set((state) => ({
            errors: { ...state.errors, [guildId]: "Connection error" },
            isLoading: { ...state.isLoading, [guildId]: false },
          }));
        }
      },

      getEmojis: (guildId: string) => {
        return get().guildEmojis[guildId] || [];
      },

      clearCache: (guildId?: string) => {
        if (guildId) {
          set((state) => {
            const newEmojis = { ...state.guildEmojis };
            delete newEmojis[guildId];
            return { guildEmojis: newEmojis };
          });
        } else {
          set({ guildEmojis: {} });
        }
      },
    }),
    {
      name: "emoji-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist the emojis map and timestamps
        guildEmojis: state.guildEmojis,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
