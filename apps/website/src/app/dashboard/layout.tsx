import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Role Reactor",
  description: "Manage your Role Reactor bot settings",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="flex min-h-screen w-full">
      <DashboardSidebar />
      <SidebarInset className="relative flex flex-col w-full overflow-hidden md:m-2 md:rounded-xl md:shadow">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
