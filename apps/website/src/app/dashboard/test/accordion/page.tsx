"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function AccordionTestPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Accordion
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Neural link collapsible data modules.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Data Protocol">
          <Accordion type="single" collapsible className="w-full max-w-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger>Access Protocol?</AccordionTrigger>
              <AccordionContent>
                Neural handshake confirmed. Adheres to all WAI-ARIA security
                patterns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Visual Synthesis?</AccordionTrigger>
              <AccordionContent>
                Interface aligned with high-fidelity cyberpunk aesthetic
                modules.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Kinetic Response?</AccordionTrigger>
              <AccordionContent>
                Fluid motion-capture animation enabled for all state
                transitions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Showcase>
      </div>
    </div>
  );
}
