"use server";

import { auth } from "@/auth";
import { botFetchJson } from "@/lib/bot-fetch";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: string) {
  const session = await auth();
  const callerUserId = session?.user?.id;

  try {
    await botFetchJson(`/user/${userId}/role`, {
      method: "PATCH",
      userId: callerUserId,
      body: JSON.stringify({ role }),
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

export async function manageUserCores(
  userId: string,
  action: "add" | "remove" | "set",
  amount: number,
  reason: string
) {
  const session = await auth();
  const callerUserId = session?.user?.id;

  try {
    const result = await botFetchJson<{ message: string; newBalance: number }>(
      `/user/${userId}/cores/manage`,
      {
        method: "POST",
        userId: callerUserId,
        body: JSON.stringify({ action, amount, reason }),
      }
    );

    revalidatePath("/dashboard/users");
    return { success: true, newBalance: result.newBalance };
  } catch (error) {
    console.error("Failed to manage user cores:", error);
    return { success: false, error: "Failed to update balance" };
  }
}

export async function getUserTransactions(userId: string) {
  const session = await auth();
  const callerUserId = session?.user?.id;

  try {
    // Reuses the exact same bot endpoint the billing page uses, but executed by admin
    const result = await botFetchJson<any>(`/user/${userId}/payments`, {
      userId: callerUserId,
    });
    return { success: true, transactions: result?.payments || [] };
  } catch (error) {
    console.error(`Failed to fetch transactions for user ${userId}:`, error);
    return { success: false, error: "Failed to fetch transactions" };
  }
}
