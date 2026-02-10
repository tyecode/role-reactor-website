"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

export default function SeparatorTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Separator
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Visually or semantically separates content.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Horizontal</h3>
          <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-full max-w-sm bg-zinc-950 border border-white/5 rounded-xl p-6 shadow-xl">
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none text-white">
                  Radix Primitives
                </h4>
                <p className="text-sm text-muted-foreground">
                  An open-source UI component library.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm text-white">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
