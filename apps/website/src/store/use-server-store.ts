import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  permissions: string;
}

interface ServerState {
  guilds: DiscordGuild[];
  installedGuildIds: string[];
  isLoading: boolean;
  error: "none" | "re-login" | "error";
  lastFetched: number | null;
  lastActiveGuildId: string | null;

  // Actions
  fetchServers: (force?: boolean) => Promise<void>;
  setGuilds: (guilds: DiscordGuild[]) => void;
  setInstalledGuildIds: (ids: string[]) => void;
  setLastActiveGuildId: (id: string | null) => void;
  clearServers: () => void;
}

export const useServerStore = create<ServerState>()(
  persist(
    (set, get) => ({
      guilds: [],
      installedGuildIds: [],
      isLoading: true,
      error: "none",
      lastFetched: null,
      lastActiveGuildId: null,

      fetchServers: async (force = false) => {
        const { lastFetched } = get();

        // Cache for 2 minutes to keep it snappy but relatively fresh
        const CACHE_DURATION = 2 * 60 * 1000;
        const now = Date.now();
        if (!force && lastFetched && now - lastFetched < CACHE_DURATION) {
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true, error: "none" });

        try {
          const res = await fetch("/api/discord/guilds");

          if (!res.ok) {
            if (res.status === 401) {
              set({ error: "re-login", isLoading: false });
              return;
            }
            throw new Error("Failed to fetch");
          }

          const manageableGuilds: DiscordGuild[] = await res.json();
          set({ guilds: manageableGuilds });

          if (manageableGuilds.length > 0) {
            const botRes = await fetch("/api/guilds/check", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                guildIds: manageableGuilds.map((g) => g.id),
              }),
            });

            if (botRes.ok) {
              const botData = await botRes.json();
              const ids =
                botData.installedGuilds ||
                (botData.data && botData.data.installedGuilds) ||
                [];
              set({ installedGuildIds: ids });
            }
          }

          set({ lastFetched: Date.now(), isLoading: false });
        } catch (err) {
          console.error("Server store fetch error:", err);
          set({ error: "error", isLoading: false });
        }
      },

      setGuilds: (guilds) => set({ guilds }),
      setInstalledGuildIds: (ids) => set({ installedGuildIds: ids }),
      setLastActiveGuildId: (id) => set({ lastActiveGuildId: id }),
      clearServers: () =>
        set({
          guilds: [],
          installedGuildIds: [],
          lastFetched: null,
          lastActiveGuildId: null,
          error: "none",
        }),
    }),
    {
      name: "server-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        guilds: state.guilds,
        installedGuildIds: state.installedGuildIds,
        lastFetched: state.lastFetched,
        lastActiveGuildId: state.lastActiveGuildId,
      }),
    }
  )
);
