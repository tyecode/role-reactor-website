"use client";

import { useEffect, useState } from "react";
import { Server } from "lucide-react";
import { ServerTable } from "./_components/server-table";
import { ServerDetailsDialog } from "./_components/server-details-dialog";
import { ResetProEngineDialog } from "./_components/reset-pro-engine-dialog";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { Card, CardContent } from "@/components/ui/card";

interface GuildData {
  guildId: string;
  name: string;
  icon: string | null;
  ownerId: string;
  memberCount: number;
  status: "active" | "removed";
  joinedAt: string;
  leftAt: string | null;
}

export default function ServersPage() {
  const [guilds, setGuilds] = useState<GuildData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [selectedGuild, setSelectedGuild] = useState<GuildData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [resetGuild, setResetGuild] = useState<GuildData | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    fetchGuilds();
  }, []);

  const fetchGuilds = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/guilds/history");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch guilds");
      }

      setGuilds(data.data || []);
    } catch (err) {
      console.error("Failed to fetch guilds:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectServer = (guild: GuildData) => {
    setSelectedGuild(guild);
    setShowDetails(true);
  };

  const handleResetProEngine = (guild: GuildData) => {
    setResetGuild(guild);
    setShowResetDialog(true);
  };

  const handleResetFromDetails = () => {
    if (selectedGuild) {
      setShowDetails(false);
      setResetGuild(selectedGuild);
      setShowResetDialog(true);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Admin Monitoring"
        categoryIcon={Server}
        title="Server Management"
        description="View and manage all Discord servers the bot is currently installed in."
      />

      <Card variant="cyberpunk" className="border-white/5 bg-zinc-950/40">
        <CardContent className="p-0">
          {error ? (
            <div className="p-12 text-center">
              <p className="font-mono text-xs text-red-500 uppercase tracking-widest mb-4">
                {error}
              </p>
              <button
                onClick={fetchGuilds}
                className="font-mono text-xs text-cyan-500 hover:text-cyan-400 uppercase tracking-widest"
              >
                Retry
              </button>
            </div>
          ) : (
            <ServerTable
              guilds={guilds}
              isLoading={isLoading}
              onSelectServer={handleSelectServer}
              onResetProEngine={handleResetProEngine}
            />
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      {selectedGuild && (
        <ServerDetailsDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          guildId={selectedGuild.guildId}
          guildName={selectedGuild.name}
          guildIcon={selectedGuild.icon}
          onResetProEngine={handleResetFromDetails}
        />
      )}

      {/* Reset Dialog */}
      {resetGuild && (
        <ResetProEngineDialog
          open={showResetDialog}
          onOpenChange={setShowResetDialog}
          guildId={resetGuild.guildId}
          guildName={resetGuild.name}
        />
      )}
    </div>
  );
}
