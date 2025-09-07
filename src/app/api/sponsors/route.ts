import { NextResponse } from "next/server";
import { getSponsors } from "@/lib/sponsors";

export async function GET() {
  try {
    const sponsors = await getSponsors();

    return NextResponse.json({
      success: true,
      data: sponsors,
      count: sponsors.length,
    });
  } catch (error) {
    console.error("Error fetching sponsors:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch sponsors",
      },
      { status: 500 }
    );
  }
}

// Webhook endpoint for Buy Me a Coffee notifications
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify webhook signature (in production)
    // const signature = request.headers.get('x-bmc-signature');
    // if (!verifyWebhookSignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    console.log("New donation received:", body);

    // Handle different webhook events
    switch (body.type) {
      case "support":
        // New donation received
        console.log("New supporter:", body.data);
        // Here you would update your database
        break;
      case "subscription":
        // New subscription
        console.log("New subscription:", body.data);
        break;
      case "subscription_cancelled":
        // Subscription cancelled
        console.log("Subscription cancelled:", body.data);
        break;
      default:
        console.log("Unknown webhook type:", body.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
