"use client";

import { links } from "@/constants/links";
import { useServerStore } from "@/store/use-server-store";
import { useEffect } from "react";
import { OnboardingView } from "./onboarding-view";
import { NodeLoader } from "@/components/common/node-loader";

export function OverviewLanding() {
  const {
    isLoading: isServersLoading,
    fetchServers,
    installedGuildIds,
  } = useServerStore();

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  const inviteUrl = links.inviteBot;

  if (isServersLoading || installedGuildIds.length > 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <NodeLoader
          title="Verifying Access"
          subtitle="Synchronizing server data..."
        />
      </div>
    );
  }

  // If no servers are found or redirect is off, show the onboarding experience
  return <OnboardingView inviteUrl={inviteUrl} />;
}
