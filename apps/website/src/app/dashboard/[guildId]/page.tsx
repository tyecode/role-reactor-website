import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { GuildOverviewView } from "@/components/dashboard/guild-overview-view";

async function getGuildStats(guildId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await botFetchJson<any>(`/guilds/${guildId}/settings`, {
      next: { revalidate: 0 }, // Disable cache for live updates
    });
  } catch (error) {
    console.error("Failed to fetch guild stats:", error);
    return null;
  }
}

export default async function GuildOverviewPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  await auth();
  const guildResponse = await getGuildStats(guildId);

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
