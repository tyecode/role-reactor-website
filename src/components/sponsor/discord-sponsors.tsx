"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Coffee, Calendar, DollarSign } from "lucide-react";

interface Supporter {
  id: string;
  name: string;
  amount: number;
  message: string;
  date: string;
  isMonthly: boolean;
  discordUsername: string | null;
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  avatar_url: string;
  verified: boolean;
}

interface BMCStats {
  totalSupporters: number;
  totalAmount: number;
  monthlyAmount: number;
  oneTimeAmount: number;
  thisMonth: number;
}

export function DiscordSponsors() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [stats, setStats] = useState<BMCStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSupporters();
  }, []);

  const fetchSupporters = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/kofi/donations");

      if (!response.ok) {
        throw new Error("Failed to fetch supporters");
      }

      const data = await response.json();
      setSupporters(data.supporters || []);
      setStats(data.stats);
    } catch (err) {
      console.error("Error fetching supporters:", err);
      setError("Failed to load supporters");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-indigo-700 dark:text-white/70">
          Loading supporters...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchSupporters}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
            <Coffee className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-900 dark:text-white">
              {stats.totalSupporters}
            </div>
            <div className="text-xs text-indigo-700 dark:text-white/70">
              Total Supporters
            </div>
          </div>
          <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
            <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-900 dark:text-white">
              {formatAmount(stats.totalAmount)}
            </div>
            <div className="text-xs text-indigo-700 dark:text-white/70">
              Total Raised
            </div>
          </div>
          <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
            <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-900 dark:text-white">
              {formatAmount(stats.thisMonth)}
            </div>
            <div className="text-xs text-indigo-700 dark:text-white/70">
              This Month
            </div>
          </div>
          <div className="text-center p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl">
            <Coffee className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-900 dark:text-white">
              {formatAmount(stats.monthlyAmount)}
            </div>
            <div className="text-xs text-indigo-700 dark:text-white/70">
              Monthly
            </div>
          </div>
        </div>
      )}

      {/* Recent Supporters */}
      <div>
        <h3 className="text-xl font-semibold text-indigo-900 dark:text-white mb-6 text-center">
          Recent Supporters
        </h3>

        {supporters.length === 0 ? (
          <div className="text-center py-8">
            <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No supporters yet. Be the first to support us!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supporters.map((supporter) => (
              <SupporterCard key={supporter.id} supporter={supporter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SupporterCard({ supporter }: { supporter: Supporter }) {
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (supporter.discordUsername) {
      fetchDiscordUser(supporter.discordUsername);
    }
  }, [supporter.discordUsername]);

  const fetchDiscordUser = async (username: string) => {
    try {
      const response = await fetch(
        `/api/discord/user?username=${encodeURIComponent(username)}`
      );

      if (response.ok) {
        const user = await response.json();
        setDiscordUser(user);
      }
    } catch (error) {
      console.error("Error fetching Discord user:", error);
    }
  };

  return (
    <div className="p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        {discordUser ? (
          <div className="relative">
            <Image
              src={discordUser.avatar_url}
              alt={discordUser.username}
              width={40}
              height={40}
              className="rounded-full"
            />
            {discordUser.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <Coffee className="w-5 h-5 text-indigo-500" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-indigo-900 dark:text-white truncate">
            {discordUser ? discordUser.username : supporter.name}
          </div>
          {discordUser && (
            <div className="text-sm text-indigo-700 dark:text-white/70">
              #{discordUser.discriminator}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            {supporter.amount ? `$${supporter.amount}` : "Thank you!"}
          </span>
          <span className="text-sm text-indigo-700 dark:text-white/70">
            {formatDate(supporter.date)}
          </span>
        </div>

        {supporter.isMonthly && (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
            <Coffee className="w-3 h-3" />
            Monthly
          </div>
        )}

        {supporter.message && (
          <p className="text-sm text-indigo-700 dark:text-white/70 italic">
            "{supporter.message}"
          </p>
        )}

        {discordUser && (
          <a
            href={`https://discord.com/users/${discordUser.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View Profile
          </a>
        )}
      </div>
    </div>
  );
}
