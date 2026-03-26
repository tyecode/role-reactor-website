import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Mark a single notification as read
 */
export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { notificationId } = await params;

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: "Notification ID is required" },
        { status: 400 }
      );
    }

    const response = await botFetch(
      `/user/${userId}/notifications/${notificationId}/read`,
      { method: "PATCH", cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to mark notification as read" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      marked: data.data?.success || false,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
