"use client";

import { RoleBuilder } from "@/components/dashboard/roles/role-builder";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useServerStore } from "@/store/use-server-store";

function RolesContent() {
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

  return <RoleBuilder />;
}

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
          Reaction Roles
        </h1>
        <p className="text-muted-foreground mt-1">
          Create and manage interactive role assignments for your community.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <RolesContent />
      </Suspense>
    </div>
  );
}
