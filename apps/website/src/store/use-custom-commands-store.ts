import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CustomCommand } from "@/types/custom-commands";

interface CustomCommandsState {
  commandsCache: Record<string, CustomCommand[]>;
  lastFetched: Record<string, number>;
  isLoading: boolean;
  isError: Error | null;

  fetchCommands: (guildId: string, force?: boolean) => Promise<void>;
  addCommand: (guildId: string, command: CustomCommand) => void;
  updateCommand: (
    guildId: string,
    commandId: string,
    data: Partial<CustomCommand>
  ) => void;
  removeCommand: (guildId: string, commandId: string) => void;
  clearCache: (guildId?: string) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useCustomCommandsStore = create<CustomCommandsState>()(
  persist(
    (set, get) => ({
      commandsCache: {},
      lastFetched: {},
      isLoading: false,
      isError: null,

      fetchCommands: async (guildId: string, force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetch = state.lastFetched[guildId] || 0;
        const cached = state.commandsCache[guildId];

        if (!force && cached && now - lastFetch < CACHE_DURATION) {
          return;
        }

        set({ isLoading: true, isError: null });

        try {
          const res = await fetch(
            `/api/guilds/${guildId}/custom-commands?page=1&limit=50`
          );

          if (!res.ok) {
            let errorMsg = "Failed to fetch custom commands";
            try {
              const error = await res.json();
              errorMsg = error.message || error.error || `Error ${res.status}`;
            } catch {
              errorMsg = `Error ${res.status}: ${res.statusText}`;
            }
            throw new Error(errorMsg);
          }

          const json = await res.json();
          const commands: CustomCommand[] = json.commands ?? [];

          set({
            commandsCache: { ...get().commandsCache, [guildId]: commands },
            lastFetched: { ...get().lastFetched, [guildId]: now },
            isLoading: false,
          });
        } catch (error) {
          set({
            isError:
              error instanceof Error
                ? error
                : new Error("Failed to load custom commands"),
            isLoading: false,
          });
        }
      },

      addCommand: (guildId, command) => {
        const state = get();
        const existing = state.commandsCache[guildId] ?? [];
        set({
          commandsCache: {
            ...state.commandsCache,
            [guildId]: [command, ...existing],
          },
        });
      },

      updateCommand: (guildId, commandId, data) => {
        const state = get();
        const existing = state.commandsCache[guildId] ?? [];
        set({
          commandsCache: {
            ...state.commandsCache,
            [guildId]: existing.map((c) =>
              c.commandId === commandId ? { ...c, ...data } : c
            ),
          },
        });
      },

      removeCommand: (guildId, commandId) => {
        const state = get();
        const existing = state.commandsCache[guildId] ?? [];
        set({
          commandsCache: {
            ...state.commandsCache,
            [guildId]: existing.filter((c) => c.commandId !== commandId),
          },
        });
      },

      clearCache: (guildId) => {
        if (guildId) {
          const newLastFetched = { ...get().lastFetched };
          const newCommandsCache = { ...get().commandsCache };
          delete newLastFetched[guildId];
          delete newCommandsCache[guildId];
          set({ lastFetched: newLastFetched, commandsCache: newCommandsCache });
        } else {
          set({ lastFetched: {}, commandsCache: {} });
        }
      },
    }),
    {
      name: "custom-commands-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        commandsCache: state.commandsCache,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
