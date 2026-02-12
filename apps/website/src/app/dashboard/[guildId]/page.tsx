import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { GuildOverviewView } from "@/components/dashboard/guild-overview-view";
import { notFound } from "next/navigation";
import pkg from "../../../../package.json";

const userAgent = `${pkg.name} (${pkg.homepage || "https://rolereactor.app"}, ${pkg.version})`;

interface GuildResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guildStats: any;
  isPremium: boolean;
}

async function getGuildStats(guildId: string) {
  try {
    return await botFetchJson<GuildResponse>(`/guilds/${guildId}/settings`, {
      next: { revalidate: 60 }, // Cache for 1 minute for better navigation performance
    });
  } catch (error) {
    console.error("Failed to fetch guild stats:", error);
    return null;
  }
}

async function checkGuildAuthorization(
  accessToken: string | undefined,
  guildId: string
): Promise<boolean> {
  if (!accessToken) return false;

  try {
    const discordRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": userAgent,
      },
      next: { revalidate: 300 }, // Cache owned guilds for 5 mins
    });

    if (discordRes.ok) {
      const userGuilds = await discordRes.json();
      return userGuilds.some(
        (g: { id: string; permissions: string; owner: boolean }) => {
          const permissions = BigInt(g.permissions || "0");
          const isAdmin = (permissions & BigInt(0x8)) === BigInt(0x8);
          const canManage = (permissions & BigInt(0x20)) === BigInt(0x20);
          return g.id === guildId && (g.owner === true || isAdmin || canManage);
        }
      );
    }
  } catch (error) {
    console.error("Ownership verification failed:", error);
  }
  return false;
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

  const accessToken = (
    session as unknown as { accessToken: string | undefined }
  ).accessToken;

  // 2. Performance Optimization: Parallel Fetching
  // We start both the Authorization Check and the Data Fetch simultaneously
  // instead of waiting for one to finish before starting the other.
  const authPromise = checkGuildAuthorization(accessToken, guildId);
  const dataPromise = getGuildStats(guildId);

  const [isAuthorized, guildResponse] = await Promise.all([
    authPromise,
    dataPromise,
  ]);

  // 3. Authorization Result Handling
  if (!isAuthorized) {
    notFound();
  }

  // 4. Data Validity Handling
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
