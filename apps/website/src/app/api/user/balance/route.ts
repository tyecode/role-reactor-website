import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Proxy user balance requests to the bot API
 */
export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await botFetch(`/user/${userId}/balance`, {
      method: "GET",
      cache: "no-store",
      userId,
    });

    if (!response.ok) {
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();

    // The bot returns { status: "success", userId, credits, ... }
    if (data.status === "success") {
      return NextResponse.json({
        success: true,
        balance: data.credits || 0,
      });
    }

    return NextResponse.json({
      success: false,
      error: "Invalid response from bot",
    });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
