import { NodeLoader } from "@/components/common/node-loader";

export default function GuildLoading() {
  return (
    <NodeLoader
      title="Loading Dashboard"
      subtitle="Synchronizing server data..."
    />
  );
}
