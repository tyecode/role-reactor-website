import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Get user notifications
 */
export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "20";
    const skip = searchParams.get("skip") || "0";
    const unread = searchParams.get("unread") || "false";

    const response = await botFetch(
      `/user/${userId}/notifications?limit=${limit}&skip=${skip}&unread=${unread}`,
      { method: "GET", cache: "no-store", userId }
    );

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        notifications: [],
        unreadCount: 0,
      });
    }

    const data = await response.json();
    const isSuccess = data.status === "success";

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        notifications: data.notifications || [],
        unreadCount: data.unreadCount || 0,
        pagination: data.pagination,
      });
    }

    return NextResponse.json({
      success: false,
      notifications: [],
      unreadCount: 0,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Mark all notifications as read
 */
export async function PATCH() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await botFetch(`/user/${userId}/notifications/read-all`, {
      method: "PATCH",
      cache: "no-store",
      userId,
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to mark all as read" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: data.status === "success",
      markedRead: data.markedRead || 0,
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
