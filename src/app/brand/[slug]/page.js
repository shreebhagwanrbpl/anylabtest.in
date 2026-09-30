import { getBrandBySlug } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import CTASection from "@/components/CTASection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return { title: "Brand Not Found | Raj Biosis" };
  }

  const title = `${brand.name} Equipment Supplier & Authorized Distributor | Raj Biosis`;
  const description = `Authorized supplier and dealer of ${brand.name} biomedical equipment in India. Browse ${brand.name} analyzers, instruments, reagents, prices and AMC service support.`;
  const url = `https://anylabtest.in/brand/${slug}`;

  return {
    title,
    description,
    keywords: [
      brand.name,
      `${brand.name} Supplier`,
      `${brand.name} Dealer`,
      `${brand.name} Distributor`,
      `${brand.name} India`,
      `${brand.name} Analyzer`,
      "Biomedical Equipment",
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

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/items" },
    { name: brand.name, url: `/brand/${brand.slug}` },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />

      <PageBanner
        title={`${brand.name} Medical Equipment & Analyzers`}
        subtitle={`Official distribution, supply, calibration and technical AMC support for ${brand.name} diagnostic products in India.`}
      />

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          {/* Brand Info Banner */}
          <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">
                Brand Partner
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                {brand.name} Diagnostics & Equipment
              </h2>
              <p className="text-slate-600 mt-2 text-sm max-w-2xl leading-relaxed">
                Raj Biosis provides certified sales, genuine reagents, optical calibration, and Annual Maintenance Contracts for the complete range of <strong className="text-[#8B2748]">{brand.name}</strong> instruments.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-rose-50 p-4 rounded-2xl text-center">
                <span className="text-2xl font-bold text-[#8B2748]">{brand.products.length}</span>
                <p className="text-xs text-slate-600 font-medium">Products</p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {brand.name} Products Portfolio
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brand.products.map((product) => (
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
