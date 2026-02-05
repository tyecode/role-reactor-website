import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Zap, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-black border border-indigo-500/20 p-8 md:p-12">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-indigo-500" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Unleash Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
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
                className="bg-white text-black hover:bg-gray-200 font-bold rounded-xl h-12 px-8"
              >
                Start Generating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard/history">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 rounded-xl h-12 px-8"
              >
                View History
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">
              Core Balance
            </CardTitle>
            <Zap className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">---</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available for generation
            </p>
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
              className="aspect-square rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center group cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
