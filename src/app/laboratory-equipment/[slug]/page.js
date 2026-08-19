import { getCategoryBySlug, getAllCategories } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Laboratory Equipment | Raj Biosis" };
  }

  const title = `Laboratory ${category.name} | Certified Lab Supplier in India | Raj Biosis`;
  const description = `High accuracy laboratory ${category.name} for clinical pathology labs, hospitals, and diagnostic testing centers. View specifications, models, prices, and request instant quotation.`;
  const url = `https://anylabtest.in/laboratory-equipment/${slug}`;

  return {
    title,
    description,
    keywords: [
      `Laboratory ${category.name}`,
      `Lab ${category.name} Supplier`,
      "Pathology Lab Equipment",
      "Diagnostic Laboratory Machines",
      "Raj Biosis",
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

export default async function LaboratoryEquipmentPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Laboratory Equipment", url: "/items" },
    { name: category.name, url: `/laboratory-equipment/${category.slug}` },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />

      <PageBanner
        title={`Laboratory ${category.name}`}
        subtitle={`Clinical diagnostic laboratory solutions engineered for high test accuracy, speed, and continuous operation.`}
      />

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
              Clinical Laboratory {category.name} Range
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map((product) => (
                <ProductCard key={product.uid || product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
