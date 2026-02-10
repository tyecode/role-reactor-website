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
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Card
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Displays a card with header, content, and footer.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Simple Card */}
        {/* Simple Card */}
        <Showcase title="Simple Card">
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </Showcase>

        {/* Notifications Card */}
        {/* Notifications Card */}
        <Showcase title="Notifications">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border border-white/5 p-4 bg-zinc-900/50">
                <BellRing className="h-4 w-4 text-cyan-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    Push Notifications
                  </p>
                  <p className="text-sm text-zinc-400">
                    Send notifications to device.
                  </p>
                </div>
                <Switch />
              </div>
              <div>
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-cyan-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="neon">
                <Check className="mr-2 h-4 w-4" /> Mark all as read
              </Button>
            </CardFooter>
          </Card>
        </Showcase>

        {/* Payment Method Card */}
        {/* Payment Method Card */}
        <Showcase title="Interactive">
          <Card className="w-full hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <CardTitle className="group-hover:text-cyan-400 transition-colors">
                Premium Plan
              </CardTitle>
              <CardDescription>Unlock all features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-2">
                $29
                <span className="text-lg text-zinc-500 font-normal">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300 mt-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-cyan-500 mr-2" /> Unlimited
                  Projects
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-cyan-500 mr-2" /> Priority
                  Support
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-cyan-500 mr-2" /> Advanced
                  Analytics
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full group-hover:bg-cyan-500 group-hover:text-black transition-all">
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </Showcase>
      </div>
    </div>
  );
}
