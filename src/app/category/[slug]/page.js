import { getCategoryBySlug } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import CTASection from "@/components/CTASection";
import { ShieldCheck, Microscope, Award, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | Raj Biosis" };
  }

  const title = `${category.name} Supplier & Price in India | Raj Biosis`;
  const description = `Leading supplier of ${category.name} in India. Browse high precision ${category.name} products, specifications, and prices for clinical pathology laboratories and diagnostic hospitals.`;
  const url = `https://anylabtest.in/category/${slug}`;

  return {
    title,
    description,
    keywords: [
      category.name,
      `${category.name} Supplier`,
      `${category.name} Dealer`,
      `${category.name} Distributor`,
      `${category.name} Price India`,
      "Biomedical Equipment",
      "Diagnostic Machines",
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

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/items" },
    { name: category.name, url: `/category/${category.slug}` },
  ];

  const categoryFaqs = [
    {
      question: `What types of ${category.name} do you supply?`,
      answer: `Raj Biosis supplies fully certified, high-precision ${category.name} models suitable for clinical diagnostic laboratories, pathology centers, and hospital labs.`,
    },
    {
      question: `Do you provide installation and AMC for ${category.name}?`,
      answer: `Yes, certified biomedical engineers at Raj Biosis provide complete on-site installation, optical calibration adhering to NABL standards, and Annual Maintenance Contracts (AMC/CMC).`,
    },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} faqs={categoryFaqs} />

      <PageBanner
        title={`${category.name} Supplier in India`}
        subtitle={`Certified diagnostic ${category.name} instruments and solutions for clinical pathology laboratories and medical centers.`}
      />

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          {/* Overview Card */}
          <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2.5 rounded-xl bg-rose-100 text-[#8B2748]">
                <Microscope size={24} />
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {category.name} Overview & Applications
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-base">
              Explore our comprehensive range of high-performance <strong className="text-[#8B2748]">{category.name}</strong>. Designed for daily clinical testing efficiency, low operational cost, and high optical or photometric accuracy. Every unit comes backed by Raj Biosis engineer support and original calibration controls.
            </p>
          </div>

          {/* Product Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
              Available {category.name} Models ({category.products.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map((product) => (
                <ProductCard key={product.uid || product.slug} product={product} />
              ))}
            </div>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-white p-6 rounded-2xl border border-rose-100">
              <ShieldCheck className="text-[#8B2748] mb-3" size={24} />
              <h4 className="font-bold text-slate-900">Certified ISO Quality</h4>
              <p className="text-xs text-slate-600 mt-2">
                Fully calibrated before laboratory dispatch.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-rose-100">
              <Award className="text-[#8B2748] mb-3" size={24} />
              <h4 className="font-bold text-slate-900">AMC & Spares Guarantee</h4>
              <p className="text-xs text-slate-600 mt-2">
                100% genuine spares and fast breakdown service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-rose-100">
              <CheckCircle2 className="text-[#8B2748] mb-3" size={24} />
              <h4 className="font-bold text-slate-900">Pan-India Support</h4>
              <p className="text-xs text-slate-600 mt-2">
                Serving hospitals and pathology labs across all districts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
