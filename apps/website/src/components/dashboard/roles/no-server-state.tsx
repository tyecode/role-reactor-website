"use client";

import { Button } from "@/components/ui/button";
import { Plus, ShieldAlert, Server, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function NoServerState() {
  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1392714201558159431";
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="relative w-32 h-32 bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
          <Server className="w-16 h-16 text-zinc-700" />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 border-4 border-black">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md space-y-4"
      >
        <h2 className="text-3xl font-black text-white tracking-tight">
          Ready to Level Up Your Server?
        </h2>
        <p className="text-zinc-400 leading-relaxed text-lg">
          To start creating reaction roles, you first need to invite Role
          Reactor to one of your servers.
        </p>

        <div className="grid gap-3 pt-6">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
              <Plus className="w-5 h-5 mr-2" />
              Add to New Server
            </a>
          </Button>

          <div className="flex items-center justify-center gap-6 mt-6 py-4 border-t border-white/5">
            <div className="flex flex-col items-center gap-1 group cursor-help">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Secure
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-help">
              <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Fast Setup
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
