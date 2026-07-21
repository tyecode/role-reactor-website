import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user?.id;
    const response = await botFetch("/image-tools/free-quota", { userId });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch free quota" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Image tools free quota proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
