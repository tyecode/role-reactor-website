import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LogsState {
  logs: string[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  fetchLogs: (force?: boolean) => Promise<void>;
  appendLogs: (newLogs: string[]) => void;
  clearLogs: () => void;
}

const CACHE_DURATION = 30 * 1000; // 30 seconds cache for logs
const MAX_LOGS = 2000; // Cap at 2000 lines

export const useLogsStore = create<LogsState>()(
  persist(
    (set, get) => ({
      logs: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchLogs: async (force = false) => {
        const { lastFetched, isLoading } = get();

        // Return cached data if valid
        const now = Date.now();
        const isCacheValid = lastFetched && now - lastFetched < CACHE_DURATION;

        if (!force && isCacheValid && get().logs.length > 0) {
          return;
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        try {
          const response = await fetch("/api/proxy/logs?limit=100");

          if (!response.ok) {
            throw new Error(`Failed to fetch logs: ${response.status}`);
          }

          const result = await response.json();

          if (result.logs) {
            set({
              logs: result.logs,
              lastFetched: Date.now(),
              isLoading: false,
            });
          } else {
            set({ isLoading: false, error: "Invalid response format" });
          }
        } catch {
          // Silently handle errors - keep cached data
          set({ error: "Failed to load logs", isLoading: false });
        }
      },

      appendLogs: (newLogs: string[]) => {
        const { logs } = get();
        const existingSet = new Set(logs);
        const uniqueNewLogs = newLogs.filter((line) => !existingSet.has(line));

        if (uniqueNewLogs.length === 0) return;

        const updatedLogs = [...logs, ...uniqueNewLogs];
        
        // Cap at MAX_LOGS to prevent memory issues
        if (updatedLogs.length > MAX_LOGS) {
          set({ logs: updatedLogs.slice(updatedLogs.length - MAX_LOGS) });
        } else {
          set({ logs: updatedLogs });
        }
      },

      clearLogs: () => {
        set({ logs: [], lastFetched: null, error: null });
      },
    }),
    {
      name: "system-logs-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        logs: state.logs,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
