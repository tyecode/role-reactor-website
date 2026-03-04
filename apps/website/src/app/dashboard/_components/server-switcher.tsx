"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  Plus,
  ShieldCheck,
  Loader2,
  Server,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";
import { links } from "@/constants/links";

import { cn, getDiscordImageUrl } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useServerStore } from "@/store/use-server-store";

import { audiowide } from "@/lib/fonts";

export function ServerSwitcher() {
  const { isMobile } = useSidebar();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const {
    guilds,
    installedGuildIds,
    isLoading,
    isFetching,
    error,
    fetchServers,
  } = useServerStore();

  // Priority: Path param -> Search param (No historical fallback on global route)
  const activeGuildId = (params.guildId as string) || searchParams.get("guild");

  const installedGuilds = guilds.filter((g) =>
    installedGuildIds.includes(g.id)
  );

  React.useEffect(() => {
    if (status === "authenticated") {
      fetchServers();
    }
  }, [status, fetchServers]);

  const activeGuild = guilds.find((g) => g.id === activeGuildId);

  const handleServerSelect = (guildId: string) => {
    // If we are already in a guild-specific route (e.g., /dashboard/[guildId]/xp)
    // we want to swap the guildId segment
    if (params.guildId) {
      const newPathname = pathname.replace(params.guildId as string, guildId);
      router.push(newPathname);
    } else {
      // If we are on a global dashboard page, navigate to that guild's overview
      router.push(`/dashboard/${guildId}`);
    }
  };

  const inviteUrl = links.inviteBot;

  return (
    <SidebarMenu className="group-data-[collapsible=icon]:items-center">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-white/5 data-[state=open]:text-white transition-all hover:bg-white/5 rounded-lg border border-transparent data-[state=open]:border-white/5 overflow-visible h-14"
            >
              <div className="flex aspect-square size-10 group-data-[collapsible=icon]:size-9 items-center justify-center rounded-lg group-data-[collapsible=icon]:rounded-md bg-zinc-900 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden group shrink-0 ring-1 ring-white/10 group-hover:ring-cyan-500/50 group-data-[state=open]:ring-cyan-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isLoading ? (
                  <Skeleton className="h-full w-full rounded-lg bg-white/5" />
                ) : activeGuild ? (
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage
                      src={
                        getDiscordImageUrl(
                          "icons",
                          activeGuild.id,
                          activeGuild.icon,
                          64
                        ) || undefined
                      }
                      alt={activeGuild.name}
                      width={40}
                      height={40}
                    />
                    <AvatarFallback className="bg-transparent text-zinc-400 font-bold text-base">
                      {activeGuild.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Server className="size-5 text-zinc-500" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:hidden overflow-visible">
                {isLoading ? (
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24 bg-white/10" />
                    <Skeleton className="h-2 w-16 bg-white/5" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate font-bold text-white tracking-tight text-[15px] flex-1">
                        {activeGuild?.name || "Select Node"}
                      </span>
                      {isFetching && (
                        <span className="flex items-center gap-1 shrink-0">
                          <span className="size-1 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
                            SYNCING
                          </span>
                        </span>
                      )}
                      {!isFetching && error === "error" && (
                        <span className="flex items-center gap-1 shrink-0">
                          <span className="size-1 rounded-full bg-red-500" />
                          <span className="text-[7px] text-red-500 font-bold uppercase tracking-widest">
                            SYNC_FAILED
                          </span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5 overflow-visible">
                      {isFetching && guilds.length === 0 ? (
                        <span className="animate-pulse">
                          SCANNING SECTOR...
                        </span>
                      ) : activeGuild ? (
                        installedGuildIds.includes(activeGuild.id) ? (
                          <>
                            <span className="relative flex h-1.5 w-1.5 shrink-0 overflow-visible">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            </span>
                            <span className="truncate text-emerald-500/80 font-bold uppercase tracking-widest text-[9px]">
                              Uplink Stable
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-900/50 shrink-0 border border-red-500/30" />
                            <span className="truncate text-red-500/60">
                              NODE UNREACHABLE
                            </span>
                          </>
                        )
                      ) : (
                        "ROOT ACCESS GRANTED"
                      )}
                    </span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-zinc-600 group-data-[collapsible=icon]:hidden opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-72 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/10 p-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={12}
          >
            <DropdownMenuLabel
              className={cn(
                "text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] px-3 py-3 opacity-70",
                audiowide.className
              )}
            >
              ACTIVE NODES
            </DropdownMenuLabel>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-5 animate-spin text-cyan-500/50" />
              </div>
            ) : error === "re-login" ? (
              <div className="px-3 py-4 text-center">
                <p className="text-xs text-red-300 mb-3 font-bold uppercase tracking-wider">
                  Access Denied
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-[10px] w-full font-black uppercase tracking-widest border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  RE-AUTHORIZE TERMINAL
                </Button>
              </div>
            ) : error === "error" && guilds.length === 0 ? (
              <div className="px-2 py-6 text-[10px] text-red-400 text-center font-bold uppercase tracking-widest">
                LINK_FAILURE: DATA_SYNC_ERROR
              </div>
            ) : guilds.length === 0 ? (
              <div className="px-2 py-6 text-[10px] text-zinc-600 text-center font-bold uppercase tracking-widest">
                NO_ACTIVE_NODES_FOUND
              </div>
            ) : (
              <div className="space-y-1">
                {installedGuilds.map((guild, index) => {
                  const isActive = guild.id === activeGuildId;
                  return (
                    <DropdownMenuItem
                      key={guild.id}
                      onClick={() => handleServerSelect(guild.id)}
                      className={cn(
                        "gap-3 p-2.5 focus:bg-cyan-500/10 focus:text-cyan-400 group cursor-pointer rounded-lg transition-all duration-300",
                        isActive &&
                          "bg-cyan-500/5 border border-cyan-500/20 shadow-[0_0_15px_-5px_rgba(6,182,212,0.2)]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-9 items-center justify-center rounded-md bg-zinc-900 ring-1 shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:ring-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 overflow-hidden relative",
                          isActive
                            ? "ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                            : "ring-white/10"
                        )}
                      >
                        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Avatar className="size-full rounded-none">
                          <AvatarImage
                            src={
                              getDiscordImageUrl(
                                "icons",
                                guild.id,
                                guild.icon,
                                64
                              ) || undefined
                            }
                            width={36}
                            height={36}
                            alt={guild.name}
                          />
                          <AvatarFallback className="bg-transparent text-xs font-black text-zinc-500 group-hover:text-cyan-400 transition-colors">
                            {guild.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                        <span
                          className={cn(
                            "truncate text-sm font-bold tracking-tight group-hover:text-cyan-300 transition-colors",
                            isActive ? "text-cyan-300" : "text-white"
                          )}
                        >
                          {guild.name}
                        </span>
                        <span className="text-[9px] text-emerald-500/70 font-bold uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck className="size-2.5" /> Link Active
                        </span>
                      </div>
                      <DropdownMenuShortcut
                        className={cn(
                          "font-mono text-[10px] group-hover:text-cyan-500/50 transition-colors shrink-0",
                          isActive ? "text-cyan-500/50" : "text-zinc-600"
                        )}
                      >
                        [0{index + 1}]
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            )}
            <DropdownMenuSeparator className="bg-white/5 my-2" />
            <DropdownMenuItem
              className="gap-3 p-2.5 cursor-pointer focus:bg-fuchsia-500/10 focus:text-fuchsia-400 group rounded-lg transition-all duration-300"
              onSelect={() => window.open(inviteUrl, "_blank")}
            >
              <div className="flex size-9 items-center justify-center rounded-md bg-zinc-900 ring-1 ring-white/10 shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:ring-fuchsia-500/50 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.2)] transition-all duration-300">
                <Plus className="size-4 text-zinc-500 group-hover:text-fuchsia-400 transition-all duration-300 group-hover:scale-110" />
              </div>
              <span
                className={cn(
                  "text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] group-hover:text-fuchsia-300 transition-colors",
                  audiowide.className
                )}
              >
                ESTABLISH NEW LINK
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
