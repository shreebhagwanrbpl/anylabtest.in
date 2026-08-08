import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Raj Biosis"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="section-padding bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="relative">

            <div className="rounded-[40px] overflow-hidden bg-white border border-rose-100 shadow-[0_20px_60px_rgba(122,31,61,0.08)] h-[600px] flex items-center justify-center p-10">

              <Image
                src={DDS}
                alt="About"
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain transition duration-700 hover:scale-105"
              />

            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-white border border-rose-100 p-6 rounded-[26px] shadow-[0_15px_40px_rgba(122,31,61,0.12)] hidden lg:block backdrop-blur-md">

              <h3 className="text-4xl font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                10+
              </h3>

              <p className="text-slate-600 font-medium mt-1">
                Years of Excellence
              </p>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 text-slate-600 leading-8 text-lg">
              At <strong className="text-rose-700">Raj Biosis</strong>,
              we are committed to delivering premium-quality
              healthcare and biomedical technologies designed
              to improve diagnostics, laboratory performance,
              and medical efficiency.
            </p>

            <p className="mt-5 text-slate-600 leading-8 text-lg">
              Our mission is to empower healthcare
              professionals with trusted equipment,
              expert consultation, and innovative
              biomedical support.
            </p>

            {/* Feature Points */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10">

              {/* Card 1 */}
              <div className="group bg-white p-6 rounded-3xl border border-rose-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center mb-5 text-rose-700 font-bold text-xl">
                  ✓
                </div>

                <h4 className="text-xl font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                  Premium Equipment
                </h4>

                <p className="text-slate-600 mt-3 leading-7">
                  High-end diagnostic technologies
                  designed for reliable and accurate
                  laboratory performance.
                </p>

              </div>

              {/* Card 2 */}
              <div className="group bg-white p-6 rounded-3xl border border-rose-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center mb-5 text-rose-700 font-bold text-xl">
                  ★
                </div>

                <h4 className="text-xl font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                  Expert Support
                </h4>

                <p className="text-slate-600 mt-3 leading-7">
                  Professional consultation,
                  installation assistance and
                  dependable after-sales support.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}