"use client";

import { useEffect } from "react";
import { ErrorView } from "@/components/common/error-view";

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
      <ErrorView
        title="Unexpected Error"
        message="The dashboard encountered an unexpected issue. Please try reloading the page or return to the main dashboard."
        errorId={error.digest}
        onRetry={reset}
        showHome={true}
      />
    </div>
  );
}
