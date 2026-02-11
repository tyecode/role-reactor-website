"use client";

import { Button } from "@/components/ui/button";
import { Plus, Server } from "lucide-react";

import { links } from "@/constants/links";

export function NoServerState() {
  const inviteUrl = links.inviteBot;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-4">
      <div className="bg-muted rounded-full p-4">
        <Server className="w-12 h-12 text-muted-foreground" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight">
          Ready to Level Up Your Server?
        </h2>
        <p className="text-muted-foreground text-sm">
          To start creating reaction roles, you first need to invite Role
          Reactor to one of your servers.
        </p>
      </div>

      <Button asChild size="lg">
        <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
          <Plus className="w-4 h-4 mr-2" />
          Add to New Server
        </a>
      </Button>
    </div>
  );
}
