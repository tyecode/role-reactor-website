"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CoreBalance } from "@/components/common/core-balance";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { GlobalSearch } from "@/components/common/global-search";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <header
        className="h-16 sticky top-0 z-50 flex items-center justify-between rounded-t-xl border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 ease-in-out"
        style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-primary/10 transition-colors" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          >
            <Search className="size-4" />
            <span className="text-xs">Search...</span>
            <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800/50 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="md:hidden"
          >
            <Search className="size-4" />
          </Button>
          <NotificationBell />
          <CoreBalance />
        </div>
      </header>
    </>
  );
}
