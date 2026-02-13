import { RoleBuilder } from "./_components/role-builder";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { NodeLoader } from "@/components/common/node-loader";

function RolesPageSkeleton() {
  return (
    <NodeLoader
      title="Scanning Access Nodes"
      subtitle="Fetching_Role_Definitions..."
    />
  );
}

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

  const guildName = activeGuild?.name || "Target Node";
  const isInstalled = installedGuildIds.includes(guildId);

  if (!isInstalled) {
    return (
      <div className="space-y-8 pb-12 w-full min-w-0 overflow-x-hidden">
        <PageHeader
          category="Interactive Role System"
          categoryIcon={ShieldCheck}
          title="Reaction Roles"
          description="Interactive role assignment system configured for"
          serverName={guildName}
        />
        <BotInviteCard guildId={guildId} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Interactive Role System"
        categoryIcon={ShieldCheck}
        title="Reaction Roles"
        description="Interactive role assignment system configured for"
        serverName={guildName}
      />

      <Suspense fallback={<RolesPageSkeleton />}>
        <RoleBuilder guildId={guildId} />
      </Suspense>
    </div>
  );
}
