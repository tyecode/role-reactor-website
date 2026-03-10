"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import { Search, Mail, Lock } from "lucide-react";

export default function InputTestPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Signal Input
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Manual data entry portals.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Standard Ports">
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <div className="space-y-2">
              <Label className="font-mono text-[10px] uppercase text-zinc-500 ml-1">
                Communication Port
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="email"
                  placeholder="user@neural.link"
                  className="pl-10 font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-mono text-[10px] uppercase text-zinc-500 ml-1">
                Access Cipher
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="picture"
                className="font-mono text-[10px] uppercase text-zinc-500 ml-1"
              >
                Bio-Metric Uplink
              </Label>
              <Input
                id="picture"
                type="file"
                className="font-mono text-xs cursor-pointer file:bg-zinc-950 file:text-cyan-500 file:border-white/5 file:rounded-md file:mr-4 file:px-3 file:py-1 file:font-mono file:uppercase file:text-[10px]"
              />
            </div>
          </div>
        </Showcase>

        <Showcase title="Telemetry Search">
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="space-y-2">
              <Label className="font-mono text-[10px] uppercase text-zinc-500 ml-1">
                Directory Scan
              </Label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Scan nodes..."
                  className="pl-10 font-mono text-sm focus-visible:ring-cyan-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-mono text-[10px] uppercase text-zinc-500 ml-1">
                Quick Broadcast
              </Label>
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Direct message..."
                  className="font-mono text-sm"
                />
                <Button
                  variant="neon"
                  size="sm"
                  className="font-mono text-[10px]"
                >
                  SYNC
                </Button>
              </div>
            </div>

            <div className="space-y-2 opacity-50">
              <Label className="font-mono text-[10px] uppercase text-zinc-500 ml-1">
                Legacy Node (Disabled)
              </Label>
              <Input
                disabled
                type="text"
                placeholder="Unauthorized access..."
                className="font-mono text-sm"
              />
            </div>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
