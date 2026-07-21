import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetchUpload } from "@/lib/bot-fetch-upload";
import { botFetch } from "@/lib/bot-fetch";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user?.id;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const tool = formData.get("tool") as string;
    const options = formData.get("options") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!tool) {
      return NextResponse.json(
        { success: false, error: "No tool specified" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 20MB." },
        { status: 400 }
      );
    }

    const botFormData = new FormData();
    botFormData.append("file", file);
    botFormData.append("tool", tool);
    if (options) {
      botFormData.append("options", options);
    }

    const response = await botFetchUpload("/image-tools/process", botFormData, {
      userId,
    });

    if (!response.ok) {
      let errorData: Record<string, unknown> = {};
      try {
        errorData = await response.json();
      } catch {
        // Body might not be JSON
      }

      return NextResponse.json(
        {
          success: false,
          error:
            (errorData.message as string) ||
            `Processing failed (${response.status})`,
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";
    const contentDisposition =
      response.headers.get("Content-Disposition") ||
      'attachment; filename="processed.jpg"';
    const creditsDeducted = response.headers.get("X-Credits-Deducted");
    const creditsRemaining = response.headers.get("X-Credits-Remaining");

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        ...(creditsDeducted && { "X-Credits-Deducted": creditsDeducted }),
        ...(creditsRemaining && {
          "X-Credits-Remaining": creditsRemaining,
        }),
      },
    });
  } catch (error) {
    console.error("Image tools proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const response = await botFetch("/image-tools/config", { userId });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch config" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Image tools config proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
