"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  History,
  Settings,
  Zap,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
} from "@role-reactor/ui/components/sidebar";
import { Button } from "@role-reactor/ui/components/button";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Image Generation",
    href: "/dashboard/generate",
    icon: ImageIcon,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  // Helper to determine if a link is active
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo.png"
              fill
              className="object-contain"
              alt="Role Reactor"
            />
          </div>
          <span className="font-bold text-lg tracking-tight">Role Reactor</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    size="lg"
                    className="rounded-xl transition-all duration-200"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-4 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-yellow-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="font-semibold text-foreground text-sm">
              Pro Plan
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Unlock advanced AI models and faster generation.
          </p>
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-lg text-white text-xs h-8"
          >
            <CreditCard className="w-3 h-3 mr-2" />
            Upgrade
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
