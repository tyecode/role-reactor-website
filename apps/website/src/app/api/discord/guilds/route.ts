import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    console.error("No session found in /api/discord/guilds");
    return NextResponse.json(
      { error: "Unauthorized: No Session" },
      { status: 401 }
    );
  }

  if (!(session as any).accessToken) {
    console.error(
      "No access token found in session for user:",
      session.user?.id
    );
    return NextResponse.json(
      { error: "Unauthorized: No Access Token" },
      { status: 401 }
    );
  }

  try {
    const accessToken = (session as any).accessToken;

    // Log diagnostic info (safely)
    console.log(
      `Making Discord API request for user ${session.user?.id} with token: ${accessToken?.substring(0, 5)}... (Length: ${accessToken?.length})`
    );

    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": "RoleReactorWebsite (https://rolereactor.app, 1.0.0)",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Discord API Error Status: ${response.status}`, errorData);

      // If we get a 401, it means the token is invalid or missing scope
      return NextResponse.json(
        {
          error: "Unauthorized access to Discord guilds",
          code: "DISCORD_UNAUTHORIZED",
          status: response.status,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const allGuilds = await response.json();

    // Filter for servers where user is the OWNER only
    const ownedGuilds = allGuilds.filter((guild: any) => {
      return guild.owner === true;
    });

    console.log(
      `Filtered ${allGuilds.length} guilds down to ${ownedGuilds.length} owned servers`
    );
    return NextResponse.json(ownedGuilds);
  } catch (error: any) {
    console.error("Internal Server Error in Guilds API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
