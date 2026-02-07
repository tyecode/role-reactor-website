"use client";

import * as React from "react";
import {
  LogOut,
  Plus,
  LayoutDashboard,
  Settings,
  ChevronUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface UserMenuUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface UserMenuProps {
  /** Current user data */
  user: UserMenuUser | null | undefined;
  /** Authentication status */
  status: "loading" | "authenticated" | "unauthenticated";
  /** User's core/credit balance */
  coreBalance?: number | null;
  /** Core balance image URL */
  coreImageUrl?: string;
  /** Called when user clicks login */
  onLogin?: () => void;
  /** Called when user clicks logout */
  onLogout?: () => void;
  /** Called when user clicks to add credits */
  onAddCredits?: () => void;
  /** Dashboard URL */
  dashboardUrl?: string;
  /** Settings URL */
  settingsUrl?: string;
  /** Whether to show dashboard link */
  showDashboardLink?: boolean;
  /** Whether to show settings link */
  showSettingsLink?: boolean;
  /** Whether to show core balance */
  showCoreBalance?: boolean;
  /** Variant for different layouts */
  variant?: "header" | "sidebar";
  /** Custom trigger element (for sidebar integration) */
  customTrigger?: React.ReactNode;
  /** Additional className for root element */
  className?: string;
  /** Dropdown side */
  side?: "top" | "bottom" | "left" | "right";
  /** Dropdown align */
  align?: "start" | "center" | "end";
}

// Helper function to get user initials
function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Helper function to get avatar URL
function getAvatarUrl(user: UserMenuUser): string {
  if (user.image) return user.image;
  if (user.id) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(user.id) % 5}.png`;
  }
  return `https://cdn.discordapp.com/embed/avatars/0.png`;
}

export function UserMenu({
  user,
  status,
  coreBalance,
  coreImageUrl = "/images/cores/core_energy.png",
  onLogin,
  onLogout,
  onAddCredits,
  dashboardUrl = "http://localhost:8888",
  settingsUrl = "/dashboard/settings",
  showDashboardLink = true,
  showSettingsLink = false,
  showCoreBalance = true,
  variant = "header",
  customTrigger,
  className,
  side = "bottom",
  align = "end",
}: UserMenuProps) {
  // Loading state
  if (status === "loading") {
    return (
      <div className={cn("relative flex items-center", className)}>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  // Unauthenticated state
  if (status === "unauthenticated" || !user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogin}
        aria-label="Login"
        title="Login"
        className={cn("h-8", className)}
      >
        Login
      </Button>
    );
  }

  const avatarUrl = getAvatarUrl(user);
  const isSidebar = variant === "sidebar";

  const defaultTrigger = isSidebar ? (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 px-2 py-6 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <Avatar className="h-8 w-8 rounded-lg shrink-0">
        <AvatarImage src={avatarUrl} alt={user.name || "User"} />
        <AvatarFallback className="rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-white text-xs">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
      <ChevronUp className="ml-auto size-4 shrink-0" />
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-md cursor-pointer"
      aria-label="User menu"
      title={user.name || "User menu"}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} alt={user.name || "User avatar"} />
        <AvatarFallback className="text-xs">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
    </Button>
  );

  return (
    <div
      className={cn("relative flex items-center gap-2", className)}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Core Balance Display (header variant only) */}
      {!isSidebar &&
        showCoreBalance &&
        coreBalance !== null &&
        coreBalance !== undefined && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-yellow-400 px-2"
            onClick={onAddCredits}
          >
            {coreImageUrl && (
              <Image
                src={coreImageUrl}
                width={18}
                height={18}
                alt="Cores"
                draggable={false}
                className="select-none"
              />
            )}
            <span className="font-semibold text-foreground">{coreBalance}</span>
            <div className="bg-primary/20 rounded-full p-0.5 ml-1">
              <Plus className="w-3 h-3 text-primary" />
            </div>
          </Button>
        )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {customTrigger || defaultTrigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          side={side}
          sideOffset={4}
          portal={!isSidebar}
          className={cn(
            "w-64 p-2 bg-zinc-950/95 backdrop-blur-sm border-zinc-800/60 shadow-xl rounded-lg",
            isSidebar && "w-[--radix-dropdown-menu-trigger-width] min-w-56"
          )}
        >
          <DropdownMenuLabel className="font-normal p-0 mb-2">
            <div className="flex items-center gap-3 px-2 py-1.5">
              <Avatar className="h-9 w-9 shrink-0 border border-border/50">
                <AvatarImage
                  src={avatarUrl}
                  alt={user.name || "User avatar"}
                  draggable={false}
                  className="select-none"
                />
                <AvatarFallback className="text-sm">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <span className="text-sm font-medium truncate leading-none mb-1">
                  {user.name}
                </span>
                {user.email && (
                  <span className="text-xs text-muted-foreground truncate leading-none">
                    {user.email}
                  </span>
                )}
              </div>
            </div>

            {/* Cores Section */}
            {showCoreBalance && (
              <div className="mt-2 p-3 bg-linear-to-br from-zinc-900 to-black rounded-lg border border-border/40 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                    {coreImageUrl && (
                      <Image
                        src={coreImageUrl}
                        width={32}
                        height={32}
                        alt="Cores"
                        draggable={false}
                        className="select-none"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Your Cores
                    </span>
                    <span className="text-base font-bold leading-tight font-mono text-foreground">
                      {coreBalance ?? 0}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 w-7 p-0 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/5 rounded-lg shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    onAddCredits?.();
                  }}
                  title="Add Cores"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </DropdownMenuLabel>

          <div className="px-1">
            <DropdownMenuSeparator className="-mx-1 my-1" />

            {/* Dashboard Link */}
            {showDashboardLink && (
              <DropdownMenuItem asChild>
                <a
                  href={dashboardUrl}
                  className="cursor-pointer flex items-center py-2.5 px-2 rounded-md transition-colors hover:bg-accent/50"
                >
                  <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Dashboard</span>
                </a>
              </DropdownMenuItem>
            )}

            {/* Settings Link */}
            {showSettingsLink && (
              <DropdownMenuItem asChild>
                <a
                  href={settingsUrl}
                  className="cursor-pointer flex items-center py-2.5 px-2 rounded-md transition-colors hover:bg-accent/50"
                >
                  <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Settings</span>
                </a>
              </DropdownMenuItem>
            )}

            {(showDashboardLink || showSettingsLink) && (
              <DropdownMenuSeparator className="-mx-1 my-1" />
            )}

            {/* Logout */}
            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10 flex items-center py-2.5 px-2 rounded-md"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-medium">Logout</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
