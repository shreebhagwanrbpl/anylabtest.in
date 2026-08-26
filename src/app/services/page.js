"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  CheckCircle2,
  Clock,
  Award,
  HelpCircle,
  Truck,
  FileCheck,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackServices = [
    {
      title: "Diagnostic Equipment Sales & Supply",
      desc: "Supply of 3-Part & 5-Part Hematology Analyzers, Semi & Fully Automated Biochemistry Analyzers, ELISA Microplate Readers, Electrolyte Analyzers, and Urine Readers.",
      features: [
        "ISO & CE Certified Equipment",
        "Comprehensive Warranty Coverage",
        "On-Site Demonstration & Installation",
      ],
    },
    {
      title: "Annual Maintenance Contracts (AMC & CMC)",
      desc: "Preventive and comprehensive maintenance contracts designed to prevent laboratory downtime, including periodic optical calibration and emergency breakdown visits.",
      features: [
        "Scheduled Preventive Servicing",
        "Priority Emergency SLA",
        "Original OEM Spare Parts",
      ],
    },
    {
      title: "Laboratory Calibration & NABL Alignment",
      desc: "Precision optical, thermal, and photometric calibration services adhering strictly to NABL quality guidelines to guarantee accurate diagnostic test reporting.",
      features: [
        "NABL Compliant Calibration",
        "Official Calibration Certificates",
        "Multi-Point Quality Benchmarking",
      ],
    },
    {
      title: "Cold-Chain Reagents & Consumables Logistics",
      desc: "Uninterrupted, temperature-controlled delivery of high-stability CBC diluents, lysing reagents, liquid-stable biochemistry substrates, controls, and calibrators.",
      features: [
        "Temperature-Controlled Cold Chain",
        "Fresh Batches with Long Shelf-Life",
        "Fast District Delivery",
      ],
    },
    {
      title: "Complete Pathology Laboratory Setup",
      desc: "End-to-end turnkey consultation for establishing new clinical pathology laboratories, spatial workflow optimization, instrument matching, and staff training.",
      features: [
        "Custom Laboratory Layout Design",
        "Sample Workload Optimization",
        "Expert Instrument Selection",
      ],
    },
    {
      title: "Rapid Breakdown Engineering Repair",
      desc: "Dedicated field engineer response for urgent machine breakdown, fluidic blockages, sensor recalibration, electronic board errors, and tube replacements.",
      features: [
        "24-48 Hour On-Site SLA",
        "Certified Field Engineers",
        "On-Site Diagnostics & Repair",
      ],
    },
  ];

  const icons = [
    <Microscope size={28} className="text-[#8B2748]" />,
    <Wrench size={28} className="text-[#8B2748]" />,
    <FileCheck size={28} className="text-[#8B2748]" />,
    <FlaskConical size={28} className="text-[#8B2748]" />,
    <Stethoscope size={28} className="text-[#8B2748]" />,
    <Activity size={28} className="text-[#8B2748]" />,
  ];

  const serviceFaqs = [
    {
      question: "What types of biomedical analyzers do you sell and service?",
      answer:
        "We specialize in 3-part & 5-part hematology analyzers (CBC machines), semi-automated and fully automated biochemistry analyzers, ELISA readers, electrolyte analyzers, urine strip readers, and centrifuge systems.",
    },
    {
      question: "What is covered under your Annual Maintenance Contracts (AMC / CMC)?",
      answer:
        "Our AMC includes scheduled preventive servicing, optical & fluidic calibration, emergency breakdown visits, and technical hotline assistance. CMC contracts additionally include replacement of worn OEM spare parts.",
    },
    {
      question: "How fast is your technical support response SLA?",
      answer:
        "We maintain a guaranteed 24-48 hour on-site engineering response SLA across covered districts for urgent laboratory breakdown calls.",
    },
    {
      question: "Do you supply original diagnostic reagents and calibrators?",
      answer:
        "Yes, we supply fresh-batch, long-shelf-life diluents, lysing reagents, biochemistry substrates, controls, and calibrators with temperature-monitored cold-chain shipping.",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "anylabtestin", "pages", "services")
        );

        if (snap.exists() && isMounted) {
          const fetched = snap.data().services || [];
          setServices(fetched.length > 0 ? fetched : fallbackServices);
        } else if (isMounted) {
          setServices(fallbackServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        if (isMounted) setServices(fallbackServices);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayServices = services.length > 0 ? services : fallbackServices;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <>
      <JsonLd breadcrumbs={breadcrumbs} faqs={serviceFaqs} />

      {/* Banner */}
      <PageBanner
        title="Biomedical & Technical Services"
        subtitle="Comprehensive laboratory equipment sales, calibration, AMC contracts, reagent logistics, and engineer support across India."
      />

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-b from-rose-50/50 via-white to-red-50/40 relative overflow-hidden">
        <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-rose-200/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Our Capabilities"
            title="Premium Biomedical & Technical Solutions"
            description="Tailored engineering services designed to guarantee zero diagnostic lab downtime and maximum testing accuracy."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[30px] p-8 border border-rose-100 shadow-md animate-pulse space-y-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-rose-100"></div>
                    <div className="h-6 bg-rose-100 rounded-lg w-3/4"></div>
                    <div className="h-16 bg-rose-100 rounded-lg w-full"></div>
                  </div>
                ))
              : displayServices.map((service, index) => {
                  const title = service.title || "Biomedical Service";
                  const desc =
                    service.desc ||
                    service.description ||
                    "Professional technical assistance and laboratory support provided by certified biomedical engineers.";
                  const features = service.features || [
                    "Certified Technical Experts",
                    "Fast Service SLA",
                    "Original OEM Components",
                  ];

                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-[30px] p-8 border border-rose-100 shadow-[0_10px_35px_rgba(122,31,61,0.06)] hover:shadow-[0_20px_50px_rgba(122,31,61,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          {icons[index % icons.length]}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#8B2748] transition-colors leading-snug">
                          {title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                          {desc}
                        </p>

                        {/* Features Bullet List */}
                        <div className="mt-6 pt-5 border-t border-rose-100 space-y-2">
                          {features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-[#8B2748] shrink-0"
                              />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Engineering Service Standards & SLA */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-4">
              <Award size={16} />
              Service Excellence Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Laboratories Trust Raj Biosis Engineering
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              We stand behind our services with measurable SLA guarantees and expert biomedical technical standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-7 rounded-3xl">
              <Clock className="text-rose-400 mb-4" size={28} />
              <h4 className="text-lg font-bold text-white">
                24-48 Hour Response SLA
              </h4>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Dedicated district technical teams assigned to handle urgent breakdown support and urgent spare replacements.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-7 rounded-3xl">
              <ShieldCheck className="text-rose-400 mb-4" size={28} />
              <h4 className="text-lg font-bold text-white">
                Calibrated Accuracy
              </h4>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Multi-point photometric and electronic calibration using certified control standards adhering to NABL guidelines.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-7 rounded-3xl">
              <Truck className="text-rose-400 mb-4" size={28} />
              <h4 className="text-lg font-bold text-white">
                Cold Chain Logistics
              </h4>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Temperature-controlled transport for diagnostic liquid stable reagents and sensitive test controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="How We Work"
            title="Streamlined Service Execution"
            description="Our structured 3-step process ensures dependable laboratory support and seamless onboarding."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Requirements & Consultation",
                desc: "Evaluating laboratory sample workload, instrument specifications, and custom service or purchase needs.",
              },
              {
                step: "02",
                title: "Installation & Calibration",
                desc: "Delivering equipment, executing optical/fluidic calibration, and training laboratory personnel.",
              },
              {
                step: "03",
                title: "Continuous AMC & Support",
                desc: "Providing scheduled preventive servicing, reagent replenishments, and 24/7 hotline support.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-[30px] p-8 border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <span className="text-5xl font-extrabold bg-gradient-to-r from-rose-300 via-rose-400 to-red-400 bg-clip-text text-transparent">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mt-4 text-[#7A1F3D]">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQs for SEO */}
      <section className="py-16 bg-rose-50/40 border-t border-rose-100">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-rose-100 text-[#8B2748] text-xs font-semibold mb-3">
              <HelpCircle size={15} />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Biomedical Service & AMC Queries
            </h2>
          </div>

          <div className="space-y-4">
            {serviceFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm"
              >
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-[#8B2748] text-xs flex items-center justify-center font-extrabold shrink-0">
                    Q
                  </span>
                  {faq.question}
                </h4>
                <p className="text-slate-600 text-sm mt-3 pl-8 leading-relaxed">
                  {faq.answer}
                </p>
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