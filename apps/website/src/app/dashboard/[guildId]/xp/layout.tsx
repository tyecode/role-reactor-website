import { getManageableGuilds } from "@/lib/server/guilds";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  const { guilds } = await getManageableGuilds();
  const guild = guilds.find((g) => g.id === guildId);

  return {
    title: guild ? `${guild.name} | XP System` : "XP System",
  };
}

export default function XPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
