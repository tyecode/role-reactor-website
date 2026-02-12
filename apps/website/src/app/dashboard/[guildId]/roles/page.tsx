"use client";

import { RoleBuilder } from "@/components/dashboard/roles/role-builder";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";

import { useServerStore } from "@/store/use-server-store";
import { PageHeader } from "@/components/dashboard/page-header";

import { NodeLoader } from "@/components/common/node-loader";

function RolesPageSkeleton() {
  return (
    <NodeLoader
      title="Scanning Access Nodes"
      subtitle="Fetching_Role_Definitions..."
    />
  );
}

function RolesContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { installedGuildIds, isLoading: serverLoading } = useServerStore();

  const isInstalled = guildId ? installedGuildIds.includes(guildId) : false;
  // Only show skeleton if we are loading AND don't have data yet
  const isLoading = serverLoading && installedGuildIds.length === 0;

  if (isLoading) {
    return <RolesPageSkeleton />;
  }

  if (!guildId || !isInstalled) {
    return <BotInviteCard guildId={guildId} />;
  }

  return <RoleBuilder key={guildId} />;
}

export default function RolesPage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Interactive Role System"
        categoryIcon={ShieldCheck}
        title="Reaction Roles"
        description="Interactive role assignment system configured for"
        serverName={activeGuild?.name || "Target Node"}
      />

      <Suspense fallback={<RolesPageSkeleton />}>
        <RolesContent />
      </Suspense>
    </div>
  );
}
