import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/auth/session-provider";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  SidebarProvider,
  SidebarInset,
} from "@role-reactor/ui/components/sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Dashboard | Role Reactor",
  description: "Manage your Role Reactor bot settings",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} dark`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen antialiased bg-background text-foreground">
        <SessionProvider>
          <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
              <DashboardHeader />
              <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full">{children}</div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
