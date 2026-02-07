"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch balance");
  const data = await res.json();
  if (!data.success) throw new Error("API returned error");
  return data.balance as number;
};

/**
 * Custom hook to fetch and cache user's core balance
 * Uses SWR for automatic caching, revalidation, and deduplication
 */
export function useCoreBalance() {
  const { data: session } = useSession();

  const {
    data: balance,
    isLoading,
    error,
    mutate,
  } = useSWR(session?.user ? "/api/user/balance" : null, fetcher, {
    refreshInterval: 60000, // Refresh every 60s
    revalidateOnFocus: false, // Don't refetch on window focus
    revalidateOnReconnect: true, // Refetch on reconnect
    dedupingInterval: 5000, // Dedupe requests within 5s
  });

  return {
    balance: balance ?? 0,
    isLoading,
    error,
    mutate, // Allows manual revalidation
  };
}
