export const ADMIN_API_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  "https://admin.rajbiosis.app";

export const DEFAULT_WEBSITE_ID = "anylabtestin";

/**
 * Normalizes domain strings to website ID format:
 * removes http://, https://, www., ports, and special characters (e.g. anylabtest.in -> anylabtestin)
 */
export function normalizeDomainId(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/:\d+$/, "") // strip port like :3000
    .replace(/localhost/g, "")
    .replace(/127\.0\.0\.1/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Dynamically resolves WEBSITE_ID from:
 * 1. NEXT_PUBLIC_WEBSITE_ID
 * 2. WEBSITE_ID
 * 3. Explicit host parameter
 * 4. Browser window.location.hostname
 * 5. npm_package_name / default fallback
 */
export function getWebsiteId(explicitHost) {
  if (process.env.NEXT_PUBLIC_WEBSITE_ID) {
    const normalized = normalizeDomainId(process.env.NEXT_PUBLIC_WEBSITE_ID);
    if (normalized) return normalized;
  }
  if (process.env.WEBSITE_ID) {
    const normalized = normalizeDomainId(process.env.WEBSITE_ID);
    if (normalized) return normalized;
  }
  if (explicitHost) {
    const normalized = normalizeDomainId(explicitHost);
    if (normalized) return normalized;
  }
  if (typeof window !== "undefined" && window.location?.hostname) {
    const normalized = normalizeDomainId(window.location.hostname);
    if (normalized) return normalized;
  }
  if (process.env.npm_package_name) {
    const normalized = normalizeDomainId(process.env.npm_package_name);
    if (normalized) return normalized;
  }
  return DEFAULT_WEBSITE_ID;
}

export const WEBSITE_ID = getWebsiteId();
export const COMPANY_ID =
  process.env.COMPANY_ID || process.env.SQLITE_COMPANY_ID || "rajbiosis";

/**
 * Resolves media and upload URLs.
 * If path starts with /uploads/ or uploads/, prepends the VPS admin API URL.
 */
export function resolveImageUrl(url = "") {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  const base = ADMIN_API_BASE_URL.replace(/\/$/, "");
  if (trimmed.startsWith("/uploads/")) {
    return `${base}${trimmed}`;
  }
  if (trimmed.startsWith("uploads/")) {
    return `${base}/${trimmed}`;
  }
  return trimmed;
}

export const getMediaUrl = resolveImageUrl;

export function makeSlug(text = "") {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function isItemVisibleOnWebsite(item = {}, targetWebsiteId = WEBSITE_ID) {
  if (!item) return false;
  if (item.isPublished === false) return false;
  if (["inactive", "draft"].includes(String(item.status || "").toLowerCase())) return false;
  if (Array.isArray(item.websiteIds) && item.websiteIds.length === 0) return false;
  if (item.websiteIds == null) return true;
  const target = normalizeDomainId(targetWebsiteId);
  return item.websiteIds.some((id) => {
    const normalized = normalizeDomainId(id);
    return normalized === "all" || normalized === target;
  });
}
