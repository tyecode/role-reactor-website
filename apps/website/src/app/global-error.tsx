"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Something went wrong
              </h1>
              <p className="text-muted-foreground">
                We&apos;re sorry, but an unexpected error occurred. Please try
                again.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && error.message && (
              <div className="rounded-lg border bg-muted p-4 text-left">
                <code className="text-xs text-muted-foreground">
                  {error.message}
                </code>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={reset} className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
