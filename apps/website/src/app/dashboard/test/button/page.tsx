"use client";

import { PageHeader } from "@/app/dashboard/_components/page-header";
import { MousePointerClick, Loader2, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function ButtonTestPage() {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Atomic Modules"
        categoryIcon={MousePointerClick}
        title="Button System"
        description="Core interaction primitive with multiple visual states and glitch effects"
      />

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Cyberpunk Core">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button variant="default" data-text="Default">
              Default
            </Button>
            <Button variant="secondary" data-text="Secondary">
              Secondary
            </Button>
            <Button variant="destructive" data-text="Destructive">
              Destructive
            </Button>
            <Button variant="outline" data-text="Outline">
              Outline
            </Button>
            <Button variant="ghost" data-text="Ghost">
              Ghost
            </Button>
            <Button variant="link" data-text="Link">
              Link
            </Button>
          </div>
        </Showcase>

        <Showcase title="Specialized FX">
          <div className="flex flex-col gap-6 w-full items-center">
            <Button
              variant="glitch"
              data-text="Glitch Protocol"
              className="w-full max-w-xs"
            >
              Glitch Protocol
            </Button>
            <Button
              variant="neon"
              data-text="Neon Synthesis"
              className="w-full max-w-xs"
            >
              Neon Synthesis
            </Button>
            <Button
              variant="destructive-glitch"
              data-text="Destructive Glitch"
              className="w-full max-w-xs"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Destructive Glitch
            </Button>
            <Button
              variant="ghost-glow"
              data-text="Ghost Glow"
              className="w-full max-w-xs"
            >
              Ghost Glow
            </Button>
          </div>
        </Showcase>

        <Showcase title="Combat Sizing">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button size="lg" variant="neon">
              Large Output
            </Button>
            <Button size="default">Standard Link</Button>
            <Button size="sm" variant="outline">
              Small Node
            </Button>
            <Button size="icon" variant="glitch">
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </Showcase>

        <Showcase title="Interface States">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button disabled>Offline Mode</Button>
            <Button disabled variant="outline">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </Button>
            <Button
              variant="link"
              className="text-emerald-500 hover:text-emerald-400"
            >
              Uplink Active
            </Button>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
