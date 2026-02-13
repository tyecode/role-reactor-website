"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCcw, Home, Terminal } from "lucide-react";
import { Audiowide } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card
        variant="cyberpunk"
        className="max-w-2xl w-full border-red-500/30 bg-black/60 backdrop-blur-xl relative overflow-hidden group"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-700" />

        <CardContent className="p-8 md:p-12 text-center space-y-8 relative z-10">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-red-500/10 rounded-3xl border border-red-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-950 border border-red-500/50 rounded-full flex items-center justify-center">
              <Terminal className="w-4 h-4 text-red-400" />
            </div>
          </div>

          <div className="space-y-4">
            <h2
              className={cn(
                "text-3xl md:text-4xl font-black text-white tracking-tight uppercase italic",
                audiowide.className
              )}
            >
              System_Critical_Error
            </h2>
            <div className="space-y-2">
              <p className="text-zinc-400 text-sm font-medium tracking-wide max-w-md mx-auto">
                An unexpected failure occurred in the dashboard uplink. The
                current operation has been terminated to protect data integrity.
              </p>
              {error.digest && (
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  Error Code: {error.digest}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Button
              onClick={reset}
              className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest h-12 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all order-1 sm:order-2"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reboot Terminal
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-zinc-400 font-black uppercase tracking-widest h-12 rounded-lg order-2 sm:order-1"
            >
              <Link href="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                Return to Core
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">
              Uplink status: offline // Sector: dashboard_core
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
