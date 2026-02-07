"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface DiscordPreviewProps {
  title: string;
  description: string;
  color?: string;
  reactions: { emoji: string; roleName: string }[];
}

export function DiscordPreview({
  title,
  description,
  color = "#3b82f6",
  reactions,
}: DiscordPreviewProps) {
  const { data: session } = useSession();

  return (
    <div className="bg-[#313338] text-[#dbdee1] p-4 rounded-xl font-sans text-[15px] select-none shadow-2xl border border-white/5">
      <div className="flex gap-4">
        {/* User Avatar */}
        <div className="shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center overflow-hidden">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-semibold text-white hover:underline cursor-pointer">
              Role Reactor
            </span>
            <span className="bg-[#5865f2] text-white text-[10px] px-1 rounded-[3px] font-bold h-3.5 flex items-center">
              BOT
            </span>
            <span className="text-[12px] text-[#949ba4] ml-1">
              Today at 12:00 PM
            </span>
          </div>

          <div className="space-y-1.5">
            {/* Embed */}
            <div
              className="mt-1 flex border-l-4 rounded-[4px] bg-[#2b2d31] max-w-[520px] overflow-hidden"
              style={{ borderLeftColor: color }}
            >
              <div className="p-3 md:p-4 pr-12 w-full">
                {title && (
                  <div className="text-white font-bold text-base mb-2">
                    {title}
                  </div>
                )}
                {description && (
                  <div className="text-[14px] leading-[1.375] whitespace-pre-wrap">
                    {description}
                  </div>
                )}
              </div>
            </div>

            {/* Reactions */}
            {reactions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {reactions.map((r, i) => (
                  <div
                    key={i}
                    className="bg-[#2b2d31] hover:bg-[#35373c] border border-transparent hover:border-[#5865f2]/50 rounded-[8px] px-2 py-0.5 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span className="text-base">{r.emoji}</span>
                    <span className="text-[14px] font-medium text-[#b5bac1]">
                      1
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
