"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscordPreview } from "./discord-preview";
import { PremiumGuard } from "../../../_components/premium-guard";
import { useRoleBuilder, type ReactionMapping } from "@/hooks/use-role-builder";
import {
  EmojiPicker,
  EmojiPickerTrigger,
  EmojiPickerContent,
  EmojiDisplay,
} from "@/components/ui/emoji-picker";
import { NodeLoader } from "@/components/common/node-loader";
import {
  Plus,
  Trash2,
  Rocket,
  Shield,
  Info,
  Layers,
  MousePointer2,
  ShieldCheck,
  Zap,
  Hash,
} from "lucide-react";
import { DiscordRole, DiscordChannel, DiscordEmoji } from "@/types/discord";

const PRESET_COLORS = [
  { name: "Default", hex: "#9b8bf0" },
  { name: "Neon Blue", hex: "#00BFFF" },
  { name: "Matrix Green", hex: "#00FF00" },
  { name: "Cyber Red", hex: "#FF0040" },
  { name: "Electric Yellow", hex: "#FFFF00" },
  { name: "Quantum Purple", hex: "#8A2BE2" },
  { name: "Plasma Orange", hex: "#FF4500" },
  { name: "Synth Pink", hex: "#FF1493" },
  { name: "Hologram Cyan", hex: "#00FFFF" },
  { name: "Steel Brown", hex: "#8B4513" },
  { name: "Chrome Gray", hex: "#C0C0C0" },
];

function toHex(decimal: number) {
  if (!decimal || decimal === 0) return "#b9bbbe";
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

export function RoleBuilder({ guildId: propGuildId }: { guildId?: string }) {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const {
    guildId,
    guildIconUrl,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    reactions,
    serverRoles,
    serverChannels,
    selectedChannel,
    setSelectedChannel,
    isLoadingRoles,
    isLoadingChannels,
    selectionMode,
    setSelectionMode,
    debouncedTitle,
    debouncedDescription,
    debouncedColor,
    validation,
    serverEmojis,
    isLoadingEmojis,
    emojiError,
    hasFetchedEmojis,
    fetchEmojis,
    openEmojiPicker,
    setOpenEmojiPicker,
    addReaction,
    removeReaction,
    updateReaction,
    isPremium,
    isActivatingPremium,
    handleActivatePremium,
    isDeploying,
    handleDeploy,
  } = useRoleBuilder(propGuildId);

  if (isLoadingRoles) {
    return (
      <NodeLoader title="Loading Roles" subtitle="Synchronizing role data..." />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-6 items-start">
        {/* Configuration Form */}

        <div className="space-y-8 order-2 xl:order-1">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Configuration</h3>
            <Card variant="cyberpunk" showGrid>
              <CardContent className="p-6 space-y-6">
                <ConfigurationFields
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  color={color}
                  setColor={setColor}
                  validation={validation}
                />

                <ChannelSelector
                  channels={serverChannels}
                  selectedChannel={selectedChannel}
                  setSelectedChannel={setSelectedChannel}
                  isLoadingChannels={isLoadingChannels}
                />

                <SelectionModePicker
                  mode={selectionMode}
                  setMode={setSelectionMode}
                  isPremium={isPremium}
                  setShowPremiumModal={setShowPremiumModal}
                />
              </CardContent>
            </Card>
          </div>

          {/* Reaction Role Mappings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Role Mappings</h3>
              <Button variant="outline" size="sm" onClick={addReaction}>
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
            </div>

            <Card variant="cyberpunk">
              <CardContent className="p-4 space-y-2">
                <RoleMappingList
                  reactions={reactions}
                  removeReaction={removeReaction}
                  updateReaction={updateReaction}
                  serverRoles={serverRoles}
                  isLoadingRoles={isLoadingRoles}
                  serverEmojis={serverEmojis}
                  openEmojiPicker={openEmojiPicker}
                  setOpenEmojiPicker={setOpenEmojiPicker}
                  guildId={guildId}
                  isLoadingEmojis={isLoadingEmojis}
                  hasFetchedEmojis={hasFetchedEmojis}
                  emojiError={emojiError}
                  fetchEmojis={fetchEmojis}
                  guildIconUrl={guildIconUrl}
                />
                {reactions.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-zinc-600 text-sm italic">
                      Add a mapping to get started...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <Button
              disabled={!validation.isReady || isDeploying}
              variant="cyber"
              size="lg"
              className="w-full h-14 px-10 tracking-widest"
              onClick={handleDeploy}
            >
              <Rocket
                className={cn("w-4 h-4 mr-2", isDeploying && "animate-bounce")}
              />
              {isDeploying ? "Synchronizing..." : "Update Discord Message"}
            </Button>
          </div>
        </div>

        {/* Live Preview */}

        <div className="space-y-4 order-1 xl:order-2 sticky top-24">
          <h3 className="text-lg font-medium">Discord Preview</h3>
          <div className="relative group transition-all">
            <DiscordPreview
              title={debouncedTitle}
              description={debouncedDescription}
              color={debouncedColor}
              reactions={reactions}
              serverEmojis={serverEmojis}
            />
          </div>
          <PreviewInfo />
        </div>
      </div>
      <PremiumGuard
        open={showPremiumModal}
        onOpenChange={setShowPremiumModal}
        isActivating={isActivatingPremium}
        onActivate={handleActivatePremium}
      />
    </>
  );
}

// Sub-components

interface ConfigurationFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  color: string;
  setColor: (val: string) => void;
  validation: {
    hasTitle: boolean;
    hasDescription: boolean;
  };
}

function ConfigurationFields({
  title,
  setTitle,
  description,
  setDescription,
  color,
  setColor,
  validation,
}: ConfigurationFieldsProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Embed Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Rank Selection"
            className={cn(
              !validation.hasTitle && title.length > 0 && "border-red-500/50"
            )}
          />
          {!validation.hasTitle && (
            <p className="text-[10px] text-red-500 font-medium px-1">
              Title is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell users what to do..."
            className={cn(
              "min-h-[140px] resize-none",
              !validation.hasDescription &&
                description.length > 0 &&
                "border-destructive"
            )}
          />
          {!validation.hasDescription && (
            <p className="text-xs text-destructive font-medium">
              Description is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Embed Color</Label>
          <div className="flex gap-2">
            <Select
              value={
                PRESET_COLORS.find(
                  (c) => c.hex.toLowerCase() === color.toLowerCase()
                )?.name || "Custom"
              }
              onValueChange={(val) => {
                const preset = PRESET_COLORS.find((c) => c.name === val);
                if (preset) setColor(preset.hex);
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                    {PRESET_COLORS.find(
                      (c) => c.hex.toLowerCase() === color.toLowerCase()
                    )?.name || "Custom Color"}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PRESET_COLORS.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                    </div>
                  </SelectItem>
                ))}
                {!PRESET_COLORS.some(
                  (c) => c.hex.toLowerCase() === color.toLowerCase()
                ) && (
                  <SelectItem value="Custom" disabled>
                    Custom Hex
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-[100px] font-mono uppercase"
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface ChannelSelectorProps {
  channels: DiscordChannel[];
  selectedChannel: string;
  setSelectedChannel: (val: string) => void;
  isLoadingChannels: boolean;
}

function ChannelSelector({
  channels,
  selectedChannel,
  setSelectedChannel,
  isLoadingChannels,
}: ChannelSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Target Channel</Label>
      <Select value={selectedChannel} onValueChange={setSelectedChannel}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a channel..." />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {channels.length > 0 ? (
            channels.map((ch: DiscordChannel) => (
              <SelectItem key={ch.id} value={ch.id}>
                <div className="flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 opacity-50" />
                  {ch.name}
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-[11px] text-zinc-500 italic text-center">
              {isLoadingChannels
                ? "Fetching channels..."
                : "No text channels found"}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

interface SelectionModePickerProps {
  mode: string;
  setMode: (val: string) => void;
  isPremium: boolean;
  setShowPremiumModal: (val: boolean) => void;
}

function SelectionModePicker({
  mode,
  setMode,
  isPremium,
  setShowPremiumModal,
}: SelectionModePickerProps) {
  const modes = [
    {
      id: "standard",
      label: "Toggle",
      icon: Layers,
      desc: "Multiple roles allowed. Click to Add/Remove.",
      color: "blue",
    },
    {
      id: "unique",
      label: "Unique",
      icon: MousePointer2,
      desc: "Strictly one role allowed. Swaps on click.",
      color: "amber",
      premium: true,
    },
    {
      id: "verify",
      label: "Verify",
      icon: ShieldCheck,
      desc: "Opt-out mode. Click to remove role.",
      color: "purple",
      premium: true,
    },
  ];

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between px-1">
        <Label className="flex items-center gap-2">Selection Mode</Label>
        {mode !== "standard" && (
          <div className="flex items-center gap-1 bg-amber-500/10 px-2 rounded-full border border-amber-500/20">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            <span className="text-[9px] font-black text-amber-400 uppercase tracking-tighter">
              Premium
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <Button
              key={m.id}
              variant={isActive ? "secondary" : "outline"}
              size={"lg"}
              onClick={() => {
                if (m.premium && !isPremium) {
                  setShowPremiumModal(true);
                  return;
                }
                setMode(m.id);
              }}
              className={cn(
                "h-20 flex-col gap-2 transition-all duration-500 relative overflow-hidden group/btn",
                isActive && "border-opacity-100 ring-2 ring-white/5",
                isActive &&
                  m.id === "standard" &&
                  "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
                isActive &&
                  m.id === "unique" &&
                  "border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
                isActive &&
                  m.id === "verify" &&
                  "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              )}
            >
              {isActive && (
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-tr from-transparent via-current to-transparent opacity-[0.03]"
                  )}
                />
              )}
              <m.icon
                className={cn(
                  "w-6 h-6 transition-all duration-500",
                  isActive
                    ? "scale-110 drop-shadow-[0_0_8px_currentColor]"
                    : "opacity-40 group-hover/btn:opacity-100"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em]",
                  !isActive &&
                    "text-zinc-500 group-hover/btn:text-zinc-300 transition-colors"
                )}
              >
                {m.label}
              </span>
            </Button>
          );
        })}
      </div>
      <p className="text-[10px] text-zinc-500 font-medium px-1 leading-relaxed">
        {mode === "standard" &&
          "Standard behavior: Reacting to an emoji adds the role, reacting again removes it."}
        {mode === "unique" &&
          "Users can only have one role from this group. Selecting a new one cancels the previous selection."}
        {mode === "verify" &&
          "Inverse mode: Useful for staff-only verification or roles that users should only be able to remove."}
      </p>
    </div>
  );
}

interface RoleMappingListProps {
  reactions: ReactionMapping[];
  removeReaction: (idx: number) => void;
  updateReaction: (idx: number, updates: Partial<ReactionMapping>) => void;
  serverRoles: DiscordRole[];
  isLoadingRoles: boolean;
  serverEmojis: DiscordEmoji[];
  openEmojiPicker: number | null;
  setOpenEmojiPicker: (idx: number | null) => void;

  guildId: string;
  isLoadingEmojis: boolean;
  hasFetchedEmojis: boolean;
  emojiError: string | null;
  fetchEmojis: (guildId: string, force?: boolean) => void;
  guildIconUrl: string | null;
}

function RoleMappingList({
  reactions,
  removeReaction,
  updateReaction,
  serverRoles,
  isLoadingRoles,
  serverEmojis,
  openEmojiPicker,
  setOpenEmojiPicker,

  guildId,
  isLoadingEmojis,
  hasFetchedEmojis,
  emojiError,
  fetchEmojis,
  guildIconUrl,
}: RoleMappingListProps) {
  const customEmojis = useMemo(() => {
    return serverEmojis.map((emoji: DiscordEmoji) => ({
      id: emoji.identifier,
      name: emoji.name,
      keywords: [emoji.name, emoji.id],
      skins: [{ src: emoji.url }],
    }));
  }, [serverEmojis]);

  return (
    <>
      {reactions.map((r: ReactionMapping, i: number) => (
        <Card
          key={i}
          variant="glass"
          className="group p-3 rounded-lg hover:bg-white/5 border-transparent hover:border-white/10 transition-colors"
          contentClassName="flex-row gap-3 items-center"
        >
          <EmojiPicker
            open={openEmojiPicker === i}
            onOpenChange={(open) => setOpenEmojiPicker(open ? i : null)}
            guildId={guildId}
            isLoadingEmojis={isLoadingEmojis}
            hasFetchedEmojis={hasFetchedEmojis}
            emojiError={emojiError}
            onRefresh={() => fetchEmojis(guildId, true)}
            customEmojis={customEmojis}
            guildIconUrl={guildIconUrl}
            onEmojiSelect={(emoji) => {
              const val = emoji.native || emoji.id;
              updateReaction(i, { emoji: val });
              setOpenEmojiPicker(null);
            }}
          >
            <EmojiPickerTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-11 w-11 shrink-0 relative group/emoji transition-all duration-200",
                  openEmojiPicker === i &&
                    "border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_20px_0_rgba(6,182,212,0.2)] scale-105"
                )}
                title="Click to select emoji"
              >
                <EmojiDisplay
                  emoji={r.emoji}
                  serverEmojis={serverEmojis}
                  className="z-10"
                />
              </Button>
            </EmojiPickerTrigger>
            <EmojiPickerContent align="start" side="top" sideOffset={8} />
          </EmojiPicker>

          <div className="flex-1">
            <Select
              value={
                serverRoles.some((sr: DiscordRole) => sr.id === r.roleId)
                  ? r.roleId
                  : ""
              }
              onValueChange={(val) => {
                const role = serverRoles.find(
                  (sr: DiscordRole) => sr.id === val
                );
                if (role) {
                  updateReaction(i, {
                    roleId: role.id,
                    roleName: role.name,
                    roleColor: role.color,
                  });
                }
              }}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="w-3.5 h-3.5" />
                      <span>
                        {isLoadingRoles ? "Loading..." : "Select a role..."}
                      </span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className="min-w-[200px]">
                {serverRoles.length > 0 ? (
                  serverRoles.map((role: DiscordRole) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: toHex(role.color) }}
                        />
                        <span style={{ color: toHex(role.color) }}>
                          {role.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-xs text-muted-foreground italic text-center">
                    {isLoadingRoles ? "Fetching roles..." : "No roles found"}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeReaction(i)}
            className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </Card>
      ))}
    </>
  );
}

function PreviewInfo() {
  return (
    <div className="p-4 bg-muted/50 rounded-lg flex gap-3 text-muted-foreground">
      <Info className="w-5 h-5 shrink-0" />
      <p className="text-xs leading-relaxed">
        Your community can click the reactions below the message to toggle roles
        automatically. Everything you see here is exactly what they will see in
        Discord.
      </p>
    </div>
  );
}
