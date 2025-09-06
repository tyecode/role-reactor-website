import Link from "next/link";
import { FaDiscord, FaRocket } from "react-icons/fa";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { links } from "@/constants/links";

export function FooterCTA() {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Enhanced background with more depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

      {/* More prominent decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-float-1" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 rounded-full blur-3xl opacity-25 dark:opacity-20 animate-float-2" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-500 dark:to-blue-500 rounded-full blur-3xl opacity-30 dark:opacity-25 animate-float-3" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366F1' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating particles for extra visual interest */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main CTA Card */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10" />

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-xl opacity-20" />

          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Transform Your Discord Server Today</span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Ready to Level Up?
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Stop struggling with manual role management. Role Reactor
              automates everything so you can focus on building an amazing
              community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                asChild
                size="lg"
                className="group relative bg-gradient-to-r !from-[#5865F2] !to-[#4752C4] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-2xl transform hover:scale-105 hover:-translate-y-1 focus:outline-none"
              >
                <Link
                  href={links.inviteBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add Role Reactor Discord Bot to Server - Free Discord Bot"
                >
                  <FaDiscord
                    size={20}
                    className="relative z-10 group-hover:animate-pulse mr-2"
                  />
                  <span className="relative z-10">Add Bot Free</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-8 py-3 rounded-lg hover:scale-105 hover:-translate-y-1 duration-300 transition-all"
              >
                <Link
                  href="/docs"
                  aria-label="Role Reactor Discord Bot Documentation and Setup Guide"
                >
                  <FaRocket className="w-4 h-4 group-hover:rotate-12 transition-transform mr-2" />
                  <span>View Documentation</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-8 text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>100% Free</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>30s Setup</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>24/7 Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
