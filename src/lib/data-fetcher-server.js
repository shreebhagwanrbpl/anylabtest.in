import "server-only";
import { cache } from "react";
import { readCollection, readDocument } from "@/lib/sqliteDb";
import { COMPANY_ID, WEBSITE_ID, isItemVisibleOnWebsite, makeSlug } from "@/lib/catalog-utils";

export function getCatalogProductsDirectly() {
  try {
    const cats = readCollection(`companies/${COMPANY_ID}/categories`);
    const visibleCats = new Map(cats.filter(isItemVisibleOnWebsite).map((c) => [c.id, c]));
    const products = [];

    for (const cat of cats) {
      if (!visibleCats.has(cat.id)) continue;
      const subs = readCollection(`companies/${COMPANY_ID}/categories/${cat.id}/subcategories`);
      for (const sub of subs) {
        if (!isItemVisibleOnWebsite(sub)) continue;
        const embedded = Array.isArray(sub.products) ? sub.products : [];
        for (const p of embedded) {
          if (isItemVisibleOnWebsite(p)) {
            products.push({
              ...p,
              category: p.category || cat.category || cat.name || cat.title,
              subCategory: p.subCategory || sub.subCategory || sub.name,
              slug: p.slug || makeSlug(p.title),
            });
          }
        }
        const child = readCollection(`companies/${COMPANY_ID}/categories/${cat.id}/subcategories/${sub.id}/products`);
        for (const p of child) {
          if (isItemVisibleOnWebsite(p)) {
            products.push({
              ...p,
              category: p.category || cat.category || cat.name || cat.title,
              subCategory: p.subCategory || sub.subCategory || sub.name,
              slug: p.slug || makeSlug(p.title),
            });
          }
        }
      }
    }

    for (const p of readCollection(`companies/${COMPANY_ID}/products`)) {
      if (!isItemVisibleOnWebsite(p)) continue;
      if (p.categoryId && !visibleCats.has(p.categoryId)) continue;
      if (
        p.category &&
        cats.length &&
        !cats.some((c) => isItemVisibleOnWebsite(c) && (c.category || c.name || c.title) === p.category)
      ) {
        continue;
      }
      products.push({ ...p, slug: p.slug || makeSlug(p.title) });
    }

    const unique = new Map(products.map((p, i) => [p.id || p.uid || p.slug || `${p.title}-${i}`, p]));
    return [...unique.values()];
  } catch (err) {
    console.error("[data-fetcher-server] Error querying SQLite catalog:", err);
    return [];
  }
}

export const fetchFullCatalog = cache(async () => {
  return getCatalogProductsDirectly();
});

export const getProductBySlug = cache(async (slug) => {
  const c = await fetchFullCatalog();
  return c.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;
});

export const getAllCategories = cache(async () => {
  const map = new Map();
  (await fetchFullCatalog()).forEach((p) => {
    const name = p.category || "General";
    const slug = makeSlug(name);
    if (!map.has(slug)) map.set(slug, { name, slug, products: [] });
    map.get(slug).products.push(p);
  });
  return [...map.values()];
});

export const getCategoryBySlug = cache(async (slug) => {
  return (await getAllCategories()).find((c) => c.slug === slug) || null;
});

export const getAllBrands = cache(async () => {
  const map = new Map();
  (await fetchFullCatalog()).forEach((p) => {
    const name = p.brand || "";
    if (!name) return;
    const slug = makeSlug(name);
    if (!map.has(slug)) map.set(slug, { name, slug, products: [] });
    map.get(slug).products.push(p);
  });
  return [...map.values()];
});

export const getBrandBySlug = cache(async (slug) => {
  return (await getAllBrands()).find((b) => b.slug === slug) || null;
});

export const fetchDistrictsList = cache(async () => {
  try {
    const list = readCollection(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts`);
    return list || [];
  } catch (err) {
    console.error("[data-fetcher-server] Error reading districts from SQLite:", err);
    return [];
  }
});

export const getDistricts = fetchDistrictsList;
export const fetchDistrictsInState = fetchDistrictsList;
export { makeSlug };
