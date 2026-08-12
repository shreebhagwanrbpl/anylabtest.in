"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchFullCatalog } from "@/lib/data-fetcher";
import SectionTitle from "@/components/SectionTitle";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Microscope,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function FeaturedProducts({ city = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback featured catalog items in case Firestore fetch is empty
  const fallbackProducts = [
    {
      uid: "feat-1",
      title: "5-Part Differential Hematology Analyzer",
      category: "Hematology",
      brand: "Raj Biosis / Mindray",
      model: "BC-5000 / RB-50",
      description:
        "Automated 5-part CBC machine offering high precision leukocyte differentiation, 29 parameters, and rapid sample throughput.",
      slug: "5-part-differential-hematology-analyzer",
      tag: "Best Seller",
      image: "/logo.png",
    },
    {
      uid: "feat-2",
      title: "Semi-Automated Biochemistry Analyzer",
      category: "Biochemistry",
      brand: "Raj Biosis / Erba",
      model: "Chem-7 / RB-Chem",
      description:
        "Multi-parameter clinical chemistry analyzer with liquid-stable reagent testing, flow cell system, and built-in thermal printer.",
      slug: "semi-automated-biochemistry-analyzer",
      tag: "Popular",
      image: "/logo.png",
    },
    {
      uid: "feat-3",
      title: "Automated ELISA Microplate Reader",
      category: "Immunoassay",
      brand: "Raj Biosis / Bio-Rad",
      model: "EL-800",
      description:
        "High-sensitivity optical ELISA reader for infectious disease, hormone, thyroid, and antibody diagnostic testing.",
      slug: "elisa-microplate-reader",
      tag: "Featured",
      image: "/logo.png",
    },
    {
      uid: "feat-4",
      title: "Electrolyte Analyzer (Na+ / K+ / Cl- / Ca++)",
      category: "Electrolyte",
      brand: "Raj Biosis / Caretium",
      model: "RB-ISE Pro",
      description:
        "Advanced Ion Selective Electrode (ISE) technology for rapid serum and plasma electrolyte measurement with automatic calibration.",
      slug: "electrolyte-analyzer",
      tag: "Essential",
      image: "/logo.png",
    },
    {
      uid: "feat-5",
      title: "Fully Automated Urine Analyzer",
      category: "Urinalysis",
      brand: "Raj Biosis",
      model: "UA-100",
      description:
        "High speed urine strip reader for 11 and 14 parameter urinalysis, eliminating manual visual reading errors.",
      slug: "urine-analyzer",
      tag: "High Demand",
      image: "/logo.png",
    },
    {
      uid: "feat-6",
      title: "Hematology & Biochemistry Reagents & Calibrators",
      category: "Reagents",
      brand: "Raj Biosis",
      model: "ISO Grade Reagents",
      description:
        "CBC diluents, lysing agents, enzyme substrates, liquid stable biochemistry reagents, and multi-analyte controls.",
      slug: "reagents-and-calibrators",
      tag: "Consumables",
      image: "/logo.png",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        const fullList = await fetchFullCatalog();
        if (isMounted && fullList && fullList.length > 0) {
          // Take first 6 published products or filtered items
          setProducts(fullList.slice(0, 6));
        } else if (isMounted) {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.error("Error loading products for FeaturedProducts:", err);
        if (isMounted) setProducts(fallbackProducts);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  const getItemLink = (slug) => {
    return districtSlug
      ? `/${districtSlug}/items/${slug}`
      : `/items/${slug}`;
  };

  const getCatalogLink = () => {
    return districtSlug ? `/${districtSlug}/items` : "/items";
  };

  const displayList = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="py-20 bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-rose-200/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-red-200/20 blur-[130px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge="Featured Equipment Catalog"
          title={
            city
              ? `High-Precision Lab Equipment in ${city}`
              : "Featured Diagnostic Machines & Reagents"
          }
          description="Explore our top-rated biomedical instruments, analyzers, and diagnostic kits trusted by pathology labs and hospitals."
          center
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-rose-100 shadow-md animate-pulse space-y-4"
                >
                  <div className="h-44 bg-rose-100 rounded-2xl w-full"></div>
                  <div className="h-6 bg-rose-100 rounded-lg w-1/3"></div>
                  <div className="h-8 bg-rose-100 rounded-xl w-3/4"></div>
                  <div className="h-12 bg-rose-100 rounded-xl w-full"></div>
                </div>
              ))
            : displayList.map((product, idx) => {
                const title = product.title || product.name || "Biomedical Equipment";
                const category = product.category || "Laboratory Equipment";
                const brand = product.brand || "Raj Biosis";
                const model = product.model || "Standard";
                const slug = product.slug || "biomedical-equipment";
                const description =
                  product.description ||
                  product.desc ||
                  "Certified high-performance diagnostic laboratory equipment supplied with complete technical warranty and installation support.";
                const tag = product.tag || (idx % 2 === 0 ? "Featured" : "Popular");

                // Product Image Source
                const imgSrc =
                  product.images?.[0] ||
                  product.image ||
                  product.img ||
                  "/logo.png";

                return (
                  <motion.div
                    key={product.uid || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group bg-white/90 backdrop-blur-md rounded-[28px] p-6 border border-rose-100/90 shadow-[0_10px_35px_rgba(136,19,55,0.06)] hover:shadow-[0_20px_50px_rgba(136,19,55,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div className="relative h-48 w-full mb-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                        <img
                          src={imgSrc}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "/logo.png";
                          }}
                        />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-[#8B2748] text-xs font-semibold shadow-sm">
                            <Microscope size={12} />
                            {category}
                          </span>
                        </div>

                        {/* Top Tag Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] text-white shadow-sm">
                            {tag}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#8B2748] transition-colors leading-snug line-clamp-2">
                        {title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed line-clamp-2">
                        {description}
                      </p>

                      {/* Key Specs Pills */}
                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                            Brand
                          </span>
                          <span className="font-bold text-slate-800 truncate block">
                            {brand}
                          </span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                            Model
                          </span>
                          <span className="font-bold text-slate-800 truncate block">
                            {model}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Link Action */}
                    <div className="mt-5 pt-4 border-t border-rose-100/70 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={14} />
                        <span>In Stock</span>
                      </div>

                      <Link
                        href={getItemLink(slug)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 text-[#8B2748] font-bold text-xs hover:bg-[#8B2748] hover:text-white transition-all duration-300 shadow-sm"
                      >
                        <span>View Details</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* View All Products CTA */}
        <div className="mt-14 text-center">
          <Link href={getCatalogLink()}>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:from-[#8B2748] hover:to-[#7A1F3D] text-white font-bold text-base shadow-lg shadow-rose-900/20 hover:scale-[1.02] transition-all duration-300">
              <span>View Full Laboratory Equipment Catalog</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
