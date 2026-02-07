import { auth } from "@/auth";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { GuildOverviewView } from "@/components/dashboard/guild-overview-view";

async function getGuildStats(guildId: string) {
  try {
    const res = await botFetch(`${API_PREFIX}/guilds/${guildId}/settings`, {
      next: { revalidate: 0 }, // Disable cache for live updates
    });
    if (!res.ok) return null;
    return await res.json();
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
