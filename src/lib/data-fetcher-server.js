import { fetchFullCatalog as fetchFullCatalogRaw, makeSlug, fetchDistrictsList } from "./data-fetcher";
import { cache } from "react";
import fs from "fs";
import path from "path";

// Global in-memory cache for the server process to bypass Next.js 2MB unstable_cache limit
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

const CACHE_DIR = path.join(process.cwd(), ".next", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "catalog-cache.json");

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    return cachedCatalog;
  }

  // Check filesystem cache
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    if (fs.existsSync(CACHE_FILE)) {
      const stats = fs.statSync(CACHE_FILE);
      // Ensure the file is not stale
      if ((now - stats.mtimeMs) < CACHE_TTL) {
        console.log("[data-fetcher-server] Server disk cache hit. Loading catalog from disk...");
        const fileContent = fs.readFileSync(CACHE_FILE, "utf8");
        if (fileContent && fileContent.trim().length > 0) {
          const data = JSON.parse(fileContent);
          if (data && data.length > 0) {
            cachedCatalog = data;
            cachedCatalogTimestamp = now;
            return data;
          }
        }
      }
    }
  } catch (err) {
    console.warn("[data-fetcher-server] Disk cache read error:", err?.message);
  }

  console.log("[data-fetcher-server] Server disk/memory cache miss. Fetching raw catalog from Firestore...");
  const data = await fetchFullCatalogRaw();

  // Write to disk cache atomically to avoid race conditions
  try {
    const tempFile = CACHE_FILE + "." + Math.random().toString(36).substring(2) + ".tmp";
    fs.writeFileSync(tempFile, JSON.stringify(data), "utf8");
    fs.renameSync(tempFile, CACHE_FILE);
    console.log(`[data-fetcher-server] Successfully wrote catalog cache to disk (${data.length} items).`);
  } catch (err) {
    console.warn("[data-fetcher-server] Disk cache write error:", err?.message);
  }

  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  const start = performance.now();
  const products = await getCachedCatalog();
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchFullCatalog took ${(end - start).toFixed(2)}ms`);
  return products;
});

export const getProductBySlug = cache(async (slug) => {
  const catalog = await fetchFullCatalog();
  return catalog.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;
});

export const getAllCategories = cache(async () => {
  const catalog = await fetchFullCatalog();
  const categoryMap = new Map();

  catalog.forEach((product) => {
    const catName = product.category || "General Medical Equipment";
    const slug = makeSlug(catName);
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        name: catName,
        slug,
        products: [],
      });
    }
    categoryMap.get(slug).products.push(product);
  });

  return Array.from(categoryMap.values());
});

export const getCategoryBySlug = cache(async (slug) => {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug) || null;
});

export const getAllBrands = cache(async () => {
  const catalog = await fetchFullCatalog();
  const brandMap = new Map();

  catalog.forEach((product) => {
    const brandName = product.brand || "Raj Biosis";
    const slug = makeSlug(brandName);
    if (!brandMap.has(slug)) {
      brandMap.set(slug, {
        name: brandName,
        slug,
        products: [],
      });
    }
    brandMap.get(slug).products.push(product);
  });

  return Array.from(brandMap.values());
});

export const getBrandBySlug = cache(async (slug) => {
  const brands = await getAllBrands();
  return brands.find((b) => b.slug === slug) || null;
});

export const getDistricts = cache(async () => {
  return await fetchDistrictsList();
});

/**
 * Phase 24 Quality Scoring Engine (0 - 100)
 */
export function calculateSEOQualityScore({ title, description, content, internalLinksCount, hasCanonical, hasSchema }) {
  let score = 0;

  // Technical SEO (20 pts)
  if (hasCanonical) score += 10;
  if (hasSchema) score += 10;

  // Metadata (10 pts)
  if (title && title.length >= 30 && title.length <= 70) score += 5;
  if (description && description.length >= 70 && description.length <= 160) score += 5;

  // Content Quality & Depth (20 pts)
  const wordCount = content ? content.split(/\s+/).length : 0;
  if (wordCount >= 300) score += 20;
  else if (wordCount >= 150) score += 10;

  // Search Intent Relevance (15 pts)
  if (title && /supplier|dealer|distributor|price|analyzer|equipment/i.test(title)) score += 15;

  // Internal Linking (10 pts)
  if (internalLinksCount >= 5) score += 10;
  else if (internalLinksCount >= 2) score += 5;

  // Performance / Baseline (5 pts)
  score += 5;
  // Local/Product relevance (10 pts)
  score += 10;

  return Math.min(100, score);
}

