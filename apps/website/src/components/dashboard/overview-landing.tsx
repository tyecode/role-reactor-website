"use client";

import { useServerStore } from "@/store/use-server-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Plus, ArrowRight, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export function OverviewLanding() {
  const { guilds, installedGuildIds, isLoading } = useServerStore();

  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1392714201558159431";
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

  if (isLoading && guilds.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  const installedGuilds = guilds.filter((g) =>
    installedGuildIds.includes(g.id)
  );

  // Case 1: No installed servers found
  if (installedGuilds.length === 0 && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="bg-linear-to-br from-blue-500/10 via-purple-500/5 to-zinc-950/50 border-white/5 overflow-hidden">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Info size={14} /> Getting Started
              </div>
              <h2 className="text-3xl font-black text-white">
                Finish Bot Setup
              </h2>
              <p className="text-zinc-400 max-w-lg">
                Role Reactor needs to be invited to your server to show up here.
                Once added, you can manage roles, track activity, and more.
              </p>
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl h-12 px-8 font-bold gap-2"
                >
                  <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                    <Plus size={18} /> Add Bot to Server
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="rounded-xl h-12 px-8"
                >
                  <Link href="/docs">View Setup Guide</Link>
                </Button>
              </div>
            </div>
            <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
              <Server size={120} className="text-zinc-800 relative z-10" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Case 2: Servers found and bot is installed (Show ONLY installed servers)
  return (
    <div className="space-y-8">
      {/* Installed Servers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Server className="text-blue-400" /> Your Servers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {installedGuilds.map((guild) => (
            <Link key={guild.id} href={`/dashboard/${guild.id}`}>
              <Card className="bg-zinc-900/40 border-white/5 hover:border-blue-500/30 hover:bg-zinc-800/40 transition-all group h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/5 group-hover:border-blue-500/20 transition-colors">
                    {guild.icon ? (
                      <Image
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        alt={guild.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-zinc-500 group-hover:text-zinc-300">
                        {guild.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base truncate group-hover:text-blue-400 transition-colors">
                      {guild.name}
                    </CardTitle>
                    <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-blue-500 transition-colors -ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
