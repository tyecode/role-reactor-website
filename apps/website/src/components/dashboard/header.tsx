"use client";

import { UserMenu } from "@/components/auth/user-menu";
import { SidebarTrigger } from "@role-reactor/ui/components/sidebar";
import { CoreBalance } from "./core-balance";

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-3">
        <CoreBalance />
      </div>
    </header>
  );
}
