import { NextResponse } from "next/server";
import { auth } from "@/auth";

const BOT_API_URL = process.env.BOT_API_URL || "http://localhost:3030";
const INTERNAL_KEY = process.env.INTERNAL_API_KEY;

/**
 * Get current user's profile with decrypted email
 * This proxies to the bot's /v1/user/me endpoint
 */
export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(`${BOT_API_URL}/api/v1/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INTERNAL_KEY}`,
        "X-User-ID": userId,
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Bot API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to fetch profile" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
