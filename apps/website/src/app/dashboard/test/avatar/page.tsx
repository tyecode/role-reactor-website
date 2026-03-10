"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function AvatarTestPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Neural Idents
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Personal bio-metric signature visualization.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Scale Modules">
          <div className="flex items-center justify-center gap-6">
            <Avatar className="h-6 w-6 border border-white/10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-14 w-14 border border-white/20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-20 w-20 border-2 border-cyan-500/30">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </Showcase>

        <Showcase title="Fallback Signals">
          <div className="flex items-center justify-center gap-6">
            <Avatar className="border border-white/10">
              <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="border border-cyan-500/30">
              <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
              <AvatarFallback className="bg-cyan-500/20 text-cyan-500 text-xs font-mono">
                AB
              </AvatarFallback>
            </Avatar>
            <Avatar className="border border-purple-500/30">
              <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
              <AvatarFallback className="bg-purple-500/20 text-purple-500 text-xs font-mono">
                CD
              </AvatarFallback>
            </Avatar>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
