"use client";

import { useServerStore } from "@/store/use-server-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Server,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export function DashboardLanding() {
  const { guilds, installedGuildIds, isLoading, error } = useServerStore();

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

  // Case 1: No servers found at all
  if (guilds.length === 0 && !isLoading) {
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
                No Servers Found
              </h2>
              <p className="text-zinc-400 max-w-lg">
                Role Reactor needs to be in a server where you have{" "}
                <span className="text-white font-medium">Manage Server</span>{" "}
                permissions to show up here.
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

  // Case 2: Servers found but bot not installed in any (Onboarding)
  const installedCount = installedGuildIds.length;
  if (installedCount === 0 && guilds.length > 0 && !isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-primary" /> Finish Setup
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.slice(0, 3).map((guild) => (
            <Card
              key={guild.id}
              className="bg-zinc-900/50 border-white/5 hover:border-primary/30 transition-all group"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {guild.icon ? (
                    <img
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                      alt={guild.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold">
                      {guild.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-sm truncate">
                    {guild.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full rounded-xl bg-zinc-800 hover:bg-primary transition-colors h-10 gap-2"
                >
                  <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                    Setup Bot <ArrowRight size={14} />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
          {guilds.length > 3 && (
            <div className="flex items-center justify-center text-muted-foreground text-sm font-medium p-6 border border-dashed border-white/5 rounded-2xl">
              +{guilds.length - 3} more servers
            </div>
          )}
        </div>
      </div>
    );
  }

  return null; // Don't show anything if servers are fine (redirect logic handles it)
}
