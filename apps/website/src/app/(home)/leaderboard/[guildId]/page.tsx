import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Trophy, Lock } from "lucide-react";

import { botFetchJson, botFetch } from "@/lib/bot-fetch";
import { LeaderboardEntry } from "@/store/use-xp-store";
import { audiowide } from "@/lib/fonts";
import { cn, getDiscordImageUrl } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guildId: string }>;
}): Promise<Metadata> {
  const { guildId } = await params;
  return {
    title: `Server Leaderboard | Role Reactor`,
    description: `View the top members and XP leaderboard for this server.`,
  };
}

export default async function PublicLeaderboardPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;

  let leaderboard: LeaderboardEntry[] = [];
  let isError = false;
  let isPrivate = false;

  try {
    // We use the same endpoint the frontend uses, but via botFetch directly with the internal API key
    // We use no-store because leaderboards update frequently.
    const res = await botFetch(`/guilds/${guildId}/leaderboard?limit=100`, {
      cache: "no-store",
    });

    if (!res.ok) {
      isError = true;
      const errorData = await res.json().catch(() => ({}));
      if (errorData.hint === "PRIVATE" || errorData.error?.includes("private") || res.status === 403) {
        isPrivate = true;
      }
    } else {
      const data = await res.json();
      leaderboard =
        data.status === "success"
          ? data.data?.leaderboard || data.leaderboard
          : data.leaderboard || data;
          
      if (!Array.isArray(leaderboard)) {
         leaderboard = [];
      }
    }
  } catch (err) {
    console.error("Failed to fetch leaderboard for public page:", err);
    isError = true;
  }

  if (isPrivate) {
    return (
      <main className="container max-w-5xl mx-auto py-24 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <Lock className="w-16 h-16 text-zinc-700 mb-6" />
        <h1 className={cn("text-3xl font-black mb-4 uppercase tracking-widest text-zinc-400", audiowide.className)}>
          Private Leaderboard
        </h1>
        <p className="text-zinc-500 max-w-md">
          The administrator of this server has disabled public viewing of the leaderboard.
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container max-w-5xl mx-auto py-24 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <Trophy className="w-16 h-16 text-zinc-800 mb-6" />
        <h1 className={cn("text-3xl font-black mb-4", audiowide.className)}>
          Leaderboard Unavailable
        </h1>
        <p className="text-zinc-500 max-w-md">
          We couldn't load the leaderboard for this server. Ensure the Role Reactor bot is in the server and the XP system is enabled.
        </p>
      </main>
    );
  }

  return (
    <main className="container max-w-5xl mx-auto py-16 px-4 min-h-screen">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <Trophy className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className={cn("text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider", audiowide.className)}>
          Server Leaderboard
        </h1>
        <p className="text-zinc-400 max-w-xl text-lg">
          The most active members in the community, ranked by experience points.
        </p>
      </div>

      {/* Put your Adsense Placeholder Here */}
      <div className="w-full h-[90px] bg-zinc-900/50 border border-white/5 rounded-xl flex items-center justify-center mb-8">
        <span className="text-zinc-600 font-mono text-sm uppercase tracking-widest font-bold">Advertisement Space</span>
      </div>

      <Card variant="cyberpunk" className="w-full">
        <div className="p-0 overflow-x-auto">
          <div className="min-w-[400px]">
             {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] uppercase font-black text-zinc-500 tracking-widest border-b border-white/5 bg-white/2">
              <div className={cn("col-span-1 text-center font-black", audiowide.className)}>#</div>
              <div className={cn("col-span-6 sm:col-span-6", audiowide.className)}>Community Member</div>
              <div className={cn("hidden md:block md:col-span-3", audiowide.className)}>Level</div>
              <div className={cn("col-span-5 sm:col-span-5 md:col-span-2 text-right", audiowide.className)}>Total XP</div>
            </div>

            {/* List */}
            <div className="flex flex-col">
              {leaderboard.length === 0 ? (
                 <div className="py-24 text-center">
                   <p className="text-zinc-500 uppercase tracking-widest font-black text-sm">No members on the leaderboard yet</p>
                 </div>
              ) : leaderboard.map((entry, i) => {
                const rank = i + 1;
                const isTop3 = rank <= 3;

                return (
                  <div key={entry.userId} className={cn("grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/3 transition-all border-b border-white/5 last:border-0 relative", isTop3 && "bg-white/1")}>
                    
                    <div className="col-span-1 flex justify-center relative z-10">
                      <Badge variant={rank === 1 ? "premium" : rank <= 3 ? "outline" : "secondary"}
                        className={cn("w-7 h-7 flex items-center justify-center rounded-lg p-0 font-black text-[10px] tabular-nums",
                          rank === 2 && "text-zinc-300 border-white/20 bg-white/10",
                          rank === 3 && "text-orange-400 border-orange-500/40 bg-orange-500/20",
                          rank > 3 && "text-zinc-500 border-white/10 bg-zinc-900",
                          audiowide.className
                        )}
                      >
                        {rank}
                      </Badge>
                    </div>

                    <div className="col-span-6 sm:col-span-6 flex items-center gap-4 relative z-10">
                       <Avatar className="h-10 w-10 shrink-0 border border-white/10 bg-zinc-900">
                         <AvatarImage src={getDiscordImageUrl("avatars", entry.userId, entry.user.avatar, 64) || undefined} />
                         <AvatarFallback className="text-[10px] uppercase font-black">{entry.user.username.slice(0, 2)}</AvatarFallback>
                       </Avatar>
                       <div className="truncate flex flex-col">
                         <span className={cn("font-black text-sm uppercase truncate", isTop3 ? "text-cyan-400" : "text-zinc-300", audiowide.className)}>
                           {entry.user.username}
                         </span>
                         {entry.rankInfo && (
                           <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest truncate mt-0.5">
                              {entry.rankInfo.emoji} {entry.rankInfo.title}
                           </span>
                         )}
                       </div>
                    </div>

                    <div className="hidden md:flex md:col-span-3 items-center relative z-10 text-xs font-black text-zinc-400 uppercase tracking-widest">
                       Level {entry.level}
                    </div>

                    <div className={cn("col-span-5 sm:col-span-5 md:col-span-2 text-right font-black tabular-nums tracking-widest relative z-10", isTop3 ? "text-cyan-400 text-sm" : "text-zinc-500 text-xs", audiowide.className)}>
                      {entry.totalXP.toLocaleString()} XP
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
