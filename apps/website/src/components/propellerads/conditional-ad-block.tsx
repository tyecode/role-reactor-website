"use client";

import { useUserStore } from "@/store/use-user-store";
import { PropellerAdBlock } from "./propellerads-ad-block";

interface ConditionalAdBlockProps {
  zoneId: string;
  style?: React.CSSProperties;
  className?: string;
  hide?: boolean;
}

export function ConditionalAdBlock({
  zoneId,
  style,
  className,
  hide,
}: ConditionalAdBlockProps) {
  const { user } = useUserStore();

  // Check if user has Pro on any guild (from API)
  const hasPro = user?.hasActivePro === true;

  // Hide ads for users who have Pro or if explicitly hidden
  if (hasPro || hide) {
    return null;
  }

  return (
    <PropellerAdBlock zoneId={zoneId} style={style} className={className} />
  );
}
