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
import Image from "next/image";
import { links } from "@/constants/links";

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

export function ServerSwitcher() {
  const { isMobile } = useSidebar();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { guilds, installedGuildIds, isLoading, error, fetchServers } =
    useServerStore();

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
              className="data-[state=open]:bg-white/5 data-[state=open]:text-white transition-all hover:bg-white/5 rounded-xl border border-transparent data-[state=open]:border-white/5 overflow-visible"
            >
              <div className="flex aspect-square size-9 group-data-[collapsible=icon]:size-8 items-center justify-center rounded-xl group-data-[collapsible=icon]:rounded-lg bg-zinc-800 text-white shadow-lg shadow-cyan-500/20 relative overflow-hidden group shrink-0 ring-1 ring-cyan-500/50 hover:ring-fuchsia-500/50 hover:shadow-fuchsia-500/20 transition-all duration-300">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isLoading ? (
                  <Skeleton className="h-full w-full rounded-xl bg-white/5" />
                ) : activeGuild ? (
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage
                      src={
                        activeGuild.icon
                          ? `https://cdn.discordapp.com/icons/${activeGuild.id}/${activeGuild.icon}.png`
                          : undefined
                      }
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-transparent text-zinc-400 font-bold text-base">
                      {activeGuild.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Server className="size-5 text-zinc-400" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-1 group-data-[collapsible=icon]:hidden overflow-visible">
                {isLoading ? (
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24 bg-white/10" />
                    <Skeleton className="h-2 w-16 bg-white/5" />
                  </div>
                ) : (
                  <>
                    <span className="truncate font-black text-white tracking-tight">
                      {activeGuild?.name || "Server Selection"}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 overflow-visible">
                      {activeGuild ? (
                        installedGuildIds.includes(activeGuild.id) ? (
                          <>
                            <span className="relative flex h-1.5 w-1.5 shrink-0 overflow-visible">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            </span>
                            <span className="truncate">Node Linked</span>
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                            <span className="truncate">Offline</span>
                          </>
                        )
                      ) : (
                        "Root Portal"
                      )}
                    </span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-zinc-600 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={12}
          >
            <DropdownMenuLabel className="text-[10px] text-zinc-500 font-black uppercase tracking-widest px-3 py-2">
              Neural Network Links
            </DropdownMenuLabel>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : error === "re-login" ? (
              <div className="px-3 py-4 text-center">
                <p className="text-xs text-red-300 mb-2">Permissions missing</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-[10px] w-full"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log out & Re-login
                </Button>
              </div>
            ) : error === "error" ? (
              <div className="px-2 py-3 text-xs text-red-400 text-center">
                Failed to load servers
              </div>
            ) : installedGuilds.length === 0 ? (
              <div className="px-2 py-3 text-xs text-muted-foreground text-center">
                No installed servers
              </div>
            ) : (
              installedGuilds.map((guild, index) => (
                <DropdownMenuItem
                  key={guild.id}
                  onClick={() => handleServerSelect(guild.id)}
                  className="gap-2 p-2 focus:bg-cyan-500/10 focus:text-cyan-400 group cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-md bg-zinc-800 ring-1 ring-cyan-500/50 shadow-md shadow-cyan-500/20 group-hover:ring-fuchsia-500/50 group-hover:shadow-fuchsia-500/20 transition-all duration-300 overflow-hidden">
                    {guild.icon ? (
                      <Image
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        width={24}
                        height={24}
                        className="size-full rounded-sm object-cover"
                        alt={guild.name}
                      />
                    ) : (
                      <span className="text-[10px] font-bold text-zinc-400">
                        {guild.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="truncate text-sm font-medium">
                      {guild.name}
                    </span>
                    <span className="text-[9px] text-green-500 flex items-center gap-0.5">
                      <ShieldCheck className="size-2" /> Installed
                    </span>
                  </div>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-3 p-2.5 cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-400 font-black text-[11px] text-zinc-500 uppercase tracking-widest group rounded-lg"
              onSelect={() => window.open(inviteUrl, "_blank")}
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-zinc-800 ring-1 ring-cyan-500/50 shadow-md shadow-cyan-500/20 transition-all duration-300 group-hover:ring-fuchsia-500/50 group-hover:shadow-fuchsia-500/20">
                <Plus className="size-4 text-zinc-400 group-hover:text-fuchsia-400 transition-colors" />
              </div>
              Add Server Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
