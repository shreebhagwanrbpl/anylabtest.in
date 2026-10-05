"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  Search,
  Sparkles,
  CheckCircle2,
  Activity,
  Zap,
  Building2,
  Flame,
} from "lucide-react";

export default function HeroSection({ city }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    fetch(`/api/site-data?page=home&_t=${Date.now()}`, { cache: "no-store", headers: { "Cache-Control": "no-cache" } })
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d === "object" && Object.keys(d).length) {
          setHeroData(d);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // District Routing Helper
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const targetPath = districtSlug
      ? `/${districtSlug}/items?search=${encodeURIComponent(searchQuery)}`
      : `/items?search=${encodeURIComponent(searchQuery)}`;
    router.push(targetPath);
  };

  const popularTags = [
    { label: "CBC Machine", slug: "cbc-machine" },
    { label: "Biochemistry Analyzer", slug: "biochemistry-analyzer" },
    { label: "ELISA Reader", slug: "elisa-reader" },
    { label: "Reagents", slug: "reagents" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-red-50/40 py-10 sm:py-12 lg:py-16">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-rose-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-red-200/25 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-100/10 via-red-100/20 to-rose-100/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline & Hero Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 via-rose-50 to-red-100 border border-rose-200/80 text-[#7A1F3D] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#8B2748] animate-pulse" />
            <span>India's Trusted Biomedical & Diagnostic Equipment Network</span>
            {city && (
              <span className="bg-[#8B2748] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {city}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.18] text-slate-900 tracking-tight">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-10 sm:h-12 bg-rose-100/70 rounded-xl w-[90%]"></div>
                <div className="h-10 sm:h-12 bg-rose-100/70 rounded-xl w-[75%]"></div>
              </div>
            ) : (
              <>
                {heroData.title ||
                  "Next-Gen Diagnostic Analyzers & Biomedical Equipment"}
                {city && (
                  <>
                    <br />
                    <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Subtitle / Description */}
          {loading ? (
            <div className="animate-pulse mt-4 space-y-2 max-w-xl">
              <div className="h-4 bg-rose-100/70 rounded-lg w-full"></div>
              <div className="h-4 bg-rose-100/70 rounded-lg w-[85%]"></div>
            </div>
          ) : (
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              {heroData.description ||
                "Empowering pathology labs, hospitals, and diagnostic centers across India with high-precision 3-Part & 5-Part CBC machines, automated biochemistry analyzers, cold-chain reagents, and 24/7 certified engineer support."}
              {city && (
                <>
                  {" "}
                  Delivering certified diagnostic systems and technical support across{" "}
                  <strong className="text-[#8B2748]">{city}</strong>.
                </>
              )}
            </p>
          )}

          {/* Instant Equipment Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-5 bg-white/95 backdrop-blur-xl p-1.5 rounded-xl border border-rose-200/90 shadow-[0_8px_25px_rgba(136,19,55,0.06)] flex flex-col sm:flex-row items-center gap-1.5 max-w-xl"
          >
            <div className="flex items-center gap-2.5 px-3 py-2 w-full">
              <Search className="text-[#8B2748] shrink-0" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  city
                    ? `Search CBC Machine, Analyzer, Reagents in ${city}...`
                    : "Search CBC Machine, Biochemistry Analyzer, Reagents..."
                }
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-xs sm:text-sm outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:from-[#8B2748] hover:to-[#7A1F3D] text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 shrink-0 flex items-center justify-center gap-2"
            >
              <span>Search</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 flex items-center gap-1 text-[11px] sm:text-xs">
              <Flame size={13} className="text-amber-500" /> Popular:
            </span>
            {popularTags.map((tag, idx) => (
              <Link
                key={idx}
                href={makeLink(`/items?search=${encodeURIComponent(tag.label)}`)}
                className="px-2.5 py-0.5 rounded-full bg-white/90 border border-rose-100 text-slate-600 hover:text-[#8B2748] hover:border-rose-300 hover:bg-rose-50 transition-all font-medium text-[11px] sm:text-xs shadow-2xs"
              >
                {tag.label}
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href={makeLink("/services")}>
              <button className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:shadow-lg hover:shadow-rose-900/20 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02]">
                {heroData.button1Text || "Explore Services"}
                <ArrowRight size={16} />
              </button>
            </Link>

            <Link href={makeLink("/contact")}>
              <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl border-2 border-[#8B2748] text-[#8B2748] font-semibold text-sm sm:text-base bg-white hover:bg-rose-50 transition-all duration-300 hover:scale-[1.02] shadow-sm">
                {heroData.button2Text || "Get Custom Quote"}
              </button>
            </Link>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-rose-100/80">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] bg-clip-text text-transparent">
                10+
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                Years Experience
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] bg-clip-text text-transparent">
                500+
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                Labs Equipped
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] bg-clip-text text-transparent">
                100%
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                Calibrated Accuracy
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Premium Modern Interactive Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Visual Showcase Container */}
          <div className="relative rounded-[28px] bg-gradient-to-br from-slate-900 via-[#1E0911] to-[#3B0C1D] p-5 sm:p-6 text-white shadow-[0_20px_50px_rgba(122,31,61,0.2)] border border-rose-500/20 overflow-hidden">
            {/* Ambient Inner Glow Background */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
                  <Microscope size={19} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white tracking-wide">
                    Raj Biosis Private Limited
                  </h4>
                  <p className="text-[11px] text-rose-300/80">
                    Certified Biomedical Technologies
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>Live Support</span>
              </div>
            </div>

            {/* Interactive Feature Cards Grid */}
            <div className="space-y-3 relative z-10">
              {/* Feature Item 1 */}
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-white/10 transition-all duration-300 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Activity size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-xs sm:text-sm text-white">
                      Hematology & Biochemistry
                    </h5>
                    <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full font-medium">
                      High Precision
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    3-Part & 5-Part Differential CBC machines & fully automated analyzers.
                  </p>
                </div>
              </div>

              {/* Feature Item 2 */}
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-white/10 transition-all duration-300 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Zap size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-xs sm:text-sm text-white">
                      Reagents & Consumables
                    </h5>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full font-medium">
                      Fresh Batches
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    High stability test kits, controls, calibrators & lab reagents.
                  </p>
                </div>
              </div>

              {/* Feature Item 3 */}
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-white/10 transition-all duration-300 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-xs sm:text-sm text-white">
                      24/7 Technical & AMC Service
                    </h5>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-medium">
                      Certified Engineers
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    On-site installation, calibration, preventive maintenance & emergency repair.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Trust Badges */}
            <div className="mt-4 pt-3.5 border-t border-rose-500/20 flex flex-wrap items-center justify-between text-[11px] text-rose-200/80 gap-2">
              <div className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>ISO 9001 Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>CE Standard</span>
              </div>
              <div className="flex items-center gap-1">
                <Building2 size={13} className="text-rose-400" />
                <span>Pan-India Logistics</span>
              </div>
            </div>
          </div>

          {/* Floating Pill Badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-rose-200 shadow-lg text-slate-800"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-[#8B2748]">
              <BadgeCheck size={18} />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900">
                100% Quality Assurance
              </p>
              <p className="text-[10px] text-slate-500">
                Fully Tested & Calibrated
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}