import Link from "next/link";
import Image from "next/image";
import { Audiowide } from "next/font/google";
import { FaDiscord, FaRocket } from "react-icons/fa";
import { cn } from "fumadocs-ui/utils/cn";
import { ArrowRight } from "lucide-react";

import { Typewriter } from "@/components/common/typewriter";
import { Button } from "@/components/ui/button";
import { links } from "@/constants/links";
import { BubbleBackground } from "@/components/ui/bubble-background";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function Hero() {
  const tagline =
    "A powerful Discord bot for role management. Let members choose their own roles with reactions, welcome new members automatically, track XP, generate AI avatars, and more.";

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center px-4 overflow-hidden -mt-16 pt-16">
      {/* Abstract Digital Background */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 pointer-events-none" />

        {/* Bubble Background with gooey metaball effect */}
        <BubbleBackground
          interactive={true}
          className="absolute inset-0"
          transition={{ stiffness: 50, damping: 30 }}
          colors={{
            first: "99, 102, 241", // indigo-500
            second: "139, 92, 246", // purple-500
            third: "59, 130, 246", // blue-500
            fourth: "236, 72, 153", // pink-500
            fifth: "168, 85, 247", // purple-400
            sixth: "79, 70, 229", // indigo-600
          }}
        />

        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Main heading with enhanced styling */}
        <div className="space-y-4 animate-fade-in-up delay-200">
          <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  width={60}
                  height={60}
                  alt="Role Reactor Discord Bot Logo"
                  priority
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1
                className={cn(
                  "text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight animate-slide-up",
                  audiowide.className
                )}
                aria-label="Role Reactor - Ultimate Discord Bot for Role Management"
              >
                Role Reactor
              </h1>
            </div>
          </div>
        </div>

        {/* Enhanced tagline with typewriter */}
        <div className="animate-fade-in-up delay-400">
          <Typewriter
            text={tagline}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed min-h-[2.5em] font-light"
            cursor
            aria-label="Role Reactor Discord bot tagline"
          />
        </div>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-up delay-700">
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

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-10 pt-8 animate-fade-in-up delay-800">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              Free
            </div>
            <div className="text-white/60 text-xs">
              No cost
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              Simple
            </div>
            <div className="text-white/60 text-xs">
              Easy setup
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              Reliable
            </div>
            <div className="text-white/60 text-xs">
              Always works
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
