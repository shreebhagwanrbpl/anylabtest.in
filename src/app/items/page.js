"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {
    if (openedCategory === category) {
      setOpenedCategory("");
      return;
    }

    setOpenedCategory(category);
  };

  const scrollToProduct = (
    slug,
    category
  ) => {
    setOpenedCategory(category);
    setActiveCategory(category);
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-6 lg:mt-10 px-4 lg:px-0 relative">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) =>
              setProductSearch(e.target.value)
            }
            className="w-full h-16 pl-14 pr-5 rounded-2xl
    border border-rose-200
    bg-white
    shadow-md
    placeholder:text-slate-400
    text-slate-700
    transition-all duration-300
    focus:outline-none
    focus:border-rose-700
    focus:ring-4
    focus:ring-rose-100
    hover:border-rose-300"
          />

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
    lg:sticky
    lg:top-24
    self-start
    rounded-2xl lg:rounded-3xl
    border
    border-rose-100
    bg-white
    shadow-[0_20px_60px_rgba(122,31,61,0.08)]
    p-4 lg:p-6
  "
          >

            {/* Heading */}
            <h3 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                Categories
              </span>
            </h3>

            <div className="space-y-3">

              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
                )
                .map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm"
                  >

                    <button
                      onClick={() =>
                        toggleCategory(category)
                      }
                      className={`w-full px-5 py-4 flex justify-between items-center transition-all duration-300

            ${activeCategory === category
                          ? "bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] text-white shadow-md"
                          : "bg-white text-slate-700 hover:bg-rose-50"
                        }`}
                    >

                      <span className="flex items-center gap-3 font-medium">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span
                        className={`text-sm font-bold px-2.5 py-1 rounded-full

              ${activeCategory === category
                            ? "bg-white/20 text-white"
                            : "bg-rose-100 text-rose-700"
                          }`}
                      >
                        {groupedProducts[category].length}
                      </span>

                    </button>

                    <div
                      className={`overflow-y-auto transition-all duration-300

            ${openedCategory === category
                          ? "max-h-72"
                          : "max-h-0 overflow-hidden"
                        }

            custom-scrollbar`}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(
                              item.slug,
                              category
                            )
                          }
                          className="block w-full text-left px-6 py-3 border-t border-rose-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-300"
                        >
                          {item.title}
                        </button>

                      ))}

                    </div>

                  </div>

                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="bg-white border border-rose-100 rounded-[32px] p-10 lg:p-16 text-center shadow-[0_20px_60px_rgba(122,31,61,0.08)]">

                {/* Icon */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-5xl mb-6 shadow-md">
                  🔍
                </div>

                {/* Heading */}
                <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                  Product Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-slate-600 max-w-xl mx-auto leading-8">
                  We couldn't find any products matching
                  <span className="font-semibold text-rose-700">
                    {" "} "{productSearch}" {" "}
                  </span>
                  .
                  Please try another keyword or browse categories.
                </p>

                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="mt-8 px-8 py-4 rounded-2xl font-semibold text-white
      bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]
      hover:from-[#681732] hover:via-[#7A1F3D] hover:to-[#922646]
      shadow-lg shadow-rose-300/40
      hover:scale-105
      transition-all duration-300"
                >
                  View All Products
                </button>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-rose-100 pb-5 mb-8">

                      <h2 className="text-3xl font-bold">
                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                          {category}
                        </span>
                      </h2>

                      <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-rose-700 text-sm font-semibold shadow-sm">
                        {list.length} Products
                      </span>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8"
                        >

                          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_180px] gap-6 lg:gap-8 items-center">

                            {/* Image */}

                            <div className="relative h-[180px] sm:h-[220px] rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 via-white to-red-50 border border-rose-100 shadow-md">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 bg-rose-100 animate-pulse" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  console.log("IMAGE ERROR:", e.currentTarget.src);
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`w-full h-full object-contain p-6 transition-all duration-500 hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}

                            <div>

                              <h3 className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-balck">
                                  {product.title}
                                </span>
                              </h3>

                              <p className="mt-4 text-slate-600 leading-8">
                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                              </p>

                              <div className="grid md:grid-cols-2 gap-4 mt-7">

                                {/* Brand */}
                                <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4">

                                  <p className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                                    Brand
                                  </p>

                                  <p className="font-semibold text-slate-800 mt-2">
                                    {product.brand || "N/A"}
                                  </p>

                                </div>

                                {/* Model */}
                                <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4">

                                  <p className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                                    Model
                                  </p>

                                  <p className="font-semibold text-slate-800 mt-2">
                                    {product.model || "N/A"}
                                  </p>

                                </div>

                                {/* Instrument */}
                                <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4">

                                  <p className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                                    Instrument
                                  </p>

                                  <p className="font-semibold text-slate-800 mt-2">
                                    {product.instrument || "N/A"}
                                  </p>

                                </div>

                                {/* Category */}
                                <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4">

                                  <p className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                                    Category
                                  </p>

                                  <p className="font-semibold text-slate-800 mt-2">
                                    {product.category}
                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* Button */}

                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold !text-white bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:from-[#681732] hover:via-[#7A1F3D] hover:to-[#922646] shadow-lg shadow-rose-300/40 hover:scale-105 transition-all duration-300"
                              >
                                <span className="!text-white">
                                  Get Quote
                                </span>
                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="section-padding bg-gradient-to-b from-rose-50 via-white to-red-50 relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for performance, reliability, and healthcare excellence."
            center
          />

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group bg-white rounded-[30px] border border-rose-100 p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-[22px] bg-gradient-to-br from-rose-100 to-red-100 text-rose-700 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">

                  {item.icon}

                </div>

                {/* Title */}
                <h3 className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                    {item.title}
                  </span>
                </h3>

                {/* Bottom Accent */}
                <div className="mt-6 flex justify-center">
                  <div className="h-1 w-0 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-16 transition-all duration-500"></div>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full
    bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]
    text-white
    shadow-[0_10px_30px_rgba(122,31,61,0.45)]
    hover:from-[#681732]
    hover:via-[#7A1F3D]
    hover:to-[#922646]
    hover:scale-110
    hover:shadow-[0_15px_40px_rgba(122,31,61,0.55)]
    transition-all duration-300
    flex items-center justify-center"
        >

          <ChevronUp size={24} />

        </button>

      )}

    </>

  );

}