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
  display: "swap",
});

export function Hero() {
  const tagline =
    "Automated role management for Discord. Set up reaction roles in minutes.";

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
        <div className="flex flex-col items-center justify-center gap-2 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
            <div className="relative animate-fade-in hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.png"
                width={64}
                height={64}
                alt="Role Reactor Discord Bot Logo - Best Discord Bot for Role Management"
                priority
                className="relative z-10 drop-shadow-lg"
              />
            </div>
            <h1
              className={cn(
                "text-4xl md:text-5xl font-medium animate-slide-up hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300",
                audiowide.className
              )}
              aria-label="Role Reactor - Best Discord Bot for Role Management"
            >
              Role Reactor
            </h1>
          </div>
        </div>

        <div className="animate-fade-in-up delay-300">
          <Typewriter
            text={tagline}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed min-h-[2.5em]"
            cursor
            aria-label="Role Reactor Discord bot tagline"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-up delay-500">
          <Link
            href={links.inviteBot}
            className="group flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-slow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2] hover:rotate-1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Add Role Reactor Discord Bot to Server - Free Discord Bot"
          >
            <FaDiscord size={20} className="-ml-1 group-hover:animate-pulse" />
            Add Bot Free
          </Link>
          <Link
            href="/docs"
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 px-8 py-3 text-base font-medium transition-all duration-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 animate-fade-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 hover:scale-105 transform"
            aria-label="Role Reactor Discord Bot Documentation and Setup Guide"
          >
            Bot Guide →
          </Link>
        </div>
      </div>
    </section>
  );
}
