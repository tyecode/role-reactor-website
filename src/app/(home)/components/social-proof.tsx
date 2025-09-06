import {
  Heart,
  Shield,
  TrendingUp,
  Zap,
  Star,
  Sparkles,
  CheckCircle,
  Users,
} from "lucide-react";

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
    value: "Basic",
    label: "Essential Features",
    description: "Core functionality",
    icon: Zap,
    color: "yellow",
    gradient: "from-yellow-500 to-orange-500",
  },
];

const testimonials = [
  {
    name: "Simple Setup",
    role: "Easy to Use",
    content:
      "Basic commands that are easy to understand. No complex configuration needed - just add the bot and start using it.",
    avatar: Sparkles,
  },
  {
    name: "Reliable",
    role: "Stable Performance",
    content:
      "Consistent performance with basic monitoring. The bot runs smoothly without issues for role management tasks.",
    avatar: Zap,
  },
  {
    name: "Free to Use",
    role: "No Cost",
    content:
      "Completely free with no hidden costs. All features are available without any payment or subscription required.",
    avatar: Heart,
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
            Simple Role Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A straightforward Discord bot for role management. Easy to use with
            basic features that help organize your server without complexity.
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

        {/* Testimonials */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Our Bot
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Simple features that work well for Discord server management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                    <testimonial.avatar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {testimonial.content}
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Perfect for Your Server
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Works well for Discord servers of any size. Simple features that
              are easy to manage.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Easy Setup", icon: Shield },
              { label: "Always Reliable", icon: TrendingUp },
              { label: "Free Forever", icon: Zap },
              { label: "Community Focused", icon: Heart },
            ].map((item, index) => (
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
