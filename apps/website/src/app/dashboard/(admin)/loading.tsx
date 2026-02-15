"use client";

import { NodeLoader } from "@/components/common/node-loader";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <NodeLoader
        title="Loading Console"
        subtitle="Synchronizing administrative data..."
      />
    </div>
  );
}
