import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Role Reactor - The most powerful Discord bot for automated role management. Set up reaction roles, manage permissions, and enhance your Discord server experience.",
  openGraph: {
    title: "Role Reactor - Discord Bot for Role Management",
    description:
      "The most powerful Discord bot for automated role management. Set up reaction roles, manage permissions, and enhance your Discord server experience.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Role Reactor</h1>
      <p className="text-fd-muted-foreground mb-6">
        The most powerful Discord bot for automated role management. Set up
        reaction roles, manage permissions, and enhance your server experience.
      </p>
      <p className="text-fd-muted-foreground">
        Get started by reading our{" "}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          documentation
        </Link>{" "}
        to learn how to set up and configure Role Reactor for your Discord
        server.
      </p>
    </main>
  );
}
