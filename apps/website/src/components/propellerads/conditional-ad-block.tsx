"use client";

import { useUserStore } from "@/store/use-user-store";

interface ConditionalAdBlockProps {
  zoneId?: string;
  style?: React.CSSProperties;
  className?: string;
  hide?: boolean;
}

export function ConditionalAdBlock({
  zoneId: _zoneId,
  style: _style,
  className: _className,
  hide,
}: ConditionalAdBlockProps) {
  const { user } = useUserStore();

  // Hide ads for users with Pro or when explicitly hidden
  // TODO: Add admin check when user store includes role
  if (hide || user?.hasActivePro) {
    return null;
  }

  // Ads are disabled by default
  return null;
}
