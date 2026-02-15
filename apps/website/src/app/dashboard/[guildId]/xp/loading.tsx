import { Skeleton } from "@/components/ui/skeleton";

export function LeaderboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Table Skeleton */}
      <Skeleton className="rounded-3xl p-0">
        <div className="h-12 bg-white/5 border-b border-white/5" />
        <div className="p-6 space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-2 w-20 rounded-full opacity-50" />
              </div>
              <Skeleton className="h-4 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </Skeleton>
    </div>
  );
}

export default function XPLoading() {
  return (
    <div className="space-y-8 pb-12 w-full min-w-0 overflow-x-hidden">
      {/* Page Header Skeleton */}
      <Skeleton className="h-32 w-full rounded-2xl mb-8" />
      <LeaderboardSkeleton />
    </div>
  );
}
