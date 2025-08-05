import { Zap, Target, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Setup",
    description:
      "Configure reaction roles in minutes with simple slash commands",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Target,
    title: "Self-Service",
    description: "Users assign roles by reacting to messages—no manual work",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Built-in permission controls and rate limiting for safety",
    gradient: "from-indigo-500 to-indigo-600",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="max-w-[var(--spacing-fd-container)] mx-auto text-center">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
            Why Role Reactor?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Simple, reliable, and powerful
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center space-y-3 group hover:scale-105 transition-transform duration-200 focus-within:scale-105"
            >
              <div
                className={`w-12 h-12 mx-auto bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}
              >
                <feature.icon
                  className="w-6 h-6"
                  aria-label={`${feature.title} Icon`}
                />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
