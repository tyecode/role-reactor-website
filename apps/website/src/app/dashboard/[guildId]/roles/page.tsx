import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { RolesTabs } from "./_components/roles-tabs";

import { getManageableGuilds } from "@/lib/server/guilds";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  const { guilds } = await getManageableGuilds();
  const guild = guilds.find((g) => g.id === guildId);

  return {
    title: guild ? `${guild.name} | Reaction Roles` : "Reaction Roles",
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

  if (!isInstalled) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          category="Engagement Management"
          categoryIcon={ShieldCheck}
          title="Reaction Roles"
          description="Configure interactive role assignment systems for"
          serverName={guildName}
        />
        <BotInviteCard guildId={guildId} />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Engagement Management"
        categoryIcon={ShieldCheck}
        title="Reaction Roles"
        description="Configure interactive role assignment systems for"
        serverName={guildName}
      />

      <RolesTabs guildId={guildId} />
    </div>
  );
}
