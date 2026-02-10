"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function BadgeTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Badge
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Displays a badge or a component that looks like a badge.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Default Variants">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </Showcase>

        <Showcase title="Cyberpunk Variants">
          <Badge variant="accent" className="text-md py-1 px-3">
            Accent
          </Badge>
          <Badge variant="premium" className="text-md py-1 px-3">
            Premium
          </Badge>
          <Badge variant="pro" className="text-md py-1 px-3">
            Pro
          </Badge>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="accent">New</Badge>
            <Badge variant="premium">VIP</Badge>
            <Badge variant="pro">Lv. 99</Badge>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
