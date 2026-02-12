"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react";

export default function DropdownMenuTestPage() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Command Menus
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} Contextual execution branches.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Multi-Tier Hub">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="font-mono text-xs uppercase tracking-widest"
              >
                Invoke Hub
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-mono text-[10px] uppercase text-zinc-500 tracking-tighter">
                Current Host
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-1">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4 text-cyan-500" />
                  <span className="font-bold">Ident: Specter</span>
                  <DropdownMenuShortcut className="font-mono opacity-50 text-[9px]">
                    ⇧⌘P
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4 text-purple-400" />
                  <span>Credits</span>
                  <DropdownMenuShortcut className="font-mono opacity-50 text-[9px]">
                    ⌘B
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 text-zinc-400" />
                  <span>Terminal</span>
                  <DropdownMenuShortcut className="font-mono opacity-50 text-[9px]">
                    ⌘S
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Neural Invite</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Uplink Protocol</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Direct Sync</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Kernel More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-400 focus:text-red-300">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Disconnect</span>
                <DropdownMenuShortcut className="font-mono opacity-50 text-[9px]">
                  ⇧⌘Q
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Showcase>

        <Showcase title="Relay Position">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="font-mono text-xs uppercase tracking-widest"
              >
                Interface Anchor
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-mono text-[10px] uppercase text-zinc-500 px-2 pb-2">
                Select Sector
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem
                  value="top"
                  className="font-mono text-xs uppercase"
                >
                  Sector_Alpha
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="bottom"
                  className="font-mono text-xs uppercase"
                >
                  Sector_Omega
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="right"
                  className="font-mono text-xs uppercase"
                >
                  Relay_Node
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Showcase>
      </div>
    </div>
  );
}
