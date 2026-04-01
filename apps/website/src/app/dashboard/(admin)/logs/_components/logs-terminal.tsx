"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  memo,
  useMemo,
  useDeferredValue,
  useCallback,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  RefreshCw,
  Terminal,
  Pause,
  Play,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SystemLogsTerminalProps {
  initialLogs: string[];
}

const processLog = (line: string) => {
  // Basic color coding for log levels
  if (line.includes("[ERROR]") || line.includes("❌"))
    return <span className="text-red-500 font-bold">{line}</span>;
  if (line.includes("[WARN]") || line.includes("⚠️"))
    return <span className="text-yellow-500">{line}</span>;
  if (line.includes("[SUCCESS]") || line.includes("✅"))
    return <span className="text-green-500">{line}</span>;
  if (line.includes("[DEBUG]") || line.includes("🔍"))
    return <span className="text-zinc-500">{line}</span>;
  if (line.includes("[INFO]") || line.includes("ℹ️"))
    return <span className="text-cyan-400">{line}</span>;

  return <span className="text-zinc-300">{line}</span>;
};

const LogLine = memo(({ line }: { line: string }) => {
  return (
    <div className="whitespace-pre-wrap break-all hover:bg-white/5 px-2 py-0.5 rounded transition-colors border-l-2 border-transparent hover:border-cyan-500/50">
      {processLog(line)}
    </div>
  );
});

LogLine.displayName = "LogLine";

export function SystemLogsTerminal({ initialLogs }: SystemLogsTerminalProps) {
  const [logs, setLogs] = useState<string[]>(initialLogs);
  const [isRefreshing, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Memoize filtered logs to prevent calculation on every render
  // and use deferredSearchTerm to keep UI responsive
  const filteredLogs = useMemo(() => {
    let result = logs;

    // Filter by level
    if (levelFilter !== "ALL") {
      result = result.filter((log) => log.includes(`[${levelFilter}]`));
    }

    // Filter by search term
    if (deferredSearchTerm) {
      const lowerTerm = deferredSearchTerm.toLowerCase();
      result = result.filter((log) => log.toLowerCase().includes(lowerTerm));
    }

    return result;
  }, [logs, deferredSearchTerm, levelFilter]);

  const rowVirtualizer = useVirtualizer({
    count: filteredLogs.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 22,
    overscan: 24,
  });

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/proxy/logs?limit=100");
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data = await res.json();

        if (data && data.logs) {
          setLogs((prevLogs) => {
            // Simple approach to append only new logs based on unique content
            // This assumes log lines are generally unique (timestamped)
            const existingSet = new Set(prevLogs);
            const newLines = data.logs.filter(
              (line: string) => !existingSet.has(line)
            );

            if (newLines.length === 0) return prevLogs;

            // Keep history capped at 2000 lines to prevent memory issues
            const updatedLogs = [...prevLogs, ...newLines];
            if (updatedLogs.length > 2000) {
              return updatedLogs.slice(updatedLogs.length - 2000);
            }
            return updatedLogs;
          });
        }
      } catch (error) {
        console.error("Failed to refresh logs", error);
      }
    });
  };

  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Handle scroll events to detect if user is at bottom
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const bottomThreshold = 50; // pixels from bottom
      const isBottom =
        scrollHeight - scrollTop - clientHeight < bottomThreshold;

      setIsNearBottom(isBottom);
      setShowScrollBottom(!isBottom);
    }
  }, []);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Smart auto-scroll: Only scroll if user was already at bottom or just loaded
  useEffect(() => {
    if (scrollRef.current && isNearBottom) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isNearBottom]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Smart polling mechanism
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const poll = async () => {
      // Don't poll if component unmounted
      if (!isActive) return;

      // Don't poll if document is hidden (user switched tabs)
      if (typeof document !== "undefined" && document.hidden) {
        timeoutId = setTimeout(poll, 1000); // Check visibility again in 1s
        return;
      }

      await new Promise<void>((resolve) => {
        startTransition(async () => {
          try {
            const res = await fetch("/api/proxy/logs?limit=100");
            if (!res.ok) throw new Error("Failed to fetch logs");
            const data = await res.json();

            if (data && data.logs && isActive) {
              setLogs((prevLogs) => {
                const existingSet = new Set(prevLogs);
                const newLines = data.logs.filter(
                  (line: string) => !existingSet.has(line)
                );

                if (newLines.length === 0) return prevLogs;

                const updatedLogs = [...prevLogs, ...newLines];
                if (updatedLogs.length > 2000) {
                  return updatedLogs.slice(updatedLogs.length - 2000);
                }
                return updatedLogs;
              });
            }
          } catch (error) {
            console.error("Failed to refresh logs", error);
          } finally {
            resolve();
          }
        });
      });

      // Schedule next poll only after current one finishes
      if (isActive) {
        timeoutId = setTimeout(poll, 3000);
      }
    };

    if (autoRefresh) {
      poll();
    }

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [autoRefresh]);

  return (
    <Card
      variant="cyberpunk"
      className="border-white/10 bg-black/80 backdrop-blur-xl h-[600px] flex flex-col overflow-hidden"
    >
      <CardHeader className="border-b border-white/5 pb-4 bg-zinc-950/50 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg italic font-mono flex items-center gap-2">
            <Terminal className="size-4 text-cyan-500" />
            Terminal Output
          </CardTitle>
          <CardDescription className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            Monitoring system events...
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-48 group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
            <Input
              placeholder="Filter logs..."
              className="h-8 pl-8 text-[10px] font-mono bg-zinc-900/50 border-white/10 focus-visible:ring-cyan-500/30 text-zinc-400 placeholder:text-zinc-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="h-8 w-[130px] bg-zinc-900/50 border-white/10 text-[10px] font-mono text-zinc-400">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL LEVELS</SelectItem>
              <SelectItem value="INFO">INFO</SelectItem>
              <SelectItem value="WARN">WARN</SelectItem>
              <SelectItem value="ERROR">ERROR</SelectItem>
              <SelectItem value="DEBUG">DEBUG</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 transition-all border-white/10 bg-zinc-900/50 hover:bg-zinc-800",
              autoRefresh &&
                "bg-cyan-500/10 border-cyan-500/50 text-cyan-500 animate-pulse"
            )}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title={autoRefresh ? "Pause Auto-Refresh" : "Start Auto-Refresh"}
          >
            {autoRefresh ? (
              <Pause className="size-3" />
            ) : (
              <Play className="size-3" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-white/10 bg-zinc-900/50 hover:bg-zinc-800 hover:text-cyan-400"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={cn("size-3", isRefreshing && "animate-spin")}
            />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea
        className="flex-1 min-h-0 bg-black/90 relative"
        viewportRef={scrollRef}
      >
        <div className="p-4 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-2 opacity-50 py-12">
              <Terminal className="size-8" />
              <p className="tracking-widest uppercase text-[10px]">
                No logs available
              </p>
            </div>
          ) : (
            <div
              className="relative w-full"
              style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const line = filteredLogs[virtualRow.index] ?? "";
                return (
                  <div
                    key={`${virtualRow.index}-${line}`}
                    className="absolute left-0 top-0 w-full"
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <LogLine line={line} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Cursor Effect */}
          <div className="sticky bottom-0 mt-2 h-4 w-2 bg-cyan-500 animate-pulse" />
        </div>
      </ScrollArea>

      <div className="p-2 bg-zinc-950/80 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500 font-mono uppercase tracking-widest px-4 relative">
        {showScrollBottom && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 bottom-12 z-10 rounded-full h-8 w-8 p-0 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-in fade-in slide-in-from-bottom-2 flex items-center justify-center"
            onClick={scrollToBottom}
          >
            <ChevronDown className="size-4" />
          </Button>
        )}
        <span>Lines: {filteredLogs.length}</span>
        <span>
          Status:{" "}
          {isRefreshing || autoRefresh ? (
            <span className="text-cyan-500 animate-pulse">Running</span>
          ) : (
            "Idle"
          )}
        </span>
      </div>
    </Card>
  );
}
