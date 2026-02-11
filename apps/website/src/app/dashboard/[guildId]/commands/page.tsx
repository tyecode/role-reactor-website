"use client";

import { CommandList } from "@/components/dashboard/commands/command-list";
import { PageHeader } from "@/components/dashboard/page-header";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Terminal } from "lucide-react";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useServerStore } from "@/store/use-server-store";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function CommandsPageSkeleton() {
  return (
    <div className="min-h-screen pb-20 space-y-8 animate-pulse w-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full bg-zinc-800" />
          <Skeleton className="w-32 h-3 bg-zinc-800" />
        </div>
        <Skeleton className="w-64 h-12 bg-zinc-800 rounded-xl" />
        <Skeleton className="w-full max-w-md h-4 bg-zinc-800" />
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-white/5">
          <Skeleton className="h-11 w-full md:max-w-md bg-zinc-800/50 rounded-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24 bg-zinc-800/50 rounded-full" />
            <Skeleton className="h-6 w-24 bg-zinc-800/50 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-xl bg-zinc-800/50" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-20 bg-zinc-800/50" />
                  <Skeleton className="h-3 w-12 bg-zinc-800/50" />
                </div>
              </div>
              <Skeleton className="h-3 w-full bg-zinc-800/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommandsContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { installedGuildIds, isLoading, guilds } = useServerStore();

  const isInstalled = guildId ? installedGuildIds.includes(guildId) : false;
  const activeGuild = guilds.find((g) => g.id === guildId);

  // Show skeletons immediately if loading
  if (isLoading) {
    return <CommandsPageSkeleton />;
  }

  if (!guildId || !isInstalled) {
    return <BotInviteCard guildId={guildId} />;
  }

  return (
    <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Control Center"
        categoryIcon={Terminal}
        title="Command Settings"
        description="Enable or disable specific bot commands for"
        serverName={activeGuild?.name || "this server"}
      />

      <CommandList guildId={guildId} />
    </div>
  );
}

export default function CommandsPage() {
  return (
    <Suspense fallback={<CommandsPageSkeleton />}>
      <CommandsContent />
    </Suspense>
  );
}
