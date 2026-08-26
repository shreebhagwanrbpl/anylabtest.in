import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import JsonLd from "@/components/JsonLd";
import {
  ShieldCheck,
  Target,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
  Activity,
  Microscope,
  Wrench,
  Truck,
} from "lucide-react";

export async function generateMetadata() {
  const title = "About Raj Biosis | India's Premier Biomedical & Diagnostic Equipment Partner";
  const description =
    "Learn about Raj Biosis Private Limited, India's trusted distributor of CBC Machines, 5-Part Hematology Analyzers, Automated Biochemistry Analyzers, Reagents, and AMC Biomedical Engineering Services.";

  return {
    title,
    description,
    keywords: [
      "About Raj Biosis",
      "Biomedical Equipment Supplier India",
      "Laboratory Equipment Dealer",
      "Medical Diagnostic Supplier",
      "CBC Machine Distributor",
      "Hematology Analyzer Supplier",
      "Biochemistry Analyzer Supplier",
      "NABL Calibration Services",
    ],
    alternates: {
      canonical: "https://anylabtest.in/about",
    },
    openGraph: {
      title,
      description,
      url: "https://anylabtest.in/about",
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

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} />

      {/* Banner */}
      <PageBanner
        title="About Raj Biosis"
        subtitle="Empowering clinical pathology labs and healthcare institutions across India with certified diagnostic technology, cold-chain reagent logistics, and 24/7 engineer support."
      />

      {/* About Main Section */}
      <section className="section-padding bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">
        {/* Background Glow Orbs */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-rose-200/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-red-200/20 blur-[130px] pointer-events-none" />

        <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Modern Corporate Excellence Hub (No Static Image) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Interactive Glass Card */}
            <div className="relative rounded-[36px] bg-gradient-to-br from-slate-900 via-[#1E0911] to-[#3B0C1D] p-8 text-white shadow-[0_20px_60px_rgba(122,31,61,0.2)] border border-rose-500/20 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between border-b border-rose-500/20 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Raj Biosis Private Limited
                    </h3>
                    <p className="text-xs text-rose-300">
                      10+ Years of Biomedical Leadership
                    </p>
                  </div>
                </div>
                <span className="bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold px-3 py-1 rounded-full">
                  ISO & CE Compliant
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-red-300 bg-clip-text text-transparent">
                    10+
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Years of Laboratory Innovation
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-red-300 bg-clip-text text-transparent">
                    500+
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Hospitals & Labs Supplied
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-red-300 bg-clip-text text-transparent">
                    100%
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Calibration & QC Standard
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-red-300 bg-clip-text text-transparent">
                    24/7
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Biomedical Tech Support
                  </p>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 text-[#8B2748] flex items-center justify-center mb-4">
                  <Target size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Our Mission
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Empowering pathology laboratories across India with high-accuracy biomedical instruments, fresh cold-chain reagents, and guaranteed field engineer support.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 text-[#8B2748] flex items-center justify-center mb-4">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Our Vision
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Becoming India’s most trusted diagnostic partner by delivering cutting-edge laboratory technologies, zero lab downtime, and district-wide service access.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Corporate Story & Strengths */}
          <div className="lg:col-span-6">
            <SectionTitle
              badge="Who We Are"
              title="India's Trusted Partner in Clinical Pathology & Biomedical Systems"
              description="We supply certified diagnostic analyzers, high-stability reagents, and NABL-aligned technical consultation dedicated to healthcare innovation and diagnostic precision."
            />

            <p className="mt-6 text-slate-600 leading-relaxed text-base sm:text-lg">
              At <strong className="text-[#8B2748]">Raj Biosis Private Limited</strong>, we specialize in high-end medical equipment for clinical pathology, hematology, biochemistry, immunoassay, and electrolyte testing. Our portfolio features 3-Part and 5-Part CBC machines, automated chemistry analyzers, ELISA microplate readers, urine analyzers, and long-shelf-life diagnostic reagents.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
              Whether you are opening a new clinical diagnostic laboratory or upgrading your hospital infrastructure, healthcare institutions nationwide depend on our comprehensive service framework—from equipment consultation and installation to annual maintenance contracts (AMC/CMC), calibration, and emergency breakdown repairs.
            </p>

            {/* Feature Points Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div className="group bg-white p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8B2748] flex items-center justify-center font-bold">
                    <Microscope size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Certified Equipment
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      NABL & ISO compliant
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8B2748] flex items-center justify-center font-bold">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Expert Engineers
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Installation & AMC support
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8B2748] flex items-center justify-center font-bold">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Reagent Logistics
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fresh batches & controls
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8B2748] flex items-center justify-center font-bold">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Pan-India Delivery
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast district coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-4">
            <ShieldCheck size={16} />
            Quality Assurance Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Uncompromising Precision for Every Clinical Diagnostic Test
          </h2>
          <p className="text-slate-300 mt-4 leading-relaxed text-base">
            Every instrument supplied by Raj Biosis undergoes stringent quality inspection, optical calibration, and performance benchmarking to guarantee accurate patient test results.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-10 text-left">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <CheckCircle2 className="text-emerald-400 mb-3" size={24} />
              <h4 className="font-bold text-white text-base">
                100% Calibrated Units
              </h4>
              <p className="text-xs text-slate-300 mt-2">
                Factory calibrated and field-verified before lab dispatch.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <CheckCircle2 className="text-emerald-400 mb-3" size={24} />
              <h4 className="font-bold text-white text-base">
                Original OEM Spares
              </h4>
              <p className="text-xs text-slate-300 mt-2">
                Only genuine spare parts and original diagnostic components.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <CheckCircle2 className="text-emerald-400 mb-3" size={24} />
              <h4 className="font-bold text-white text-base">
                Rapid SLA Response
              </h4>
              <p className="text-xs text-slate-300 mt-2">
                On-site technical visit within 24-48 hours of breakdown call.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}