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
  hideList: boolean;
  reactions: Array<{
    emoji: string;
    roleId: string;
    roleName: string;
    roleColor: number;
    roleIds?: string[];
    roleNames?: string[];
    roleColors?: number[];
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

  const userId = session.user.id;

  try {
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

    await botFetchJson(`/guilds/${guildId}/roles/deploy`, {
      method: "POST",
      userId,
      body: JSON.stringify(data),
    });

    revalidatePath(`/dashboard/${guildId}/roles`);

    return { success: true, message: "System deployed successfully!" };
  } catch (error) {
    console.error("[DeployAction] Failed:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during link deployment.";
    return {
      success: false,
      error: "DEPLOYMENT_FAILURE",
      message,
    };
  }
}

export type UpdateData = Omit<DeployData, "channelId">;

export async function updateReactionRoles(
  guildId: string,
  messageId: string,
  data: UpdateData
) {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "AUTH_REQUIRED",
      message: "You must be logged in to update.",
    };
  }

  const userId = session.user.id;

  try {
    if (data.reactions.length === 0) {
      return {
        error: "NO_MAPPINGS",
        message: "At least one role mapping is required.",
      };
    }

    await botFetchJson(`/guilds/${guildId}/role-reactions/${messageId}`, {
      method: "PATCH",
      userId,
      body: JSON.stringify(data),
    });

    revalidatePath(`/dashboard/${guildId}/roles`);

    return { success: true, message: "Setup updated successfully!" };
  } catch (error) {
    console.error("[UpdateAction] Failed:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during update.";
    return {
      success: false,
      error: "UPDATE_FAILURE",
      message,
    };
  }
}
