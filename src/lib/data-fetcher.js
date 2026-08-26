import { db } from "./firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

// Simple in-memory cache for Firestore documents and catalog
const docCache = {};
let catalogPromise = null;

/**
 * Standardized Data Fetcher with multi-site collection fallback.
 */
export const SITE_ID = "anylabtestin";
export const FALLBACK_SITE_IDS = ["ozallecom", "haemoglobinstripcom"];

export const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Fetch a document with automatic site ID fallback.
 */
export async function fetchDocCached(relativePath) {
  const siteIds = [SITE_ID, ...FALLBACK_SITE_IDS];
  for (const siteId of siteIds) {
    const fullPath = `websites/${siteId}/${relativePath}`;
    if (docCache[fullPath]) {
      return docCache[fullPath];
    }
  }

  const mainPath = `websites/${SITE_ID}/${relativePath}`;
  if (!docCache[mainPath + "_promise"]) {
    docCache[mainPath + "_promise"] = (async () => {
      for (const siteId of siteIds) {
        const fullPath = `websites/${siteId}/${relativePath}`;
        try {
          const parts = fullPath.split("/");
          const docRef = doc(db, ...parts);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            docCache[fullPath] = data;
            docCache[mainPath] = data; // Cache under main key too
            return data;
          }
        } catch (err) {
          console.warn(`[data-fetcher] Attempt for ${fullPath} warning:`, err?.message);
        }
      }
      return null;
    })();
  }
  return docCache[mainPath + "_promise"];
}

/**
 * Fetch and process the entire products catalog.
 */
export async function fetchFullCatalog() {
  if (catalogPromise) {
    return catalogPromise;
  }

  catalogPromise = (async () => {
    const startTime = performance.now();
    const siteIds = [SITE_ID, ...FALLBACK_SITE_IDS];
    const allProducts = [];

    for (const siteId of siteIds) {
      try {
        const categorySnap = await getDocs(
          collection(db, "websites", siteId, "pages", "categoryproducts", "categories")
        );

        if (!categorySnap.empty) {
          await Promise.all(
            categorySnap.docs.map(async (categoryDoc) => {
              const data = categoryDoc.data();
              const categoryName = data.category || categoryDoc.id;

              try {
                const subcategoriesCol = collection(
                  db,
                  "websites",
                  siteId,
                  "pages",
                  "categoryproducts",
                  "categories",
                  categoryDoc.id,
                  "subcategories"
                );

                const subcategoriesSnap = await getDocs(subcategoriesCol);

                subcategoriesSnap.forEach((subDoc) => {
                  const subData = subDoc.data();
                  const subCategoryName = subData.subCategory || subDoc.id;

                  const categoryProducts = (subData.products || [])
                    .filter((p) => p.isPublished !== false)
                    .map((item, index) => ({
                      ...item,
                      uid: `${categoryDoc.id}-${subDoc.id}-${index}`,
                      category: categoryName,
                      subCategory: subCategoryName,
                      brand: item.brand || item.manufacturer || "Raj Biosis",
                      slug: item.slug || makeSlug(item.title),
                    }));

                  allProducts.push(...categoryProducts);
                });
              } catch (subErr) {
                console.error(`Error fetching subcategories for category ${categoryDoc.id}:`, subErr);
              }

              if (data.products?.length) {
                const directProducts = data.products
                  .filter((p) => p.isPublished !== false)
                  .map((item, index) => ({
                    ...item,
                    uid: `${categoryDoc.id}-direct-${index}`,
                    category: categoryName,
                    subCategory: item.subCategory || categoryName,
                    brand: item.brand || item.manufacturer || "Raj Biosis",
                    slug: item.slug || makeSlug(item.title),
                  }));
                allProducts.push(...directProducts);
              }
            })
          );

          // If products found, break out of loop
          if (allProducts.length > 0) break;
        }
      } catch (err) {
        console.warn(`[data-fetcher] Catalog fetch for siteId ${siteId} failed:`, err?.message);
      }
    }

    // Fallback legacy products fetch
    if (allProducts.length === 0) {
      for (const siteId of siteIds) {
        try {
          const oldSnap = await getDoc(doc(db, "websites", siteId, "pages", "products"));
          if (oldSnap.exists()) {
            const oldProducts = (oldSnap.data().products || [])
              .filter((p) => p.isPublished !== false)
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category: "Other Products",
                subCategory: item.subCategory || "Other Products",
                brand: item.brand || "Raj Biosis",
                slug: item.slug || makeSlug(item.title),
              }));

            allProducts.push(...oldProducts);
            if (allProducts.length > 0) break;
          }
        } catch (oldErr) {
          console.error("Error fetching legacy products:", oldErr);
        }
      }
    }

    const duration = performance.now() - startTime;
    console.log(`[data-fetcher] fetchFullCatalog returned ${allProducts.length} items in ${duration.toFixed(2)}ms`);

    return allProducts;
  })();

  return catalogPromise;
}

/**
 * Fetch list of districts with fallback across site collections.
 */
export async function fetchDistrictsList() {
  const siteIds = [SITE_ID, ...FALLBACK_SITE_IDS];
  for (const siteId of siteIds) {
    try {
      const snap = await getDocs(collection(db, "websites", siteId, "districts"));
      if (!snap.empty) {
        return snap.docs
          .map((d) => d.data())
          .filter((d) => d && d.slug);
      }
    } catch (err) {
      console.warn(`[data-fetcher] District list fetch for ${siteId} warning:`, err?.message);
    }
  }

  // Fallback default districts list if database query fails or returns empty
  return [
    { slug: "jaipur", district: "Jaipur", state: "Rajasthan" },
    { slug: "jodhpur", district: "Jodhpur", state: "Rajasthan" },
    { slug: "udaipur", district: "Udaipur", state: "Rajasthan" },
    { slug: "kota", district: "Kota", state: "Rajasthan" },
    { slug: "bikaner", district: "Bikaner", state: "Rajasthan" },
    { slug: "ajmer", district: "Ajmer", state: "Rajasthan" },
    { slug: "delhi", district: "Delhi", state: "Delhi" },
    { slug: "mumbai", district: "Mumbai", state: "Maharashtra" },
    { slug: "ahmedabad", district: "Ahmedabad", state: "Gujarat" },
    { slug: "indore", district: "Indore", state: "Madhya Pradesh" },
  ];
}

/**
 * Helpers for cached document retrieval across pages
 */
export async function fetchHomeData() {
  return fetchDocCached("pages/home");
}

export async function fetchContactData() {
  return fetchDocCached("pages/contact");
}

export async function fetchServicesData() {
  return fetchDocCached("pages/services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  return fetchDocCached(`districts/${district}`);
}

