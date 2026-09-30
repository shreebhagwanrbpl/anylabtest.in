import {
  fetchLiveCatalogFromVPS,
  fetchLiveSiteDataFromVPS,
} from "./admin-api.js";
import {
  WEBSITE_ID,
  getWebsiteId,
  makeSlug,
  isItemVisibleOnWebsite,
} from "./catalog-utils.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Fetches the full product catalog directly from the live VPS Admin API.
 * Never serves stale cached data.
 */
export async function fetchFullCatalog(targetWebsiteId) {
  try {
    const websiteId = targetWebsiteId || getWebsiteId();
    const products = await fetchLiveCatalogFromVPS(websiteId);
    return products.filter((p) => isItemVisibleOnWebsite(p, websiteId));
  } catch (err) {
    console.error("[data-fetcher-server] Error fetching full catalog:", err);
    return [];
  }
}

export async function getProductBySlug(slug, targetWebsiteId) {
  const catalog = await fetchFullCatalog(targetWebsiteId);
  return catalog.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;
}

export async function getAllCategories(targetWebsiteId) {
  const map = new Map();
  const catalog = await fetchFullCatalog(targetWebsiteId);

  catalog.forEach((p) => {
    const name = p.category || "General";
    const slug = makeSlug(name);
    if (!map.has(slug)) {
      map.set(slug, { name, slug, products: [] });
    }
    map.get(slug).products.push(p);
  });

  return [...map.values()];
}

export async function getCategoryBySlug(slug, targetWebsiteId) {
  const categories = await getAllCategories(targetWebsiteId);
  return categories.find((c) => c.slug === slug) || null;
}

export async function getAllBrands(targetWebsiteId) {
  const map = new Map();
  const catalog = await fetchFullCatalog(targetWebsiteId);

  catalog.forEach((p) => {
    const name = p.brand || "";
    if (!name) return;
    const slug = makeSlug(name);
    if (!map.has(slug)) {
      map.set(slug, { name, slug, products: [] });
    }
    map.get(slug).products.push(p);
  });

  return [...map.values()];
}

export async function getBrandBySlug(slug, targetWebsiteId) {
  const brands = await getAllBrands(targetWebsiteId);
  return brands.find((b) => b.slug === slug) || null;
}

export async function fetchDistrictsList(targetWebsiteId) {
  try {
    const websiteId = targetWebsiteId || getWebsiteId();
    const districts = await fetchLiveSiteDataFromVPS(websiteId, "districts");
    return Array.isArray(districts) ? districts : [];
  } catch (err) {
    console.error("[data-fetcher-server] Error reading districts from live API:", err);
    return [];
  }
}

export const getDistricts = fetchDistrictsList;
export const fetchDistrictsInState = fetchDistrictsList;

export async function fetchDistrictData(district, targetWebsiteId) {
  try {
    const websiteId = targetWebsiteId || getWebsiteId();
    const data = await fetchLiveSiteDataFromVPS(websiteId, "district", { district });
    return data || null;
  } catch (err) {
    console.error(`[data-fetcher-server] Error reading district (${district}) data:`, err);
    return null;
  }
}

export async function fetchPageData(page, targetWebsiteId) {
  try {
    const websiteId = targetWebsiteId || getWebsiteId();
    const data = await fetchLiveSiteDataFromVPS(websiteId, page);
    return data || null;
  } catch (err) {
    console.error(`[data-fetcher-server] Error reading page (${page}) data:`, err);
    return null;
  }
}

export { makeSlug };
