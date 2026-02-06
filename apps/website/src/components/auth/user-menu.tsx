"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Plus, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@role-reactor/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@role-reactor/ui/components/avatar";
import { Button } from "@role-reactor/ui/components/button";
import { Skeleton } from "@role-reactor/ui/components/skeleton";
import { PricingDialog } from "@/components/pricing/pricing-dialog";

// Helper function to check if session cookie exists
function hasSessionCookie(): boolean {
  if (typeof document === "undefined") return false;

  // NextAuth v5 uses different cookie names, check for common ones
  const cookies = document.cookie.split(";");
  return cookies.some(
    (cookie) =>
      cookie.trim().startsWith("authjs.session-token=") ||
      cookie.trim().startsWith("__Secure-authjs.session-token=") ||
      cookie.trim().startsWith("next-auth.session-token=") ||
      cookie.trim().startsWith("__Secure-next-auth.session-token=")
  );
}

export function UserMenu() {
  const { data: session, status } = useSession();
  const [hasCookie, setHasCookie] = useState(false);
  const [coreBalance, setCoreBalance] = useState<number | null>(null);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Check for session cookie on mount and when status changes
  useEffect(() => {
    setHasCookie(hasSessionCookie());
  }, [status]);

  // Fetch core balance when session is active
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/pricing?user_id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data?.user) {
            setCoreBalance(data.data.user.currentCredits);
          }
        })
        .catch((err) => console.error("Failed to fetch core balance:", err));
    }
  }, [session, isPricingOpen]); // Re-fetch when pricing dialog closes (after potential purchase)

  // Show loading skeleton when checking authentication status
  // Only show skeleton if we have a session cookie (user might be logged in)
  if (status === "loading") {
    if (hasCookie || session) {
      return (
        <div className="relative flex items-center ml-2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      );
    }
    // No cookie and no session - show Login button (disabled)
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const currentPath =
            typeof window !== "undefined" ? window.location.pathname : "/";
          signIn("discord", { callbackUrl: currentPath });
        }}
        aria-label="Login"
        title="Login"
        className="h-8 ml-2"
        disabled
      >
        Login
      </Button>
    );
  }

  // Show Login button when unauthenticated or no session
  if (status === "unauthenticated" || !session) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const currentPath =
            typeof window !== "undefined" ? window.location.pathname : "/";
          signIn("discord", { callbackUrl: currentPath });
        }}
        aria-label="Login"
        title="Login"
        className="h-8 ml-2"
      >
        Login
      </Button>
    );
  }

  const { user } = session;

  // Construct avatar URL - use user.image if available, otherwise fallback to default Discord avatar
  const avatarUrl = user.image
    ? user.image
    : user.id
      ? `https://cdn.discordapp.com/embed/avatars/${Number(user.id) % 5}.png`
      : `https://cdn.discordapp.com/embed/avatars/0.png`;

  // Get user initials for fallback
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <PricingDialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
        <span className="hidden" />
      </PricingDialog>

      <div
        className="relative flex items-center gap-2 ml-2"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Core Balance Display (optional, can be just inside dropdown) */}
        {coreBalance !== null && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-yellow-400 px-2"
            onClick={() => setIsPricingOpen(true)}
          >
            <Image
              src="/images/cores/core_energy.png"
              width={18}
              height={18}
              alt="Cores"
              draggable={false}
            />
            <span className="font-semibold text-foreground">{coreBalance}</span>
            <div className="bg-primary/20 rounded-full p-0.5 ml-1">
              <Plus className="w-3 h-3 text-primary" />
            </div>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            portal={false}
            className="w-64 p-2 bg-zinc-950/95 backdrop-blur-sm border-zinc-800/60 shadow-xl"
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

              {/* Cores in Dropdown */}
              <div className="mt-2 p-3 bg-linear-to-br from-zinc-900 to-black rounded-lg border border-border/40 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                    <Image
                      src="/images/cores/core_energy.png"
                      width={32}
                      height={32}
                      alt="Cores"
                      draggable={false}
                      className="select-none"
                    />
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
                    setIsPricingOpen(true);
                  }}
                  title="Add Cores"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </DropdownMenuLabel>

            <div className="px-1">
              <DropdownMenuSeparator className="-mx-1 my-1" />
              <DropdownMenuItem asChild>
                <a
                  href="/dashboard"
                  className="cursor-pointer flex items-center py-2.5 px-2 rounded-md transition-colors hover:bg-accent/50"
                >
                  <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Dashboard</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="-mx-1 my-1" />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10 flex items-center py-2.5 px-2 rounded-md"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
