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
}

interface UserResponse {
  user: UserData;
}

/**
 * Get single user by ID (fresh data, no cache)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId: targetUserId } = await params;

    const data = await botFetchJson<UserResponse>(`/user/${targetUserId}`, {
      userId,
      silent: true,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
