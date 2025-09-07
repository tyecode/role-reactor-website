"use client";

import { useEffect, useState } from "react";
import { KofiReliableWidget } from "@/components/sponsor/kofi-reliable-widget";
// import { StatsWidget } from "@/components/sponsor/stats-widget";
import { Zap, Shield, Gift, Github, ExternalLink } from "lucide-react";
import { links } from "@/constants/links";
import Link from "next/link";

export default function SponsorPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Epic Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900" />

        {/* Animated floating orbs */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-400 dark:from-blue-400 dark:to-purple-500 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-float-1" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-pink-300 to-red-400 dark:from-pink-400 dark:to-red-500 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-float-2" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-400 dark:to-blue-500 rounded-full blur-3xl opacity-35 dark:opacity-25 animate-float-3" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating particles - Only render on client */}
        {isClient && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-indigo-500 dark:bg-white rounded-full opacity-60 dark:opacity-60 animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-4">
              Support Role Reactor
            </h1>

            <p className="text-lg text-indigo-800 dark:text-white/90 max-w-xl mx-auto mb-8">
              Help us keep Role Reactor free while supporting development and
              server costs.
            </p>

            {/* Usage Stats - Hidden until real data is available */}
            {/* <StatsWidget /> */}
          </div>
        </section>

        {/* Donation Widget Section */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <KofiReliableWidget />
          </div>
        </section>

        {/* Why Support Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-4">
                Why Support Us?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
                <Gift className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-indigo-900 dark:text-white mb-2">
                  Keep It Free
                </h3>
                <p className="text-sm text-indigo-700 dark:text-white/70">
                  Core features remain free for everyone.
                </p>
              </div>

              <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
                <Zap className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-indigo-900 dark:text-white mb-2">
                  Development
                </h3>
                <p className="text-sm text-indigo-700 dark:text-white/70">
                  Support ongoing development and new features.
                </p>
              </div>

              <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
                <Shield className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-indigo-900 dark:text-white mb-2">
                  Server Costs
                </h3>
                <p className="text-sm text-indigo-700 dark:text-white/70">
                  Help cover hosting and infrastructure costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Links Section */}
        <section className="py-12 px-4 bg-white/30 dark:bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-4">
                Join Our Community
              </h2>
              <p className="text-lg text-indigo-800 dark:text-white/90">
                Connect with other users and stay updated on development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg transition-colors">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-white mb-1">
                      GitHub Repository
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-white/70">
                      Star the project and contribute to development
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-indigo-500" />
                </div>
              </Link>

              <Link
                href={links.support}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#5865F2] rounded-lg transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-white mb-1">
                      Discord Server
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-white/70">
                      Join our community for support and updates
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-indigo-500" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
