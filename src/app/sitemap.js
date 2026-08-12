import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { fetchFullCatalog } from "@/lib/data-fetcher";

export default async function sitemap() {
  const baseUrl = "https://anylabtest.in";
  const urls = [];

  // 1. Static Pages
  urls.push(
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/items`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    }
  );

  let districts = [];
  try {
    // 2. Fetch Districts
    const districtSnap = await getDocs(
      collection(db, "websites", "anylabtestin", "districts")
    );
    districts = districtSnap.docs.map((d) => d.data());
  } catch (err) {
    console.error("Error fetching districts for sitemap:", err);
  }

  // Add District Static Routes
  districts.forEach((district) => {
    const slug = district.slug;
    if (!slug) return;

    urls.push(
      {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.85,
      },
      {
        url: `${baseUrl}/${slug}/about`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${slug}/services`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${slug}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${slug}/items`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      }
    );
  });

  // 3. Fetch Products Catalog
  let products = [];
  try {
    products = await fetchFullCatalog();
  } catch (err) {
    console.error("Error fetching full catalog for sitemap:", err);
  }

  // Fallback product slugs if database fetch returns empty array
  if (!products || products.length === 0) {
    products = [
      { slug: "5-part-differential-hematology-analyzer" },
      { slug: "semi-automated-biochemistry-analyzer" },
      { slug: "elisa-microplate-reader" },
      { slug: "electrolyte-analyzer" },
      { slug: "urine-analyzer" },
      { slug: "reagents-and-calibrators" },
    ];
  }

  const addedSlugs = new Set();

  products.forEach((product) => {
    if (!product.slug || addedSlugs.has(product.slug)) return;
    addedSlugs.add(product.slug);

    // Main Product URL
    urls.push({
      url: `${baseUrl}/items/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // District x Product URLs
    districts.forEach((district) => {
      if (!district.slug) return;

      urls.push({
        url: `${baseUrl}/${district.slug}/items/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      });
    });
  });

  return urls;
}