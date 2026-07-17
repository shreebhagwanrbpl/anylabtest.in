export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""
        } max-w-3xl`}
    >

      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-rose-700 text-sm font-semibold mb-6 shadow-sm">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
        {description}
      </p>

      {/* Decorative Line */}
      <div
        className={`mt-7 ${center ? "flex justify-center" : ""
          }`}
      >
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52]"></div>
      </div>

    </div>
  );
}