import { auth } from "@/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    console.warn(
      `[API] No access token found in session for user: ${session.user?.id}. This usually means the user needs to re-login to refresh their token.`
    );
    // Return empty list instead of 401 to prevent client-side "Permissions missing" crash
    // if we actually have a session but just not the token (e.g. old session)
    return NextResponse.json([]);
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

    // Filter for servers where user is an OWNER, ADMIN, or has MANAGE_GUILD
    const manageableGuilds = allGuilds.filter((guild: any) => {
      const permissions = BigInt(guild.permissions || "0");
      const isAdmin = (permissions & BigInt(0x8)) === BigInt(0x8);
      const canManage = (permissions & BigInt(0x20)) === BigInt(0x20);

      return guild.owner === true || isAdmin || canManage;
    });

    console.log(
      `Filtered ${allGuilds.length} guilds down to ${manageableGuilds.length} manageable servers`
    );
    return NextResponse.json(manageableGuilds);
  } catch (error: any) {
    console.error("Internal Server Error in Guilds API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
