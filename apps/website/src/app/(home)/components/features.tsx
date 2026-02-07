import {
  Zap,
  Target,
  Clock,
  Users,
  Settings,
  Bot,
  CheckCircle,
  MessageSquare,
  Image,
  Mic,
  Brain,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Zap,
    title: "Self-Assignable Roles",
    description:
      "Users can assign/remove roles by reacting to messages. Organize roles into categories for better management.",
    gradient: "from-blue-500 to-cyan-500",
    stats: "Easy setup",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Temporary Roles",
    description:
      "Auto-expire roles after a set time with smart notifications. Perfect for events and temporary access.",
    gradient: "from-purple-500 to-pink-500",
    stats: "Auto-expire",
    color: "purple",
  },
  {
    icon: Target,
    title: "Scheduled Roles",
    description:
      "Schedule future role assignments with simple time formats. Supports one-time and recurring schedules.",
    gradient: "from-emerald-500 to-teal-500",
    stats: "Time scheduling",
    color: "emerald",
  },
  {
    icon: Users,
    title: "Welcome System",
    description:
      "Auto-welcome new members with customizable messages and automatic role assignment.",
    gradient: "from-orange-500 to-red-500",
    stats: "Auto-welcome",
    color: "orange",
  },
  {
    icon: MessageSquare,
    title: "Goodbye System",
    description:
      "Auto-goodbye messages when members leave with customizable placeholders and embed support.",
    gradient: "from-amber-500 to-yellow-500",
    stats: "Auto-goodbye",
    color: "amber",
  },
  {
    icon: Mic,
    title: "Voice Permissions",
    description:
      "Automatically enforces Connect/Speak restrictions for all role assignments with smart voice management.",
    gradient: "from-violet-500 to-purple-500",
    stats: "Auto-enforce",
    color: "violet",
  },
  {
    icon: Settings,
    title: "XP System",
    description:
      "Reward active members with experience points, levels, and leaderboards. Configurable and optional.",
    gradient: "from-indigo-500 to-purple-500",
    stats: "Configurable",
    color: "indigo",
  },
  {
    icon: Image,
    title: "AI Avatar Generation",
    description:
      "Generate unique anime-style avatars using AI with multiple style options and custom prompts.",
    gradient: "from-pink-500 to-rose-500",
    stats: "AI-powered",
    color: "pink",
  },
  {
    icon: MessageSquare,
    title: "Poll System",
    description:
      "Create and manage native Discord polls with interactive forms and real-time voting.",
    gradient: "from-green-500 to-emerald-500",
    stats: "Native polls",
    color: "green",
  },
  {
    icon: Brain,
    title: "8ball Game",
    description:
      "Ask the magic 8ball questions and get random responses for fun and entertainment.",
    gradient: "from-cyan-500 to-blue-500",
    stats: "Fun game",
    color: "cyan",
  },
];

export function Features() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-zinc-800/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-900/20 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800/80 border-zinc-700/50 gap-2"
          >
            <Bot className="w-3 h-3" />
            <span>Powerful Features</span>
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Comprehensive Features
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Role management features with AI-powered tools, XP tracking, and
            advanced automation. Easy to set up and use.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative bg-zinc-900/40 backdrop-blur-sm border-zinc-800/60 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <CardContent className="p-6 flex flex-col h-full relative z-10">
                {/* Icon */}
                <div className="relative mb-4">
                  <div
                    className={`w-12 h-12 bg-linear-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                      {feature.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800 transition-colors border-zinc-700/50"
                    >
                      {feature.stats}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
