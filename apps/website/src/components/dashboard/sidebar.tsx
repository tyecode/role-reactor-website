"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Settings,
  Zap,
  CreditCard,
  Sparkles,
  Home,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

const mainNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generate",
    href: "/dashboard/generate",
    icon: Sparkles,
  },
  {
    title: "Gallery",
    href: "/dashboard/history",
    icon: ImageIcon,
  },
];

const systemNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
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
  const { data: session, status } = useSession();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  // Custom trigger following shadcn sidebar pattern
  const sidebarUserTrigger =
    status === "loading" ? (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        disabled
      >
        <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
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
        <Avatar className="h-8 w-8 rounded-lg shrink-0">
          <AvatarImage
            src={getAvatarUrl(session.user)}
            alt={session.user.name || "User"}
          />
          <AvatarFallback className="rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-white text-xs">
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
      {/* Header with Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-sidebar-primary-foreground">
                  <Image
                    src="/logo.png"
                    width={20}
                    height={20}
                    className="object-contain w-full h-full"
                    alt="Role Reactor"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Role Reactor</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade Card - Hidden when collapsed */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-auto">
          <SidebarGroupContent>
            <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/10 p-3 border border-sidebar-border">
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-linear-to-br from-yellow-400 to-orange-500 rounded-md">
                    <Zap className="w-3 h-3 text-white fill-white" />
                  </div>
                  <span className="font-semibold text-sm">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Unlimited generations & priority support.
                </p>
                <SidebarMenuButton
                  asChild
                  className="w-full justify-center bg-linear-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                >
                  <Link href="/pricing">
                    <CreditCard className="w-4 h-4" />
                    <span>Upgrade Now</span>
                  </Link>
                </SidebarMenuButton>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Menu */}
      <SidebarFooter>
        <SidebarMenu>
          {/* Back to Website */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to Home">
              <Link href="/">
                <Home />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

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
                showCoreBalance={false}
                variant="sidebar"
                side="top"
                align="end"
                className="w-full"
                customTrigger={sidebarUserTrigger}
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
