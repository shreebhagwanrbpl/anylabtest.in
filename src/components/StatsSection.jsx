"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-rose-50 via-white to-red-50 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <div className="bg-white rounded-[40px] p-10 lg:p-16 border border-rose-100 shadow-[0_20px_60px_rgba(122,31,61,0.08)]">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
                  scale: 1.03,
                }}
                className="text-center group"
              >

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-[24px] bg-gradient-to-br from-rose-100 to-red-100 text-rose-700 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Number */}
                <h3 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                  {item.number}
                </h3>

                {/* Label */}
                <p className="mt-3 text-slate-600 text-lg font-medium">
                  {item.label}
                </p>

                {/* Bottom Line */}
                <div className="mt-5 flex justify-center">
                  <div className="h-1 w-0 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-16 transition-all duration-500"></div>
                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}