"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);
  const [contactInfo, setContactInfo] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);
  const pathname = usePathname() || "";

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "category",
    "brand",
    "laboratory-equipment",
    "api",
    "enquiry",
  ];

  const currentDistrict =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0].toLowerCase())
      ? pathParts[0]
      : null;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error(
        "Name is required"
      );
    }

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Enter valid email"
      );
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error(
        "Enter valid mobile number"
      );
    }

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await fetch("/api/contact-query", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }) }).then(async r => { if (!r.ok) throw new Error((await r.json()).error || "Submission failed"); });

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) {
        setDistrictData(null);
        return;
      }

      try {
        const { fetchDistrictData } = await import("@/lib/data-fetcher");
        const data = await fetchDistrictData(currentDistrict);
        if (data && data.district) {
          setDistrictData(data);
        } else {
          setDistrictData(null);
        }
      } catch (err) {
        console.error(err);
        setDistrictData(null);
      }
    };

    loadDistrict();
  }, [currentDistrict]);
  useEffect(() => {
    fetch(`/api/site-data?page=contact&_t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((r) => r.json())
      .then((d) => setContactInfo(d?.contactInfo || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getContactField = (labels) => {
    const found = contactInfo.find(
      (x) => labels.some(l => x.label?.toLowerCase() === l.toLowerCase())
    );
    return found ? found.value : "";
  };

  const phone = getContactField(["phone", "phone number", "mobile", "mobile number"]);
  const email = getContactField(["email", "email address"]);
  const address = getContactField(["address", "office address", "address/office address"]);
  const hours = getContactField(["working hours", "hours", "work hours"]);

  const dynamicAddress =
    districtData?.district && districtData?.state
      ? `${districtData.district}, ${districtData.state}, India`
      : (address || "");

  let phoneValues = [];
  if (Array.isArray(phone)) {
    phoneValues = phone.map((p) => String(p).trim()).filter(Boolean);
  } else if (phone !== null && phone !== undefined && phone !== "") {
    phoneValues = String(phone)
      .split(/[\n,]+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );
  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-8" />

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
                />
              ))}
            </div>

            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
                />
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with Raj Biosis Private Limited for certified biomedical equipment pricing, reagent logistics, AMC support, or turnkey laboratory setup consultation."
      />

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14">

          {/* Left Info */}
          <div>

            <span className="inline-flex items-center bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 text-rose-700 px-5 py-2 rounded-full font-semibold shadow-sm mb-6">
              Contact Information
            </span>

            <h2 className="section-title">
              Let’s Connect & Elevate Your Lab
            </h2>

            <p className="section-subtitle">
              Reach out to our biomedical engineering team for instrument quotes, reagent supply contracts, AMC servicing, and technical assistance.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mt-10">

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-rose-700 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Phone size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Phone Number
                  </h4>

                  <div className="text-slate-600 mt-2 flex flex-col">
                    {phoneValues.map((num, idx) => (
                      <a key={idx} href={`tel:${num}`} className="hover:text-sky-700 transition">
                        {num}
                      </a>
                    ))}
                    {phoneValues.length === 0 && <p>N/A</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-rose-700 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Mail size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Email Address
                  </h4>

                  <p className="text-slate-600 mt-2">
                    <a href={`mailto:${email}`} className="hover:text-sky-700 transition">
                      {email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-rose-700 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <MapPin size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Office Address
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {dynamicAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-rose-700 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Clock3 size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Working Hours
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {hours}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-[40px] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            <h3 className="text-3xl font-bold text-slate-900">
              Send Us Message
            </h3>

            <p className="text-slate-500 mt-3">
              Fill out the form and our
              team will contact you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600"
              />



              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600 resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:from-[#681732] hover:via-[#7A1F3D] hover:to-[#922646] shadow-lg shadow-rose-300/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting
                  ? "Submitting..."
                  : "Send Message"}
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}