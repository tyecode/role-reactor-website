import type { Metadata } from "next";
import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "User Management | Admin Console",
  description: "Manage system users and access levels",
};
import { Card, CardContent } from "@/components/ui/card";
import { UserTable } from "./_components/user-table";
import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

interface UserData {
  id: string;
  username: string;
  globalName: string;
  avatar: string | null;
  role: string;
  credits: number;
  lastLogin: string;
  createdAt: string;
}

interface UsersResponse {
  users: UserData[];
  pagination: {
    page: number;
    total: number;
    pages: number;
  };
}

async function getUsers(search?: string) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const query = new URLSearchParams({
      limit: "50",
      ...(search && { search }),
    });
    return await botFetchJson<UsersResponse>(`/user?${query.toString()}`, {
      userId,
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
}

function UsersLoader() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
      <NodeLoader
        title="Loading Dashboard"
        subtitle="Synchronizing your data..."
      />
    </div>
  );
}

async function UsersContent({ search }: { search?: string }) {
  const data = await getUsers(search);

  if (!data) {
    return (
      <Card variant="cyberpunk" className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6">
          <p className="font-mono text-sm text-red-500 font-bold uppercase">
            Service Unavailable // Unable to load user data
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="cyberpunk" className="border-white/5 bg-zinc-950/40">
      <CardContent className="p-0">
        <UserTable initialData={data} />
      </CardContent>
    </Card>
  );
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Admin Monitoring"
        categoryIcon={Users}
        title="User Management"
        description="Manage user roles and system access for the entire bot infrastructure."
      />

      <Suspense fallback={<UsersLoader />}>
        <UsersContent search={search} />
      </Suspense>
    </div>
  );
}
