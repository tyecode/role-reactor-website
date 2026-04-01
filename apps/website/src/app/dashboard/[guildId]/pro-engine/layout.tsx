export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  return {
    title: "Pro Engine",
  };
}

export default function ProEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
