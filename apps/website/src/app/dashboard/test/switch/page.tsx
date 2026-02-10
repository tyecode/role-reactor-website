"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function SwitchTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Switch
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          A control that allows the user to toggle between checked and not
          checked.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Default Switch">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>

          <div className="flex items-center space-x-2 mt-8">
            <Switch id="dark-mode" defaultChecked />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </Showcase>

        <Showcase title="Disabled State">
          <div className="flex items-center space-x-2">
            <Switch id="disabled" disabled />
            <Label htmlFor="disabled">Bluetooth (Disabled)</Label>
          </div>
          <div className="flex items-center space-x-2 mt-8">
            <Switch id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked">WiFi (Disabled)</Label>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
