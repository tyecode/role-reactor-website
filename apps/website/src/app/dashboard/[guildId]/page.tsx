import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { checkBotStatus } from "@/lib/bot-status";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { BotOfflineCard } from "@/app/dashboard/_components/bot-offline-card";
import { GuildOverviewView } from "@/app/dashboard/[guildId]/_components/guild-overview-view";
import { notFound } from "next/navigation";

import { GuildSettings, GuildStats } from "@/types/discord";

interface GuildResponse {
  settings: GuildSettings;
  guildStats: GuildStats;
  isPremium: boolean;
}

import { getManageableGuilds } from "@/lib/server/guilds";

async function getGuildStats(guildId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    return await botFetchJson<GuildResponse>(`/guilds/${guildId}/settings`, {
      userId,
      next: { revalidate: 60 }, // Cache for 1 minute for better navigation performance
      silent: true, // Suppress console errors for expected 403 (guild membership required)
    });
  } catch {
    return null;
  }
}

export default async function GuildOverviewPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  const session = await auth();

  // 1. Basic auth check
  if (!session?.user) {
    notFound();
  }

  // 2. Data Fetching
  const guildsPromise = getManageableGuilds();
  const botStatusPromise = checkBotStatus();

  const [{ guilds }, botStatus] = await Promise.all([
    guildsPromise,
    botStatusPromise,
  ]);

  const activeGuild = guilds.find((g) => g.id === guildId);
  const isAuthorized = !!activeGuild;

  // 3. Authorization Result Handling
  if (!isAuthorized) {
    notFound();
  }

  // 4. Bot Offline Handling
  if (!botStatus.online) {
    return <BotOfflineCard />;
  }

  // 5. Data Fetching (only if bot is online)
  const guildResponse = await getGuildStats(guildId);

  // 6. Data Validity Handling
  if (!guildResponse) {
    return <BotInviteCard guildId={guildId} />;
  }

  const { settings, guildStats, isPremium } = guildResponse;

  return (
    <GuildOverviewView
      guildId={guildId}
      settings={settings}
      guildStats={guildStats}
      isPremium={isPremium}
    />
  );
}
