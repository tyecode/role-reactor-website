import { Gift, Bolt, Infinity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@role-reactor/ui/components/card";

export function HowItWorks() {
  const steps = [
    {
      icon: Gift,
      title: "Get Cores",
      description:
        "Make a one-time donation and pay with cryptocurrency. Your Cores appear in your account automatically.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Bolt,
      title: "Use Cores",
      description:
        "Use Cores for AI avatar generation (1 Core per image). More features coming soon. Check balance with /core balance in Discord.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Infinity,
      title: "Never Expire",
      description:
        "Cores never expire. Use them whenever you want—today, next week, or months from now.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />

      <div className="max-w-[1120px] mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 leading-tight">
            How Core Energy Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get 10 Cores for every $1. They're added automatically and never expire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.title}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-900/80"
              >
                <CardHeader className="pb-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <CardTitle className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description.includes("/core balance") ? (
                      <>
                        {step.description.split("/core balance")[0]}
                        <code className="text-xs bg-gray-800/50 px-1.5 py-0.5 rounded font-mono text-purple-300">
                          /core balance
                        </code>
                        {step.description.split("/core balance")[1]}
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

