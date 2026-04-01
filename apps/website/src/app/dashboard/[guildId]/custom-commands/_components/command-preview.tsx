"use client";

import Image from "next/image";
import { Plus, Minus, RefreshCw } from "lucide-react";
import type {
  RoleAction,
  ButtonConfig,
  SelectMenuConfig,
} from "@/types/custom-commands";

interface RolePreviewProps {
  roleId: string;
  roleName: string;
  roleColor: number;
  action: RoleAction;
}

interface CommandPreviewProps {
  type: "text" | "embed" | "role" | "dm";
  response?: string;
  responses?: string[];
  randomResponse?: boolean;
  embed?: {
    title: string;
    description: string;
    color: string;
    footer?: string | null;
  };
  role?: RolePreviewProps;
  roleConfirmation?: string;
  commandName?: string;
  ephemeral?: boolean;
  buttons?: ButtonConfig[];
  selectMenu?: SelectMenuConfig | null;
}

function toRoleColor(decimal: number) {
  if (!decimal || decimal === 0) return "#99aab5";
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACTION_META: Record<
  RoleAction,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  add: {
    label: "Role Added",
    icon: Plus,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
  remove: {
    label: "Role Removed",
    icon: Minus,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
  },
  toggle: {
    label: "Role Toggled",
    icon: RefreshCw,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
  },
};

export function CommandPreview({
  type,
  response,
  responses,
  randomResponse,
  embed,
  role,
  roleConfirmation,
  commandName,
  ephemeral,
  buttons,
  selectMenu,
}: CommandPreviewProps) {
  const color = embed?.color || "#9b8bf0";
  const roleColor = role ? toRoleColor(role.roleColor) : "#99aab5";
  const actionMeta = role ? ACTION_META[role.action] : ACTION_META.add;
  const ActionIcon = actionMeta.icon;

  const buttonStyleMap: Record<string, string> = {
    primary: "bg-[#5865F2] text-white",
    secondary: "bg-[#4F545C] text-white",
    success: "bg-[#23A559] text-white",
    danger: "bg-[#DA373C] text-white",
    link: "bg-transparent text-[#00AFF4] underline",
  };

  const displayResponse =
    randomResponse && responses && responses.length > 0
      ? responses[Math.floor(Math.random() * responses.length)]
      : response;

  return (
    <div className="rounded-xl bg-[#313338] p-4 space-y-2 font-sans text-[15px]">
      {commandName && (
        <div className="text-[11px] text-[#949BA4] pb-1 border-b border-white/5 mb-3">
          Preview of{" "}
          <span className="text-[#5865F2] font-medium">/{commandName}</span>
          {ephemeral && (
            <span className="ml-2 text-[#F4B400]">(ephemeral)</span>
          )}
          {randomResponse && responses && responses.length > 0 && (
            <span className="ml-2 text-[#F4B400]">(random)</span>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {/* Bot avatar */}
        <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center shrink-0 overflow-hidden">
          <Image
            src="/logo.png"
            alt="Bot"
            width={40}
            height={40}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Bot name */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-white font-semibold text-[15px] leading-none">
              Role Reactor
            </span>
            <span className="bg-[#5865F2] text-white text-[9px] font-bold uppercase px-1 py-0.5 rounded leading-none">
              APP
            </span>
          </div>

          {/* ── Text ── */}
          {(type === "text" || type === "dm") && (
            <p className="text-[#DCDDDE] text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
              {displayResponse || (
                <span className="text-[#72767D] italic">
                  Your response will appear here...
                </span>
              )}
            </p>
          )}

          {/* ── Embed ── */}
          {type === "embed" && (
            <div
              className="rounded overflow-hidden max-w-sm"
              style={{
                background: hexToRgba(color, 0.06),
                borderLeft: `4px solid ${color}`,
              }}
            >
              <div className="p-3 space-y-1">
                {embed?.title ? (
                  <p className="text-white font-semibold text-sm leading-snug">
                    {embed.title}
                  </p>
                ) : (
                  <p className="text-[#72767D] text-sm italic">Embed title</p>
                )}
                {embed?.description ? (
                  <p className="text-[#DCDDDE] text-xs leading-relaxed whitespace-pre-wrap">
                    {embed.description}
                  </p>
                ) : (
                  <p className="text-[#72767D] text-xs italic">
                    Embed description
                  </p>
                )}
                {embed?.footer && (
                  <p className="text-[#72767D] text-[11px] pt-1 border-t border-white/5 mt-2">
                    {embed.footer}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Role ── */}
          {type === "role" && (
            <div className="space-y-2">
              {/* Action badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: actionMeta.bg, color: actionMeta.color }}
              >
                <ActionIcon className="w-3.5 h-3.5" />
                {actionMeta.label}
              </div>

              {/* Role pill */}
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: roleColor }}
                />
                <span
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{
                    color: roleColor,
                    background: hexToRgba(roleColor, 0.12),
                  }}
                >
                  @
                  {role?.roleName || (
                    <span className="text-[#72767D] not-italic">
                      select a role above
                    </span>
                  )}
                </span>
              </div>

              {/* Confirmation message */}
              {roleConfirmation ? (
                <p className="text-[#DCDDDE] text-xs">{roleConfirmation}</p>
              ) : (
                <p className="text-[#72767D] text-xs italic">
                  Default confirmation shown to user
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-white/5">
              {buttons.map((btn, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 rounded text-xs font-medium ${buttonStyleMap[btn.style] || buttonStyleMap.secondary}`}
                >
                  {btn.emoji && <span className="mr-1">{btn.emoji}</span>}
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* Select Menu */}
          {selectMenu && (
            <div className="mt-2 pt-2 border-t border-white/5">
              <div className="bg-[#2B2D31] rounded border border-[#202225] px-3 py-2 flex items-center justify-between">
                <span className="text-[#B4B7B9] text-sm">
                  {selectMenu.placeholder || "Select an option..."}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  className="text-[#80848E]"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {selectMenu.options && selectMenu.options.length > 0 && (
                <div className="bg-[#2B2D31] rounded border border-[#202225] mt-1 p-1 space-y-0.5">
                  {selectMenu.options.slice(0, 5).map((opt, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded text-[#B4B7B9] text-xs hover:bg-[#363642] cursor-pointer"
                    >
                      {opt.label}
                    </div>
                  ))}
                  {selectMenu.options.length > 5 && (
                    <div className="text-[#72767D] text-xs px-2 py-1">
                      +{selectMenu.options.length - 5} more
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
