"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-gradient-to-br from-rose-50 via-white to-red-50 border-t border-rose-200">
      <div className="container-custom py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-rose-700 via-red-700 to-rose-600 bg-clip-text text-transparent">
                Central
              </span>

              <span className="text-slate-900">
                {" "}Biomedicals
              </span>
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Delivering trusted diagnostic
              and biomedical solutions with
              innovation, quality, and
              precision healthcare support.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                href={makeLink("/")}
                className="text-slate-600 hover:text-rose-700 transition font-medium"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="text-slate-600 hover:text-rose-700 transition font-medium"
              >
                About
              </Link>

              <Link
                href={makeLink("/services")}
                className="text-slate-600 hover:text-rose-700 transition font-medium"
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="text-slate-600 hover:text-rose-700 transition font-medium"
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="text-slate-600 hover:text-rose-700 transition font-medium"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Services
            </h3>

            <div className="space-y-4 text-slate-600">

              <p className="hover:text-rose-700 transition cursor-pointer">
                Diagnostic Equipment
              </p>

              <p className="hover:text-rose-700 transition cursor-pointer">
                Laboratory Solutions
              </p>

              <p className="hover:text-rose-700 transition cursor-pointer">
                Biomedical Instruments
              </p>

              <p className="hover:text-rose-700 transition cursor-pointer">
                Maintenance Support
              </p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Contact Info
            </h3>

            <div className="space-y-5 text-slate-600">

              <div className="flex items-start gap-4">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center shadow">
                  <MapPin
                    size={18}
                    className="text-rose-700"
                  />
                </div>

                <p className="leading-7">
                  {dynamicAddress}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center shadow">
                  <Phone
                    size={18}
                    className="text-rose-700"
                  />
                </div>

                <p>
                  {phone}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center shadow">
                  <Mail
                    size={18}
                    className="text-rose-700"
                  />
                </div>

                <p>
                  {email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 pt-8 border-t border-rose-200 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-600 text-sm">
            © 2026
            <span className="font-semibold text-rose-700">
              {" "}Central Biomedicals
            </span>.
            All rights reserved.
          </p>

          <p className="text-sm text-slate-600">
            Designed with ❤️ for
            modern diagnostics.
          </p>

        </div>

      </div>
    </footer>
  );
}