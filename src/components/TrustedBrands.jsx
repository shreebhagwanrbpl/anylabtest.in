export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50 via-white to-red-50 border-y border-rose-100 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-20 left-0 w-72 h-72 rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-red-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <div className="text-center mb-12">

          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-rose-700 text-sm font-semibold shadow-sm">
            Trusted Partners
          </span>

          <p className="mt-5 text-lg font-medium text-slate-600">
            Trusted by Healthcare &
            Biomedical Organizations
          </p>

          <div className="mt-5 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]"></div>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="group bg-white rounded-3xl p-7 text-center border border-rose-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              <span className="text-lg font-bold bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
                {brand}
              </span>

              <div className="mt-4 h-1 w-0 mx-auto rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-14 transition-all duration-500"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}