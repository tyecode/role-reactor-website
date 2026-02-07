import { useState, useEffect } from "react";
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
import { ChevronDown } from "lucide-react";

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
  const { channels, isLoading: channelsLoading } = useGuildChannels(guildId);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<XPSettings | null>(null);

  // Sync internal state with cached SWR data
  useEffect(() => {
    if (initialSettings && !settings) {
      // Extract the experienceSystem portion or use defaults
      const xpSettings = initialSettings.experienceSystem || {
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

  const updateSetting = (key: keyof XPSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const updateNestedSetting = (
    parent: keyof XPSettings,
    key: string,
    value: any
  ) => {
    if (!settings) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentObj = (settings as any)[parent];
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
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            <Settings2 className="w-6 h-6 text-primary" />
            XP Configuration
          </h2>
          <p className="text-muted-foreground mt-1">
            Customize how your community earns experience and levels up.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Main Feature Toggle */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label
                htmlFor="xp-enabled"
                className="text-lg font-medium text-primary"
              >
                Enable XP System
              </Label>
              <p className="text-sm text-muted-foreground">
                Turn the entire leveling system on or off.
              </p>
            </div>
            <Switch
              id="xp-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSetting("enabled", checked)}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </CardContent>
      </Card>

      <div
        className={cn(
          "grid gap-6 transition-opacity duration-300",
          !settings.enabled && "opacity-50 pointer-events-none"
        )}
      >
        {/* XP Sources Grid */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Earning Sources
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group bg-zinc-900/50 border-white/5 hover:border-blue-500/30 hover:bg-blue-500/2 transition-all duration-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10" />
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="p-2 w-fit rounded-md bg-blue-500/10 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <Label
                      htmlFor="message-xp"
                      className="text-base font-medium"
                    >
                      Message XP
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Users earn XP for sending messages.
                    </p>
                  </div>
                  <Switch
                    id="message-xp"
                    checked={settings.messageXP}
                    onCheckedChange={(checked) =>
                      updateSetting("messageXP", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="group bg-zinc-900/50 border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/2 transition-all duration-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10" />
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="p-2 w-fit rounded-md bg-cyan-500/10 text-cyan-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-5 h-5" />
                    </div>
                    <Label
                      htmlFor="command-xp"
                      className="text-base font-medium"
                    >
                      Command XP
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      XP for using application commands.
                    </p>
                  </div>
                  <Switch
                    id="command-xp"
                    checked={settings.commandXP}
                    onCheckedChange={(checked) =>
                      updateSetting("commandXP", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="group bg-zinc-900/50 border-white/5 hover:border-green-500/30 hover:bg-green-500/2 transition-all duration-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10" />
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="p-2 w-fit rounded-md bg-green-500/10 text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Mic className="w-5 h-5" />
                    </div>
                    <Label htmlFor="voice-xp" className="text-base font-medium">
                      Voice XP
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      XP for time spent in voice channels.
                    </p>
                  </div>
                  <Switch
                    id="voice-xp"
                    checked={settings.voiceXP}
                    onCheckedChange={(checked) =>
                      updateSetting("voiceXP", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="group bg-zinc-900/50 border-white/5 hover:border-purple-500/30 hover:bg-purple-500/2 transition-all duration-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10" />
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="p-2 w-fit rounded-md bg-purple-500/10 text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-5 h-5" />
                    </div>
                    <Label htmlFor="role-xp" className="text-base font-medium">
                      Role XP
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Periodic XP based on assigned roles.
                    </p>
                  </div>
                  <Switch
                    id="role-xp"
                    checked={settings.roleXP}
                    onCheckedChange={(checked) =>
                      updateSetting("roleXP", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* XP Rates */}
          <Card className="bg-zinc-900/50 border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-cyan-500" />
                XP Values
              </CardTitle>
              <CardDescription>
                Configure how much XP is awarded per action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
                  Message XP Range
                </Label>
                <div className="flex items-center gap-3 p-3 rounded-md bg-zinc-950/40 border border-white/5 focus-within:border-primary/50 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <Label
                      htmlFor="min-xp"
                      className="text-[10px] uppercase text-muted-foreground font-bold"
                    >
                      Minimum
                    </Label>
                    <Input
                      id="min-xp"
                      type="number"
                      className="h-8 bg-transparent border-none p-0 focus-visible:ring-0 text-white font-medium"
                      value={settings.messageXPAmount.min}
                      onChange={(e) =>
                        updateNestedSetting(
                          "messageXPAmount",
                          "min",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="space-y-1.5 flex-1 pl-1">
                    <Label
                      htmlFor="max-xp"
                      className="text-[10px] uppercase text-muted-foreground font-bold"
                    >
                      Maximum
                    </Label>
                    <Input
                      id="max-xp"
                      type="number"
                      className="h-8 bg-transparent border-none p-0 focus-visible:ring-0 text-white font-medium"
                      value={settings.messageXPAmount.max}
                      onChange={(e) =>
                        updateNestedSetting(
                          "messageXPAmount",
                          "max",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role-xp-amount">Role Award</Label>
                  <div className="relative">
                    <Input
                      id="role-xp-amount"
                      type="number"
                      className="pr-10 bg-zinc-950/50 border-white/10"
                      value={settings.roleXPAmount}
                      onChange={(e) =>
                        updateSetting(
                          "roleXPAmount",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                      XP
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="command-xp-amount">Command Award</Label>
                  <div className="relative">
                    <Input
                      id="command-xp-amount"
                      type="number"
                      className="pr-10 bg-zinc-950/50 border-white/10"
                      value={settings.commandXPAmount?.base ?? 8}
                      onChange={(e) =>
                        updateNestedSetting(
                          "commandXPAmount",
                          "base",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                      XP
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voice-xp-amount">Voice Award</Label>
                  <div className="relative">
                    <Input
                      id="voice-xp-amount"
                      type="number"
                      className="pr-10 bg-zinc-950/50 border-white/10"
                      value={settings.voiceXPAmount ?? 5}
                      onChange={(e) =>
                        updateSetting(
                          "voiceXPAmount",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                      XP
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cooldowns */}
          <Card className="bg-zinc-900/50 border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Cooldowns
              </CardTitle>
              <CardDescription>
                Prevents spam by limiting how often XP is earned.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="msg-cooldown">Message Cooldown</Label>
                    <span className="text-xs text-muted-foreground">
                      Default: 60s
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="msg-cooldown"
                      type="number"
                      className="pr-12 bg-zinc-950/50 border-white/10"
                      value={settings.messageCooldown}
                      onChange={(e) =>
                        updateSetting(
                          "messageCooldown",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                      Sec
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cmd-cooldown">Command Cooldown</Label>
                    <span className="text-xs text-muted-foreground">
                      Default: 30s
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="cmd-cooldown"
                      type="number"
                      className="pr-12 bg-zinc-950/50 border-white/10"
                      value={settings.commandCooldown}
                      onChange={(e) =>
                        updateSetting(
                          "commandCooldown",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                      Sec
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-orange-500/10 p-4 border border-orange-500/20">
                <p className="text-xs text-orange-200">
                  <span className="font-semibold block mb-1">Cooldown Tip</span>
                  Higher cooldowns help prevent spam, but setting them too high
                  might discourage user activity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-pink-500" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure level-up announcements and channels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-md bg-white/5 border border-white/10">
              <div className="space-y-1">
                <Label htmlFor="levelup-msg" className="text-base">
                  Level Up Messages
                </Label>
                <p className="text-xs text-muted-foreground">
                  Send a message when a user levels up
                </p>
              </div>
              <Switch
                id="levelup-msg"
                checked={settings.levelUpMessages}
                onCheckedChange={(checked) =>
                  updateSetting("levelUpMessages", checked)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="levelup-channel">Announcement Channel</Label>
              <div className="relative group">
                <select
                  id="levelup-channel"
                  className={cn(
                    "flex h-10 w-full rounded-md border border-white/10 bg-zinc-950/50 px-3 py-2 text-sm ring-offset-background appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all cursor-pointer hover:border-white/20",
                    channelsLoading && "animate-pulse"
                  )}
                  value={settings.levelUpChannel || ""}
                  onChange={(e) =>
                    updateSetting("levelUpChannel", e.target.value)
                  }
                >
                  <option value="" className="bg-zinc-900">
                    Current Channel (Context)
                  </option>
                  {channels.map((channel) => (
                    <option
                      key={channel.id}
                      value={channel.id}
                      className="bg-zinc-900"
                    >
                      # {channel.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground group-hover:text-white transition-colors">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Select where level up notifications should be sent.
              </p>
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
