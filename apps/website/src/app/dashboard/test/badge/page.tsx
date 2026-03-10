"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function BadgeTestPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Status Tags
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Metadata classification markers.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="System States">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Badge>Standard</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
        </Showcase>

        <Showcase title="Premium Rank">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <Badge variant="accent" className="text-md py-1 px-3">
                Accent
              </Badge>
              <Badge variant="premium" className="text-md py-1 px-3">
                Premium
              </Badge>
              <Badge variant="pro" className="text-md py-1 px-3">
                Pro
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <Badge
                variant="accent"
                className="font-mono uppercase text-[10px]"
              >
                New_Node
              </Badge>
              <Badge
                variant="premium"
                className="font-mono uppercase text-[10px]"
              >
                Elite_Link
              </Badge>
              <Badge variant="pro" className="font-mono uppercase text-[10px]">
                Kernel_Master
              </Badge>
            </div>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
