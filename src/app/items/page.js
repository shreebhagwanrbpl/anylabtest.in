import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const revalidate = 3600; // Revalidate cache every hour

export async function generateMetadata({ searchParams }) {
  const title = "Biomedical & Laboratory Equipment Catalog | Raj Biosis India";
  const description = "Browse our full catalog of certified CBC machines, 5-part hematology analyzers, biochemistry analyzers, ELISA readers, electrolyte instruments, and diagnostic reagents.";
  const url = "https://anylabtest.in/items";

  return {
    title,
    description,
    keywords: [
      "Biomedical Equipment Catalog",
      "Laboratory Analyzers",
      "CBC Machine Price",
      "Biochemistry Analyzer Supplier",
      "Diagnostic Reagents India",
      "Raj Biosis Products",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Raj Biosis",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}
