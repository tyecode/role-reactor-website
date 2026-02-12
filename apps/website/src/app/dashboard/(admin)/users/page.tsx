import { botFetchJson } from "@/lib/bot-fetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserTable } from "./user-table";
import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

interface UserData {
  id: string;
  username: string;
  globalName: string;
  avatar: string | null;
  role: string;
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
  try {
    const query = new URLSearchParams({
      limit: "50",
      ...(search && { search }),
    });
    return await botFetchJson<UsersResponse>(`/user?${query.toString()}`);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
}

function UsersLoader() {
  return (
    <NodeLoader title="Identity Scanner" subtitle="Accessing_User_Base..." />
  );
}

async function UsersContent({ search }: { search?: string }) {
  const data = await getUsers(search);

  if (!data) {
    return (
      <Card variant="cyberpunk" className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6">
          <p className="font-mono text-sm text-red-500 font-bold uppercase">
            Identity Cache Offline // Failed to connect to User Repository
          </p>
        </CardContent>
      </Card>
    );
  }

  return <UserTable initialData={data} />;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  return (
    <div className="space-y-6">
      <Card variant="cyberpunk" className="border-white/5 bg-zinc-950/40">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-xl italic">Identity Manager</CardTitle>
          <CardDescription>
            Configure system access levels and operational clearance
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<UsersLoader />}>
            <UsersContent search={search} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
