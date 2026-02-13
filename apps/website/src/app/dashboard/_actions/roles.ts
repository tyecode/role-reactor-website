"use server";

import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { revalidatePath } from "next/cache";

export type DeployData = {
  title: string;
  description: string;
  color: string;
  channelId: string;
  selectionMode: string;
  reactions: Array<{
    emoji: string;
    roleId: string;
    roleName: string;
    roleColor: number;
  }>;
};

export async function deployReactionRoles(guildId: string, data: DeployData) {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "AUTH_REQUIRED",
      message: "You must be logged in to deploy.",
    };
  }

  try {
    // 1. Validate data server-side
    if (!data.channelId) {
      return {
        error: "INVALID_CHANNEL",
        message: "A target channel must be selected.",
      };
    }

    if (data.reactions.length === 0) {
      return {
        error: "NO_MAPPINGS",
        message: "At least one role mapping is required.",
      };
    }

    // 2. Transmit to bot API
    // Note: This endpoint is hypothetical based on common patterns.
    // In a real scenario, this would match the bot's REST API.
    await botFetchJson(`/guilds/${guildId}/roles/deploy`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    // 3. Revalidate path to refresh cache
    revalidatePath(`/dashboard/${guildId}/roles`);

    return { success: true, message: "System deployed successfully!" };
  } catch (error: any) {
    console.error("[DeployAction] Failed:", error);
    return {
      success: false,
      error: "DEPLOYMENT_FAILURE",
      message:
        error.message || "An unexpected error occurred during link deployment.",
    };
  }
}
