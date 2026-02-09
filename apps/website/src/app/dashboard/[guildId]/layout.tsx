import type { ReactNode } from "react";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function GuildLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ guildId: string }>;
}) {
  await params;
  const session = await auth();

  // Basic auth check (main layout handles !session, but we check user here for safety)
  if (!session?.user) {
    notFound();
  }

  return <>{children}</>;
}
