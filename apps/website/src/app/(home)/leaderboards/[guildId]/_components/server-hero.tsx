import { cn, getDiscordImageUrl } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { Users, Trophy, ExternalLink, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "./share-button";

interface ServerInfo {
  name?: string;
  icon?: string | null;
  banner?: string | null;
  splash?: string | null;
  description?: string | null;
  memberCount?: number;
  onlineCount?: number;
  inviteUrl?: string | null;
  vanityUrl?: string | null;
}

interface ServerHeroProps {
  guildId: string;
  serverName: string;
  serverInfo: ServerInfo;
  isPremium: boolean;
  leaderboardCount: number;
  inviteLink: string | null;
  pageUrl: string;
}

export function ServerHero({
  guildId,
  serverName,
  serverInfo,
  isPremium,
  leaderboardCount,
  inviteLink,
  pageUrl,
}: ServerHeroProps) {
  return (
    <div className="mb-10">
      {/* Banner */}
      {serverInfo.banner && (
        <div className="relative w-full h-40 md:h-52 rounded-2xl overflow-hidden mb-6 border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              getDiscordImageUrl("banners", guildId, serverInfo.banner, 1024) ||
              undefined
            }
            alt={`${serverName} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Server Avatar */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl" />
          <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-2xl ring-2 ring-white/10 relative z-10 bg-zinc-900">
            <AvatarImage
              src={
                serverInfo.icon
                  ? getDiscordImageUrl(
                      "icons",
                      guildId,
                      serverInfo.icon,
                      256
                    ) || undefined
                  : undefined
              }
              alt={serverName}
              className="object-cover"
            />
            <AvatarFallback className="bg-zinc-900 text-zinc-400 text-2xl font-bold rounded-2xl uppercase">
              {serverName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Server Info */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center justify-start gap-3 mb-2">
            <h1
              className={cn(
                "text-3xl md:text-4xl font-black uppercase tracking-wider truncate",
                audiowide.className
              )}
            >
              {serverName}
            </h1>
            {isPremium && (
              <Badge variant="pro" className="shrink-0">
                <Zap className="w-3 h-3" />
                PRO
              </Badge>
            )}
          </div>

          {serverInfo.description && (
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-3 line-clamp-2">
              {serverInfo.description}
            </p>
          )}

          <div className="flex items-center justify-start gap-4 text-xs text-zinc-500 font-medium">
            {serverInfo.memberCount !== undefined && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400/70" />
                {(serverInfo.memberCount || 0).toLocaleString()} members
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-cyan-400/70" />
              {leaderboardCount} ranked
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <ShareButton url={pageUrl} serverName={serverName} />
          {inviteLink && (
            <a
              href={inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              <ExternalLink className="w-4 h-4" />
              Join Server
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
