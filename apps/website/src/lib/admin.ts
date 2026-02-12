/**
 * Admin utility functions
 */

/**
 * User Roles constants matching the bot backend
 */
export const UserRoles = {
  USER: "user", // Standard user
  SUPPORT: "support", // Access to stats and logs
  ADMIN: "admin", // Partial management
  OWNER: "owner", // Full system access
};

/**
 * List of developer Discord IDs (root owners)
 * Historically hardcoded, now managed via environment variables for security.
 */
// Root IDs are now strictly managed via DISCORD_DEVELOPERS env var

/**
 * Checks if a user has administrative access to the global bot dashboard.
 *
 * @param user The user object from the session (must include id and role)
 * @returns true if the user is a developer/admin
 */
export function isDeveloper(
  user?: { id?: string | null; role?: string } | null
): boolean {
  if (!user || !user.id) return false;

  // 1. Root IDs always have access
  const envDevIds = process.env.NEXT_PUBLIC_DEVELOPER_IDS || "";
  const botDevIds =
    process.env.DISCORD_DEVELOPERS ||
    process.env.NEXT_PUBLIC_DISCORD_DEVELOPERS ||
    "";

  const rootIds = [
    ...envDevIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
    ...botDevIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  ];

  if (rootIds.includes(user.id)) return true;

  // 2. Roles: Support, Admin, and Owner roles count as developers in the UI
  // although they may have different visibility levels inside.
  const devRoles = [UserRoles.SUPPORT, UserRoles.ADMIN, UserRoles.OWNER];
  if (user.role && devRoles.includes(user.role)) return true;

  return false;
}

/**
 * Higher-level role check
 */
export function hasRole(
  userRole: string | undefined,
  requiredRole: string
): boolean {
  if (!userRole) return false;

  const roleHierarchy: Record<string, number> = {
    [UserRoles.USER]: 0,
    [UserRoles.SUPPORT]: 1,
    [UserRoles.ADMIN]: 2,
    [UserRoles.OWNER]: 3,
  };

  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}
