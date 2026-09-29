"use client";

import { useEffect, useState } from "react";
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

  /*
   * IMPORTANT:
   * No Firebase / Firestore is used here.
   * All service data comes from the Admin SQLite API.
   *
   * There is intentionally NO hardcoded service fallback.
   */

  const icons = [
    <Microscope key="microscope" size={28} className="text-[#8B2748]" />,
    <Wrench key="wrench" size={28} className="text-[#8B2748]" />,
    <FileCheck key="filecheck" size={28} className="text-[#8B2748]" />,
    <FlaskConical key="flask" size={28} className="text-[#8B2748]" />,
    <Stethoscope key="stethoscope" size={28} className="text-[#8B2748]" />,
    <Activity key="activity" size={28} className="text-[#8B2748]" />,
  ];

  /*
   * FAQ data is kept as existing page UI content.
   * If your Admin API later provides FAQ data, this can be
   * switched to the same API source without changing the UI.
   */
  const serviceFaqs = [
    {
      question: "What types of biomedical analyzers do you sell and service?",
      answer:
        "We specialize in 3-part & 5-part hematology analyzers (CBC machines), semi-automated and fully automated biochemistry analyzers, ELISA readers, electrolyte analyzers, urine strip readers, and centrifuge systems.",
    },
    {
      question:
        "What is covered under your Annual Maintenance Contracts (AMC / CMC)?",
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
        setLoading(true);

        const response = await fetch(
          "/api/site-data?page=services",
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Services API failed with status ${response.status}`
          );
        }

        const result = await response.json();

        /*
         * Support common API response shapes:
         *
         * 1. { services: [...] }
         * 2. { pageData: { services: [...] } }
         * 3. { data: { services: [...] } }
         * 4. { data: { pageData: { services: [...] } } }
         * 5. Direct array [...]
         */

        let fetchedServices = [];

        if (Array.isArray(result)) {
          fetchedServices = result;
        } else if (Array.isArray(result?.services)) {
          fetchedServices = result.services;
        } else if (Array.isArray(result?.pageData?.services)) {
          fetchedServices = result.pageData.services;
        } else if (Array.isArray(result?.data?.services)) {
          fetchedServices = result.data.services;
        } else if (
          Array.isArray(result?.data?.pageData?.services)
        ) {
          fetchedServices = result.data.pageData.services;
        } else if (Array.isArray(result?.page?.services)) {
          fetchedServices = result.page.services;
        }

        if (isMounted) {
          setServices(
            Array.isArray(fetchedServices)
              ? fetchedServices
              : []
          );
        }
      } catch (error) {
        console.error("Error fetching services from Admin API:", error);

        if (isMounted) {
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * IMPORTANT:
   * No static fallback is used.
   * If Admin has no services, the grid simply has no service cards.
   */
  const displayServices = Array.isArray(services)
    ? services
    : [];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <>
      <JsonLd
        breadcrumbs={breadcrumbs}
        faqs={serviceFaqs}
      />

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
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[30px] p-8 border border-rose-100 shadow-md animate-pulse space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-rose-100" />

                  <div className="h-6 bg-rose-100 rounded-lg w-3/4" />

                  <div className="h-16 bg-rose-100 rounded-lg w-full" />
                </div>
              ))
            ) : displayServices.length > 0 ? (
              displayServices.map((service, index) => {
                /*
                 * Admin data only.
                 * No hardcoded text fallback.
                 */
                const title =
                  service?.title ??
                  service?.name ??
                  "";

                const desc =
                  service?.desc ??
                  service?.description ??
                  "";

                const features = Array.isArray(
                  service?.features
                )
                  ? service.features
                  : [];

                /*
                 * If Admin service object is empty,
                 * don't render a fake/static service.
                 */
                if (!title && !desc) {
                  return null;
                }

                return (
                  <div
                    key={
                      service?.id ||
                      service?.slug ||
                      `${title}-${index}`
                    }
                    className="group bg-white rounded-[30px] p-8 border border-rose-100 shadow-[0_10px_35px_rgba(122,31,61,0.06)] hover:shadow-[0_20px_50px_rgba(122,31,61,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {icons[index % icons.length]}
                      </div>

                      {/* Title */}
                      {title && (
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#8B2748] transition-colors leading-snug">
                          {title}
                        </h3>
                      )}

                      {/* Description */}
                      {desc && (
                        <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                          {desc}
                        </p>
                      )}

                      {/* Features */}
                      {features.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-rose-100 space-y-2">
                          {features.map((feat, fIdx) => {
                            if (
                              feat === null ||
                              feat === undefined ||
                              feat === ""
                            ) {
                              return null;
                            }

                            return (
                              <div
                                key={fIdx}
                                className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-[#8B2748] shrink-0"
                                />

                                <span>{String(feat)}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              /*
               * No static fallback service data.
               * Admin API returned no services.
               */
              <div className="lg:col-span-3 md:col-span-2 flex items-center justify-center py-16">
                <div className="text-center">
                  <p className="text-slate-500 text-sm">
                    No services are currently available.
                  </p>
                </div>
              </div>
            )}
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
              <Clock
                className="text-rose-400 mb-4"
                size={28}
              />

              <h4 className="text-lg font-bold text-white">
                24-48 Hour Response SLA
              </h4>

              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Dedicated district technical teams assigned to handle urgent breakdown support and urgent spare replacements.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-7 rounded-3xl">
              <ShieldCheck
                className="text-rose-400 mb-4"
                size={28}
              />

              <h4 className="text-lg font-bold text-white">
                Calibrated Accuracy
              </h4>

              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Multi-point photometric and electronic calibration using certified control standards adhering to NABL guidelines.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-7 rounded-3xl">
              <Truck
                className="text-rose-400 mb-4"
                size={28}
              />

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