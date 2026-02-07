"use client";

import { CommandList } from "@/components/dashboard/commands/command-list";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Loader2, Terminal } from "lucide-react";
import { useServerStore } from "@/store/use-server-store";

function CommandsContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { installedGuildIds, isLoading } = useServerStore();

  const isInstalled = guildId ? installedGuildIds.includes(guildId) : false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!guildId || !isInstalled) {
    return <BotInviteCard guildId={guildId} />;
  }

  return (
    <CommandList
      guildId={guildId}
      title={
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Terminal className="w-8 h-8 text-blue-500" />
          Command Settings
        </h1>
      }
      description="Enable or disable specific bot commands for this server."
    />
  );
}

export default function CommandsPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <CommandsContent />
      </Suspense>
    </div>
  );
}
