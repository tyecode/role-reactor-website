import { CommandList } from "./_components/command-list";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { Suspense } from "react";
import { Terminal } from "lucide-react";
import { NodeLoader } from "@/components/common/node-loader";

function CommandsPageSkeleton() {
  return (
    <NodeLoader
      title="Terminal Uplink"
      subtitle="Loading_Command_Manifest..."
    />
  );
}

import { getManageableGuilds } from "@/lib/server/guilds";

export default async function CommandsPage({
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
      <div className="min-h-screen pb-20 space-y-8 w-full min-w-0 overflow-x-hidden">
        <PageHeader
          category="Control Center"
          categoryIcon={Terminal}
          title="Command Settings"
          description="Enable or disable specific bot commands for"
          serverName={guildName}
        />
        <BotInviteCard guildId={guildId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Control Center"
        categoryIcon={Terminal}
        title="Command Settings"
        description="Enable or disable specific bot commands for"
        serverName={guildName}
      />

      <Suspense fallback={<CommandsPageSkeleton />}>
        <CommandList guildId={guildId} />
      </Suspense>
    </div>
  );
}
