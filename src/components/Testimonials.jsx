"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Specialist",
      review:
        "Raj Biosis has consistently delivered reliable diagnostic equipment with outstanding support.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Professional service, premium products, and excellent biomedical consultation experience.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "Their healthcare solutions improved our laboratory efficiency significantly.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Trusted by healthcare professionals, laboratories, and biomedical institutions."
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