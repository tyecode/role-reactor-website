import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Get user's transaction history
 * Uses existing bot endpoint: /user/:userId/payments
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

    // Use existing bot endpoint for user payments
    const response = await botFetch(`/user/${userId}/payments`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          success: true,
          transactions: [],
          message: "No transactions found",
        });
      }
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({
        success: true,
        transactions: data.payments || [],
        total: data.total || 0,
      });
    }

    return NextResponse.json({
      success: false,
      error: "Invalid response from bot",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
