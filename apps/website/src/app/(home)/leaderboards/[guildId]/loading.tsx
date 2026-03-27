import { NodeLoader } from "@/components/common/node-loader";

export default function LeaderboardLoading() {
  return (
    <NodeLoader
      title="Loading Leaderboard"
      subtitle="Fetching server rankings..."
    />
  );
}
