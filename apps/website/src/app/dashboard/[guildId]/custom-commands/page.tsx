import { getManageableGuilds } from "@/lib/server/guilds";
import CustomCommandsClient from "./custom-commands-client";

export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  return {
    title: "Custom Commands",
  };
}

export default async function CustomCommandsPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;

  const { guilds, installedGuildIds } = await getManageableGuilds();
  const activeGuild = guilds.find((g) => g.id === guildId);

  const guildName = activeGuild?.name || "this server";
  const isInstalled = installedGuildIds.includes(guildId);

  return (
    <CustomCommandsClient
      guildId={guildId}
      guildName={guildName}
      isInstalled={isInstalled}
    />
  );
}
