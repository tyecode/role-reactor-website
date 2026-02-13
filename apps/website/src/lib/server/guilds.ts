import "server-only";
import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import type { DiscordGuild } from "@/store/use-server-store";
import { unstable_cache } from "next/cache";

/**
 * Internal worker to fetch guilds from Discord.
 * Uses standard fetch caching for performance.
 */
async function fetchDiscordGuildsInternal(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "User-Agent": "RoleReactorWebsite (https://rolereactor.app, 1.0.0)",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    if (response.status === 401) return [];
    throw new Error(`Discord API Error: ${response.status}`);
  }

  return (await response.json()) as any[];
}

/**
 * Internal cached worker to check bot installation.
 * Uses unstable_cache to factor the guild IDs into the cache key.
 */
const checkBotInstallationCached = unstable_cache(
  async (guildIds: string[]) => {
    const botData = await botFetchJson<any>("/guilds/check", {
      method: "POST",
      body: JSON.stringify({ guildIds }),
      silent: true,
    });

    return (botData.installedGuilds ||
      (botData.data && botData.data.installedGuilds) ||
      []) as string[];
  },
  ["bot-installation-check"],
  { revalidate: 300 }
);

/**
 * Fetches manageable guilds from Discord and checks which ones have the bot installed.
 * Designed to be called from Server Components (layouts/pages).
 */
export async function getManageableGuilds() {
  const session = await auth();

  if (!session || !(session as any).accessToken) {
    return { guilds: [], installedGuildIds: [] };
  }

  try {
    const accessToken = (session as any).accessToken;

    // 1. Fetch from Discord (Cached)
    const allGuilds = await fetchDiscordGuildsInternal(accessToken);

    // 2. Filter for servers where user has MANAGE_GUILD or ADMIN
    const manageableGuilds: DiscordGuild[] = allGuilds
      .filter((guild: any) => {
        const permissions = BigInt(guild.permissions || "0");
        const isAdmin = (permissions & BigInt(0x8)) === BigInt(0x8);
        const canManage = (permissions & BigInt(0x20)) === BigInt(0x20);
        return guild.owner === true || isAdmin || canManage;
      })
      .map((g: any) => ({
        id: g.id,
        name: g.name,
        icon: g.icon,
        permissions: g.permissions,
      }));

    if (manageableGuilds.length === 0) {
      return { guilds: [], installedGuildIds: [] };
    }

    // 3. Check bot installation status (Cached)
    const installedGuildIds = await checkBotInstallationCached(
      manageableGuilds.map((g) => g.id)
    );

    return {
      guilds: manageableGuilds,
      installedGuildIds,
    };
  } catch (error) {
    console.error("[Server] Failed to fetch manageable guilds:", error);
    return { guilds: [], installedGuildIds: [] };
  }
}
