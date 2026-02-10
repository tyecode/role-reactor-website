"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function AvatarTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Avatar
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          An image element with a fallback for representing the user.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Sizes</h3>
          <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-center gap-6 min-h-[300px]">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Fallbacks</h3>
          <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-center gap-6 min-h-[300px]">
            <Avatar>
              <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
              <AvatarFallback className="bg-cyan-500/20 text-cyan-500 text-xs">
                AB
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
              <AvatarFallback className="bg-purple-500/20 text-purple-500 text-xs">
                CD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
