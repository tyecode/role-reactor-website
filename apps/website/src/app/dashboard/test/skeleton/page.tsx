"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";

export default function SkeletonTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Skeleton
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Use to show a placeholder while content is loading.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Profile Example">
          <div className="flex items-center space-x-4 w-full max-w-sm">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        </Showcase>

        <Showcase title="Content Card Example">
          <div className="flex flex-col space-y-3 w-full max-w-sm">
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
