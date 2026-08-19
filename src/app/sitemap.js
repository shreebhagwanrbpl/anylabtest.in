import { fetchFullCatalog, getAllCategories, getAllBrands, getDistricts } from "@/lib/data-fetcher-server";

export default async function sitemap() {
  const baseUrl = "https://anylabtest.in";
  const urls = [];

  // 1. Static Pages
  urls.push(
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/items`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 }
  );

  // 2. Category Hub Pages
  try {
    const categories = await getAllCategories();
    categories.forEach((cat) => {
      urls.push({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
      urls.push({
        url: `${baseUrl}/laboratory-equipment/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  } catch (err) {
    console.error("Error generating category sitemaps:", err);
  }

  // 3. Brand Hub Pages
  try {
    const brands = await getAllBrands();
    brands.forEach((brand) => {
      urls.push({
        url: `${baseUrl}/brand/${brand.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  } catch (err) {
    console.error("Error generating brand sitemaps:", err);
  }

  // 4. Products Catalog
  let products = [];
  try {
    products = await fetchFullCatalog();
  } catch (err) {
    console.error("Error fetching full catalog for sitemap:", err);
  }

  const addedProductSlugs = new Set();
  products.forEach((product) => {
    if (!product.slug || addedProductSlugs.has(product.slug)) return;
    addedProductSlugs.add(product.slug);

    urls.push({
      url: `${baseUrl}/items/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  // 5. High-Value District Hub Pages
  try {
    const districts = await getDistricts();
    districts.forEach((district) => {
      if (!district.slug) return;

      urls.push({
        url: `${baseUrl}/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      });
    });
  } catch (err) {
    console.error("Error generating district sitemaps:", err);
  }

  return urls;
}