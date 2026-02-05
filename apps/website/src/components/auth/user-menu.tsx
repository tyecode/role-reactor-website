"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut, Zap, Plus, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@role-reactor/ui/components/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@role-reactor/ui/components/avatar";
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
      cookie.trim().startsWith("__Secure-next-auth.session-token="),
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

      <div className="relative flex items-center gap-2 ml-2">
        {/* Core Balance Display (optional, can be just inside dropdown) */}
        {coreBalance !== null && (
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-1.5 text-muted-foreground hover:text-yellow-400 px-2"
            onClick={() => setIsPricingOpen(true)}
          >
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
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
              className="h-8 w-8 rounded-md"
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
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage
                    src={avatarUrl}
                    alt={user.name || "User avatar"}
                  />
                  <AvatarFallback className="text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                  <span className="text-sm font-medium truncate">
                    {user.name}
                  </span>
                  {user.email && (
                    <span className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Cores in Dropdown */}
              <div className="p-2 bg-muted/50 rounded-lg flex items-center justify-between border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-500/10 rounded-md">
                    <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Cores
                    </span>
                    <span className="text-sm font-bold leading-none">
                      {coreBalance ?? "..."}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPricingOpen(true);
                  }}
                >
                  Add Cores
                </Button>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard" className="cursor-pointer flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-950/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
