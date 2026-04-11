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
      // Return 0 balance for unauthorized (don't throw error)
      return NextResponse.json({ success: true, balance: 0 }, { status: 200 });
    }

    const response = await botFetch(`/user/${userId}/balance`, {
      method: "GET",
      cache: "no-store",
      userId,
    });

    if (!response.ok) {
      // Bot API returned error (503, 404, etc) - return 0 balance
      console.warn(
        `[Balance] Bot API returned ${response.status} for user ${userId}`
      );
      return NextResponse.json({
        success: true,
        balance: 0,
      });
    }

    const data = await response.json();

    // Log raw data from bot API to debug floating point issue
    console.log(
      "[Balance] Raw data from bot API:",
      JSON.stringify(data, null, 2)
    );

    // Bot API returns: { success: true, data: { user: { currentCredits: 30.94, ... } } }
    // Backend already rounds to 2 decimal places
    if (data.success && data.data?.user?.currentCredits !== undefined) {
      const rawBalance = data.data.user.currentCredits;
      // Fix floating point precision issue from bot API
      const fixedBalance = Number(Number(rawBalance).toFixed(2));
      console.log("[Balance] Raw:", rawBalance, "Fixed:", fixedBalance);
      return NextResponse.json({
        success: true,
        balance: fixedBalance,
      });
    }

    // Fallback for old response format: { status: "success", userId, credits, ... }
    if (data.status === "success") {
      return NextResponse.json({
        success: true,
        balance: data.credits || 0,
      });
    }

    // Unexpected response format - return 0 balance
    console.warn("[Balance] Unexpected response format:", data);
    return NextResponse.json({
      success: true,
      balance: 0,
    });
  } catch (error) {
    // Silently handle errors - return 0 balance
    console.warn(
      "[Balance] Error fetching balance:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({
      success: true,
      balance: 0,
    });
  }
}
