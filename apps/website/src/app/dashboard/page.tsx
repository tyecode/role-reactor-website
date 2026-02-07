import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ImageIcon,
  Zap,
  Clock,
  TrendingUp,
  Server,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";
import { DashboardLanding } from "@/components/dashboard/dashboard-landing";

async function getUserBalance(userId: string): Promise<number | null> {
  try {
    const res = await botFetch(`${API_PREFIX}/pricing?user_id=${userId}`, {
      next: { revalidate: 60 }, // Cache for 60s
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data?.user?.currentCredits ?? 0;
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  // Parallel fetch if we add more stats later
  const balance = userId ? await getUserBalance(userId) : null;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-900/20 via-purple-900/20 to-zinc-950 border border-border/50 p-8 md:p-12">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-blue-500" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Unleash Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
              Creativity
            </span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Create stunning AI avatars, manage your server roles, and track your
            community engagement all in one place.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/dashboard/generate">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl h-12 px-8"
              >
                Start Generating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard/history">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl h-12 px-8"
              >
                View History
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DashboardLanding />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors duration-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-md font-medium text-muted-foreground">
              Core Balance
            </CardTitle>
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-black tabular-nums tracking-tight">
                {balance !== null ? balance.toLocaleString() : "---"}
              </div>
              <span className="text-sm font-medium text-yellow-500">Cores</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                Available for generation
              </p>
              <Link href="/pricing">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 text-xs text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 p-2"
                >
                  Top up <TrendingUp className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">
              Images Created
            </CardTitle>
            <ImageIcon className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime generations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">
              Server Rank
            </CardTitle>
            <Clock className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">#--</div>
            <p className="text-xs text-muted-foreground mt-1">
              Global leaderboard position
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Collections / Placeholder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Generations</h2>
          <Link
            href="/dashboard/history"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center group cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden"
            >
              {/* Decorative placeholder pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] bg-size-[16px_16px]"></div>
              <ImageIcon className="w-8 h-8 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors relative z-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
