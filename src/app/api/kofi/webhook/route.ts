import { NextRequest, NextResponse } from "next/server";

interface KofiWebhookData {
  type: string;
  kofi_transaction_id: string;
  amount: string;
  message: string;
  from_name: string;
  from_email: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    // Verify webhook signature (you'll need to set this in your Ko-fi settings)
    const webhookSecret = process.env.KOFI_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.log("KOFI_WEBHOOK_SECRET not configured");
    }

    // Parse the webhook data
    const data: KofiWebhookData = JSON.parse(body);

    console.log("Ko-fi webhook received:", data);

    // Handle different types of Ko-fi events
    switch (data.type) {
      case "Donation":
        await handleDonation(data);
        break;
      case "Subscription":
        await handleSubscription(data);
        break;
      case "Shop Order":
        await handleShopOrder(data);
        break;
      default:
        console.log("Unknown Ko-fi event type:", data.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing Ko-fi webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleDonation(data: KofiWebhookData) {
  console.log("Processing donation:", {
    id: data.kofi_transaction_id,
    amount: data.amount,
    message: data.message,
    from_name: data.from_name,
    from_email: data.from_email,
    timestamp: data.timestamp,
  });

  // TODO: Save donation to database
  // TODO: Send thank you email
  // TODO: Update Discord sponsor list
  // TODO: Send Discord notification
}

async function handleSubscription(data: KofiWebhookData) {
  console.log("Processing subscription:", {
    id: data.kofi_transaction_id,
    amount: data.amount,
    message: data.message,
    from_name: data.from_name,
    from_email: data.from_email,
    timestamp: data.timestamp,
  });

  // TODO: Handle monthly subscription
}

async function handleShopOrder(data: KofiWebhookData) {
  console.log("Processing shop order:", {
    id: data.kofi_transaction_id,
    amount: data.amount,
    from_name: data.from_name,
    from_email: data.from_email,
    timestamp: data.timestamp,
  });

  // TODO: Handle shop orders
}
