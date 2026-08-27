"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief Pathologist, Apex Diagnostics",
      review:
        "Raj Biosis supplied our 5-part CBC analyzer and fully automated biochemistry unit. Their precision optical calibration and fresh cold-chain reagent delivery have kept our daily test reports 100% accurate.",
    },
    {
      name: "Amit Sharma",
      role: "Clinical Lab Director, City Care Hospital",
      review:
        "The AMC technical support from Raj Biosis is exceptional. When our hematology analyzer encountered a fluidic issue, their field engineer arrived within hours and restored operations rapidly.",
    },
    {
      name: "Dr. Neha Verma",
      role: "Head of Biochemistry, MedTech Diagnostics",
      review:
        "Their turnkey laboratory consultation was invaluable when establishing our new diagnostic center. Genuine OEM reagents, multi-point calibration, and outstanding engineer guidance.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Client Testimonials"
          title="Experience That Speaks for Itself"
          description="Discover how laboratories, hospitals, and diagnostic professionals have experienced our products, service, and technical support. Our focus remains on dependable solutions, responsive assistance, and building lasting relationships with healthcare organizations."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {reviews.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="group bg-white rounded-[32px] p-8 border border-rose-100 shadow-lg hover:shadow-2xl transition-all duration-300"
            >

              {/* Stars */}
              <div className="flex gap-1 text-amber-400 text-xl mb-5">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-8 italic">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>

              {/* User */}
              <div className="mt-7">

                <h4 className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                    {item.name}
                  </span>
                </h4>

                <p className="text-slate-500 mt-1">
                  {item.role}
                </p>

              </div>

              {/* Bottom Accent */}
              <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-20 transition-all duration-500"></div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}