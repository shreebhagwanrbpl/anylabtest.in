import {
  ADMIN_API_BASE_URL,
  getWebsiteId,
  normalizeDomainId,
  resolveImageUrl,
  makeSlug,
} from "./catalog-utils.js";

export { ADMIN_API_BASE_URL };

/**
 * Generic fetch wrapper for Admin VPS API with cache busting and no-store
 */
export async function adminApiFetch(endpoint, options = {}) {
  const base = ADMIN_API_BASE_URL.replace(/\/$/, "");
  const fullUrl = endpoint.startsWith("http")
    ? endpoint
    : `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const urlObj = new URL(fullUrl);
  urlObj.searchParams.set("_t", String(Date.now()));

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    ...(options.headers || {}),
  };

  const fetchOptions = {
    ...options,
    headers,
    cache: "no-store",
    next: { revalidate: 0 },
  };

  const res = await fetch(urlObj.toString(), fetchOptions);
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(data?.error || `Admin API Error: ${res.status}`);
  }

  return data;
}

/**
 * Fetches the live catalog for a website.
 * Prioritizes the live VPS Admin API, with local dev server check if empty in development.
 */
export async function fetchLiveCatalogFromVPS(websiteId) {
  const targetId = websiteId ? normalizeDomainId(websiteId) : getWebsiteId();
  const base = ADMIN_API_BASE_URL.replace(/\/$/, "");
  const url = `${base}/api/catalog?websiteId=${encodeURIComponent(targetId)}`;

  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("_t", String(Date.now()));

    const res = await fetch(urlObj.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) {
      console.error(`[admin-api] Live VPS catalog error: ${res.status}`);
      return [];
    }

    const data = await res.json();

    const rawProducts = Array.isArray(data)
      ? data
      : Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.catalog)
      ? data.catalog
      : [];

    return rawProducts.map((p, idx) => {
      const title = p.title || p.name || `Biomedical Equipment ${idx + 1}`;
      const slug = p.slug || makeSlug(title);
      const rawImage = p.image || p.imageUrl || (Array.isArray(p.images) && p.images[0]) || "/logo.png";
      const image = resolveImageUrl(rawImage) || "/logo.png";
      const images = Array.isArray(p.images) && p.images.length > 0
        ? p.images.map(resolveImageUrl).filter(Boolean)
        : [image];

      return {
        ...p,
        uid: p.uid || p.id || p.productId || `${slug}-${idx}`,
        id: p.id || p.uid || p.productId || `${slug}-${idx}`,
        title,
        name: title,
        slug,
        image,
        images,
        video: p.video ? resolveImageUrl(p.video) : p.video || "",
        pdf: p.pdf ? resolveImageUrl(p.pdf) : p.pdf || "",
        category: p.category || "Laboratory Equipment",
        subCategory: p.subCategory || p.subcategory || p.category || "General",
        brand: p.brand || "Raj Biosis",
        model: p.model || "Standard",
        description: p.description || p.desc || "Certified biomedical diagnostic equipment.",
        price: p.price || p.mrp || "",
        isPublished: p.isPublished !== false,
        status: p.status || "active",
        websiteIds: Array.isArray(p.websiteIds) ? p.websiteIds : undefined,
      };
    });
  } catch (e) {
    console.error("[admin-api] Error fetching catalog from live VPS:", e);
    return [];
  }
}

/**
 * Fetches page/site data directly from VPS
 */
export async function fetchLiveSiteDataFromVPS(websiteId, pageOrType, extra = {}) {
  const targetId = websiteId ? normalizeDomainId(websiteId) : getWebsiteId();
  const typeParam = pageOrType || "home";

  let query = `websiteId=${encodeURIComponent(targetId)}&type=${encodeURIComponent(typeParam)}&page=${encodeURIComponent(typeParam)}`;
  if (extra.district) {
    query += `&district=${encodeURIComponent(extra.district)}`;
  }

  const base = ADMIN_API_BASE_URL.replace(/\/$/, "");
  const url = `${base}/api/site-data?${query}`;

  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("_t", String(Date.now()));

    const res = await fetch(urlObj.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) {
      console.error(`[admin-api] Live VPS site-data error: ${res.status}`);
      return null;
    }

    const resData = await res.json();

    if (resData && typeof resData === "object") {
      if (typeParam === "districts") {
        const list = resData.districts || resData.data;
        return Array.isArray(list) ? list : [];
      } else if (resData.data !== undefined && resData.data !== null) {
        return resData.data;
      } else if (resData && Object.keys(resData).length > 0 && resData.success !== false) {
        return resData;
      }
    }
  } catch (e) {
    console.error("[admin-api] Error fetching site data from live VPS:", e);
  }

  return null;
}

/**
 * Posts to VPS Firestore endpoint
 */
export async function postLiveFirestore(path, data, action = "add") {
  const endpoint = "/api/local-firestore";
  return adminApiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      action,
      path,
      data: {
        ...data,
        createdAt: data.createdAt || new Date().toISOString(),
      },
    }),
  });
}
