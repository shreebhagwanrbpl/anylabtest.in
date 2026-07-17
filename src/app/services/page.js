"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-b from-rose-50 via-white to-red-50 relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (

                <div
                  key={index}
                  className="bg-white rounded-[30px] p-10 border border-rose-100 shadow-[0_15px_40px_rgba(122,31,61,0.08)] animate-pulse"
                >

                  {/* Icon Skeleton */}
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 to-red-100 mb-8"></div>

                  {/* Title Skeleton */}
                  <div className="h-8 bg-rose-100 rounded-xl mb-6"></div>

                  {/* Text Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-rose-100 rounded-full"></div>
                    <div className="h-4 bg-rose-100 rounded-full w-11/12"></div>
                    <div className="h-4 bg-rose-100 rounded-full w-8/12"></div>
                  </div>

                </div>

              ))
              : services.map((service, index) => (

                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />

              ))}

          </div>

        </div>

      </section>

      {/* Working Process */}
      <section className="section-padding bg-gradient-to-b from-rose-50 via-white to-red-50 relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">

            {[
              {
                step: "01",
                title: "Consultation",
                desc:
                  "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc:
                  "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc:
                  "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-[30px] p-8 border border-rose-100 shadow-[0_15px_40px_rgba(122,31,61,0.08)] hover:shadow-[0_25px_60px_rgba(122,31,61,0.15)] hover:-translate-y-2 transition-all duration-300"
              >

                {/* Step Number */}
                <span className="text-6xl font-extrabold bg-gradient-to-r from-rose-200 via-rose-300 to-red-300 bg-clip-text text-transparent">
                  {item.step}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold mt-5">
                  <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                    {item.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-slate-600 mt-4 leading-8">
                  {item.desc}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-20 transition-all duration-500"></div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}