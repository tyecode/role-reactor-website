import { Server, TrendingUp, Shield, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function formatExecutions(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M+`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}k+`;
  return "100k+"; // Minimum display threshold
}

interface SocialProofProps {
  totalExecutions?: number;
  totalGuilds?: number;
  totalCommands?: number;
}

function formatGuilds(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k+`;
  return count.toString();
}

export function SocialProof({
  totalExecutions = 0,
  totalGuilds = 0,
  totalCommands = 0,
}: SocialProofProps) {
  const dynamicStats = [
    {
      value: totalGuilds >= 1 ? formatGuilds(totalGuilds) : "1k+",
      label: "Servers",
      description: "Growing daily",
      icon: Server,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      value:
        totalExecutions >= 1000 ? formatExecutions(totalExecutions) : "100k+",
      label: "Commands Executed",
      description: "Proven track record",
      icon: TrendingUp,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      value: "99.9%",
      label: "Uptime",
      description: "Always available",
      icon: Shield,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: `${totalCommands}+`,
      label: "Commands",
      description: "Feature rich",
      icon: Heart,
      color: "red",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-zinc-900/10 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Trusted by Thousands
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {dynamicStats.map((stat, index) => (
            <Card
              key={stat.label}
              variant="glass"
              className="group text-center transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] overflow-hidden animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 mx-auto mb-3 bg-linear-to-br ${stat.gradient} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-foreground mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-400">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
