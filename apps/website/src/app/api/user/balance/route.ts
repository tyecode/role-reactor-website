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
      // Return empty balance for expected API errors (503 = service unavailable)
      return NextResponse.json({
        success: true,
        balance: 0,
      });
    }

    const data = await response.json();

    // Bot API returns: { success: true, data: { user: { currentCredits: 30.94, ... } } }
    if (data.success && data.data?.user?.currentCredits !== undefined) {
      return NextResponse.json({
        success: true,
        balance: data.data.user.currentCredits,
      });
    }

    // Fallback for old response format: { status: "success", userId, credits, ... }
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
  } catch {
    // Silently handle errors - return empty balance
    return NextResponse.json({
      success: true,
      balance: 0,
    });
  }
}
