"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Command,
  Zap,
  BarChart3,
  Trophy,
  ShieldCheck,
  MessageSquare,
  Terminal,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  category: "feature" | "setting" | "page" | "admin";
}

const searchItems: SearchResult[] = [
  {
    title: "Dashboard",
    description: "Go to your dashboard",
    icon: Command,
    href: "/dashboard",
    category: "page",
  },
  {
    title: "Pro Engine",
    description: "Manage premium features",
    icon: Zap,
    href: "/dashboard/pro-engine",
    category: "feature",
  },
  {
    title: "Analytics",
    description: "View server analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    category: "feature",
  },
  {
    title: "XP & Levels",
    description: "Configure leveling system",
    icon: Trophy,
    href: "/dashboard/xp",
    category: "feature",
  },
  {
    title: "Reaction Roles",
    description: "Manage role assignments",
    icon: ShieldCheck,
    href: "/dashboard/roles",
    category: "feature",
  },
  {
    title: "Welcome System",
    description: "Set up welcome messages",
    icon: MessageSquare,
    href: "/dashboard/welcome",
    category: "feature",
  },
  {
    title: "Commands",
    description: "Configure bot commands",
    icon: Terminal,
    href: "/dashboard/commands",
    category: "setting",
  },
  {
    title: "User Profile",
    description: "Manage your account",
    icon: Users,
    href: "/dashboard/profile",
    category: "page",
  },
  {
    title: "Billing",
    description: "Manage payments",
    icon: FileText,
    href: "/dashboard/billing",
    category: "page",
  },
  {
    title: "Settings",
    description: "Server settings",
    icon: Settings,
    href: "/dashboard/config",
    category: "admin",
  },
];

const categoryLabels: Record<string, string> = {
  feature: "Features",
  setting: "Settings",
  page: "Pages",
  admin: "Admin",
};

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results =
    query === ""
      ? searchItems
      : searchItems.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onOpenChange(false);
      setQuery("");
    },
    [router, onOpenChange]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length
        );
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex].href);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, handleSelect, onOpenChange]);

  const groupedResults = results.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchResult[]>
  );

  let globalIdx = -1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden bg-zinc-950 border-zinc-800">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/50">
          <div className="flex items-center gap-2 pl-3">
            <Search className="size-4 text-zinc-500 shrink-0" />
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, features, settings..."
            className="flex-1 bg-zinc-900/50 border-0 focus-visible:ring-0 text-zinc-100 placeholder:text-zinc-500 text-sm"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800/50 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500">
              <Search className="size-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="mb-3">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  {categoryLabels[category] || category}
                </div>
                {items.map((item) => {
                  globalIdx++;
                  const isSelected = globalIdx === selectedIndex;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                        isSelected
                          ? "bg-cyan-500/10 text-cyan-100"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "size-4 shrink-0",
                          isSelected ? "text-cyan-400" : "text-zinc-500"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            "text-sm font-medium truncate",
                            isSelected && "text-cyan-400"
                          )}
                        >
                          {item.title}
                        </div>
                        <div className="text-xs text-zinc-500 truncate">
                          {item.description}
                        </div>
                      </div>
                      {isSelected && (
                        <kbd className="text-[10px] text-zinc-500 hidden sm:inline-flex">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-800/50 text-[10px] text-zinc-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono">
                ↵
              </kbd>{" "}
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono">
              esc
            </kbd>{" "}
            Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
