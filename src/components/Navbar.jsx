"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-rose-100 shadow-sm">
      <div className="container-custom h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href={makeLink("/")}>
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] bg-clip-text text-transparent">
              Raj
            </span>

            <span className="text-slate-900">
              {" "}Biosis
            </span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="text-slate-700 hover:text-[#8B2748] transition-colors duration-300 relative group"
            >

              {link.name}

              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#8B2748] transition-all duration-300 group-hover:w-full"></span>

            </Link>

          ))}

        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button
              className="px-6 py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-[#7A1F3D] to-[#A52F52]
          hover:from-[#681732] hover:to-[#922646]
          shadow-lg shadow-rose-200/50
          transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </button>

          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#8B2748]"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen
          ? "max-h-[500px]"
          : "max-h-0"
          }`}
      >

        <div className="bg-white border-t border-rose-100 p-6">

          <nav className="flex flex-col gap-5">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-[#8B2748] transition-colors font-medium"
              >
                {link.name}
              </Link>

            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >

              <button
                className="mt-3 w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#7A1F3D] to-[#A52F52]
            hover:from-[#681732] hover:to-[#922646]
            transition-all duration-300"
              >
                Get Quote
              </button>

            </Link>

          </nav>

        </div>

      </div>
    </header>
  );
}