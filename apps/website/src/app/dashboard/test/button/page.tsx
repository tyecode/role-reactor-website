"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader2, Mail, Send, Trash2, Zap } from "lucide-react";

export default function ButtonTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Button
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Default Variants">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
            <Button size="lg">Large</Button>
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="icon">
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </Showcase>

        <Showcase title="Cyberpunk Variants">
          <div className="flex flex-col gap-6 w-full items-center">
            <Button variant="glitch" className="w-full max-w-xs">
              Glitch Effect
            </Button>
            <Button variant="neon" className="w-full max-w-xs">
              Neon Effect
            </Button>
            <Button variant="ghost-glow" className="w-full max-w-xs">
              Ghost Glow
            </Button>
          </div>
        </Showcase>

        <Showcase title="With Icons">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button>
              <Mail className="mr-2 h-4 w-4" /> Login with Email
            </Button>
            <Button variant="secondary">
              Subscribe <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
            <Button variant="neon">
              <Zap className="mr-2 h-4 w-4" /> Activate Core
            </Button>
          </div>
        </Showcase>

        <Showcase title="States">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button disabled>Disabled</Button>
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
            <Button
              variant="outline"
              className="border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10"
            >
              Active State
            </Button>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
