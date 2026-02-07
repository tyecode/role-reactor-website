"use client";

import { PremiumGuard } from "../premium-guard";

import { useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  CircleHelp,
  MessageCircle,
  UserCircle,
  Zap,
  HelpCircle,
  Sparkles,
  UserPlus,
  Trophy,
  BarChart,
  Signal,
  Vote,
  Gamepad2,
  Server,
  LifeBuoy,
  User,
  Split,
  Loader2,
  AlertCircle,
  Terminal,
  Lock,
  Crown,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  "8ball": CircleHelp,
  ask: MessageCircle,
  avatar: UserCircle,
  core: Zap,
  help: HelpCircle,
  imagine: Sparkles,
  invite: UserPlus,
  leaderboard: Trophy,
  level: BarChart,
  ping: Signal,
  poll: Vote,
  rps: Gamepad2,
  serverinfo: Server,
  support: LifeBuoy,
  userinfo: User,
  wyr: Split,
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

interface CommandListProps {
  guildId: string;
  title?: React.ReactNode;
  description?: string;
}

export function CommandList({ guildId, title, description }: CommandListProps) {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const { data, error, mutate, isLoading } = useSWR(
    `/api/guilds/${guildId}/settings`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const toggleCommand = async (commandName: string) => {
    if (!data || data.status !== "success") return;

    // Safety check: if not premium, don't allow toggling
    if (!data.isPremium?.pro) {
      toast.error("Pro Engine required to toggle commands.");
      return;
    }

    const currentDisabled = data.settings.disabledCommands || [];
    const isCurrentlyDisabled = currentDisabled.includes(commandName);

    let newDisabled;
    if (isCurrentlyDisabled) {
      newDisabled = currentDisabled.filter(
        (name: string) => name !== commandName
      );
    } else {
      newDisabled = [...currentDisabled, commandName];
    }

    // Optimistic update
    mutate(
      {
        ...data,
        settings: {
          ...data.settings,
          disabledCommands: newDisabled,
        },
      },
      false
    );

    try {
      const res = await fetch(`/api/guilds/${guildId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabledCommands: newDisabled }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Update failed");
      }

      mutate(); // Revalidate
    } catch (err: any) {
      console.error("Failed to update settings:", err);
      toast.error(err.message || "Failed to update command status");
      mutate(); // Revert on error
    }
  };

  const handleActivatePremium = async () => {
    if (!session?.user?.id || isActivating) return;

    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId: "pro_engine",
          userId: session.user.id,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Activation failed");

      toast.success("✨ Pro Engine unlocked!");
      mutate(); // Refresh status
    } catch (err: any) {
      console.error("Failed to activate premium:", err);
      toast.error(err.message || "Insufficient Cores or activation error");
    } finally {
      setIsActivating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {(title || description) && (
          <div>
            {title}
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/10 p-4 rounded-xl border border-white/5">
          <Skeleton className="h-10 w-full md:max-w-md rounded-lg bg-zinc-800/50" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24 bg-zinc-800/50" />
            <Skeleton className="h-4 w-24 bg-zinc-800/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-zinc-900/10 border-white/5">
              <CardHeader className="p-5 flex flex-row items-center gap-4 space-y-0">
                <Skeleton className="h-10 w-10 rounded-xl bg-zinc-800/50" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24 bg-zinc-800/50" />
                  <Skeleton className="h-3 w-16 bg-zinc-800/50" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full bg-zinc-800/50" />
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <Skeleton className="h-8 w-full bg-zinc-800/50" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || data?.status !== "success") {
    return (
      <div className="space-y-8">
        {(title || description) && (
          <div>
            {title}
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}
        <Card className="bg-zinc-900/50 border-red-500/20 backdrop-blur-xl">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">
                API Connection Offline
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                We're having trouble communicating with the Role Reactor bot
                instance. Please ensure the bot is online in your server and try
                again.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => mutate()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 shadow-lg shadow-red-500/20"
              >
                Retry Sync
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-white/10 hover:bg-white/5"
              >
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const commands = data.availableCommands || [];
  const disabledCommands = data.settings.disabledCommands || [];
  const isPremium = data.isPremium?.pro;
  const subscription = data.premiumFeatures?.pro_engine;

  const filteredCommands = commands.filter(
    (cmd: any) =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PremiumGuard
      isPremium={isPremium}
      onActivate={handleActivatePremium}
      isActivating={isActivating}
      title="ACTIVATE PRO ENGINE"
      description="Take full control of your server's slash commands. Hide what you don't need and keep your menu clean."
      features={[
        "Toggle Any Command",
        "Declutter Slash Menu",
        "Instant Updates",
        "Server Protection",
      ]}
    >
      <div className="space-y-8 relative">
        {(title || description) && (
          <div>
            {title}
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/30 p-4 rounded-xl border border-white/5">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search commands (e.g. 'avatar', '8ball')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={!isPremium}
              className="pl-10 bg-black/40 border-white/10 h-11 focus:ring-blue-500/50 transition-all rounded-lg"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground whitespace-nowrap">
            {isPremium ? (
              <>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  {commands.length - disabledCommands.length} Active
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  {disabledCommands.length} Disabled
                </span>
                {subscription?.nextDeductionDate && (
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-bold">
                    <Clock className="w-3 h-3" />
                    Renews{" "}
                    {new Date(
                      subscription.nextDeductionDate
                    ).toLocaleDateString()}
                  </span>
                )}
              </>
            ) : (
              <span className="flex items-center gap-2 text-yellow-500/80 font-bold bg-yellow-500/5 px-3 py-1 rounded-full border border-yellow-500/20">
                <Crown className="w-4 h-4" />
                Pro Engine Locked
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-700">
            {filteredCommands.map((cmd: any) => {
              const Icon = iconMap[cmd.name] || Terminal;
              const isDisabled = disabledCommands.includes(cmd.name);

              return (
                <Card
                  key={cmd.name}
                  className={cn(
                    "group relative overflow-hidden transition-all duration-300 border-white/5",
                    isDisabled
                      ? "bg-zinc-950/30 grayscale opacity-50"
                      : "bg-zinc-900/50 hover:bg-zinc-900/80 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
                  )}
                >
                  <CardHeader className="p-5 flex flex-row items-center gap-4 space-y-0">
                    <div
                      className={cn(
                        "p-2.5 rounded-xl transition-colors duration-300 shadow-inner",
                        isDisabled
                          ? "bg-zinc-800 text-zinc-500"
                          : "bg-linear-to-br from-blue-500/20 to-blue-600/5 text-blue-400 group-hover:from-blue-500/30"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-black text-white truncate group-hover:text-blue-400 transition-colors">
                          /{cmd.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                        {cmd.category}
                      </CardDescription>
                    </div>

                    <button
                      onClick={() => toggleCommand(cmd.name)}
                      className={cn(
                        "w-11 h-6 rounded-full relative transition-all duration-500 p-1 shadow-inner",
                        isDisabled
                          ? "bg-zinc-800"
                          : "bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full bg-white transition-all duration-500 shadow-sm",
                          isDisabled ? "translate-x-0" : "translate-x-5"
                        )}
                      />
                    </button>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 pt-0">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-[34px]">
                      {cmd.description}
                    </p>
                  </CardContent>

                  {!isDisabled && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {!isPremium && (
          <div className="flex items-center justify-center p-12 bg-zinc-900/10 border border-white/5 rounded-3xl mt-8">
            <div className="flex items-center gap-6 text-zinc-500 opacity-30">
              <Terminal className="w-12 h-12" />
              <Zap className="w-12 h-12" />
              <Shield className="w-12 h-12" />
              <Lock className="w-12 h-12" />
            </div>
          </div>
        )}

        {isPremium && filteredCommands.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10">
            <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-600" />
            </div>
            <h4 className="text-white font-bold mb-1">No commands found</h4>
            <p className="text-muted-foreground text-sm italic">
              Try searching for something else
            </p>
            <Button
              variant="link"
              onClick={() => setSearch("")}
              className="text-blue-500 mt-2"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </PremiumGuard>
  );
}

function Shield(props: any) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
