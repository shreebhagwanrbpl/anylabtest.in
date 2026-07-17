"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-red-50 border border-rose-200 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-7 shadow-md">
            <ShieldCheck size={18} />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-rose-100 rounded w-[80%]"></div>
                <div className="h-12 bg-rose-100 rounded w-[60%]"></div>
                <div className="h-12 bg-rose-100 rounded w-[70%]"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />
                    <span className="text-2xl lg:text-4xl font-semibold bg-gradient-to-r from-rose-700 via-red-700 to-rose-600 bg-clip-text text-transparent">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-7 space-y-3">
              <div className="h-4 bg-rose-100 rounded w-full"></div>
              <div className="h-4 bg-rose-100 rounded w-[90%]"></div>
              <div className="h-4 bg-rose-100 rounded w-[75%]"></div>
            </div>
          ) : (
            <p className="mt-7 text-slate-600 text-lg leading-8 max-w-xl">
              {heroData.description}
              {city && (
                <>
                  {" "}
                  across <strong className="text-rose-700">{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {loading ? (
              <>
                <div className="animate-pulse h-12 w-44 bg-rose-100 rounded-lg"></div>
                <div className="animate-pulse h-12 w-36 bg-rose-100 rounded-lg"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button
                    className="flex items-center gap-2 px-7 py-4 rounded-xl
  bg-gradient-to-r from-rose-700 to-red-700
  hover:from-rose-800 hover:to-red-800
  text-white font-semibold shadow-lg shadow-rose-300/40
  transition-all duration-300 hover:scale-105"
                  >
                    {heroData.button1Text || "Explore Services"}
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button
                    className="px-7 py-4 rounded-xl
  border-2 border-rose-700
  text-rose-700 font-semibold
  bg-white
  hover:bg-gradient-to-r hover:from-rose-700 hover:to-red-700
  hover:text-white
  hover:border-transparent
  transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">

            <div className="group">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-700 via-red-700 to-rose-600 bg-clip-text text-transparent">
                10+
              </h3>
              <p className="text-slate-600 font-medium">
                Years Experience
              </p>
            </div>

            <div className="group">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-700 via-red-700 to-rose-600 bg-clip-text text-transparent">
                500+
              </h3>
              <p className="text-slate-600 font-medium">
                Products Delivered
              </p>
            </div>

            <div className="group">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-700 via-red-700 to-rose-600 bg-clip-text text-transparent">
                100%
              </h3>
              <p className="text-slate-600 font-medium">
                Quality Assurance
              </p>
            </div>

          </div>

        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* Main Image */}
          <div className="rounded-[40px] p-6 bg-white/90 backdrop-blur-xl border border-rose-100 shadow-[0_25px_70px_rgba(136,19,55,0.15)]">
            <Image
              src={CBG}
              alt="Central Biomedical"
              width={1200}
              height={900}
              className="rounded-[28px] object-cover object-[20%_center] h-[350px] sm:h-[450px] lg:h-[550px] w-full transition duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Floating Card 1 */}
          <div
            className="absolute top-10 -left-10 hidden lg:flex items-center gap-4 rounded-3xl bg-gradient-to-br from-white to-rose-50 border border-rose-100 p-5 shadow-[0_15px_40px_rgba(136,19,55,0.12)] backdrop-blur-md"
            style={{ marginTop: "-27px" }}
          >
            <div className="bg-gradient-to-br from-rose-100 to-red-100 p-3 rounded-2xl">
              <Microscope className="text-rose-700" size={24} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-800">
                Modern Labs
              </h4>
              <p className="text-sm text-slate-500">
                Precision Equipment
              </p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-10 -right-8 hidden lg:flex items-center gap-4 rounded-3xl bg-gradient-to-br from-white to-red-50 border border-red-100 p-5 shadow-[0_15px_40px_rgba(136,19,55,0.12)] backdrop-blur-md">

            <div className="bg-gradient-to-br from-red-100 to-rose-100 p-3 rounded-2xl">
              <BadgeCheck className="text-red-700" size={24} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-800">
                Trusted Quality
              </h4>
              <p className="text-sm text-slate-500">
                Certified Solutions
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}