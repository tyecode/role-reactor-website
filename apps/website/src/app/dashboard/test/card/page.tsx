"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Showcase } from "@/components/ui/showcase";
import { BellRing, Check } from "lucide-react";

export default function CardTestPage() {
  const notifications = [
    {
      title: "Uplink confirmed.",
      description: "01:00 UTC",
    },
    {
      title: "New node detected!",
      description: "01:00 UTC",
    },
    {
      title: "Core power critical!",
      description: "02:00 UTC",
    },
  ];

  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Data Shells
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Encapsulated information containers.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <Showcase title="Auth Module">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-audiowide text-white uppercase text-lg">
                System Access
              </CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase">
                Initialize project link.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-zinc-500 font-mono text-xs uppercase"
                    >
                      Node Label
                    </Label>
                    <Input
                      id="name"
                      placeholder="Project name..."
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="font-mono text-xs uppercase">
                Abort
              </Button>
              <Button variant="neon" className="font-mono text-xs uppercase">
                Deploy
              </Button>
            </CardFooter>
          </Card>
        </Showcase>

        <Showcase title="Telemetry">
          <Card className="rounded-2xl w-full">
            <CardHeader>
              <CardTitle className="font-audiowide text-white uppercase text-lg">
                Notifications
              </CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase">
                3 unread signal packets.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 rounded-xl border border-white/5 p-4 bg-zinc-950/60 shadow-inner">
                <BellRing className="h-4 w-4 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold leading-none text-white font-mono uppercase">
                    Neural Push
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-tighter uppercase leading-none mt-1">
                    Direct feedback uplink.
                  </p>
                </div>
                <Switch className="scale-75" />
              </div>
              <div className="space-y-4 mt-2 px-1">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[10px_1fr] items-start pb-4 last:mb-0 last:pb-0 border-b border-white/5 last:border-0"
                  >
                    <span className="flex h-1.5 w-1.5 translate-y-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <div className="space-y-1 ml-2">
                      <p className="text-xs font-bold text-white font-mono uppercase">
                        {notification.title}
                      </p>
                      <p className="text-[9px] text-zinc-600 font-mono uppercase">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full font-mono text-xs uppercase"
                variant="outline"
              >
                <Check className="mr-2 h-3.5 w-3.5" /> Clear Logs
              </Button>
            </CardFooter>
          </Card>
        </Showcase>

        <Showcase title="Premium Link">
          <Card className="rounded-2xl w-full hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.2)] transition-all duration-500 cursor-pointer group bg-zinc-950/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-audiowide text-white uppercase text-lg group-hover:text-cyan-400 transition-colors">
                Tier: Elite
              </CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase">
                Unlock total control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-2 font-audiowide flex items-end gap-1">
                $29
                <span className="text-[10px] text-zinc-500 font-mono uppercase mb-1.5">
                  /CYC
                </span>
              </div>
              <ul className="space-y-3 mt-6">
                {["Neural Overdrive", "Kernel Access", "Direct Uplink"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest"
                    >
                      <Check className="h-3 w-3 text-cyan-500 mr-2" /> {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="neon"
                className="w-full font-mono text-xs uppercase"
              >
                Authorize Link
              </Button>
            </CardFooter>
          </Card>
        </Showcase>
      </div>
    </div>
  );
}
