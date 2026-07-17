"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-red-50 py-28 lg:py-36">

      {/* Background Blur Effects */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-300/25 rounded-full blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300/20 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center max-w-4xl mx-auto"
        >

          {/* Badge */}
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-rose-700 font-semibold text-sm shadow-sm mb-6">
            Premium Biomedical Solutions
          </span>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">

            <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text  text-black">
              {title}
            </span>

          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-slate-600 text-lg leading-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Decorative Line */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 rounded-full bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]"></div>
          </div>

        </motion.div>

      </div>

    </section>
  );
}