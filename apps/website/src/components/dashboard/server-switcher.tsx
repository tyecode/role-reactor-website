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

  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1392714201558159431";
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-linear-to-br from-blue-500 to-purple-600 text-sidebar-primary-foreground">
                {isLoading ? (
                  <Skeleton className="h-8 w-8 rounded-md bg-white/20" />
                ) : activeGuild ? (
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage
                      src={
                        activeGuild.icon
                          ? `https://cdn.discordapp.com/icons/${activeGuild.id}/${activeGuild.icon}.png`
                          : undefined
                      }
                    />
                    <AvatarFallback className="bg-transparent text-white font-bold">
                      {activeGuild.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Server className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoading ? (
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24 bg-white/10" />
                    <Skeleton className="h-2 w-16 bg-white/5" />
                  </div>
                ) : (
                  <>
                    <span className="truncate font-semibold">
                      {activeGuild?.name || "Select Server"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground italic">
                      {activeGuild
                        ? installedGuildIds.includes(activeGuild.id)
                          ? "Installed"
                          : "Not Invited"
                        : "Dashboard"}
                    </span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md bg-card/95 backdrop-blur-md border-border/50"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Your Servers
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
                  className="gap-2 p-2 focus:bg-blue-500/10 focus:text-blue-400 group cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border border-border/50 bg-zinc-800">
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
              className="gap-2 p-2 cursor-pointer focus:bg-green-500/10 focus:text-green-400 font-medium text-muted-foreground group-hover:text-green-400 transition-colors"
              onSelect={() => window.open(inviteUrl, "_blank")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border border-border bg-background">
                <Plus className="size-4" />
              </div>
              Add Server
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
