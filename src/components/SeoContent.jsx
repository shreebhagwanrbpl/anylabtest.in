export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-20 bg-gradient-to-b from-white via-rose-50/30 to-white">
            <div className="container-custom">

                {/* Heading */}

                <div className="mb-10">

                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-rose-700 text-sm font-semibold shadow-sm mb-5">
                        Trusted Biomedical Supplier
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                            Biomedical Equipment Supplier in {location}
                        </span>
                    </h2>

                    <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]"></div>

                </div>

                {/* Content */}

                <div className="space-y-7 text-slate-600 leading-8 text-lg">

                    <p>
                        Raj Biosis is a trusted supplier of biomedical
                        and laboratory equipment in <strong className="text-rose-700">{location}</strong>.
                        We provide CBC Machines, Hematology
                        Analyzers, Biochemistry Analyzers,
                        Urine Analyzers, ELISA Readers and
                        diagnostic instruments for hospitals,
                        pathology labs and healthcare facilities.
                    </p>

                    <p>
                        Our mission is to provide reliable and
                        high-quality laboratory equipment to
                        healthcare professionals across India.
                        We work with diagnostic centres,
                        hospitals, research laboratories and
                        medical institutions to deliver advanced
                        biomedical solutions.
                    </p>

                    <p>
                        We offer installation assistance,
                        product guidance and technical support
                        for a wide range of laboratory
                        instruments. Whether you are setting up
                        a new diagnostic laboratory or upgrading
                        existing equipment, our team can help
                        you select the right solution.
                    </p>

                    <p>
                        Raj Biosis supplies equipment
                        across multiple districts and cities,
                        helping healthcare providers improve
                        testing efficiency and diagnostic
                        accuracy.
                    </p>

                </div>

                {/* FAQ */}

                <div className="mt-20">

                    <h2 className="text-3xl lg:text-4xl font-bold mb-10">
                        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h2>

                    <div className="grid gap-6">

                        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300">

                            <h3 className="font-bold text-xl text-slate-900">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="text-slate-600 mt-3 leading-7">
                                Yes, we supply biomedical and laboratory
                                equipment across multiple districts and cities.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300">

                            <h3 className="font-bold text-xl text-slate-900">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="text-slate-600 mt-3 leading-7">
                                We provide CBC Machines,
                                Hematology Analyzers,
                                Biochemistry Analyzers,
                                ELISA Readers, Urine
                                Analyzers and other
                                diagnostic equipment.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300">

                            <h3 className="font-bold text-xl text-slate-900">
                                Do you provide installation support?
                            </h3>

                            <p className="text-slate-600 mt-3 leading-7">
                                Yes, installation assistance and
                                technical support are available
                                depending on location and
                                equipment type.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300">

                            <h3 className="font-bold text-xl text-slate-900">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="text-slate-600 mt-3 leading-7">
                                Hospitals, pathology labs,
                                diagnostic centres, research
                                laboratories and healthcare
                                facilities can purchase
                                equipment from us.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}