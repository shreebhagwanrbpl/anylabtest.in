import React from "react";
import { SchemaScript } from "@/components/JsonLd";

export default function SeoContent({ city = "" }) {
  const location = city || "India";

  const homeFaqs = [
    {
      question: `Do you supply biomedical equipment across ${location}?`,
      answer: `Yes, Raj Biosis supplies biomedical and laboratory equipment across ${location} and districts nationwide, ensuring prompt delivery and on-site engineer support.`,
    },
    {
      question: `Which laboratory instruments do you provide in ${location}?`,
      answer: `We provide 3-Part & 5-Part CBC Machines, Hematology Analyzers, Biochemistry Analyzers (Semi & Fully Auto), ELISA Readers, Electrolyte Analyzers, Urine Analyzers, and diagnostic reagents in ${location}.`,
    },
    {
      question: `Do you offer installation, calibration, and AMC services in ${location}?`,
      answer: `Yes, our certified biomedical engineers provide full equipment installation, optical calibration adhering to NABL standards, and Annual Maintenance Contracts (AMC/CMC) in ${location}.`,
    },
    {
      question: "Who can purchase biomedical equipment from Raj Biosis?",
      answer:
        "Clinical diagnostic centers, pathology laboratories, government & private hospitals, medical colleges, research institutes, and healthcare facilities can purchase directly from Raj Biosis.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <SchemaScript schema={faqSchema} />
      <div className="container-custom">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-[#8B2748] text-sm font-semibold shadow-sm mb-5">
            Trusted Biomedical & Diagnostic Equipment Supplier
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
            <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
              Biomedical Equipment Supplier & Distributor in {location}
            </span>
          </h2>

          <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]"></div>
        </div>

        {/* Content */}
        <div className="space-y-7 text-slate-600 leading-relaxed text-base sm:text-lg">
          <p>
            <strong className="text-[#8B2748]">Raj Biosis</strong> is a leading supplier of biomedical and diagnostic laboratory equipment in <strong className="text-[#8B2748]">{location}</strong>. We deliver high-precision <strong>CBC Machines</strong>, <strong>5-Part Hematology Analyzers</strong>, <strong>Semi & Fully Automated Biochemistry Analyzers</strong>, <strong>ELISA Microplate Readers</strong>, <strong>Electrolyte Analyzers</strong>, <strong>Urine Analyzers</strong>, and diagnostic reagents to pathology labs, hospitals, and diagnostic centers.
          </p>

          <p>
            Our core commitment is empowering healthcare institutions across India with state-of-the-art laboratory technology. By combining certified medical hardware with high-stability diagnostic reagents and controls, we ensure clinical test reliability, low operational costs, and rapid sample turnaround.
          </p>

          <p>
            In addition to equipment supply, our experienced biomedical engineers provide complete installation assistance, routine calibration adhering to quality standards, preventive maintenance, and rapid 24-48 hour breakdown repair services throughout <strong className="text-[#8B2748]">{location}</strong>.
          </p>

          <p>
            Whether you are establishing a new diagnostic laboratory or upgrading existing analyzer models, Raj Biosis offers expert consultation to help you choose the best equipment for your specific daily sample volume.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
              Frequently Asked Questions (FAQ) - {location}
            </span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-bold text-lg text-slate-900">
                  {faq.question}
                </h4>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}