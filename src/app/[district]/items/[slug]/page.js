import ProductDetails from "../../../items/[slug]/ProductDetails";

export async function generateMetadata({ params }) {
  const { slug, district } = await params;

  const productName = slug
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  const districtName = district
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${productName} Supplier in ${districtName} | Best Price, Dealer & Service | Raj Biosis`;

  const description = `Buy ${productName} at best price in ${districtName}. Certified supplier, dealer and technical distributor of ${productName} for hospitals, laboratories, diagnostic centers, pathology labs and medical facilities across ${districtName}. Contact Raj Biosis for quotation, installation and AMC support.`;

  const url = `https://anylabtest.in/${district}/items/${slug}`;

  return {
    title,
    description,

    keywords: [
      `${productName} in ${districtName}`,
      `${productName} Supplier ${districtName}`,
      `${productName} Dealer ${districtName}`,
      `${productName} Distributor ${districtName}`,
      `${productName} Price in ${districtName}`,
      `Buy ${productName} ${districtName}`,
      `${productName} Laboratory Equipment ${districtName}`,
      `${productName} Hospital ${districtName}`,
      `${productName} Pathology Lab ${districtName}`,
      `Biomedical Equipment Supplier ${districtName}`,
      `Diagnostic Machines ${districtName}`,
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
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const { slug, district } = await params;

  return (
    <ProductDetails
      slug={slug}
      district={district}
    />
  );
}