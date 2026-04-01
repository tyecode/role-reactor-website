import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PricingData } from "../types/pricing";

interface PricingStore {
  data: PricingData | null;
  isLoading: boolean;
  error: string | null;
  lastFetchedPackages: number | null;
  lastFetchedUser: number | null;
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

export const usePricingStore = create<PricingStore>()(
  persist(
    (set, get) => ({
      data: null,
      isLoading: false,
      error: null,
      lastFetchedPackages: null,
      lastFetchedUser: null,

      fetchPromise: null,

      fetchPricing: async (userId?: string, force = false) => {
        const {
          data,
          lastFetchedPackages,
          lastFetchedUser,
          fetchPromise,
        } = get();

        // Cache validity (e.g., 5 minutes)
        const CACHE_DURATION = 5 * 60 * 1000;
        const now = Date.now();
        const packagesCacheValid =
          lastFetchedPackages && now - lastFetchedPackages < CACHE_DURATION;
        const userCacheValid =
          lastFetchedUser && now - lastFetchedUser < CACHE_DURATION;

        const needsUserData = !!userId;
        const hasPackages = !!data?.packages?.length;
        const hasUserData = !!data?.user;

        if (!force) {
          const okPackages = hasPackages && packagesCacheValid;
          const okUser = !needsUserData || (hasUserData && userCacheValid);
          if (okPackages && okUser) return;
        }

        // Reuse existing promise if active to prevent duplicate requests
        if (fetchPromise) {
          console.log("Pricing store: Reusing active fetch promise");
          return fetchPromise;
        }

        console.log("Pricing store: Fetching fresh data...", {
          userId,
          force,
          packagesCacheValid,
          userCacheValid,
        });

        set({ isLoading: true, error: null });

        const promise = (async () => {
          try {
            const shouldFetchPackages =
              force || !hasPackages || !packagesCacheValid;
            const shouldFetchUser =
              !!userId && (force || !hasUserData || !userCacheValid);

            const packagesPromise = shouldFetchPackages
              ? fetch("/api/pricing/packages").then((r) => r.json())
              : Promise.resolve(null);

            const userPromise = shouldFetchUser
              ? fetch(`/api/pricing/balance?user_id=${userId}`).then((r) =>
                  r.json()
                )
              : Promise.resolve(null);

            const [packagesRes, userRes] = await Promise.all([
              packagesPromise,
              userPromise,
            ]);

            const nextData: PricingData = {
              ...(data ?? ({} as PricingData)),
              ...(packagesRes?.success && packagesRes.data
                ? packagesRes.data
                : {}),
              ...(userRes?.success && userRes.data ? userRes.data : {}),
            };

            if (shouldFetchPackages && !(packagesRes?.success && packagesRes.data)) {
              throw new Error(packagesRes?.message || packagesRes?.error || "Failed to fetch pricing packages");
            }

            if (shouldFetchUser && !(userRes?.success && userRes.data)) {
              throw new Error(userRes?.message || userRes?.error || "Failed to fetch user balance");
            }

            set({
              data: nextData,
              lastFetchedPackages: shouldFetchPackages
                ? Date.now()
                : lastFetchedPackages,
              lastFetchedUser: shouldFetchUser ? Date.now() : lastFetchedUser,
              isLoading: false,
              fetchPromise: null,
            });
          } catch (error) {
            console.error("Pricing store fetch error:", error);
            set({
              error: "Network error",
              isLoading: false,
              fetchPromise: null,
            });
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
    }),
    {
      name: "pricing-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        data: state.data,
        lastFetchedPackages: state.lastFetchedPackages,
        lastFetchedUser: state.lastFetchedUser,
      }),
    }
  )
);
