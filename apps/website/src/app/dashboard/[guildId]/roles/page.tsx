"use client";

import { RoleBuilder } from "@/components/dashboard/roles/role-builder";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useServerStore } from "@/store/use-server-store";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function RolesPageSkeleton() {
  return (
    <div className="min-h-screen pb-20 space-y-8 animate-pulse w-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full bg-zinc-800" />
          <Skeleton className="w-32 h-3 bg-zinc-800" />
        </div>
        <Skeleton className="w-64 h-12 bg-zinc-800 rounded-xl" />
        <Skeleton className="w-full max-w-md h-4 bg-zinc-800" />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-zinc-900/40 p-5 rounded-2xl border border-white/5">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 bg-zinc-800/50 rounded-xl" />
            <Skeleton className="h-10 w-32 bg-zinc-800/50 rounded-xl" />
          </div>
          <Skeleton className="h-10 w-40 bg-blue-500/10 rounded-xl" />
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

      <Suspense fallback={<RolesPageSkeleton />}>
        <RolesContent />
      </Suspense>
    </div>
  );
}
