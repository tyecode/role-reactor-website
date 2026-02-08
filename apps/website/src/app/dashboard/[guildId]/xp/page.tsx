"use client";

import { useParams } from "next/navigation";
import { XPView } from "@/components/dashboard/xp/xp-view";

export default function XPPage() {
  const params = useParams();
  const guildId = params.guildId as string;

  return <XPView guildId={guildId} />;
}
