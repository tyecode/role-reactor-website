import { NodeLoader } from "@/components/common/node-loader";

export default function CommandsLoading() {
  return (
    <NodeLoader
      title="Fetching Commands"
      subtitle="Synchronizing system settings..."
    />
  );
}
