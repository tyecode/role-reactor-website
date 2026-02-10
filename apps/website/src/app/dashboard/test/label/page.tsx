"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LabelTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Label
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Renders an accessible label associated with controls.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Default Variants</h3>
          <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl flex flex-col gap-8 justify-center min-h-[300px]">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded-sm border border-zinc-700 bg-zinc-900 text-cyan-500 shadow-sm focus:ring-1 focus:ring-cyan-500"
              />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 text-zinc-300">
              <Label htmlFor="email">Email address</Label>
              <div className="text-sm mt-1">
                Please enter your email address.
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 text-zinc-300">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="w-full h-20 p-2 rounded-md bg-zinc-900/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
