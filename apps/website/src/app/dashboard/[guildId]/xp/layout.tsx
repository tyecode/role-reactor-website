export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  return {
    title: "XP System",
  };
}

export default function XPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
