import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Role Reactor",
  description: "Manage your Role Reactor bot settings",
};

import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    notFound();
  }

  return (
    <SidebarProvider className="flex min-h-screen w-full">
      <DashboardSidebar />
      <SidebarInset className="relative flex flex-col flex-1 min-w-0 md:m-2 md:rounded-xl md:shadow-2xl border border-white/5 bg-background/50 backdrop-blur-sm">
        <DashboardHeader />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
