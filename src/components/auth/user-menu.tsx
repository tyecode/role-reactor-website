"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

  // Check for session cookie on mount and when status changes
  useEffect(() => {
    setHasCookie(hasSessionCookie());
  }, [status]);

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
    <div className="relative flex items-center ml-2">
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
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={avatarUrl} alt={user.name || "User avatar"} />
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
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
