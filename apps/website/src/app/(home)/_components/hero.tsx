"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { motion } from "motion/react";
import { Audiowide } from "next/font/google";
import { FaDiscord, FaRocket } from "react-icons/fa";
import { ArrowRight, ShieldCheck, Zap as ZapIcon } from "lucide-react";
import { cn } from "fumadocs-ui/utils/cn";

import { Button } from "@/components/ui/button";
import { links } from "@/constants/links";

// Lazy load BubbleBackground for better initial page load performance
const BubbleBackground = dynamic(
  () =>
    import("@/components/common/bubble-background").then(
      (mod) => mod.BubbleBackground
    ),
  { ssr: false }
);

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden -mt-16 pt-24 pb-12">
      {/* Abstract Digital Background */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-zinc-950 pointer-events-none" />

        {/* Bubble Background with gooey metaball effect */}
        <BubbleBackground
          interactive={false}
          className="absolute inset-0"
          transition={{ stiffness: 50, damping: 30 }}
          colors={{
            first: "139, 92, 246", // purple-500
            second: "236, 72, 153", // pink-500
            third: "168, 85, 247", // purple-400
            fourth: "99, 102, 241", // indigo-500
            fifth: "59, 130, 246", // blue-500
            sixth: "124, 58, 237", // violet-600
          }}
        />

        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto flex flex-col items-center relative z-10 text-center space-y-8"
      >
        {/* Main Title */}
        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]",
            audiowide.className
          )}
        >
          Role{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Reactor
          </span>
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light">
          The ultimate Discord bot for{" "}
          <span className="text-white font-medium">
            automated role management
          </span>
          . Reactions, temporary roles, XP tracking, welcome systems, and more.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
          <Button
            asChild
            size="lg"
            variant="discord"
            className="w-full sm:w-auto gap-2 h-12 px-8 min-w-[200px] group"
          >
            <Link
              href={links.inviteBot}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord size={20} />
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2 h-12 px-8 min-w-[200px] group rounded-xl border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/80 hover:text-white"
          >
            <Link href="/docs">
              <FaRocket className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
              <span>Documentation</span>
            </Link>
          </Button>
        </div>

        {/* Trust Indicators - Horizontal */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-4 pt-8 sm:pt-12 text-xs sm:text-sm text-zinc-400 font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_var(--color-emerald-500)]" />
            Always Online
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Verified & Secure
          </div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4" />
            Instant Setup
          </div>
        </div>
      </motion.div>
    </section>
  );
}
