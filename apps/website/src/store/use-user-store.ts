import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserPricingInfo } from "@/types/pricing";

interface UserState {
  user: UserPricingInfo | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  /**
   * Fetches user data (credits, status) from the pricing API.
   * Can be expanded to other endpoints later.
   */
  fetchUser: (userId: string, force?: boolean) => Promise<void>;

  /**
   * Updates only the credit balance (e.g. after a purchase).
   */
  updateBalance: (newBalance: number) => void;

  /**
   * Clears user data (on logout).
   */
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchUser: async (userId: string, force = false) => {
        const { user, lastFetched, isLoading } = get();

        // Return cached data if valid (e.g. 5 mins) and same user
        const CACHE_DURATION = 5 * 60 * 1000;
        const now = Date.now();
        const isCacheValid = lastFetched && now - lastFetched < CACHE_DURATION;

        if (!force && isCacheValid && user && user.userId === userId) {
          return;
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        try {
          // currently fetching from pricing endpoint as it contains the credit info
          const response = await fetch(`/api/pricing?user_id=${userId}`);
          const result = await response.json();

          if (result.success && result.data?.user) {
            set({
              user: result.data.user,
              lastFetched: Date.now(),
              isLoading: false,
            });
          } else {
            // If success but no user object, maybe handle gracefully?
            set({ isLoading: false });
          }
        } catch (error) {
          console.error("User store fetch error:", error);
          set({ error: "Failed to load user data", isLoading: false });
        }
      },

      updateBalance: (newBalance: number) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              currentCredits: newBalance,
            },
          });
        }
      },

      clearUser: () => {
        set({ user: null, lastFetched: null, error: null });
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
