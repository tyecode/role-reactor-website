import { NodeLoader } from "@/components/common/node-loader";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <NodeLoader
        title="Initializing Dashboard"
        subtitle="Preparing_System_Environment..."
      />
    </div>
  );
}
