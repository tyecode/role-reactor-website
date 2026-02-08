import { CommandList } from "@/components/dashboard/commands/command-list";
import { BotInviteCard } from "@/components/dashboard/bot-invite-card";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Loader2, Terminal } from "lucide-react";
import { useServerStore } from "@/store/use-server-store";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

function CommandsContent() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { installedGuildIds, isLoading, guilds } = useServerStore();

  const isInstalled = guildId ? installedGuildIds.includes(guildId) : false;
  const activeGuild = guilds.find((g) => g.id === guildId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!guildId || !isInstalled) {
    return <BotInviteCard guildId={guildId} />;
  }

  return (
    <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      {/* Page Header shadow-matched to XP */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 min-w-0">
        <div className="space-y-2 min-w-0 flex-1">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest shrink-0">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
            Control Center
          </div>
          <h1
            className={cn(
              "text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight flex flex-wrap items-center gap-2 sm:gap-3",
              audiowide.className
            )}
          >
            <span className="shrink-0">Command Settings</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-zinc-400 font-medium">
            <p className="max-w-xl leading-relaxed text-[11px] sm:text-xs md:text-sm">
              Enable or disable specific bot commands for{" "}
              <span className="text-white font-bold inline-block">
                {activeGuild?.name || "this server"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      <CommandList guildId={guildId} />
    </div>
  );
}

export default function CommandsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <CommandsContent />
    </Suspense>
  );
}
