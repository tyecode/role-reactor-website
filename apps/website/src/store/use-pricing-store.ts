import { create } from "zustand";
import type { PricingData } from "../types/pricing";

interface PricingStore {
  data: PricingData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchPromise: Promise<void> | null;
  /**
   * Fetches pricing data.
   * @param userId - Optional user ID to fetch user-specific pricing/details.
   * @param force - If true, ignores cache and forces a fresh fetch.
   */
  fetchPricing: (userId?: string, force?: boolean) => Promise<void>;
  /**
   * Manually updates the locally stored user balance (e.g. after purchase).
   */
  updateUserBalance: (newBalance: number) => void;
}

export const usePricingStore = create<PricingStore>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchPromise: null,

  fetchPricing: async (userId?: string, force = false) => {
    const { data, lastFetched, fetchPromise } = get();

    // Cache validity (e.g., 5 minutes)
    const CACHE_DURATION = 5 * 60 * 1000;
    const now = Date.now();
    const isCacheValid = lastFetched && now - lastFetched < CACHE_DURATION;

    // Check if we can skip fetching
    const hasUserData = !!data?.user;
    const needsUserData = !!userId;

    if (!force && isCacheValid && data) {
      // If we have data and it's valid...
      // Check if we specifically need user data and don't have it
      if (!needsUserData || (needsUserData && hasUserData)) {
        console.log("Pricing store: Using cached data", {
          userId,
          hasUserData,
        });
        return;
      }
    }

    // Reuse existing promise if active to prevent duplicate requests
    if (fetchPromise) {
      console.log("Pricing store: Reusing active fetch promise");
      return fetchPromise;
    }

    console.log("Pricing store: Fetching fresh data...", {
      userId,
      force,
      isCacheValid,
    });

    set({ isLoading: true, error: null });

    const promise = (async () => {
      try {
        const url = userId ? `/api/pricing?user_id=${userId}` : "/api/pricing";
        const response = await fetch(url);
        const result = await response.json();

        if (result.success && result.data) {
          set({
            data: result.data,
            lastFetched: Date.now(),
            isLoading: false,
            fetchPromise: null,
          });
        } else {
          set({
            error: result.message || "Failed to fetch pricing",
            isLoading: false,
            fetchPromise: null,
          });
        }
      } catch (error) {
        console.error("Pricing store fetch error:", error);
        set({ error: "Network error", isLoading: false, fetchPromise: null });
      }
    })();

    set({ fetchPromise: promise });
    return promise;
  },

  updateUserBalance: (newBalance: number) => {
    const { data } = get();
    if (data && data.user) {
      set({
        data: {
          ...data,
          user: {
            ...data.user,
            currentCredits: newBalance,
          },
        },
      });
    }
  },
}));
