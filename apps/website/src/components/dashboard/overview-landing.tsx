"use client";

import { links } from "@/constants/links";
import { useServerStore } from "@/store/use-server-store";
import { useEffect } from "react";
import { OnboardingView } from "./onboarding-view";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewLanding() {
  const { isLoading: isServersLoading, fetchServers } = useServerStore();

  // Add a fallback timeout so we don't stay stuck forever
  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  const inviteUrl = links.inviteBot;

  if (isServersLoading) {
    return (
      <div className="space-y-6 sm:space-y-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Skeleton */}
        <Skeleton className="w-full min-h-[380px] sm:min-h-[420px] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-12 lg:p-16 flex flex-col items-center lg:items-start justify-center gap-6">
          <Skeleton className="h-6 w-32 bg-white/5" />
          <div className="space-y-3 w-full flex flex-col items-center lg:items-start">
            <Skeleton className="h-10 sm:h-16 w-3/4 sm:w-1/2 bg-white/5" />
            <Skeleton className="h-10 sm:h-16 w-1/2 sm:w-1/3 bg-white/5" />
          </div>
          <Skeleton className="h-4 w-full max-w-md bg-white/5" />
          <div className="flex gap-4 w-full justify-center lg:justify-start">
            <Skeleton className="h-11 w-40 bg-white/5" />
            <Skeleton className="h-11 w-32 bg-white/5" />
          </div>
        </Skeleton>

        {/* Modules Grid Skeleton */}
        <div className="space-y-8">
          <div className="flex flex-col items-center lg:items-start gap-3">
            <Skeleton className="h-1 w-10 bg-white/10 rounded-full" />
            <Skeleton className="h-6 w-48 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-[200px] rounded-[1.2rem] sm:rounded-[1.5rem]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If no servers are found or redirect is off, show the onboarding experience
  return <OnboardingView inviteUrl={inviteUrl} />;
}
