"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export default function TooltipTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Tooltip
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          A popup that displays information related to an element when the
          element receives keyboard focus or the mouse hovers over it.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Default">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="mt-8 flex gap-4">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Instant</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Instant tooltip</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Delayed</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Standard delay</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
