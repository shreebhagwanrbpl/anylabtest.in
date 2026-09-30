import {
  ADMIN_API_BASE_URL,
  getWebsiteId,
  resolveImageUrl,
  makeSlug,
  isItemVisibleOnWebsite,
} from "./catalog-utils.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Universal client/server fetch helper.
 * On browser: uses same-origin /api/... routes to avoid CORS blocking.
 * On server: uses ADMIN_API_BASE_URL (https://admin.rajbiosis.app).
 */
async function apiFetch(endpoint) {
  const isClient = typeof window !== "undefined";
  const base = isClient ? "" : ADMIN_API_BASE_URL.replace(/\/$/, "");
  
  const fullPath = endpoint.startsWith("http")
    ? endpoint
    : `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  let urlObj;
  if (isClient && !fullPath.startsWith("http")) {
    urlObj = new URL(fullPath, window.location.origin);
  } else {
    urlObj = new URL(fullPath);
  }

  urlObj.searchParams.set("_t", String(Date.now()));

  const fetchOptions = {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  };

  if (!isClient) {
    fetchOptions.next = { revalidate: 0 };
  }

  const res = await fetch(urlObj.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${endpoint}`);
  }

  return res.json();
}

export async function fetchFullCatalog() {
  const websiteId = getWebsiteId();
  try {
    const isClient = typeof window !== "undefined";
    if (!isClient) {
      const { fetchLiveCatalogFromVPS } = await import("./admin-api.js");
      const products = await fetchLiveCatalogFromVPS(websiteId);
      return products.filter((p) => isItemVisibleOnWebsite(p, websiteId));
    }

    const data = await apiFetch(`/api/catalog?websiteId=${encodeURIComponent(websiteId)}`);
    const rawProducts = Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    return rawProducts
      .filter((p) => isItemVisibleOnWebsite(p, websiteId))
      .map((p) => {
        const img = resolveImageUrl(p.image || p.imageUrl || "");
        const images = Array.isArray(p.images) && p.images.length > 0
          ? p.images.map(resolveImageUrl)
          : img
          ? [img]
          : [];

        return {
          ...p,
          image: img || (images[0] || ""),
          images,
          video: p.video ? resolveImageUrl(p.video) : p.video,
          pdf: p.pdf ? resolveImageUrl(p.pdf) : p.pdf,
          slug: p.slug || makeSlug(p.title || p.name || ""),
        };
      });
  } catch (err) {
    console.error("[data-fetcher] Error fetching full catalog:", err);
    return [];
  }
}

export async function fetchPageData(page) {
  const websiteId = getWebsiteId();
  try {
    const isClient = typeof window !== "undefined";
    if (!isClient) {
      const { fetchLiveSiteDataFromVPS } = await import("./admin-api.js");
      const data = await fetchLiveSiteDataFromVPS(websiteId, page);
      if (page === "districts") {
        return Array.isArray(data) ? data : data?.districts || data?.data || [];
      }
      return data?.data !== undefined ? data.data : data;
    }

    const data = await apiFetch(
      `/api/site-data?websiteId=${encodeURIComponent(websiteId)}&type=${encodeURIComponent(page)}&page=${encodeURIComponent(page)}`
    );
    if (page === "districts") {
      return data?.districts || data?.data || [];
    }
    return data?.data !== undefined ? data.data : data;
  } catch (err) {
    console.error(`[data-fetcher] Error fetching ${page} data:`, err);
    return null;
  }
}

export async function fetchHomeData() {
  return fetchPageData("home");
}

export async function fetchContactData() {
  return fetchPageData("contact");
}

export async function fetchServicesData() {
  return fetchPageData("services");
}

export async function fetchAboutData() {
  return fetchPageData("about");
}

export async function fetchDistrictsList() {
  return fetchPageData("districts");
}

export async function fetchDistrictsInState() {
  return fetchDistrictsList();
}

export async function fetchDistrictData(district) {
  const websiteId = getWebsiteId();
  try {
    const data = await apiFetch(
      `/api/site-data?websiteId=${encodeURIComponent(websiteId)}&type=district&district=${encodeURIComponent(district || "")}`
    );
    return data?.data !== undefined ? data.data : data;
  } catch (err) {
    console.error(`[data-fetcher] Error fetching district (${district}) data:`, err);
    return null;
  }
}

export async function fetchProductBySlug(slug) {
  const list = await fetchFullCatalog();
  return list.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;
}

export { makeSlug, resolveImageUrl };
