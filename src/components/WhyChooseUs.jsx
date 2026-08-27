"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Certified Diagnostic Systems",
      description:
        "ISO 9001 & CE compliant 3-Part/5-Part CBC machines, automated chemistry analyzers, and precision lab instruments.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Cold-Chain Reagent Supply",
      description:
        "High-stability diluents, lysing reagents, liquid-stable controls, and calibrators delivered under strict cold-chain management.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "24-48 Hr Engineering SLA",
      description:
        "Rapid field engineer response across covered districts for preventive AMC maintenance, calibration, and emergency repairs.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Turnkey Lab Setup",
      description:
        "Comprehensive consultation for new diagnostic labs—from equipment selection to workflow design adhering to NABL guidelines.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Us"
          title="Built Around Better Laboratory Performance"
          description="Helping healthcare facilities simplify laboratory operations with dependable diagnostic equipment, essential laboratory products, and responsive technical assistance. We focus on practical solutions that support accurate testing, efficient workflows, and the day-to-day needs of modern laboratories."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => (

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
                scale: 1.02,
              }}
              className="group bg-white p-8 rounded-[30px] border border-rose-100 shadow-lg hover:shadow-2xl transition-all duration-300"
            >

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 text-rose-700 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                  {item.title}
                </span>
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-7">
                {item.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-20 transition-all duration-500"></div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}