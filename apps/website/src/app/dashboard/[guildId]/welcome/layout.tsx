import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getManageableGuilds } from "@/lib/server/guilds";

export default async function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    notFound();
  }

  // Verify user has access to at least one guild
  const guilds = await getManageableGuilds();
  if (!guilds.guilds || guilds.guilds.length === 0) {
    notFound();
  }

  return <>{children}</>;
}
