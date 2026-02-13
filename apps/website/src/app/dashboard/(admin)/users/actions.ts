"use server";

import { botFetchJson } from "@/lib/bot-fetch";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: string) {
  try {
    await botFetchJson(`/user/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Failed to update role" };
  }
}
