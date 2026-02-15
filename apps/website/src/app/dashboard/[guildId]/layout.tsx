import type { ReactNode } from "react";

export default async function GuildLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ guildId: string }>;
}) {
  await params;

  return <>{children}</>;
}
