import { NodeLoader } from "@/components/common/node-loader";

export default function DashboardLoading() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
      <NodeLoader
        title="Loading Dashboard"
        subtitle="Synchronizing your data..."
      />
    </div>
  );
}
