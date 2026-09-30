"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm({ className = "", onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }
    if (!emailRegex.test(form.email)) {
      return toast.error("Enter valid email");
    }
    if (!phoneRegex.test(form.phone)) {
      return toast.error("Enter valid 10-digit mobile number");
    }
    if (!form.message.trim()) {
      return toast.error("Message is required");
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/contact-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data?.error || "Submission failed");
      }

      toast.success("Message submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("[ContactForm] Submit error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600 transition"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600 transition"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number (10 digits)"
        maxLength={10}
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value.replace(/\D/g, ""),
          })
        }
        className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600 transition"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject (Optional)"
        value={form.subject}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600 transition"
      />

      <textarea
        rows={4}
        name="message"
        placeholder="Your Message / Equipment Requirement"
        value={form.message}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-sky-600 resize-none transition"
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7A1F3D] via-[#8B2748] to-[#A52F52] hover:from-[#681732] hover:via-[#7A1F3D] hover:to-[#922646] shadow-lg shadow-rose-300/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {submitting ? "Submitting..." : "Send Message"}
      </button>
    </form>
  );
}
