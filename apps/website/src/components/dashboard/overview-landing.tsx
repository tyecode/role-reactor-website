"use client";

import { useServerStore } from "@/store/use-server-store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OnboardingView } from "./onboarding-view";

export function OverviewLanding() {
  const router = useRouter();
  const {
    guilds,
    installedGuildIds,
    isLoading: isServersLoading,
  } = useServerStore();

  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1392714201558159431";
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

  const installedGuilds = guilds.filter((g) =>
    installedGuildIds.includes(g.id)
  );

  // Auto-Redirect to first server if available
  useEffect(() => {
    if (!isServersLoading && installedGuilds.length > 0) {
      router.replace(`/dashboard/${installedGuilds[0].id}`);
    }
  }, [isServersLoading, installedGuilds, router]);

  // Show loader while checking or redirecting
  if (isServersLoading || installedGuilds.length > 0) {
    return (
      <div className="flex items-center justify-center p-12 min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  // Case 1: No installed servers found - ONBOARDING (This is the only thing left now)
  return <OnboardingView inviteUrl={inviteUrl} />;
}
