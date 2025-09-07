import { NextResponse } from "next/server";

// const KOFI_USERNAME = "tyecode"; // Will be used when implementing real Ko-fi API

export async function GET() {
  try {
    // Get Ko-fi API key from environment variables
    const apiKey = process.env.KOFI_API_KEY;

    if (!apiKey) {
      // Return mock data if no API key is configured
      return NextResponse.json({
        supporters: [
          {
            id: "mock_1",
            name: "John Doe",
            amount: 5.0,
            message: "Great bot! Discord: john_doe#1234",
            date: new Date().toISOString(),
            isMonthly: false,
            discordUsername: "john_doe",
          },
          {
            id: "mock_2",
            name: "Jane Smith",
            amount: 10.0,
            message: "Love the features! @jane_smith",
            date: new Date(Date.now() - 86400000).toISOString(),
            isMonthly: true,
            discordUsername: "jane_smith",
          },
          {
            id: "mock_3",
            name: "Mike Wilson",
            amount: 3.0,
            message: "Keep up the great work! Discord: mike_w#5678",
            date: new Date(Date.now() - 172800000).toISOString(),
            isMonthly: false,
            discordUsername: "mike_w",
          },
        ],
        stats: {
          totalSupporters: 3,
          totalAmount: 18.0,
          monthlyAmount: 10.0,
          oneTimeAmount: 8.0,
          thisMonth: 18.0,
        },
      });
    }

    // Ko-fi API integration would go here
    // For now, return mock data with a note about API setup
    return NextResponse.json({
      supporters: [
        {
          id: "kofi_1",
          name: "Supporter 1",
          amount: 5.0,
          message: "Thanks for the great bot! Discord: supporter1#1234",
          date: new Date().toISOString(),
          isMonthly: false,
          discordUsername: "supporter1",
        },
      ],
      stats: {
        totalSupporters: 1,
        totalAmount: 5.0,
        monthlyAmount: 0.0,
        oneTimeAmount: 5.0,
        thisMonth: 5.0,
      },
      note: "Ko-fi API integration ready - add your API key to get real data",
    });
  } catch (error) {
    console.error("Error fetching Ko-fi data:", error);
    return NextResponse.json(
      { error: "Failed to fetch supporter data" },
      { status: 500 }
    );
  }
}

// Helper function to extract Discord username from message
// function extractDiscordUsername(message: string): string | null {
//   // Look for Discord username patterns
//   const discordPatterns = [
//     /discord[:\s]*@?([a-zA-Z0-9._-]+)/i,
//     /@([a-zA-Z0-9._-]+)/,
//     /username[:\s]*([a-zA-Z0-9._-]+)/i,
//   ];

//   for (const pattern of discordPatterns) {
//     const match = message.match(pattern);
//     if (match && match[1]) {
//       return match[1];
//     }
//   }

//   return null;
// }
