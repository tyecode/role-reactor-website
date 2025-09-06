import {
  Zap,
  Target,
  Shield,
  Clock,
  Users,
  Settings,
  Bot,
  CheckCircle,
} from "lucide-react";

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
    icon: Settings,
    title: "XP System",
    description:
      "Reward active members with experience points, levels, and leaderboards. Configurable and optional.",
    gradient: "from-indigo-500 to-purple-500",
    stats: "Configurable",
    color: "indigo",
  },
  {
    icon: Shield,
    title: "8ball Game",
    description:
      "Fun magic 8ball game for entertainment. Ask questions and get random responses.",
    gradient: "from-rose-500 to-pink-500",
    stats: "Fun game",
    color: "rose",
  },
];

export function Features() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-4">
            <Bot className="w-3 h-3" />
            <span>Basic Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-4">
            Simple Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Basic role management features to help organize your Discord server.
            Easy to set up and use.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 min-h-[200px] flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
              />

              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
                    {feature.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                    {feature.stats}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
