"use client";

import Link from "next/link";
import Image from "next/image";
import { Zap, Target, Shield } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { Audiowide } from "next/font/google";

import { Typewriter } from "@/components/Typewriter";
import { cn } from "fumadocs-ui/utils/cn";
import { links } from "@/constants/links";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export default function HomePage() {
  const tagline =
    "Discord role management, simplified. Set up reaction roles in minutes.";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Animated moving background shapes */}
          <div className="absolute w-[220px] h-[220px] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-25 animate-bg-move-1" />
          <div className="absolute w-[180px] h-[180px] bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-2xl opacity-20 animate-bg-move-2" />
          <div
            className="absolute w-[60px] h-[60px] bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-xl opacity-15 animate-bg-move-3"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="max-w-[var(--spacing-fd-container)] mx-auto text-center space-y-8 relative z-10">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
              <div className="relative animate-fade-in">
                <Image
                  src="/logo.png"
                  width={64}
                  height={64}
                  alt="Role Reactor Logo"
                  priority
                  className="relative z-10 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-lg opacity-15 scale-110"></div>
              </div>
              <h1
                className={cn(
                  "text-4xl md:text-5xl font-medium animate-slide-up",
                  audiowide.className
                )}
                aria-label="Role Reactor homepage title"
              >
                Role Reactor
              </h1>
            </div>
          </div>

          <Typewriter
            text={tagline}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed min-h-[2.5em]"
            cursor
            aria-label="tagline"
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link
              href={links.inviteBot}
              className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform animate-bounce-slow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Add Role Reactor to Discord Server"
            >
              <FaDiscord size={20} className="-ml-1" />
              Add to Discord
            </Link>
            <Link
              href="/docs"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 px-6 py-2.5 text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700 rounded-md hover:border-indigo-300 dark:hover:border-indigo-500 animate-fade-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              aria-label="Documentation"
            >
              Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            <div className="text-center space-y-3 group hover:scale-105 transition-transform duration-200 focus-within:scale-105">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-6 h-6" aria-label="Fast Setup Icon" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Fast Setup
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Configure reaction roles in minutes with simple slash commands
              </p>
            </div>

            <div className="text-center space-y-3 group hover:scale-105 transition-transform duration-200 focus-within:scale-105">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Target className="w-6 h-6" aria-label="Self-Service Icon" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Self-Service
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Users assign roles by reacting to messages—no manual work
              </p>
            </div>

            <div className="text-center space-y-3 group hover:scale-105 transition-transform duration-200 focus-within:scale-105">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Shield className="w-6 h-6" aria-label="Secure Icon" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Secure
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Built-in permission controls and rate limiting for safety
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
