"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCcw, Home, Terminal } from "lucide-react";
import { audiowide } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ErrorViewProps {
  title?: string;
  message?: string;
  errorId?: string;
  onRetry?: () => void;
  showHome?: boolean;
  className?: string;
}

export function ErrorView({
  title = "Unexpected Error",
  message = "The dashboard encountered an unexpected issue. Please try again.",
  errorId,
  onRetry,
  showHome = true,
  className,
}: ErrorViewProps) {
  return (
    <Card
      variant="cyberpunk"
      className={cn(
        "max-w-2xl w-full border-red-500/30 bg-black/60 backdrop-blur-xl relative overflow-hidden group mx-auto",
        "animate-in fade-in zoom-in-95 duration-500",
        className
      )}
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-1000" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-red-500/30 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-red-500/30 rounded-br-xl" />

      <CardContent className="p-8 md:p-14 text-center space-y-10 relative z-10">
        <div className="relative inline-block">
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl animate-pulse" />
          <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-red-500/20 to-transparent rounded-3xl border border-red-500/30 flex items-center justify-center mx-auto shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)] relative z-10">
            <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-950 border border-red-500/50 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20">
            <Terminal className="w-4 h-4 text-red-400" />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            className={cn(
              "text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic",
              audiowide.className
            )}
          >
            {title}
          </h2>
          <div className="space-y-4">
            <p className="text-zinc-400 text-sm md:text-base font-medium tracking-wide max-w-md mx-auto leading-relaxed">
              {message}
            </p>
            {errorId && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/10">
                <span className="text-[10px] font-mono text-red-500/60 uppercase tracking-widest">
                  Error Code:
                </span>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase transition-colors group-hover:text-red-300">
                  {errorId}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",
            onRetry && showHome ? "max-w-md mx-auto" : "w-auto"
          )}
        >
          {onRetry && (
            <Button
              onClick={onRetry}
              className="w-full sm:w-auto px-8 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest h-12 rounded-xl shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_-5px_rgba(239,68,68,0.6)] transition-all order-1 sm:order-2 active:scale-95"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          {showHome && (
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto px-8 border-white/10 hover:bg-white/5 text-zinc-400 font-black uppercase tracking-widest h-12 rounded-xl order-2 sm:order-1 active:scale-95"
            >
              <Link href="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                Return
              </Link>
            </Button>
          )}
        </div>

        <div className="pt-10 flex flex-col items-center gap-4">
          <div className="h-px w-24 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
          <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-red-500/50" />
            System Alert
            <span className="w-1 h-1 rounded-full bg-red-500/50" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
