import type { ReactNode } from "react";

export default async function GuildLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ guildId: string }>;
}) {
  await params;

  // Auth is already validated by parent /dashboard/layout.tsx
  // Removing redundant auth check for better performance

  return <>{children}</>;
}
