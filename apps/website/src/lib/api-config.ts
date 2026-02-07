/**
 * API Configuration
 * Centralized place for API versioning and paths
 */

export const API_VERSION = "v1";
export const API_PREFIX = `/api/${API_VERSION}`;

/**
 * Builds a versioned bot API URL
 * Maps /api/v1/resource to the actual bot endpoint
 */
export const getBotApiUrl = (path: string) => {
  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If path already contains /api/v1 (or current version), use it as is
  if (cleanPath.startsWith(API_PREFIX)) {
    return cleanPath;
  }

  return `${API_PREFIX}${cleanPath}`;
};
