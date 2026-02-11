"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import {
  PanelRight,
  PanelLeft,
  PanelTop,
  PanelBottom,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";

const SheetDemo = ({
  side,
  icon: Icon,
}: {
  side: "top" | "right" | "bottom" | "left";
  icon: LucideIcon;
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        className="flex flex-col gap-2 h-20 w-full font-mono text-[10px] uppercase group"
      >
        <Icon className="h-5 w-5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
        {side}
      </Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle className="font-audiowide italic uppercase text-white">
          Neural Override
        </SheetTitle>
        <SheetDescription className="font-mono text-[10px] uppercase">
          Injecting terminal access via {side} port.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-6 py-6 border-y border-white/5 my-6">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="node-id"
            className="text-right font-mono text-[10px] uppercase text-zinc-500"
          >
            Node_ID
          </Label>
          <Input
            id="node-id"
            defaultValue="X-99"
            className="col-span-3 font-mono text-xs"
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="sync"
            className="text-right font-mono text-[10px] uppercase text-zinc-500"
          >
            Rate
          </Label>
          <Input
            id="sync"
            defaultValue="1.21 GW"
            className="col-span-3 font-mono text-xs"
            readOnly
          />
        </div>
      </div>
      <SheetFooter className="flex-col sm:flex-col gap-3">
        <SheetClose asChild>
          <Button variant="neon" className="w-full font-mono text-xs uppercase">
            <Zap className="h-3.5 w-3.5 mr-2" /> Execute Uplink
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            variant="ghost"
            className="w-full font-mono text-[10px] uppercase opacity-50 hover:opacity-100"
          >
            Abort_Process
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default function SheetTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Slide Panels
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Trans-dimensional interface overlays.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Injection Anchors">
          <div className="grid grid-cols-2 gap-4 w-full">
            <SheetDemo side="top" icon={PanelTop} />
            <SheetDemo side="bottom" icon={PanelBottom} />
            <SheetDemo side="left" icon={PanelLeft} />
            <SheetDemo side="right" icon={PanelRight} />
          </div>
        </Showcase>

        <Showcase
          title="System Settings"
          description="Persistent sidebar UI examples."
        >
          <div className="w-full h-40 bg-zinc-950/40 border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Settings className="h-8 w-8 text-zinc-700 group-hover:text-cyan-500/50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-90" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-400 mt-16 ml-2">
                Standby
              </span>
            </div>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
