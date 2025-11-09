import { Heart, Shield, TrendingUp, Zap } from "lucide-react";

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

export function SocialProof() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium mb-4">
            <Heart className="w-3 h-3" />
            <span>Simple & Reliable</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 dark:from-white dark:via-green-100 dark:to-blue-100 bg-clip-text text-transparent mb-4 leading-tight">
            Why Choose Role Reactor Bot
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive Discord bot for role management with advanced
            features. Easy to use with powerful automation capabilities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group text-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Perfect for Your Server
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Works for Discord servers of any size. Comprehensive features that
              are easy to manage.
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
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
