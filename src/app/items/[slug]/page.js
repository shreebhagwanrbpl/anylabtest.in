import ProductDetails from "./ProductDetails";
import { getProductBySlug, fetchFullCatalog } from "@/lib/data-fetcher-server";

export async function generateStaticParams() {
  const products = await fetchFullCatalog();
  // Prerender top 100 items at build time for fast Cloud Build deployments.
  // Remaining items are rendered on demand.
  return products.slice(0, 100).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const productName = product?.title || slug
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  const brandName = product?.brand || "Raj Biosis";
  const categoryName = product?.category || "Biomedical Equipment";

  const title = `${productName} Supplier in India | ${brandName} | Raj Biosis`;

  const description = product?.description
    ? `${product.description.slice(0, 150)}... Contact Raj Biosis for latest price and supplier quotation in India.`
    : `Buy ${productName} by ${brandName} at best price in India. Certified supplier, dealer and distributor of ${categoryName} for clinical laboratories and hospitals.`;

  const url = `https://anylabtest.in/items/${slug}`;
  const imageUrl = product?.image || product?.images?.[0] || "https://anylabtest.in/logo.png";

  return {
    title,
    description,

    keywords: [
      productName,
      `${productName} Supplier`,
      `${productName} Dealer`,
      `${productName} Distributor`,
      `${productName} Price`,
      `${productName} Price in India`,
      `${productName} Supplier in India`,
      `${brandName} ${productName}`,
      categoryName,
      "Biomedical Equipment",
      "Laboratory Equipment",
      "Diagnostic Equipment",
      "Raj Biosis",
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Raj Biosis",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: productName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    metadataBase: new URL("https://anylabtest.in"),
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}