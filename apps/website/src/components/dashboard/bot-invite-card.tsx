"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Trophy } from "lucide-react";

interface BotInviteCardProps {
  guildId: string;
}

export function BotInviteCard({ guildId }: BotInviteCardProps) {
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&integration_type=0&scope=bot+applications.commands&guild_id=${guildId}&disable_guild_select=true`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center animate-in fade-in duration-700">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
        <Avatar className="w-24 h-24 rounded-3xl border-2 border-white/10 shadow-2xl relative z-10">
          <AvatarFallback className="rounded-3xl text-3xl font-bold bg-zinc-900 text-zinc-500">
            ??
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full border-4 border-black z-20">
          <Trophy className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Bot Not Connected
        </h1>
        <p className="text-zinc-400 font-medium">
          Role Reactor is not in this server yet. Invite the bot to access the
          dashboard, manage roles, and track XP.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-9 px-5 border-white/10 font-bold rounded-lg"
        >
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="h-9 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 rounded-lg"
        >
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Server
          </a>
        </Button>
      </div>
    </div>
  );
}
