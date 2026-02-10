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

const SheetDemo = ({ side }: { side: "top" | "right" | "bottom" | "left" }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="w-24 capitalize">
        {side}
      </Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value="Pedro Duarte"
            className="col-span-3"
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            value="@peduarte"
            className="col-span-3"
            readOnly
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default function SheetTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Sheet
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Extends the Dialog component to display content that complements the
          main screen.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Variants">
          <div className="grid grid-cols-2 gap-4">
            <SheetDemo side="top" />
            <SheetDemo side="bottom" />
            <SheetDemo side="left" />
            <SheetDemo side="right" />
          </div>
        </Showcase>
      </div>
    </div>
  );
}
