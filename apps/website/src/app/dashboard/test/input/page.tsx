"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function InputTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Input
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Displays a form input field or a component that looks like an input
          field.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Default Input">
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <div className="space-y-2">
              <Input type="email" placeholder="Email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Text Input</Label>
              <Input id="text" type="text" placeholder="Type something..." />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
        </Showcase>

        <Showcase title="States & Variants">
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input disabled type="email" placeholder="Email" id="disabled" />
            </div>

            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Subscribe</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                type="search"
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
