"use client";

import { useState, useEffect } from "react";
import { Crown, Star, Heart, Coffee, Shield } from "lucide-react";
import { Sponsor, getSponsors } from "@/lib/sponsors";

const tierConfig = {
  gold: {
    icon: Crown,
    color: "from-yellow-400 to-yellow-600",
    bgColor:
      "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
    borderColor: "border-yellow-200 dark:border-yellow-700",
    textColor: "text-yellow-800 dark:text-yellow-200",
    label: "Gold Sponsor",
  },
  silver: {
    icon: Star,
    color: "from-gray-400 to-gray-600",
    bgColor:
      "from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20",
    borderColor: "border-gray-200 dark:border-gray-600",
    textColor: "text-gray-700 dark:text-gray-300",
    label: "Silver Sponsor",
  },
  bronze: {
    icon: Heart,
    color: "from-orange-400 to-orange-600",
    bgColor:
      "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-800 dark:text-orange-200",
    label: "Bronze Sponsor",
  },
  supporter: {
    icon: Coffee,
    color: "from-blue-400 to-blue-600",
    bgColor:
      "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    borderColor: "border-blue-200 dark:border-blue-700",
    textColor: "text-blue-800 dark:text-blue-200",
    label: "Supporter",
  },
};

export function SponsorBoard() {
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getSponsors();
        setSponsors(data);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const filteredSponsors =
    selectedTier === "all"
      ? sponsors
      : sponsors.filter((sponsor) => sponsor.tier === selectedTier);

  const tierCounts = {
    all: sponsors.length,
    gold: sponsors.filter((s) => s.tier === "gold").length,
    silver: sponsors.filter((s) => s.tier === "silver").length,
    bronze: sponsors.filter((s) => s.tier === "bronze").length,
    supporter: sponsors.filter((s) => s.tier === "supporter").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading sponsors...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { key: "all", label: "All Sponsors", count: tierCounts.all },
          { key: "gold", label: "Gold", count: tierCounts.gold },
          { key: "silver", label: "Silver", count: tierCounts.silver },
          { key: "bronze", label: "Bronze", count: tierCounts.bronze },
          {
            key: "supporter",
            label: "Supporters",
            count: tierCounts.supporter,
          },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setSelectedTier(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedTier === key
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white/60 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-900/80"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Sponsors Leaderboard */}
      {filteredSponsors.length > 0 ? (
        <div className="space-y-4">
          {/* Leaderboard Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Sponsor Leaderboard</h3>
            <p className="text-blue-100">
              Thank you to all our amazing supporters! 🎉
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sponsors.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Sponsors
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                $
                {sponsors.reduce((sum, sponsor) => {
                  const amount = parseFloat(
                    sponsor.amount.replace("$", "").replace("/month", "")
                  );
                  return sum + amount;
                }, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Monthly Total
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {tierCounts.gold}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Gold Sponsors
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {tierCounts.supporter}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Supporters
              </div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-3">
            {filteredSponsors
              .sort((a, b) => {
                // Sort by tier first, then by amount
                const tierOrder = {
                  gold: 4,
                  silver: 3,
                  bronze: 2,
                  supporter: 1,
                };
                const tierDiff = tierOrder[b.tier] - tierOrder[a.tier];
                if (tierDiff !== 0) return tierDiff;

                // If same tier, sort by amount (extract number from string)
                const amountA = parseFloat(
                  a.amount.replace("$", "").replace("/month", "")
                );
                const amountB = parseFloat(
                  b.amount.replace("$", "").replace("/month", "")
                );
                return amountB - amountA;
              })
              .map((sponsor, index) => {
                const config = tierConfig[sponsor.tier];
                const IconComponent = config.icon;
                const isTopThree = index < 3;

                return (
                  <div
                    key={sponsor.id}
                    className={`group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                      isTopThree
                        ? "border-yellow-400 dark:border-yellow-500 shadow-lg"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                          index === 0
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                            : index === 1
                            ? "bg-gradient-to-br from-gray-300 to-gray-500"
                            : index === 2
                            ? "bg-gradient-to-br from-orange-400 to-orange-600"
                            : "bg-gradient-to-br from-blue-400 to-blue-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Sponsor Content */}
                    <div className="ml-16 flex items-center justify-between">
                      {/* Left Side - Sponsor Info */}
                      <div className="flex items-center gap-4 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {sponsor.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Name and Tier */}
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            {sponsor.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-5 h-5 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center`}
                            >
                              <IconComponent className="w-3 h-3 text-white" />
                            </div>
                            <span
                              className={`text-sm font-medium ${config.textColor}`}
                            >
                              {config.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Amount and Message */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {sponsor.amount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          per month
                        </div>
                        {sponsor.message && (
                          <div className="mt-2 max-w-xs">
                            <p className="text-xs text-gray-600 dark:text-gray-400 italic truncate">
                              "{sponsor.message}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Special Badges for Top 3 */}
                    {isTopThree && (
                      <div className="absolute top-2 right-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : index === 1
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                          }`}
                        >
                          {index === 0
                            ? "🥇 Top Supporter"
                            : index === 1
                            ? "🥈 Silver"
                            : "🥉 Bronze"}
                        </div>
                      </div>
                    )}

                    {/* Join Date */}
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                      Since {new Date(sponsor.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No sponsors in this tier yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to support us at this level!
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center pt-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Become a Sponsor?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our amazing community of sponsors and help us keep Role Reactor
            free for everyone. Choose your support level and make a difference
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              View Support Options
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
