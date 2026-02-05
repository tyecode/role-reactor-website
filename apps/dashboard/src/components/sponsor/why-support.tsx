import { Gift, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@role-reactor/ui/components/card";

export function WhySupport() {
  const reasons = [
    {
      icon: Gift,
      title: "Keep It Free",
      description: "Core features remain free for everyone.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Development",
      description: "Support ongoing development and new features.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Server Costs",
      description: "Help cover hosting and infrastructure costs.",
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
            Why Support Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <Card
                key={reason.title}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-900/80"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${reason.gradient} rounded-xl flex items-center justify-center text-white`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white mb-3">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {reason.description}
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

