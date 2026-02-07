"use client";

import { useServerStore } from "@/store/use-server-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  Plus,
  ArrowRight,
  Info,
  Loader2,
  Trophy,
  Shield,
  Zap,
  MessageSquare,
  Activity,
  History,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { FaDiscord } from "react-icons/fa";
const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function OverviewLanding() {
  const {
    guilds,
    installedGuildIds,
    isLoading: isServersLoading,
  } = useServerStore();

  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1392714201558159431";
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

  if (isServersLoading && guilds.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  const installedGuilds = guilds.filter((g) =>
    installedGuildIds.includes(g.id)
  );

  const availableGuilds = guilds.filter(
    (g) => !installedGuildIds.includes(g.id)
  );

  // Case 1: No installed servers found - ONBOARDING
  if (installedGuilds.length === 0 && !isServersLoading) {
    return (
      <div className="space-y-12 pb-20">
        {/* Onboarding Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-xl min-h-[320px] md:min-h-[400px] flex items-center"
        >
          {/* Subtle Glow Background overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-20" />
            <div className="absolute inset-0 bg-zinc-950/40" />
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
                "text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white tracking-tight",
                audiowide.className
              )}
            >
              Role{" "}
              <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Reactor
              </span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base md:text-lg mb-8 max-w-xl leading-relaxed font-medium">
              Welcome to your command center. Connect your server to unlock{" "}
              <span className="text-white font-bold">
                automated role systems
              </span>{" "}
              and advanced community tools.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                asChild
                className="rounded-xl font-bold px-6 h-10 text-sm bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/20 transition-all group w-full sm:w-auto"
              >
                <a
                  href={inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <FaDiscord size={18} className="mr-2" />
                  Connect Server
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-xl font-bold px-6 h-10 text-sm bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md transition-all w-full sm:w-auto"
              >
                <Link href="/docs">View Guide</Link>
              </Button>
            </div>

            {/* Horizontal Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-10 text-[9px] text-zinc-500 font-bold uppercase tracking-widest opacity-60">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                Live
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={10} className="text-blue-500" />
                Secure
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={10} className="text-yellow-500 fill-yellow-500/20" />
                Instant
              </div>
            </div>
          </CardContent>

          {/* Setup Hero Image */}
          <div className="absolute right-0 top-0 w-[500px] h-full hidden lg:block opacity-60 pointer-events-none">
            <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/60 to-transparent z-10" />
            <Image
              src="/images/dashboard/setup-hero.png"
              alt="Setup"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Available Servers Section */}
        {availableGuilds.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Server className="text-blue-500 w-4 h-4" />
                </div>
                Connect Server
              </h2>
              <Badge
                variant="outline"
                className="bg-white/5 border-white/10 text-zinc-500 font-bold uppercase tracking-widest text-[9px]"
              >
                {availableGuilds.length} Available
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableGuilds.slice(0, 6).map((guild, idx) => (
                <motion.div
                  key={guild.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <a
                    href={`https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-800/60 border-white/5 hover:border-blue-500/30 shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border-2">
                      <CardContent className="p-4 flex items-center gap-3 relative">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/5 shadow-inner transition-all group-hover:scale-105 group-hover:border-blue-500/20">
                          {guild.icon ? (
                            <Image
                              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                              alt={guild.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-bold text-zinc-500">
                              {guild.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm truncate group-hover:text-blue-400 transition-colors">
                            {guild.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                            <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                              Ready
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 transition-all opacity-0 group-hover:opacity-100" />
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className="px-3 py-1 gap-2 font-bold uppercase tracking-[0.2em] text-[9px] bg-white/5 border-white/10 text-zinc-400 backdrop-blur-md"
            >
              Get Started
            </Badge>
            <h2 className="text-2xl font-black text-white text-center tracking-tight">
              Quick Actions
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto">
              Everything you need to set up and configure your bot
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            {[
              {
                title: "Setup Guide",
                desc: "Step-by-step instructions to get started",
                icon: Info,
                href: "/docs",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                title: "Reaction Roles",
                desc: "Learn how to create your first reaction role",
                icon: Shield,
                href: "/docs",
                gradient: "from-purple-500 to-fuchsia-600",
              },
              {
                title: "XP System",
                desc: "Configure levels and rewards for your server",
                icon: Trophy,
                href: "/docs",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                title: "Commands",
                desc: "Browse all available bot commands",
                icon: MessageSquare,
                href: "/docs",
                gradient: "from-amber-400 to-orange-600",
              },
            ].map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link href={action.href}>
                  <Card className="bg-zinc-900/40 border-white/5 shadow-xl p-5 group hover:bg-zinc-800/60 hover:border-blue-500/30 transition-all duration-300 rounded-2xl relative overflow-hidden cursor-pointer">
                    <div
                      className={cn(
                        "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
                        action.gradient
                      )}
                    />
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-linear-to-br text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                            action.gradient
                          )}
                        >
                          <action.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white tracking-tight mb-1">
                            {action.title}
                          </h3>
                          <p className="text-zinc-500 text-xs leading-relaxed">
                            {action.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
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

  // Case 2: Main Dashboard View (Bot is installed on some servers)
  return (
    <div className="space-y-8 pb-20 mt-4">
      {/* Command Hub Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full p-6 sm:p-10 rounded-2xl bg-zinc-950 border border-white/5 shadow-xl relative overflow-hidden flex items-center min-h-[160px] md:min-h-[220px]"
      >
        {/* Subtle Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-blue-600/5 via-transparent to-purple-600/5 opacity-10" />
          <div className="absolute inset-0 bg-zinc-950/40" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[10px] w-fit py-0.5 px-2.5"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse mr-2" />{" "}
            Global Infrastructure
          </Badge>
          <div className="space-y-1">
            <h1
              className={cn(
                "text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-2",
                audiowide.className
              )}
            >
              Command <span className="text-blue-400">Hub</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base max-w-md leading-relaxed font-medium opacity-80">
              Access your active servers and monitor system initialization
              status across the ecosystem.
            </p>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="absolute right-0 top-0 w-[450px] h-full hidden lg:block opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10" />
          <Image
            src="/images/dashboard/setup-hero.png"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Active Servers Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
            <Server className="text-primary w-5 h-5" /> Active Servers
          </h2>
          <Link
            href={inviteUrl}
            target="_blank"
            className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Server
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {installedGuilds.map((guild, idx) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
            >
              <Link href={`/dashboard/${guild.id}`}>
                <Card className="bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-800/60 border-white/5 hover:border-blue-500/30 shadow-lg transition-all duration-300 rounded-2xl group overflow-hidden border-2">
                  <CardHeader className="p-4 flex flex-row items-center gap-3 relative">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/5 shadow-inner transition-all group-hover:scale-105 group-hover:border-blue-500/20">
                      {guild.icon ? (
                        <Image
                          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                          alt={guild.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-base font-bold text-zinc-500">
                          {guild.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors tracking-tight">
                        {guild.name}
                      </CardTitle>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">
                          Active
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 transition-all" />
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}

          {/* New Server Button */}
          <Link href={inviteUrl} target="_blank">
            <Card className="bg-zinc-900/20 border-white/10 border-dashed hover:border-blue-500/40 hover:bg-zinc-900/40 transition-all group h-full cursor-pointer flex items-center justify-center min-h-[76px] rounded-2xl border-2">
              <div className="flex items-center gap-2 text-zinc-500 group-hover:text-blue-400 transition-all font-bold uppercase text-[9px] tracking-[0.2em]">
                <Plus
                  size={14}
                  className="group-hover:rotate-90 transition-transform duration-500"
                />
                <span>Add Hub</span>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* System Overview Section - Always visible to remind capabilities */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col space-y-1 px-1">
          <Badge
            variant="outline"
            className="w-fit bg-blue-500/5 border-blue-500/10 text-blue-500 font-bold uppercase tracking-[0.2em] text-[9px] py-1 px-3"
          >
            Core Modules
          </Badge>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            System Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            {
              icon: Shield,
              gradient: "from-blue-500 to-indigo-600",
              title: "Reaction Roles",
              desc: "Automated role assignment based on user reactions.",
            },
            {
              icon: Trophy,
              gradient: "from-purple-500 to-fuchsia-600",
              title: "XP System",
              desc: "Reward active members with experience points and levels.",
            },
            {
              icon: MessageSquare,
              gradient: "from-emerald-500 to-teal-600",
              title: "Commands",
              desc: "Customizable bot commands and automated responses.",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="bg-zinc-900/20 border-white/5 p-5 group hover:bg-zinc-800/40 transition-all rounded-2xl relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br text-white shadow-lg",
                    feature.gradient
                  )}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-[10px] leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        <Card className="bg-zinc-950/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl group">
          <CardHeader className="border-b border-white/5 bg-white/2 py-3 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-[9px] font-black flex items-center gap-2 text-zinc-500 uppercase tracking-[0.2em]">
              <History className="w-3.5 h-3.5 opacity-50" /> Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto text-zinc-700 border border-white/5 transition-all duration-500">
              <Activity size={24} />
            </div>
            <p className="text-[10px] text-zinc-500 font-bold max-w-[200px] mx-auto leading-relaxed uppercase tracking-widest opacity-60">
              Select or connect a hub to view live activity.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl group">
          <CardHeader className="border-b border-white/5 bg-white/2 py-3 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-[9px] font-black flex items-center gap-2 text-zinc-500 uppercase tracking-[0.2em]">
              <Info className="w-3.5 h-3.5 opacity-50" /> Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="space-y-2">
              {[
                {
                  label: "XP Systems",
                  text: "New layouts live.",
                  color: "bg-blue-500",
                },
                {
                  label: "Performance",
                  text: "Optimized hubs.",
                  color: "bg-purple-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-white/2 rounded-xl border border-white/5 group/entry hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className={cn("w-1 h-1 rounded-full", item.color)} />
                    <p className="text-white font-black text-[9px] uppercase tracking-widest">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-relaxed font-bold ml-3 uppercase tracking-tight">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
