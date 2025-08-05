const stats = [
  {
    value: "1000+",
    label: "Active Servers",
    color: "text-blue-600",
  },
  {
    value: "50K+",
    label: "Roles Assigned",
    color: "text-purple-600",
  },
  {
    value: "99.9%",
    label: "Uptime",
    color: "text-indigo-600",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-[var(--spacing-fd-container)] mx-auto text-center">
        <h2 className="text-2xl font-medium mb-8 text-gray-900 dark:text-white">
          Trusted by Discord Communities
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center group hover:scale-105 transition-transform duration-200"
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
