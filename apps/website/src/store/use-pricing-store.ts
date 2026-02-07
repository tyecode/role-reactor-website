import { create } from "zustand";
import type { PricingData } from "../types/pricing";

interface PricingStore {
  data: PricingData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
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

  fetchPricing: async (userId?: string, force = false) => {
    const { data, lastFetched, isLoading } = get();

    // Cache validity (e.g., 5 minutes)
    const CACHE_DURATION = 5 * 60 * 1000;
    const now = Date.now();
    const isCacheValid = lastFetched && now - lastFetched < CACHE_DURATION;

    // If a request is already in flight, you might not want to start another one,
    // OR you might want to wait for it. For simplicity, we'll just guard against
    // overlapping calls if we want, but usually allowing latest wins is okay
    // or just skipping if loading.
    // Here we'll skip if loading to prevent flicker/double fetch.
    if (isLoading) return;

    // Check if we can skip fetching
    // 1. Data exists
    // 2. Cache is fresh
    // 3. We are not forcing a refresh
    // 4. If userId is provided, we must ensure we have user data loaded.
    //    If we have data but no user data (e.g. was guest), we need to fetch.
    //    If no userId provided, generic data is fine.
    const hasUserData = !!data?.user;
    const needsUserData = !!userId;

    if (!force && isCacheValid && data) {
      // If we need user data but don't have it, we must fetch.
      // Otherwise, if we have what we need (or more), we can skip.
      if (!needsUserData || (needsUserData && hasUserData)) {
        return;
      }
      // If we have user data but now don't need it (logged out?),
      // strictly speaking generic data is a subset, so sticking with it is fine.
    }

    set({ isLoading: true, error: null });

    try {
      const url = userId ? `/api/pricing?user_id=${userId}` : "/api/pricing";

      const response = await fetch(url);
      const result = await response.json();

      if (result.success && result.data) {
        set({
          data: result.data,
          lastFetched: Date.now(),
          isLoading: false,
        });
      } else {
        set({
          error: result.message || "Failed to fetch pricing",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Pricing store fetch error:", error);
      set({ error: "Network error", isLoading: false });
    }
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
