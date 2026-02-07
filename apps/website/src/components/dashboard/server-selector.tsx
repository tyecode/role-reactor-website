"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, Plus, ExternalLink, Loader2, Server } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

interface GuildStatus {
  id: string;
  isInstalled: boolean;
}

export function ServerSelector() {
  const { data: session, status } = useSession();
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [installedGuildIds, setInstalledGuildIds] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServerData() {
      if (status !== "authenticated") {
        if (status === "unauthenticated") setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 1. Fetch user guilds from our server-side proxy
        // This avoids CORS issues and handles token management server-side
        const discordRes = await fetch("/api/discord/guilds");

        if (!discordRes.ok) {
          if (discordRes.status === 401) {
            setError(
              "Session expired or permissions missing. Please logout and login again."
            );
            return;
          }
          throw new Error("Failed to fetch guilds from Discord");
        }

        const allGuilds: DiscordGuild[] = await discordRes.json();

        // Filter for guilds where user has MANAGE_GUILD (0x20) or ADMINISTRATOR (0x8) permissions
        const manageableGuilds = allGuilds.filter((guild) => {
          const perms = BigInt(guild.permissions);
          return (
            (perms & BigInt(0x20)) === BigInt(0x20) ||
            (perms & BigInt(0x8)) === BigInt(0x8)
          );
        });

        setGuilds(manageableGuilds);

        // 2. Check which guilds have the bot installed via our Bot API
        if (manageableGuilds.length > 0) {
          const botRes = await fetch("/api/guilds/check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              guildIds: manageableGuilds.map((g) => g.id),
            }),
          });

          if (botRes.ok) {
            const botData = await botRes.json();
            if (botData.success && botData.data.installedGuilds) {
              setInstalledGuildIds(new Set(botData.data.installedGuilds));
            }
          }
        }
      } catch (err) {
        console.error("Error loading server selector:", err);
        setError("Failed to load servers. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchServerData();
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-card/40 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-500/5 border border-red-500/10 rounded-2xl">
        <p className="text-red-400 text-sm">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (guilds.length === 0) {
    return (
      <div className="p-12 text-center bg-zinc-900/30 border border-white/5 rounded-3xl">
        <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-500">
          <Server className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          No Manageable Servers Found
        </h3>
        <p className="text-zinc-400 max-w-sm mx-auto mb-6 text-sm">
          You need "Manage Server" or "Administrator" permissions to add Role
          Reactor to a server.
        </p>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 font-bold px-8"
        >
          <Link href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands">
            Invite to New Server
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {guilds.map((guild) => {
        const isInstalled = installedGuildIds.has(guild.id);
        const inviteUrl = `https://discord.com/oauth2/authorize?client_id=1138404847231463424&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}&disable_guild_select=true`;

        return (
          <Card
            key={guild.id}
            className="group bg-zinc-900/40 border-white/5 hover:border-blue-500/50 hover:bg-zinc-900/60 transition-all duration-300 backdrop-blur-sm"
          >
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-xl border border-white/5 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <AvatarImage
                  src={
                    guild.icon
                      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                      : undefined
                  }
                />
                <AvatarFallback className="bg-zinc-800 text-zinc-400 font-bold rounded-xl">
                  {guild.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white truncate text-sm mb-1">
                  {guild.name}
                </h3>
                <div className="flex items-center gap-2">
                  {isInstalled ? (
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-black text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-2.5 h-2.5" /> Installed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-black text-zinc-500 bg-zinc-500/10 px-1.5 py-0.5 rounded">
                      Not Invited
                    </span>
                  )}
                </div>
              </div>

              {isInstalled ? (
                <Link href={`/dashboard/roles?guild=${guild.id}`}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-lg hover:bg-blue-500/10 hover:text-blue-400"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-lg hover:bg-green-500/10 hover:text-green-400"
                  asChild
                >
                  <Link href={inviteUrl} target="_blank">
                    <Plus className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
