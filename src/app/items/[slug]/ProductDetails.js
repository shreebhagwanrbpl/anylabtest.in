"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const pathname = usePathname();

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {

                // NORMAL PRODUCTS
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "anylabtestin",
                        "pages",
                        "products"
                    )
                );

                let allProducts = [];

                if (snap.exists()) {
                    allProducts = (snap.data().products || []).map((item) => ({
                        ...item,
                        slug:
                            item.slug ||
                            item.productSlug ||
                            makeSlug(item.title),
                    }));
                }

                // CATEGORY PRODUCTS
                const categorySnap = await getDocs(
                    collection(
                        db,
                        "websites",
                        "anylabtestin",
                        "pages",
                        "categoryproducts",
                        "categories"
                    )
                );

                categorySnap.forEach((docSnap) => {
                    const data = docSnap.data();

                    if (data.products?.length) {
                        allProducts.push(
                            ...(data.products || []).map((item) => ({
                                ...item,
                                slug:
                                    item.slug ||
                                    item.productSlug ||
                                    makeSlug(item.title),
                            }))
                        );
                    }
                });

                const found = allProducts.find(
                    (p) => p.slug === slug
                );
                console.log("URL SLUG:", slug);

                allProducts.forEach((p) => {
                    console.log("PRODUCT:", p.title);
                    console.log("PRODUCT SLUG:", p.slug);
                });
                console.log("SLUG FROM URL:", slug);
                console.log(
                    "TOTAL PRODUCTS:",
                    allProducts.length
                );
                console.log(
                    "FOUND PRODUCT:",
                    found
                );

                setProduct(found || null);

                if (found) {

                    if (
                        found.images?.length > 0
                    ) {
                        setSelectedImage(
                            found.images[0]
                        );
                    } else {
                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "anylabtestin",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Raj Biosis",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200 animate-pulse" />

                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse mb-8" />

                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 grid lg:grid-cols-[600px_1fr] gap-8">

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-4"
                                />
                            ))}
                        </div>

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-60 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500">
                    Home / Products / {product.title}
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div>

                        <div className="relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] rounded-[28px] md:rounded-[36px] overflow-hidden bg-gradient-to-br from-white via-rose-50 to-red-50 border border-rose-100 shadow-[0_25px_80px_rgba(122,31,61,0.12)] group">

                            {selectedMedia === "video" && product.video ? (

                                <video
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain p-6"
                                >
                                    <source
                                        src={product.video}
                                        type="video/mp4"
                                    />
                                </video>

                            ) : (

                                <>

                                    {!imageLoaded && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-red-100 animate-pulse" />
                                    )}

                                    <Image
                                        src={selectedImage || product.image}
                                        alt={product.title}
                                        fill
                                        priority
                                        onLoad={() => setImageLoaded(true)}
                                        className={`object-contain p-5 transition-all duration-500 group-hover:scale-105 ${imageLoaded
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />

                                </>

                            )}

                            {/* Premium Border Glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/40"></div>

                        </div>
                        <div className="flex flex-wrap gap-3 mt-5">

                            {(product.images?.length
                                ? product.images
                                : [product.image]
                            ).map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setSelectedMedia("image");
                                    }}
                                    className={`group w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-lg

      ${selectedMedia === "image" &&
                                            selectedImage === img
                                            ? "border-rose-700 ring-4 ring-rose-100 scale-105"
                                            : "border-rose-100 hover:border-rose-300"
                                        }`}
                                >

                                    <Image
                                        src={img}
                                        alt=""
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                </button>

                            ))}

                            {/* Video */}
                            {product.video && (

                                <button
                                    onClick={() =>
                                        setSelectedMedia("video")
                                    }
                                    className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-sm

      ${selectedMedia === "video"
                                            ? "border-rose-700 bg-gradient-to-br from-rose-100 to-red-100 text-rose-700 ring-4 ring-rose-100"
                                            : "border-rose-100 hover:border-rose-300 hover:bg-rose-50"
                                        }`}
                                >

                                    <FaPlay size={20} />

                                    <span className="text-xs font-medium mt-1">
                                        Video
                                    </span>

                                </button>

                            )}

                            {/* PDF */}
                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-20 h-20 rounded-2xl border-2 border-rose-100 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-lg hover:bg-gradient-to-br hover:from-rose-50 hover:to-red-50 hover:border-rose-300 transition-all duration-300"
                                >

                                    <span className="text-2xl">
                                        📄
                                    </span>

                                    <span className="text-xs font-medium mt-1 text-slate-600">
                                        PDF
                                    </span>

                                </a>

                            )}

                        </div>

                    </div>

                    {/* Product Details */}

                    <div>

                        <div className="flex justify-between items-start gap-4 relative">

                            {/* Product Title */}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                    {product.title}
                                </span>
                            </h1>

                            {/* Share Button */}
                            <div
                                ref={shareRef}
                                className="relative"
                            >

                                <button
                                    onClick={handleNativeShare}
                                    className="w-12 h-12 rounded-full bg-white border border-rose-100 shadow-md flex items-center justify-center text-rose-700 hover:bg-gradient-to-br hover:from-rose-50 hover:to-red-50 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
                                >
                                    <FaShareAlt size={18} />
                                </button>

                                {showShare && (

                                    <div className="absolute right-0 top-14 w-60 bg-white rounded-2xl border border-rose-100 shadow-[0_20px_50px_rgba(122,31,61,0.12)] p-2 z-50">

                                        {/* Copy Link */}
                                        <button
                                            onClick={handleCopy}
                                            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-all duration-300"
                                        >
                                            <FaLink className="text-rose-700" />
                                            Copy Link
                                        </button>

                                        {/* WhatsApp */}
                                        <button
                                            onClick={handleWhatsapp}
                                            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-rose-50 transition-all duration-300"
                                        >
                                            <FaWhatsapp className="text-green-600" />
                                            WhatsApp
                                        </button>

                                        {/* Facebook */}
                                        <button
                                            onClick={handleFacebook}
                                            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-rose-50 transition-all duration-300"
                                        >
                                            <FaFacebook className="text-blue-600" />
                                            Facebook
                                        </button>

                                        {/* Instagram */}
                                        <button
                                            onClick={handleInstagram}
                                            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-rose-50 transition-all duration-300"
                                        >
                                            <FaInstagram className="text-pink-600" />
                                            Instagram
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="mt-6 md:mt-8 bg-white border border-rose-100 p-5 sm:p-6 md:p-8 rounded-[24px] md:rounded-[30px] shadow-[0_20px_60px_rgba(122,31,61,0.08)]">

                            <h3 className="text-2xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                    Product Specifications
                                </span>
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-4">

                                {[
                                    ["Brand", product.brand],
                                    ["Model", product.model],
                                    ["Instrument", product.instrument],
                                    ["Capacity", product.capacity],
                                    ["Throughput", product.throughput],
                                    ["Usage", product.usage],
                                    ["Automation", product.automation],
                                    ["Availability", product.availability],
                                ].map(([label, value]) => (

                                    <div
                                        key={label}
                                        className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4"
                                    >

                                        <p className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                                            {label}
                                        </p>

                                        <p className="mt-2 font-semibold text-slate-800">
                                            {value || "N/A"}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 border border-rose-100 shadow-[0_20px_60px_rgba(122,31,61,0.10)] h-fit lg:sticky lg:top-24">

                            {/* Heading */}
                            <h2 className="text-2xl md:text-3xl font-bold">
                                <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                    Request A Quote
                                </span>
                            </h2>

                            <p className="text-black mb-8 mt-3 leading-7">
                                Product:
                                <span className="font-semibold ml-2 text-rose-700">
                                    {product.title}
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Name */}
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-rose-700 focus:ring-4 focus:ring-rose-100"
                                />

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-rose-700 focus:ring-4 focus:ring-rose-100"
                                />

                                {/* Phone */}
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value.replace(/\D/g, ""),
                                        })
                                    }
                                    className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-rose-700 focus:ring-4 focus:ring-rose-100"
                                />

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:from-[#681732] hover:via-[#7A1F3D] hover:to-[#922646] shadow-lg shadow-rose-300/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Get Quote"}
                                </button>

                            </form>

                        </div>

                        {/* Description */}

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900">
                                Product Description
                            </h3>

                            <p className="text-slate-600 leading-7 md:leading-9 text-base md:text-lg">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>

                            {/* Specifications Table */}

                            <div className="mt-10 overflow-x-auto rounded-3xl border border-rose-100 shadow-[0_20px_60px_rgba(122,31,61,0.08)] overflow-hidden">

                                <table className="w-full border-collapse">

                                    <tbody>

                                        <tr className="border-b border-rose-100">
                                            <td className="w-1/3 bg-gradient-to-r from-rose-50 to-red-50 px-6 py-4 font-bold text-rose-700">
                                                Brand
                                            </td>

                                            <td className="bg-white px-6 py-4 text-slate-700">
                                                {product.brand || "N/A"}
                                            </td>
                                        </tr>

                                        <tr className="border-b border-rose-100">
                                            <td className="bg-gradient-to-r from-rose-50 to-red-50 px-6 py-4 font-bold text-rose-700">
                                                Model
                                            </td>

                                            <td className="bg-white px-6 py-4 text-slate-700">
                                                {product.model || "N/A"}
                                            </td>
                                        </tr>

                                        <tr className="border-b border-rose-100">
                                            <td className="bg-gradient-to-r from-rose-50 to-red-50 px-6 py-4 font-bold text-rose-700">
                                                Usage
                                            </td>

                                            <td className="bg-white px-6 py-4 text-slate-700">
                                                {product.usage || "N/A"}
                                            </td>
                                        </tr>

                                        <tr className="border-b border-rose-100">
                                            <td className="bg-gradient-to-r from-rose-50 to-red-50 px-6 py-4 font-bold text-rose-700">
                                                Automation
                                            </td>

                                            <td className="bg-white px-6 py-4 text-slate-700">
                                                {product.automation || "N/A"}
                                            </td>
                                        </tr>

                                        <tr className="border-b border-rose-100">
                                            <td className="bg-gradient-to-r from-rose-50 to-red-50 px-6 py-4 font-bold text-rose-700">
                                                Capacity
                                            </td>

                                            <td className="bg-white px-6 py-4 text-slate-700">
                                                {product.capacity || "N/A"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="bg-gradient-to-r from-rose-50 to-red-50 px-6 py-4 font-bold text-rose-700">
                                                Throughput
                                            </td>

                                            <td className="bg-white px-6 py-4 text-slate-700">
                                                {product.throughput || "N/A"}
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                            {/* SEO Content */}

                            <div className="mt-12 space-y-8">

                                {/* Why Choose */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            Why Choose Raj Biosis in {cityName}?
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Raj Biosis is a trusted supplier and
                                        distributor of <strong className="text-rose-700">{product.title}</strong> in {cityName}.
                                        We provide high-quality biomedical and laboratory
                                        equipment for hospitals, pathology laboratories,
                                        diagnostic centres and healthcare facilities.
                                    </p>

                                </div>

                                {/* Features */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            Features of {product.title}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        {product.title} offers reliable performance,
                                        accurate results, easy operation, long service
                                        life and efficient workflow for laboratories
                                        and hospitals.
                                    </p>

                                </div>

                                {/* Applications */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            Applications of {product.title}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Widely used in hospitals, pathology labs,
                                        diagnostic centres, blood banks, research
                                        institutes and healthcare facilities.
                                    </p>

                                </div>

                                {/* Supplier */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            {product.title} Supplier in {cityName}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Raj Biosis supplies {product.title}
                                        in {cityName} with technical support,
                                        installation assistance and customer service
                                        for hospitals and laboratories.
                                    </p>

                                </div>

                                {/* Dealer */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            {product.title} Dealer in {cityName}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Raj Biosis is a trusted dealer of
                                        {product.title} in {cityName}. We supply
                                        biomedical equipment, laboratory instruments,
                                        diagnostic analyzers and healthcare devices
                                        to hospitals, pathology labs and research centres.
                                    </p>

                                </div>

                                {/* Distributor */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            {product.title} Distributor in {cityName}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Looking for a reliable distributor of
                                        {product.title} in {cityName}? We provide
                                        installation support, product guidance,
                                        maintenance assistance and fast delivery.
                                    </p>

                                </div>

                                {/* Buy */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            Buy {product.title} in {cityName}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Buy high quality {product.title} in
                                        {cityName} at competitive prices.
                                        Contact Raj Biosis for the
                                        latest quotation and product availability.
                                    </p>

                                </div>

                                {/* Price */}
                                <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(122,31,61,0.08)]">

                                    <h3 className="text-2xl font-bold mb-5">
                                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            {product.title} Price in {cityName}
                                        </span>
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        The price of {product.title} depends on
                                        brand, model, specifications and features.
                                        Contact our team for the latest pricing,
                                        availability and delivery details.
                                    </p>

                                </div>

                            </div>

                            {/* FAQ Section */}

                            <div className="mt-12">

                                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                                    Frequently Asked Questions
                                </h3>

                                <div className="space-y-8">

                                    <div className="space-y-5 mt-8">

                                        {/* FAQ 1 */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                What is {product.title} used for in {cityName}?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                {product.title} is commonly used in hospitals,
                                                pathology laboratories and diagnostic centres.
                                            </p>

                                        </div>

                                        {/* FAQ 2 */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                What is the price of {product.title} in {cityName}?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                Pricing depends on specifications,
                                                brand and model. Contact us for a quote.
                                            </p>

                                        </div>

                                        {/* FAQ 3 */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                Are you an authorized supplier of {product.title}?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                We supply genuine biomedical and
                                                laboratory equipment from trusted brands.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                        <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                            Can hospitals in {cityName} order this product?
                                        </h4>

                                        <p className="text-slate-600 mt-3 leading-8">
                                            Yes, hospitals, pathology laboratories,
                                            diagnostic centres and healthcare facilities
                                            can order this product.
                                        </p>

                                    </div>
                                    <div className="space-y-5 mt-8">

                                        {/* Installation Support */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                Do you provide installation support?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                Yes, installation and technical support
                                                are available depending on the product.
                                            </p>

                                        </div>

                                        {/* Quotation */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                Can I request a quotation?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                Yes, you can submit the enquiry form on
                                                this page to receive pricing and product
                                                information.
                                            </p>

                                        </div>

                                        {/* Warranty */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                Do you provide warranty?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                Warranty depends on the manufacturer and
                                                product model.
                                            </p>

                                        </div>

                                        {/* Delivery */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                Do you deliver across India?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                Yes, we supply products across India with
                                                safe packaging and logistics support.
                                            </p>

                                        </div>

                                        {/* Contact */}
                                        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(122,31,61,0.08)] hover:shadow-[0_20px_40px_rgba(122,31,61,0.12)] transition-all duration-300">

                                            <h4 className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                                                How can I contact Raj Biosis?
                                            </h4>

                                            <p className="text-slate-600 mt-3 leading-8">
                                                You can fill out the enquiry form or
                                                contact our team directly for product
                                                details and quotations.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}