import { Heart, Shield, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    value: "Free",
    label: "No Cost",
    description: "Completely free",
    icon: Heart,
    color: "red",
    gradient: "from-red-500 to-pink-500",
  },
  {
    value: "Simple",
    label: "Easy Setup",
    description: "Quick to configure",
    icon: TrendingUp,
    color: "green",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    value: "Reliable",
    label: "Stable",
    description: "Works consistently",
    icon: Shield,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    value: "Powerful",
    label: "Advanced Features",
    description: "Comprehensive tools",
    icon: Zap,
    color: "yellow",
    gradient: "from-yellow-500 to-orange-500",
  },
];

interface SocialProofProps {
  totalExecutions?: number;
}

export function SocialProof({ totalExecutions = 0 }: SocialProofProps) {
  // Update the Free stat to show dynamic command executions
  const dynamicStats = [
    {
      value:
        totalExecutions > 0
          ? `${(totalExecutions / 1000).toFixed(1)}k+`
          : "100k+",
      label: "Commands Executed",
      description: "Proven track record",
      icon: TrendingUp,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
    },
    ...stats.filter((s) => s.label !== "No Cost" && s.label !== "Easy Setup"),
    {
      value: "99.9%",
      label: "Uptime",
      description: "Always available",
      icon: Shield,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-zinc-900/10 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800/80 border-zinc-700/50 gap-2"
          >
            <Heart className="w-3 h-3" />
            <span>Simple & Reliable</span>
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Why Choose Role Reactor Bot
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive Discord bot for role management with advanced
            features. Easy to use with powerful automation capabilities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {dynamicStats.map((stat, index) => (
            <Card
              key={stat.label}
              className="group text-center bg-zinc-900/40 backdrop-blur-sm border-zinc-800/60 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-foreground mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <Card className="bg-gradient-to-r from-zinc-900/40 to-zinc-800/10 border-zinc-800/60">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Perfect for Your Server
              </h3>
              <p className="text-sm text-muted-foreground">
                Works for Discord servers of any size. Comprehensive features
                that are easy to manage.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {[
                { label: "Easy Setup", icon: Shield },
                { label: "Always Reliable", icon: TrendingUp },
                { label: "Free Forever", icon: Zap },
                { label: "Community Focused", icon: Heart },
              ].map((item) => (
                <div key={item.label} className="text-center group">
                  <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
