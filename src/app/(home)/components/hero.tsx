import Link from "next/link";
import Image from "next/image";
import { Audiowide } from "next/font/google";
import { FaDiscord, FaRocket } from "react-icons/fa";
import { cn } from "fumadocs-ui/utils/cn";
import { ArrowRight } from "lucide-react";

import { Typewriter } from "@/components/common/typewriter";
import { Button } from "@/components/ui/button";
import { links } from "@/constants/links";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function Hero() {
  const tagline =
    "A powerful Discord bot for role management. Let members choose their own roles with reactions, welcome new members automatically, track XP, generate AI avatars, and more.";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
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

        {/* Floating particles */}
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
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Main heading with enhanced styling */}
        <div className="space-y-4 animate-fade-in-up delay-200">
          <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
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
                  "text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight animate-slide-up",
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
            className="text-lg md:text-xl text-indigo-800 dark:text-white/90 max-w-3xl mx-auto leading-relaxed min-h-[2.5em] font-light"
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
            <div className="text-lg font-bold text-indigo-900 dark:text-white">
              Free
            </div>
            <div className="text-indigo-600 dark:text-white/60 text-xs">
              No cost
            </div>
          </div>
          <div className="w-px h-8 bg-indigo-300 dark:bg-white/20" />
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-900 dark:text-white">
              Simple
            </div>
            <div className="text-indigo-600 dark:text-white/60 text-xs">
              Easy setup
            </div>
          </div>
          <div className="w-px h-8 bg-indigo-300 dark:bg-white/20" />
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-900 dark:text-white">
              Reliable
            </div>
            <div className="text-indigo-600 dark:text-white/60 text-xs">
              Always works
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
