import { cn, getDiscordImageUrl } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LeaderboardEntry } from "@/store/use-xp-store";

interface LeaderboardTableProps {
  leaderboard: LeaderboardEntry[];
}

export function LeaderboardTable({ leaderboard }: LeaderboardTableProps) {
  return (
    <Card variant="cyberpunk" className="w-full">
      <div className="p-0 overflow-x-auto">
        <div className="min-w-[400px]">
          <TableHeader />
          <div className="flex flex-col max-h-[800px] overflow-y-auto custom-scrollbar">
            {leaderboard.length === 0 ? (
              <EmptyState />
            ) : (
              leaderboard.map((entry, i) => (
                <LeaderboardRow key={entry.userId} entry={entry} rank={i + 1} />
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function TableHeader() {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] uppercase font-black text-zinc-500 tracking-widest border-b border-white/5 bg-white/2">
      <div
        className={cn("col-span-1 text-center font-black", audiowide.className)}
      >
        #
      </div>
      <div className={cn("col-span-6 sm:col-span-6", audiowide.className)}>
        Community Member
      </div>
      <div className={cn("hidden md:block md:col-span-3", audiowide.className)}>
        Level
      </div>
      <div
        className={cn(
          "col-span-5 sm:col-span-5 md:col-span-2 text-right",
          audiowide.className
        )}
      >
        Total XP
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="text-zinc-500 uppercase tracking-widest font-black text-sm">
        No members on the leaderboard yet
      </p>
    </div>
  );
}

function LeaderboardRow({
  entry,
  rank,
}: {
  entry: LeaderboardEntry;
  rank: number;
}) {
  const isTop3 = rank <= 3;

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/3 transition-all border-b border-white/5 last:border-0 relative group",
        isTop3 && "bg-white/1"
      )}
    >
      {/* Rank Badge */}
      <div className="col-span-1 flex justify-center relative z-10">
        <Badge
          variant={rank === 1 ? "premium" : rank <= 3 ? "outline" : "secondary"}
          className={cn(
            "w-7 h-7 flex items-center justify-center rounded-lg p-0 font-black text-[10px] tabular-nums",
            rank === 2 && "text-zinc-300 border-white/20 bg-white/10",
            rank === 3 &&
              "text-orange-400 border-orange-500/40 bg-orange-500/20",
            rank > 3 && "text-zinc-500 border-white/10 bg-zinc-900",
            audiowide.className
          )}
        >
          {rank}
        </Badge>
      </div>

      {/* User Info */}
      <div className="col-span-6 sm:col-span-6 flex items-center gap-4 relative z-10">
        <div className="relative shrink-0">
          {isTop3 && (
            <div
              className={cn(
                "absolute inset-0 blur-md rounded-lg opacity-20",
                rank === 1
                  ? "bg-amber-500"
                  : rank === 2
                    ? "bg-zinc-300"
                    : "bg-orange-500"
              )}
            />
          )}
          <Avatar
            className={cn(
              "h-10 w-10 shrink-0 transition-all duration-300 group-hover:border-white/20 relative z-10",
              isTop3 ? "border-2 border-white/20" : "border border-white/10"
            )}
          >
            <AvatarImage
              src={
                getDiscordImageUrl(
                  "avatars",
                  entry.userId,
                  entry.user.avatar,
                  64
                ) || undefined
              }
              alt={entry.user.username}
            />
            <AvatarFallback className="text-[10px] uppercase font-black bg-zinc-900">
              {entry.user.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="truncate flex flex-col">
          <span
            className={cn(
              "font-black text-sm uppercase truncate transition-colors",
              isTop3 ? "text-cyan-400" : "text-zinc-400 group-hover:text-white",
              audiowide.className
            )}
          >
            {entry.user.username}
          </span>
          {entry.rankInfo && (
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest truncate mt-0.5">
              {entry.rankInfo.emoji} {entry.rankInfo.title}
            </span>
          )}
        </div>
      </div>

      {/* Level */}
      <div className="hidden md:flex md:col-span-3 items-center relative z-10 text-xs font-black text-zinc-400 uppercase tracking-widest">
        Level {entry.level}
      </div>

      {/* XP */}
      <div
        className={cn(
          "col-span-5 sm:col-span-5 md:col-span-2 text-right font-black tabular-nums tracking-widest relative z-10 transition-colors",
          isTop3
            ? "text-cyan-400 text-sm"
            : "text-zinc-500 text-xs group-hover:text-white",
          audiowide.className
        )}
      >
        {entry.totalXP.toLocaleString()}
      </div>

      {/* Hover accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-cyan-500 group-hover:h-1/2 transition-all duration-300 rounded-r-full shadow-[0_0_15px_#06b6d4]" />
    </div>
  );
}
