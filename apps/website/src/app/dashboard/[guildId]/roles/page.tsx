"use client";

import { RoleBuilder } from "@/components/dashboard/roles/role-builder";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { useServerStore } from "@/store/use-server-store";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function RolesContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { installedGuildIds, isLoading } = useServerStore();

  const isInstalled = guildId ? installedGuildIds.includes(guildId) : false;

  if ((!guildId || !isInstalled) && !isLoading) {
    return <BotInviteCard guildId={guildId} />;
  }

  return <RoleBuilder />;
}

export default function RolesPage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  return (
    <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 min-w-0">
        <div className="space-y-2 min-w-0 flex-1">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest shrink-0">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
            Interactive Roles
          </div>
          <h1
            className={cn(
              "text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight flex flex-wrap items-center gap-2 sm:gap-3",
              audiowide.className
            )}
          >
            <span className="shrink-0">Reaction Roles</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-zinc-400 font-medium">
            <p className="max-w-xl leading-relaxed text-[11px] sm:text-xs md:text-sm">
              Create and manage interactive role assignments for{" "}
              <span className="text-white font-bold inline-block">
                {activeGuild?.name || "this server"}
              </span>
              .
            </p>
          </div>
        </div>
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
