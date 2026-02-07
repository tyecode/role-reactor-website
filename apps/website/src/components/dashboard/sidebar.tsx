"use client";

import { usePathname, useParams, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Settings,
  Zap,
  CreditCard,
  Sparkles,
  Home,
  ChevronUp,
  ShieldCheck,
  Trophy,
  UserPlus,
  Vote,
  BarChart3,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
import { Suspense } from "react";

const aiNavItems = [
  {
    title: "Avatar Studio",
    href: "/dashboard/generate",
    icon: Sparkles,
    badge: "Beta",
  },
  {
    title: "Gallery",
    href: "/dashboard/history",
    icon: ImageIcon,
  },
];

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
  const { data: session, status } = useSession();

  const guildId = (params.guildId as string) || searchParams.get("guild");

  const getHref = (baseHref: string, isGuildSpecific: boolean) => {
    if (!isGuildSpecific) return baseHref;

    // If we need a guildId but don't have one, just stay on dashboard
    // or handle the "Select a server" prompt
    if (!guildId) return "/dashboard";

    // Replace /dashboard/feature with /dashboard/[guildId]/feature
    if (baseHref.startsWith("/dashboard/")) {
      return baseHref.replace("/dashboard/", `/dashboard/${guildId}/`);
    }
    return baseHref;
  };

  const getEngagementItems = () => [
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
  ];

  const getSystemItems = () => [
    {
      title: "Command settings",
      href: getHref("/dashboard/commands", true),
      icon: Terminal,
    },
  ];

  const getCoreItems = () => [
    {
      title: "Overview",
      href: guildId ? `/dashboard/${guildId}` : "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Reaction Roles",
      href: getHref("/dashboard/roles", true),
      icon: ShieldCheck,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const NavGroup = ({ label, items }: { label: string; items: any[] }) => (
    <SidebarGroup>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!item.isComingSoon}
                isActive={isActive(item.href)}
                tooltip={item.title}
                disabled={item.isComingSoon}
                className={
                  item.isComingSoon ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                {item.isComingSoon ? (
                  <div className="flex items-center gap-2 w-full">
                    <item.icon className="size-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="ml-auto text-[10px] h-4 px-1 py-0 border-zinc-800 text-zinc-500 group-data-[collapsible=icon]:hidden"
                    >
                      Soon
                    </Badge>
                  </div>
                ) : (
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    {item.badge && (
                      <Badge className="ml-auto text-[10px] h-4 px-1 py-0 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-none group-data-[collapsible=icon]:hidden">
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

  // Custom trigger following shadcn sidebar pattern
  const sidebarUserTrigger =
    status === "loading" ? (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        disabled
      >
        <Skeleton className="h-8 w-8 rounded-md shrink-0" />
        <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden rounded-md" />
      </SidebarMenuButton>
    ) : session?.user ? (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        tooltip={session.user.name || "Account"}
      >
        <Avatar className="h-8 w-8 rounded-md shrink-0">
          <AvatarImage
            src={getAvatarUrl(session.user)}
            alt={session.user.name || "User"}
          />
          <AvatarFallback className="rounded-md bg-linear-to-br from-blue-500 to-purple-600 text-white text-xs">
            {session.user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
          <span className="truncate font-semibold">{session.user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {session.user.email}
          </span>
        </div>
        <ChevronUp className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
      </SidebarMenuButton>
    ) : null;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border"
      variant="inset"
    >
      {/* Header with Server Switcher */}
      <SidebarHeader>
        <Suspense fallback={<Skeleton className="h-12 w-full rounded-md" />}>
          <ServerSwitcher />
        </Suspense>
      </SidebarHeader>

      {/* Navigation Groups */}
      <SidebarContent>
        <NavGroup label="Main" items={getCoreItems()} />
        <NavGroup label="AI Tools" items={aiNavItems} />
        <NavGroup label="Engagement" items={getEngagementItems()} />
        <NavGroup label="System" items={getSystemItems()} />
      </SidebarContent>

      {/* Footer with User Menu */}
      <SidebarFooter>
        <SidebarMenu>
          {/* User Account - Using Shared UserMenu */}
          {status !== "unauthenticated" && (
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
                className="w-full"
                customTrigger={sidebarUserTrigger}
                hideUserInfo={true}
              />
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail for hover-to-expand */}
      <SidebarRail />
    </Sidebar>
  );
}
