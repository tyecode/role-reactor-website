"use client";

import { links } from "@/constants/links";
import { useServerStore } from "@/store/use-server-store";
import { useEffect } from "react";
import { OnboardingView } from "./onboarding-view";

export function OverviewLanding() {
  const {
    isLoading: isServersLoading,
    fetchServers,
    error,
  } = useServerStore();

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  const inviteUrl = links.inviteBot;

  // Let the global loader handle re-login error cases or loading state
  if (error === "re-login" || isServersLoading) {
    return null; // Will be obscured by GlobalStateLoader in Layout anyway
  }

  // If no servers are found or redirect is off, show the onboarding experience
  return <OnboardingView inviteUrl={inviteUrl} />;
}
