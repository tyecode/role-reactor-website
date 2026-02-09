"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface GuildHeroProps {
  guildName: string;
  guildIcon: string | null | undefined;
  guildId: string;
}

export function GuildHero({ guildName, guildIcon, guildId }: GuildHeroProps) {
  const heroCardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  return (
    <motion.div
      ref={heroCardRef}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="xl:col-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 p-8 flex flex-col md:flex-row items-center gap-10 backdrop-blur-xl shadow-2xl group cursor-default"
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.04}deg) rotateY(${(mousePosition.x - 50) * -0.04}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Background Pattern - Cyberpunk gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(255,0,255,0.06),transparent_50%)]" />

      {/* Tech Grid Pattern - Cyan tint */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[linear-gradient(to_right,#00ffff_1px,transparent_1px),linear-gradient(to_bottom,#00ffff_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Mouse-tracking Neon Spotlight - Cyan */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,255,255,0.05), transparent 45%)`,
        }}
      />

      {/* Secondary Neon Glow - Magenta */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovering ? 0.8 : 0,
          background: `radial-gradient(350px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,0,255,0.08), transparent 50%)`,
        }}
      />

      {/* Animated Neon Border Glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `
                conic-gradient(
                  from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%,
                  transparent 0deg,
                  rgba(0,255,255,0.4) 60deg,
                  rgba(255,0,255,0.4) 120deg,
                  transparent 180deg
                )
              `,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {/* Left: Avatar */}
      <div className="relative shrink-0">
        {/* Cyberpunk Glow Behind Avatar */}
        <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 blur-xl rounded-[25%] sm:rounded-[2.5rem]" />
        {/* Neon Border Ring */}
        <div className="absolute -inset-[2px] rounded-[1.6rem] sm:rounded-[2.1rem] xl:rounded-[2.6rem] bg-gradient-to-br from-cyan-500/35 via-transparent to-fuchsia-500/35 z-0" />
        <Avatar className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 xl:h-40 xl:w-40 rounded-[1.5rem] sm:rounded-[2rem] xl:rounded-[2.5rem] border-2 border-zinc-950 shadow-2xl z-10 relative ring-1 ring-cyan-500/50 shadow-cyan-500/20">
          <AvatarImage
            src={
              guildIcon
                ? `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`
                : undefined
            }
            alt={guildName}
            className="rounded-none object-cover"
          />
          <AvatarFallback className="rounded-none bg-zinc-800 text-zinc-400 text-4xl font-bold">
            {guildName.charAt(0) || "S"}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Center: Server Info */}
      <div className="flex-1 flex flex-col items-center md:items-start z-10 min-w-0">
        <div className="mb-4 space-y-1.5 flex flex-col items-center md:items-start">
          <h1
            className={cn(
              "text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight text-center md:text-left",
              audiowide.className
            )}
          >
            {guildName}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2.5 bg-zinc-950/60 px-4 py-1.5 rounded-xl border border-white/5 text-[10px] font-bold text-zinc-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </span>
            Active System
          </span>
          <span className="flex items-center gap-2 bg-zinc-950/60 px-3 py-1.5 rounded-xl border border-white/5 font-mono text-[10px] text-zinc-600 uppercase tracking-widest backdrop-blur-md">
            NODE: {guildId.slice(0, 10)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
