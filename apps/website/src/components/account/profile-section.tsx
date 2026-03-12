"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Link as LinkIcon, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";

export function ProfileSection() {
  const { data: session, update } = useSession();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const getAvatarUrl = () => {
    if (session?.user?.image) return session.user.image;
    if (session?.user?.id) {
      return `https://cdn.discordapp.com/embed/avatars/${Number(session.user.id) % 5}.png`;
    }
    return `https://cdn.discordapp.com/embed/avatars/0.png`;
  };

  const getDiscordId = () => session?.user?.id || "N/A";
  const getUsername = () => session?.user?.name || "Unknown";
  const getEmail = () => session?.user?.email || "N/A";

  const handleRefreshData = async () => {
    try {
      await update();
      toast.success("Discord data refreshed successfully!");
    } catch {
      toast.error("Failed to refresh Discord data");
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar & Username Card */}
      <Card className="bg-zinc-950/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white font-bold text-lg">
            Public Profile
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Your Discord identity as it appears across the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl group-hover:bg-cyan-500/30 transition-all" />
              <Avatar className="h-24 w-24 rounded-2xl ring-2 ring-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] relative z-10">
                <AvatarImage
                  src={getAvatarUrl()}
                  alt={getUsername()}
                  width={96}
                  height={96}
                />
                <AvatarFallback className="rounded-2xl bg-zinc-900 border border-white/10 text-cyan-400 text-2xl font-mono">
                  {getUsername().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Username Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-2xl font-black text-white",
                    audiowide.className
                  )}
                >
                  {getUsername()}
                </span>
                <Badge
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                >
                  <LinkIcon className="w-3 h-3 mr-1" />
                  Discord Linked
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">
                Your username is pulled directly from your Discord account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details Card */}
      <Card className="bg-zinc-950/50 border-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white font-bold text-lg">
                Account Details
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Read-only information from your Discord account
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefreshData}
              className="text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Discord User ID */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
              Discord User ID
            </Label>
            <div className="flex gap-2">
              <Input
                value={getDiscordId()}
                readOnly
                className="flex-1 bg-zinc-900/50 border-white/10 text-zinc-300 font-mono text-sm h-10"
              />
              <Button
                variant={copiedField === "id" ? "default" : "secondary"}
                size="sm"
                onClick={() => copyToClipboard(getDiscordId(), "User ID")}
                className={cn(
                  "h-10 px-4 transition-all",
                  copiedField === "id"
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5"
                )}
              >
                {copiedField === "id" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-zinc-500">
              Your unique Discord identifier - useful for support tickets
            </p>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
              Email Address
            </Label>
            <div className="flex gap-2">
              <Input
                value={getEmail()}
                readOnly
                className="flex-1 bg-zinc-900/50 border-white/10 text-zinc-300 font-mono text-sm h-10"
              />
              <Button
                variant={copiedField === "email" ? "default" : "secondary"}
                size="sm"
                onClick={() => copyToClipboard(getEmail(), "Email")}
                className={cn(
                  "h-10 px-4 transition-all",
                  copiedField === "email"
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5"
                )}
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-zinc-500">
              The email address associated with your Discord account
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts Card */}
      <Card className="bg-zinc-950/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white font-bold text-lg">
            Connected Accounts
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Services and platforms linked to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#5865F2]/10 rounded-xl border border-[#5865F2]/30">
                <svg
                  className="w-6 h-6 text-[#5865F2]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Discord</div>
                <div className="text-xs text-zinc-500">
                  Connected as {getUsername()}
                </div>
              </div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Check className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
