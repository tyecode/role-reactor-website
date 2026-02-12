"use client";

import { CommandList } from "@/components/dashboard/commands/command-list";
import { PageHeader } from "@/components/dashboard/page-header";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Terminal } from "lucide-react";
import { useServerStore } from "@/store/use-server-store";

import { NodeLoader } from "@/components/common/node-loader";

function CommandsPageSkeleton() {
  return (
    <NodeLoader
      title="Terminal Uplink"
      subtitle="Loading_Command_Manifest..."
    />
  );
}

function CommandsContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { installedGuildIds, isLoading } = useServerStore();

  const isInstalled = guildId ? installedGuildIds.includes(guildId) : false;

  // Show skeletons immediately if loading
  if (isLoading) {
    return <CommandsPageSkeleton />;
  }

  if (!guildId || !isInstalled) {
    return <BotInviteCard guildId={guildId} />;
  }

  return <CommandList guildId={guildId} />;
}

export default function CommandsPage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  return (
    <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Control Center"
        categoryIcon={Terminal}
        title="Command Settings"
        description="Enable or disable specific bot commands for"
        serverName={activeGuild?.name || "this server"}
      />

      <Suspense fallback={<CommandsPageSkeleton />}>
        <CommandsContent />
      </Suspense>
    </div>
  );
}
