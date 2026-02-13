"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { CoreBalance } from "@/components/common/core-balance";

export function DashboardHeader() {
  return (
    <header className="h-16 sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 rounded-t-xl border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-primary/10 transition-colors" />
      </div>

      <div className="flex items-center gap-3">
        <CoreBalance />
      </div>
    </header>
  );
}
