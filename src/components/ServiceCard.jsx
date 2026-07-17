import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-[30px] p-8 border border-rose-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Icon */}
      <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-rose-100 to-red-100 text-rose-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-4">
        <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
          {title}
        </span>
      </h3>

      {/* Description */}
      <p className="text-slate-600 leading-7">
        {description}
      </p>

      {/* Bottom Gradient Line */}
      <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52F52] group-hover:w-20 transition-all duration-500"></div>

    </div>
  );
}