"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CTASection({ city }) {
  const pathname = usePathname();
  const [phoneNumber, setPhoneNumber] = useState("");

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "category",
    "brand",
    "laboratory-equipment",
    "api",
    "enquiry",
  ];

  const pathParts = (pathname || "")
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0].toLowerCase())
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  useEffect(() => {
    fetch(`/api/site-data?page=contact&_t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((r) => r.json())
      .then((d) => {
        const info = d?.contactInfo || [];
        const phoneField = info.find((x) =>
          ["phone", "phone number", "mobile", "mobile number"].some(
            (l) => x.label?.toLowerCase() === l
          )
        );
        if (phoneField?.value) {
          const val = Array.isArray(phoneField.value)
            ? phoneField.value[0]
            : String(phoneField.value).split(/[\n,]+/)[0];
          setPhoneNumber(String(val).trim());
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-rose-50 via-white to-red-50">
      <div className="container-custom">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px] bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] p-10 lg:p-20 text-white shadow-[0_25px_80px_rgba(122,31,61,0.30)]"
        >
          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300/10 rounded-full blur-[120px]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                Consultation & Support
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Ready to Upgrade Your Diagnostic Laboratory?
              </h2>
              <p className="mt-6 text-white/85 text-lg leading-8 max-w-xl">
                Get in touch with Raj Biosis for certified 3-Part & 5-Part CBC machines, biochemistry analyzers, cold-chain reagents, and guaranteed 24/7 engineer support.
              </p>
            </div>

            {/* Right Card */}
            <div className="flex lg:justify-end">
              <div className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-rose-100">
                <div className="w-16 h-16 rounded-2l bg-gradient-to-br from-rose-100 to-red-100 text-rose-700 flex items-center justify-center mb-6">
                  <PhoneCall size={30} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Consult Our Experts
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  Connect with our biomedical specialists for instrument quotes, reagent supply plans, and AMC support.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="w-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] hover:from-[#681732] hover:to-[#922646] text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 shadow-lg">
                      Contact Us
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  <a
                    href={phoneNumber ? `tel:${phoneNumber.replace(/\s+/g, "")}` : makeLink("/contact")}
                    className="border-2 border-[#8B2748] !text-[#8B2748] px-6 py-4 rounded-2xl font-semibold hover:bg-[#8B2748] hover:text-white transition-all duration-300 text-center flex items-center justify-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}