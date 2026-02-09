"use client";

import { useSearchParams, usePathname, useParams } from "next/navigation";
import {
  LayoutDashboard,
  ChevronUp,
  ShieldCheck,
  Trophy,
  UserPlus,
  Vote,
  BarChart3,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/auth/user-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ServerSwitcher } from "./server-switcher";
import { useServerStore } from "@/store/use-server-store";
import { Suspense, useEffect } from "react";

// Helper to get avatar URL
function getAvatarUrl(user: { id?: string; image?: string | null }): string {
  if (user.image) return user.image;
  if (user.id) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(user.id) % 5}.png`;
  }
  return `https://cdn.discordapp.com/embed/avatars/0.png`;
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession(); // Reverted to original as the provided snippet was syntactically incorrect and would break functionality
  const { lastActiveGuildId, setLastActiveGuildId } = useServerStore();

  // Fix hydration mismatch: use a state for mounted to avoid using localStorage-based store values on server

  // The "Truth" of what server is currently being viewed (URL source)
  const activeGuildId = (params.guildId as string) || searchParams.get("guild");

  // Context ID should only be active if we are on a guild-specific route or if explicitly forced
  const contextId = activeGuildId;

  // Sync current selection to store ONLY if we have an explicit one from the URL
  useEffect(() => {
    if (activeGuildId && activeGuildId !== lastActiveGuildId) {
      setLastActiveGuildId(activeGuildId);
    }
  }, [activeGuildId, lastActiveGuildId, setLastActiveGuildId]);

  const getHref = (baseHref: string, isGuildSpecific: boolean) => {
    // If the route is guild-specific (like /dashboard/xp), we NEED a guildId
    if (isGuildSpecific) {
      if (contextId && baseHref.startsWith("/dashboard/")) {
        // Special case for overview: don't append extra segments
        if (baseHref === "/dashboard") return `/dashboard/${contextId}`;
        return baseHref.replace("/dashboard/", `/dashboard/${contextId}/`);
      }
      return baseHref;
    }

    // For general routes (generated image gallery, settings), we just go there.
    // Clean URLs only.
    return baseHref;
  };

  const getEngagementItems = () =>
    contextId
      ? [
          {
            title: "XP & Levels",
            href: getHref("/dashboard/xp", true),
            icon: Trophy,
          },
          {
            title: "Welcome System",
            href: getHref("/dashboard/welcome", true),
            icon: UserPlus,
            isComingSoon: true,
          },
          {
            title: "Polls",
            href: getHref("/dashboard/polls", true),
            icon: Vote,
            isComingSoon: true,
          },
          {
            title: "Analytics",
            href: getHref("/dashboard/analytics", true),
            icon: BarChart3,
            isComingSoon: true,
          },
        ]
      : [];

  const getSystemItems = () =>
    contextId
      ? [
          {
            title: "Command settings",
            href: getHref("/dashboard/commands", true),
            icon: Terminal,
          },
        ]
      : [];

  const getCoreItems = () => [
    {
      title: "Overview",
      href: contextId ? `/dashboard/${contextId}` : "/dashboard",
      icon: LayoutDashboard,
    },
    ...(contextId
      ? [
          {
            title: "Pro Engine",
            href: getHref("/dashboard/pro-engine", true),
            icon: Zap,
            badge: "PRO",
          },
          {
            title: "Reaction Roles",
            href: getHref("/dashboard/roles", true),
            icon: ShieldCheck,
          },
        ]
      : []),
  ];

  const isActive = (href: string) => {
    const cleanHref = href.split("?")[0].replace(/\/$/, "");
    const cleanPathname = pathname.split("?")[0].replace(/\/$/, "");

    // 1. Exact match for the main dashboard list
    if (cleanHref === "/dashboard") {
      return cleanPathname === "/dashboard";
    }

    // 2. Exact match for a specific Guild Overview (e.g. /dashboard/123)
    const guildRootRegex = /^\/dashboard\/[^\/]+$/;
    if (guildRootRegex.test(cleanHref)) {
      return cleanPathname === cleanHref;
    }

    // 3. Prefix match for everything else (features like XP, Roles, etc.)
    return cleanPathname.startsWith(cleanHref);
  };

  const NavGroup = ({
    label,
    items,
  }: {
    label: string;
    items: {
      title: string;
      href: string;
      icon: React.ElementType;
      isComingSoon?: boolean;
      badge?: string;
    }[];
  }) => {
    if (items.length === 0) return null;
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:px-0">
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 px-4">
          {label}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1 px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild={!item.isComingSoon}
                  isActive={isActive(item.href)}
                  tooltip={item.title}
                  disabled={item.isComingSoon}
                  className={cn(
                    "h-10 transition-all duration-300 rounded-lg group/btn relative overflow-hidden",
                    item.isComingSoon
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-white/5 active:scale-[0.98]",
                    isActive(item.href) &&
                      "bg-blue-500/10 text-blue-400 font-bold"
                  )}
                >
                  {item.isComingSoon ? (
                    <div className="flex items-center gap-3 w-full px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                      <item.icon className="size-4 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden text-xs font-bold truncate">
                        {item.title}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-auto text-[8px] h-4 px-1 py-0 border-zinc-800 text-zinc-600 group-data-[collapsible=icon]:hidden font-black uppercase tracking-tighter"
                      >
                        Soon
                      </Badge>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 w-full px-2 relative z-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                    >
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon
                        className={cn(
                          "size-4 shrink-0 transition-transform group-hover/btn:scale-110",
                          isActive(item.href)
                            ? "text-blue-400"
                            : "text-zinc-500"
                        )}
                      />
                      <span className="group-data-[collapsible=icon]:hidden text-xs truncate">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge className="ml-auto text-[9px] h-4 px-1.5 py-0 bg-blue-500/10 text-blue-400 hover:bg-blue-500/10 hover:text-blue-400 border-none group-data-[collapsible=icon]:hidden font-black uppercase">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  // Custom trigger following shadcn sidebar pattern
  const sidebarUserTrigger =
    status === "loading" ? (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-white/5 data-[state=open]:text-white"
        disabled
      >
        <Skeleton className="h-8 w-8 rounded-md shrink-0" />
        <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden rounded-md" />
      </SidebarMenuButton>
    ) : (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-white/5 data-[state=open]:text-white"
        tooltip={session?.user?.name || "Account"}
      >
        <Avatar className="h-8 w-8 rounded-md shrink-0">
          <AvatarImage
            src={getAvatarUrl(session?.user || {})}
            alt={session?.user?.name || "User"}
          />
          <AvatarFallback className="rounded-md bg-zinc-800 ring-1 ring-purple-500/40 text-zinc-400 text-xs font-bold">
            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
          <span className="truncate font-semibold">{session?.user?.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {session?.user?.email}
          </span>
        </div>
        <ChevronUp className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
      </SidebarMenuButton>
    );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-zinc-950"
      variant="inset"
    >
      <SidebarHeader>
        <Suspense fallback={<Skeleton className="h-12 w-full rounded-md" />}>
          <ServerSwitcher />
        </Suspense>
      </SidebarHeader>

      <SidebarContent>
        <NavGroup label="Main" items={getCoreItems()} />
        <NavGroup label="Engagement" items={getEngagementItems()} />
        <NavGroup label="System" items={getSystemItems()} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem>
            <UserMenu
              user={session?.user}
              status={status}
              coreImageUrl="/images/cores/core_energy.png"
              dashboardUrl="/dashboard"
              settingsUrl="/dashboard/settings"
              showDashboardLink={false}
              showSettingsLink={true}
              showCoreBalance={true}
              variant="sidebar"
              side="top"
              align="end"
              className="w-full group-data-[collapsible=icon]:justify-center"
              customTrigger={sidebarUserTrigger}
              hideUserInfo={true}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
