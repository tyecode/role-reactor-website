import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";

interface UserData {
  id: string;
  username: string;
  globalName: string;
  avatar: string | null;
  role: string;
  credits: number;
  lastLogin: string;
  createdAt: string;
  isPayer?: boolean;
}

interface UsersResponse {
  users: UserData[];
  pagination: {
    page: number;
    total: number;
    pages: number;
  };
}

/**
 * Get users list with optional search
 */
export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";
    const search = searchParams.get("search");

    const query = new URLSearchParams({
      limit,
      ...(search && { search }),
    });

    const data = await botFetchJson<UsersResponse>(
      `/user?${query.toString()}`,
      {
        userId,
        silent: true, // Suppress console errors for expected API issues
      }
    );

    return NextResponse.json(data);
  } catch {
    // Return empty result for expected API errors (503 = service unavailable)
    return NextResponse.json({
      users: [],
      pagination: {
        page: 1,
        total: 0,
        pages: 0,
      },
    });
  }
}
