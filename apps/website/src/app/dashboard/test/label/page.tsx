"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function LabelTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Signal Labels
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Human-readable data identifier modules.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Control Linking">
          <div className="flex flex-col gap-10 w-full max-w-sm">
            <div className="flex items-center space-x-3 group">
              <Checkbox id="terms" className="h-4 w-4" />
              <Label
                htmlFor="terms"
                className="font-mono text-xs uppercase cursor-pointer group-hover:text-cyan-400 transition-colors"
              >
                Authorize_Neural_Link
              </Label>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label
                htmlFor="email"
                className="font-mono text-[10px] uppercase text-zinc-500 ml-1"
              >
                Relay_Uplink
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="host@grid.io"
                className="font-mono text-xs"
              />
              <p className="font-mono text-[9px] text-zinc-600 uppercase mt-1">
                {"//"} Enter valid node address.
              </p>
            </div>
          </div>
        </Showcase>

        <Showcase title="Data States">
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase text-zinc-400">
                Standard_Ident
              </Label>
              <div className="h-10 border border-white/5 bg-zinc-950/40 rounded-xl px-4 flex items-center font-mono text-xs text-zinc-600">
                STATIC_HOST
              </div>
            </div>

            <div className="space-y-2 group">
              <Label className="font-mono text-xs uppercase text-red-500/80 group-hover:text-red-400 transition-colors cursor-help">
                Kernel_Error
              </Label>
              <div className="h-10 border border-red-500/20 bg-red-500/5 rounded-xl px-4 flex items-center font-mono text-xs text-red-400/60">
                ACCESS_DENIED_0x04
              </div>
            </div>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
