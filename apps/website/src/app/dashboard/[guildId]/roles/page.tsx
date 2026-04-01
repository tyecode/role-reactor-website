import { getManageableGuilds } from "@/lib/server/guilds";
import RolesClient from "./roles-client";

export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  return {
    title: "Reaction Roles",
  };
}

export default async function RolesPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;

  // Reuse the optimized server utility for guild data
  const { guilds, installedGuildIds } = await getManageableGuilds();
  const activeGuild = guilds.find((g) => g.id === guildId);

  const guildName = activeGuild?.name || "this server";
  const isInstalled = installedGuildIds.includes(guildId);

  return (
    <RolesClient
      guildId={guildId}
      guildName={guildName}
      isInstalled={isInstalled}
    />
  );
}
