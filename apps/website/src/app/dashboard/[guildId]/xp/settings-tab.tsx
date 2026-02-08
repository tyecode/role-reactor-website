/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Save,
  MessageSquare,
  Mic,
  Shield,
  Zap,
  Clock,
  Bell,
  Settings2,
  AlertCircle,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useXPSettings } from "@/hooks/use-xp-settings";
import { useGuildChannels } from "@/hooks/use-guild-channels";

interface XPSettings {
  enabled: boolean;
  messageXP: boolean;
  commandXP: boolean;
  roleXP: boolean;
  voiceXP: boolean;
  messageXPAmount: { min: number; max: number };
  roleXPAmount: number;
  commandXPAmount: { base: number };
  voiceXPAmount: number;
  messageCooldown: number;
  commandCooldown: number;
  levelUpMessages: boolean;
  levelUpChannel?: string;
}

interface SettingsTabProps {
  guildId: string;
}

export function XPSettingsTab({ guildId }: SettingsTabProps) {
  const {
    settings: initialSettings,
    isLoading,
    isError,
    mutate,
  } = useXPSettings(guildId);
  const { mutate: globalMutate } = useSWRConfig();
  const { channels } = useGuildChannels(guildId);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<XPSettings | null>(null);

  // Sync internal state with cached SWR data
  useEffect(() => {
    if (initialSettings && !settings) {
      const defaults: XPSettings = {
        enabled: false,
        messageXP: true,
        commandXP: true,
        roleXP: true,
        voiceXP: true,
        messageXPAmount: { min: 15, max: 25 },
        roleXPAmount: 50,
        commandXPAmount: { base: 8 },
        voiceXPAmount: 5,
        messageCooldown: 60,
        commandCooldown: 30,
        levelUpMessages: true,
      };

      // Merge current settings with defaults to ensure new fields are populated
      const xpSettings = initialSettings.experienceSystem
        ? { ...defaults, ...initialSettings.experienceSystem }
        : defaults;

      setSettings(xpSettings);
    }
  }, [initialSettings, settings]);

  const handleSave = async () => {
    if (!guildId || !settings) return;

    setSaving(true);
    try {
      const payload = {
        experienceSystem: settings,
      };

      const response = await fetch(`/api/guilds/${guildId}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Settings saved successfully");
        // Update the SWR cache with the new values
        mutate();
        // Force refresh leaderboard as well
        globalMutate(`/api/guilds/${guildId}/leaderboard?limit=100`);
      } else {
        throw new Error(data.message || "Failed to save settings");
      }
    } catch (err: any) {
      console.error("Error saving XP settings:", err);
      toast.error(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = <T extends keyof XPSettings>(
    key: T,
    value: XPSettings[T]
  ) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const updateNestedSetting = <T extends "messageXPAmount" | "commandXPAmount">(
    parent: T,
    key: string,
    value: number
  ) => {
    if (!settings) return;
    const parentObj = settings[parent] as any;
    setSettings({
      ...settings,
      [parent]: { ...parentObj, [key]: value },
    });
  };

  if (isLoading && !settings) {
    return <SettingsSkeleton />;
  }

  if (isError && !settings) {
    return (
      <Alert
        variant="destructive"
        className="bg-red-500/10 border-red-500/20 rounded-xl"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {isError.message ||
            "Failed to load settings. Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Settings2 className="w-5 h-5 text-blue-400" />
            </div>
            System Configuration
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            Fine-tune how your community interacts with the leveling system.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 px-6 rounded-lg border-t border-white/20 shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Update Configuration
        </Button>
      </div>

      {/* Main Feature Toggle */}
      <Card
        className={cn(
          "border-white/5 bg-zinc-900/40 backdrop-blur-xl relative overflow-hidden transition-all duration-500",
          settings.enabled
            ? "border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
            : "opacity-70"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-1">
              <Label
                htmlFor="xp-enabled"
                className="text-lg font-bold text-white cursor-pointer"
              >
                XP & Leveling System
              </Label>
              <p className="text-sm text-zinc-500 max-w-xl">
                Enabling this will allow users to earn experience, gain levels,
                and unlock rewards across the server.
              </p>
            </div>
            <Switch
              id="xp-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSetting("enabled", checked)}
              className="data-[state=checked]:bg-blue-500 scale-110"
            />
          </div>
        </CardContent>
      </Card>

      <div
        className={cn(
          "grid gap-8 transition-all duration-500",
          !settings.enabled &&
            "opacity-40 grayscale pointer-events-none translate-y-2"
        )}
      >
        {/* XP Sources Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 px-1">
            <Zap className="w-3.5 h-3.5" />
            Experience Sources
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "messageXP",
                label: "Message Activity",
                icon: MessageSquare,
                color: "blue",
                desc: "Earn XP via chat",
              },
              {
                id: "commandXP",
                label: "Bot Commands",
                icon: Zap,
                color: "yellow",
                desc: "Earn XP via commands",
              },
              {
                id: "voiceXP",
                label: "Voice Channels",
                icon: Mic,
                color: "green",
                desc: "Earn XP while talking",
              },
              {
                id: "roleXP",
                label: "Passive Roles",
                icon: Shield,
                color: "purple",
                desc: "Earn XP periodically",
              },
            ].map((source) => (
              <Card
                key={source.id}
                className="group bg-zinc-900/50 border-white/5 hover:border-white/10 transition-all duration-300 rounded-xl overflow-hidden relative"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110",
                          source.color === "blue" &&
                            "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                          source.color === "yellow" &&
                            "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
                          source.color === "green" &&
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                          source.color === "purple" &&
                            "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        )}
                      >
                        <source.icon className="w-5 h-5" />
                      </div>
                      <Switch
                        id={source.id}
                        checked={
                          settings[source.id as keyof XPSettings] as boolean
                        }
                        onCheckedChange={(checked) =>
                          updateSetting(source.id as any, checked)
                        }
                        className="scale-90"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor={source.id}
                        className="text-sm font-bold text-white cursor-pointer"
                      >
                        {source.label}
                      </Label>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        {source.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* XP Rates */}
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-sm shadow-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2 font-bold">
                <Hash className="w-4 h-4 text-blue-400" />
                Experience Scaling
              </CardTitle>
              <CardDescription className="text-xs">
                Control the density of experience points awarded.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] uppercase text-zinc-500 font-black tracking-widest">
                  Chat Message Range (Randomized)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="min-xp"
                      className="text-[11px] text-zinc-400 font-medium"
                    >
                      Minimum
                    </Label>
                    <div className="relative group">
                      <Input
                        id="min-xp"
                        type="number"
                        className="bg-zinc-950/50 border-white/10 h-10 px-4 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all font-mono"
                        value={settings.messageXPAmount.min}
                        onChange={(e) =>
                          updateNestedSetting(
                            "messageXPAmount",
                            "min",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-600 uppercase tracking-tighter">
                        MIN
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="max-xp"
                      className="text-[11px] text-zinc-400 font-medium"
                    >
                      Maximum
                    </Label>
                    <div className="relative group">
                      <Input
                        id="max-xp"
                        type="number"
                        className="bg-zinc-950/50 border-white/10 h-10 px-4 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all font-mono"
                        value={settings.messageXPAmount.max}
                        onChange={(e) =>
                          updateNestedSetting(
                            "messageXPAmount",
                            "max",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-600 uppercase tracking-tighter">
                        MAX
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "commandXPAmount",
                    label: "Command",
                    parent: true,
                    icon: Zap,
                  },
                  { id: "voiceXPAmount", label: "Voice/Min", icon: Mic },
                  { id: "roleXPAmount", label: "Role/Hr", icon: Shield },
                ].map((item) => (
                  <div key={item.id} className="space-y-2">
                    <Label className="text-[11px] text-zinc-400 font-medium flex items-center gap-1.5">
                      <item.icon className="w-3 h-3" />
                      {item.label}
                    </Label>
                    <Input
                      id={item.id}
                      type="number"
                      className="bg-zinc-950/50 border-white/10 h-10 rounded-xl focus:border-blue-500/50 font-mono text-center"
                      value={
                        item.parent
                          ? ((settings as any)[item.id]?.base ?? 0)
                          : ((settings as any)[item.id] ?? 0)
                      }
                      onChange={(e) => {
                        if (item.parent)
                          updateNestedSetting(
                            item.id as any,
                            "base",
                            parseInt(e.target.value) || 0
                          );
                        else
                          updateSetting(
                            item.id as any,
                            parseInt(e.target.value) || 0
                          );
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cooldowns */}
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-sm shadow-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2 font-bold">
                <Clock className="w-4 h-4 text-orange-400" />
                Rate Limiting
              </CardTitle>
              <CardDescription className="text-xs">
                Prevent automated experience farming.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="msg-cooldown"
                      className="text-[11px] text-zinc-400 font-medium"
                    >
                      Chat Message Cooldown
                    </Label>
                  </div>
                  <div className="relative group">
                    <Input
                      id="msg-cooldown"
                      type="number"
                      className="bg-zinc-950/50 border-white/10 h-10 px-4 rounded-xl focus:border-orange-500/50 font-mono"
                      value={settings.messageCooldown}
                      onChange={(e) =>
                        updateSetting(
                          "messageCooldown",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                      SEC
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="cmd-cooldown"
                      className="text-[11px] text-zinc-400 font-medium"
                    >
                      Command Usage Cooldown
                    </Label>
                  </div>
                  <div className="relative group">
                    <Input
                      id="cmd-cooldown"
                      type="number"
                      className="bg-zinc-950/50 border-white/10 h-10 px-4 rounded-xl focus:border-orange-500/50 font-mono"
                      value={settings.commandCooldown}
                      onChange={(e) =>
                        updateSetting(
                          "commandCooldown",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                      SEC
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/20 flex gap-3">
                <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <p className="text-[11px] text-orange-200/70 leading-relaxed font-medium">
                  Optimizing cooldowns helps maintain server health. High
                  traffic servers benefit from 60-90s message cooldowns.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Bell className="w-24 h-24 rotate-12" />
          </div>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <Bell className="w-4 h-4 text-pink-400" />
              Announcements
            </CardTitle>
            <CardDescription className="text-xs">
              Manage how and where level-up notifications are delivered.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
              <div className="space-y-1">
                <Label
                  htmlFor="levelup-msg"
                  className="text-sm font-bold text-white"
                >
                  Level Up Broadcasts
                </Label>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Trigger an automated celebratory message on level advancement.
                </p>
              </div>
              <Switch
                id="levelup-msg"
                checked={settings.levelUpMessages}
                onCheckedChange={(checked) =>
                  updateSetting("levelUpMessages", checked)
                }
                className="data-[state=checked]:bg-pink-500"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="levelup-channel"
                className="text-[11px] text-zinc-400 font-medium px-1"
              >
                Delivery Destination
              </Label>
              <div className="w-full">
                <Select
                  value={settings.levelUpChannel || "none"}
                  onValueChange={(value) =>
                    updateSetting(
                      "levelUpChannel",
                      value === "none" ? "" : value
                    )
                  }
                >
                  <SelectTrigger
                    id="levelup-channel"
                    className="w-full h-11 bg-zinc-950/50 border-white/10 rounded-xl focus:ring-pink-500/20 focus:border-pink-500/50 transition-all text-white font-medium hover:bg-zinc-950/80"
                  >
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl shadow-2xl backdrop-blur-xl">
                    <SelectItem
                      value="none"
                      className="focus:bg-white/5 focus:text-white cursor-pointer py-2.5"
                    >
                      Context (Current Channel)
                    </SelectItem>
                    {channels.map((channel) => (
                      <SelectItem
                        key={channel.id}
                        value={channel.id}
                        className="focus:bg-white/5 focus:text-white cursor-pointer py-2.5"
                      >
                        # {channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-zinc-900" />
          <Skeleton className="h-4 w-64 bg-zinc-900" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md bg-zinc-900" />
      </div>

      {/* Main Feature Toggle Skeleton */}
      <div className="h-20 w-full rounded-xl bg-zinc-900/40 border border-white/5" />

      {/* Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl bg-zinc-900/40" />
        ))}
      </div>

      {/* Settings Sections Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-64 rounded-xl bg-zinc-900/40" />
        <Skeleton className="h-64 rounded-xl bg-zinc-900/40" />
      </div>
    </div>
  );
}
