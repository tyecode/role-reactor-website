import { auth } from "@/auth";
import { isDeveloper } from "@/lib/admin";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // 1. Must be logged in
  if (!session || !session.user) {
    redirect("/");
  }

  // 2. Must be a developer
  if (!isDeveloper(session.user)) {
    console.warn(
      `[Admin Access Denied] User ${session.user.id} tried to access admin dashboard`
    );
    notFound();
  }

  return <div className="space-y-6">{children}</div>;
}
