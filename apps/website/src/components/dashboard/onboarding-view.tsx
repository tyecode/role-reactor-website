"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Server, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { FaDiscord } from "react-icons/fa";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface OnboardingViewProps {
  inviteUrl: string;
}

export function OnboardingView({ inviteUrl }: OnboardingViewProps) {
  return (
    <div className="space-y-12 pb-20">
      {/* Onboarding Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/40 shadow-2xl min-h-[400px] md:min-h-[440px] flex items-center backdrop-blur-xl group"
      >
        {/* Subtle Glow Background overlay */}
        <div className="absolute inset-0 z-0">
          <CyberpunkBackground
            gridSize={48}
            gridOpacity={0.015}
            gridColor="#3b82f6"
            showGlows={true}
            primaryGlow="rgba(59, 130, 246, 0.1)"
            secondaryGlow="rgba(168, 85, 247, 0.05)"
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        <CardContent className="relative z-20 p-8 sm:p-12 md:p-14 flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="px-3 py-1 gap-2 font-bold uppercase tracking-[0.2em] text-[9px] bg-white/5 border-white/10 text-white backdrop-blur-md"
            >
              <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse" />
              System Initialized
            </Badge>
          </motion.div>

          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-4 text-white tracking-tighter",
              audiowide.className
            )}
          >
            Role{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Reactor
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg mb-8 max-w-xl leading-relaxed font-medium">
            Welcome to your command center. Connect your server to unlock{" "}
            <span className="text-white font-bold">automated role systems</span>{" "}
            and advanced community tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              asChild
              className="rounded-lg font-black px-8 h-12 text-sm bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-xl shadow-[#5865F2]/20 transition-all group w-full sm:w-auto border-t border-white/20 active:scale-95"
            >
              <a
                href={inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <FaDiscord
                  size={20}
                  className="mr-2.5 group-hover:rotate-12 transition-transform"
                />
                Connect Server
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-lg font-black px-8 h-12 text-sm bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md transition-all w-full sm:w-auto active:scale-95"
            >
              <Link href="/docs">View Guide</Link>
            </Button>
          </div>

          {/* Horizontal Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-12 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
            <div className="flex items-center gap-2 group/item">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="group-hover/item:text-zinc-400 transition-colors">
                Neural Link Active
              </span>
            </div>
            <div className="flex items-center gap-2 group/item">
              <Shield size={12} className="text-blue-500 shadow-blue-500/20" />
              <span className="group-hover/item:text-zinc-400 transition-colors">
                Encrypted
              </span>
            </div>
            <div className="flex items-center gap-2 group/item">
              <Zap size={12} className="text-yellow-500 fill-yellow-500/20" />
              <span className="group-hover/item:text-zinc-400 transition-colors">
                Zero-Latency
              </span>
            </div>
          </div>
        </CardContent>

        {/* Hero Decorative Visual */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        </div>
      </motion.div>

      {/* Quick Actions Grid - Clean & Minimal */}
      <section>
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-lg font-bold flex items-center gap-2 text-white">
            <Server className="text-blue-500 w-5 h-5" /> Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "System Docs",
              desc: "Deep dive into reactor logic",
              icon: Server,
              href: "/docs",
              gradient: "from-blue-500/20 to-indigo-600/10",
              accent: "text-blue-400",
            },
            {
              title: "Support Hub",
              desc: "Get engineer assistance",
              icon: Shield,
              href: "https://discord.gg/role-reactor",
              gradient: "from-purple-500/20 to-fuchsia-600/10",
              accent: "text-purple-400",
            },
            {
              title: "Terminal",
              desc: "Return to central portal",
              icon: Zap,
              href: "/",
              gradient: "from-emerald-500/20 to-teal-600/10",
              accent: "text-emerald-400",
            },
          ].map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="h-full"
            >
              <Link href={action.href} className="h-full block">
                <Card className="bg-zinc-900/40 border-white/5 shadow-2xl p-6 group hover:bg-zinc-800/60 hover:border-blue-500/20 transition-all duration-300 rounded-2xl relative overflow-hidden cursor-pointer h-full backdrop-blur-md">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center text-center gap-4 h-full justify-center">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-zinc-950 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500",
                        action.accent
                      )}
                    >
                      <action.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3
                        className={cn(
                          "text-base font-black text-white tracking-widest uppercase",
                          audiowide.className
                        )}
                      >
                        {action.title}
                      </h3>
                      <p className="text-zinc-500 text-[11px] leading-relaxed font-medium">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
