import { NodeLoader } from "@/components/common/node-loader";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <NodeLoader
        title="Loading Dashboard"
        subtitle="Synchronizing your preferences..."
      />
    </div>
  );
}
