import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Get unread notification count
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

    const response = await botFetch(
      `/user/${userId}/notifications/unread-count`,
      { method: "GET", cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json({ success: false, unreadCount: 0 });
    }

    const data = await response.json();
    return NextResponse.json({
      success: data.status === "success",
      unreadCount: data.unreadCount || 0,
    });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return NextResponse.json({ success: true, unreadCount: 0 });
  }
}
