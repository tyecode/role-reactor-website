"use client";

import { Loader2, Trophy, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Supporter {
  userId: string;
  username: string | null;
  totalDonated: number;
  totalCores: number;
  paymentCount: number;
  rank: number;
}

interface SupporterLeaderboardProps {
  supporters: Supporter[];
  totalRaised: number;
  loading: boolean;
}

export function SupporterLeaderboard({
  supporters,
  totalRaised,
  loading,
}: SupporterLeaderboardProps) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 opacity-30" />

      <div className="max-w-[1120px] mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 leading-tight">
            Our Supporters
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6">
            Shoutout to everyone who's chipped in! Your support helps keep Role Reactor free and lets us build new stuff. You're the real MVPs.
          </p>
          {totalRaised > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-lg font-bold text-white">
                ${totalRaised.toFixed(2)} raised
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-400 mb-4" />
            <p className="text-gray-300">Loading supporters...</p>
          </div>
        ) : supporters.length === 0 ? (
          <Card className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center">
            <CardContent className="p-12 py-24">
              <Users className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
              <CardTitle className="text-xl font-semibold text-white mb-2">
                Be the First!
              </CardTitle>
              <p className="text-sm text-gray-400 mb-6">
                Want to help out? Grab some Core Energy and unlock AI features while keeping Role Reactor free for everyone else.
              </p>
              <Button
                onClick={() => {
                  // Scroll to top of page where payment section is
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Top 3 Supporters */}
            {supporters.slice(0, 3).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {supporters.slice(0, 3).map((supporter, index) => (
                  <Card
                    key={supporter.userId}
                    className={`relative bg-gray-900/60 backdrop-blur-sm border rounded-xl transition-all duration-300 hover:bg-gray-900/80 ${
                      index === 0
                        ? "border-amber-500/50"
                        : index === 1
                        ? "border-gray-600/50"
                        : "border-orange-500/50"
                    }`}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="absolute top-4 right-4">
                        <Trophy
                          className={`w-6 h-6 ${
                            index === 0
                              ? "text-amber-400"
                              : index === 1
                              ? "text-gray-400"
                              : "text-orange-400"
                          }`}
                        />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white mb-2">
                        #{supporter.rank}
                      </CardTitle>
                      <p className="text-lg font-semibold text-white mb-2">
                        {supporter.username ||
                          `User ${supporter.userId.slice(0, 8)}`}
                      </p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        ${supporter.totalDonated.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-400">
                        {supporter.totalCores} Cores • {supporter.paymentCount}{" "}
                        payment{supporter.paymentCount !== 1 ? "s" : ""}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Full Leaderboard */}
            {supporters.length > 3 && (
              <Card className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
                <CardHeader className="border-b border-gray-700/50">
                  <CardTitle className="text-lg font-semibold text-white">
                    All Supporters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-700/50">
                    {supporters.slice(3).map((supporter) => (
                      <div
                        key={supporter.userId}
                        className="p-4 hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-xl font-bold text-blue-400 w-8">
                              #{supporter.rank}
                            </div>
                            <div>
                              <div className="font-semibold text-white">
                                {supporter.username ||
                                  `User ${supporter.userId.slice(0, 8)}`}
                              </div>
                              <div className="text-sm text-gray-400">
                                {supporter.totalCores} Cores •{" "}
                                {supporter.paymentCount} payment
                                {supporter.paymentCount !== 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ${supporter.totalDonated.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
