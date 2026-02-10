"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DialogTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Dialog
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          A window overlaid on either the primary window or another dialog
          window, rendering the content underneath inert.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Basic Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Showcase>

        <Showcase
          title="Glitch Dialog"
          description="Glitch effect and sounds on open/close."
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="glitch">System Override</Button>
            </DialogTrigger>
            <DialogContent variant="glitch" className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle variant="glitch">System Override</DialogTitle>
                <DialogDescription variant="glitch">
                  Authorize critical system changes.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-4">
                <Alert variant="glitch">
                  <AlertDescription>
                    WARNING: This action will bypass safety protocols.
                  </AlertDescription>
                </Alert>
              </div>
              <DialogFooter>
                <Button variant="destructive-glitch">Abort</Button>
                <Button variant="neon">Confirm Override</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Showcase>
      </div>
    </div>
  );
}
