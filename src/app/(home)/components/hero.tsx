"use client";

import Link from "next/link";
import Image from "next/image";
import { Audiowide } from "next/font/google";
import { FaDiscord } from "react-icons/fa";
import { cn } from "fumadocs-ui/utils/cn";

import { Typewriter } from "@/components/common/typewriter";
import { links } from "@/constants/links";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export function Hero() {
  const tagline =
    "Discord role management, simplified. Set up reaction roles in minutes.";

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link
            href={links.inviteBot}
            className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-slow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Add Role Reactor to Discord Server"
          >
            <FaDiscord size={20} className="-ml-1" />
            Add to Discord
          </Link>
          <Link
            href="/docs"
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 px-8 py-3 text-base font-medium transition-colors border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 animate-fade-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            aria-label="Documentation"
          >
            View Documentation →
          </Link>
        </div>
      </div>
    </section>
  );
}
