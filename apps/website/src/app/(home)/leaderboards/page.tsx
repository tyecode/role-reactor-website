import Link from "next/link";
import { Audiowide } from "next/font/google";
import { Trophy, Users, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BubbleBackground } from "@/components/common/bubble-background";
import { Badge } from "@/components/ui/badge";
import { botFetchJson } from "@/lib/bot-fetch";
import { cn } from "@/lib/utils";

import { ServerSearch } from "@/app/(home)/_components/server-search";
import { AdBlock } from "@/components/adsense/ad-block";

export const metadata = {
  title: "Top Communities | Role Reactor",
  description: "Discover the largest and most active Discord communities using the Role Reactor XP system.",
};

interface GuildResult {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
}

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default async function LeaderboardsPage() {
  let guilds: GuildResult[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await botFetchJson<any>("/guilds/public-leaderboards", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (data?.guilds) {
      guilds = data.guilds;
    }
  } catch (error) {
    console.error("Failed to fetch top leaderboards", error);
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center py-24 px-4 overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950 pointer-events-none" />
        <BubbleBackground
          interactive={false}
          className="absolute inset-0 opacity-20"
          transition={{ stiffness: 50, damping: 30 }}
          colors={{
            first: "139, 92, 246",
            second: "236, 72, 153",
            third: "168, 85, 247",
            fourth: "99, 102, 241",
            fifth: "59, 130, 246",
            sixth: "124, 58, 237",
          }}
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-fd-container mx-auto mt-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6 max-w-2xl mx-auto relative z-10">
          <Badge
            variant="secondary"
            className="bg-zinc-800/80 text-zinc-300 border-zinc-700/50 gap-2 mb-4 px-5 py-2 hover:bg-zinc-800 backdrop-blur-md"
          >
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium tracking-wide">TOP COMMUNITIES</span>
          </Badge>
          
          <h1
            className={cn(
              "text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]",
              audiowide.className
            )}
          >
            XP{" "}
            <span className="bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Leaderboards
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-4">
            Discover the largest and most active Discord communities using the
            Role Reactor XP system to engage their members.
          </p>
          
          <div className="pt-8">
            <ServerSearch />
          </div>

          <AdBlock slot="leaderboards_list_top" className="mt-8" />
        </div>

        {/* Guild Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8 relative z-10 w-full max-w-fd-container mx-auto">
          {guilds.length > 0 ? (
            guilds.map((guild) => (
              <Link href={`/leaderboard/${guild.id}`} key={guild.id} className="block group">
                <div
                  className="flex items-center p-4 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md hover:bg-zinc-900/80 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 gap-4 overflow-hidden relative"
                >
                  {/* Subtle Spotlights */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-zinc-950/80 pointer-events-none rounded-2xl" />

                  {/* Avatar */}
                  <Avatar className="h-14 w-14 rounded-xl ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all duration-300 shadow-md relative z-10 shrink-0 bg-zinc-900">
                    <AvatarImage
                      src={guild.icon || ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-zinc-900 text-zinc-400 text-sm font-bold rounded-xl uppercase">
                      {guild.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex flex-col relative z-10 min-w-0">
                    <h3
                      className={cn(
                        "text-white text-base font-bold truncate group-hover:text-emerald-300 transition-colors leading-snug",
                      )}
                      title={guild.name}
                    >
                      {guild.name}
                    </h3>
                    
                    <div className="mt-1">
                       <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-medium whitespace-nowrap">
                        <Users className="w-3.5 h-3.5 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
                        {guild.memberCount.toLocaleString()} MEMBERS
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-24 text-center text-zinc-500 font-medium bg-zinc-950/40 backdrop-blur-sm rounded-4xl border border-white/5 flex flex-col items-center justify-center gap-6">
              <div className="w-20 h-20 bg-zinc-900/80 rounded-full flex items-center justify-center border border-white/5">
                <ShieldCheck className="w-10 h-10 text-emerald-500/30" />
              </div>
              <div className="space-y-2">
                <p className="text-xl text-zinc-300">No public leaderboards found yet</p>
                <p className="text-sm text-zinc-500 font-normal">Enable the XP system in your server to appear here!</p>
              </div>
            </div>
          )}
        </div>
        
        <AdBlock slot="leaderboards_list_bottom" className="mt-8" />
      </div>
    </main>
  );
}
