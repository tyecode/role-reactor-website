"use client";

import { useEffect, useState } from "react";
import { Users, Server, Star, Coffee } from "lucide-react";

interface BotStats {
  servers: number;
  users: number;
  rating: number;
  supporters: number;
}

export function StatsWidget() {
  const [stats, setStats] = useState<BotStats>({
    servers: 0,
    users: 0,
    rating: 0,
    supporters: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-indigo-200/30 dark:border-white/10 rounded-lg"
          >
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-2 animate-pulse" />
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-1 animate-pulse" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mx-auto animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-indigo-200/30 dark:border-white/10 rounded-lg">
        <Server className="w-6 h-6 text-blue-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-indigo-900 dark:text-white">
          {stats.servers > 0 ? formatNumber(stats.servers) : "0"}
        </div>
        <div className="text-xs text-indigo-700 dark:text-white/70">
          Servers
        </div>
      </div>

      <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-indigo-200/30 dark:border-white/10 rounded-lg">
        <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-indigo-900 dark:text-white">
          {stats.users > 0 ? formatNumber(stats.users) : "0"}
        </div>
        <div className="text-xs text-indigo-700 dark:text-white/70">Users</div>
      </div>

      <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-indigo-200/30 dark:border-white/10 rounded-lg">
        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-indigo-900 dark:text-white">
          {stats.rating > 0 ? stats.rating.toFixed(1) : "0.0"}
        </div>
        <div className="text-xs text-indigo-700 dark:text-white/70">Rating</div>
      </div>

      <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-indigo-200/30 dark:border-white/10 rounded-lg">
        <Coffee className="w-6 h-6 text-orange-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-indigo-900 dark:text-white">
          {stats.supporters > 0 ? stats.supporters.toString() : "0"}
        </div>
        <div className="text-xs text-indigo-700 dark:text-white/70">
          Supporters
        </div>
      </div>
    </div>
  );
}
