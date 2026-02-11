"use client";

import { RoleBuilder } from "@/components/dashboard/roles/role-builder";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useServerStore } from "@/store/use-server-store";
import { PageHeader } from "@/components/dashboard/page-header";

function RolesPageSkeleton() {
  return (
    <div className="space-y-8 pb-12 w-full min-w-0 overflow-x-hidden">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 flex-1">
          <Skeleton className="h-4 w-32 bg-zinc-800" />
          <Skeleton className="h-12 w-64 bg-zinc-800 rounded-lg" />
          <Skeleton className="h-4 w-96 bg-zinc-800" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-zinc-900/40 p-5 rounded-2xl border border-white/5">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 bg-zinc-800/50 rounded-xl" />
            <Skeleton className="h-10 w-32 bg-zinc-800/50 rounded-xl" />
          </div>
          <Skeleton className="h-10 w-40 bg-cyan-500/10 rounded-xl" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Skeleton className="h-[400px] w-full bg-zinc-900/40 rounded-2xl border border-white/5" />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Skeleton className="h-[600px] w-full bg-zinc-900/40 rounded-2xl border border-white/5" />
          </div>
        </div>
      </div>
    </div>
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
