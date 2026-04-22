"use client";

import { useUserStore } from "@/store/use-user-store";
import { PropellerAdBlock } from "./propellerads-ad-block";

interface ConditionalAdBlockProps {
  zoneId: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ConditionalAdBlock({
  zoneId,
  style,
  className,
}: ConditionalAdBlockProps) {
  const { user } = useUserStore();

  // Check if user has Pro on any guild (from API)
  const hasPro = user?.hasActivePro === true;

  // Hide ads for users who have purchased cores
  if (hasPro) {
    return null;
  }

  return (
    <PropellerAdBlock zoneId={zoneId} style={style} className={className} />
  );
}
