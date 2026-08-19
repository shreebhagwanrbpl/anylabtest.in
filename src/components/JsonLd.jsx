import React from "react";

export function SchemaScript({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function JsonLd({
  city = "",
  product = null,
  faqs = [],
  breadcrumbs = [],
}) {
  const baseUrl = "https://anylabtest.in";
  const locationName = city ? `${city}, India` : "India";
  const siteName = "Raj Biosis - Biomedical & Diagnostic Equipment Supplier";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Store"],
    "@id": `${baseUrl}/#organization`,
    name: "Raj Biosis",
    legalName: "Raj Biosis Biomedical Systems",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    description: `Raj Biosis is a leading biomedical and laboratory equipment supplier in ${locationName}, offering CBC Machines, Hematology Analyzers, Biochemistry Analyzers, Reagents, and Diagnostic Equipment.`,
    email: "contact@anylabtest.in",
    areaServed: city
      ? [
          {
            "@type": "AdministrativeArea",
            name: city,
          },
          {
            "@type": "Country",
            name: "India",
          },
        ]
      : {
          "@type": "Country",
          name: "India",
        },
    address: {
      "@type": "PostalAddress",
      addressLocality: city || "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    priceRange: "₹₹₹",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: siteName,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/items?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Product Schema
  let productSchema = null;
  if (product) {
    const rawPrice = product.price || product.mrp;
    const numericPrice = typeof rawPrice === "number" ? rawPrice : parseFloat(String(rawPrice).replace(/[^0-9.]/g, "")) || 0;

    productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title || product.name,
      image: product.images?.[0] || product.image || `${baseUrl}/logo.png`,
      description:
        product.description ||
        product.desc ||
        `Buy ${product.title} at best price in ${locationName}. High precision diagnostic laboratory equipment supplied by Raj Biosis.`,
      brand: {
        "@type": "Brand",
        name: product.brand || "Raj Biosis",
      },
      offers: {
        "@type": "Offer",
        url: `${baseUrl}/items/${product.slug}`,
        priceCurrency: "INR",
        price: numericPrice > 0 ? String(numericPrice) : "0",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Raj Biosis",
        },
      },
    };
  }

  // FAQ Schema
  let faqSchema = null;
  if (faqs && faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question || faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer || faq.a,
        },
      })),
    };
  }

  // Breadcrumb Schema
  let breadcrumbSchema = null;
  if (breadcrumbs && breadcrumbs.length > 0) {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
      })),
    };
  }

  return (
    <>
      <SchemaScript schema={organizationSchema} />
      <SchemaScript schema={websiteSchema} />
      {productSchema && <SchemaScript schema={productSchema} />}
      {faqSchema && <SchemaScript schema={faqSchema} />}
      {breadcrumbSchema && <SchemaScript schema={breadcrumbSchema} />}
    </>
  );
}

