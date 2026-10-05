"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-red-50 py-12 sm:py-14 lg:py-16">

      {/* Background Blur Effects */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-300/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-center max-w-4xl mx-auto"
        >

          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-[#7A1F3D] font-semibold text-xs sm:text-sm shadow-sm mb-4">
            Premium Biomedical Solutions
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">

            <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
              {title}
            </span>

          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Decorative Line */}
          <div className="mt-5 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]"></div>
          </div>

        </motion.div>

      </div>

    </section>
  );
}