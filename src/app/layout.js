import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://anylabtest.in"),

  title:
    "Biomedical Equipment & Diagnostic Machine Supplier in India | Raj Biosis",

  description:
    "Raj Biosis is India's leading supplier of CBC Machines, 5-Part Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Electrolyte Analyzers, Urine Analyzers, and Diagnostic Reagents across all districts.",

  keywords: [
    "Biomedical Equipment Supplier",
    "Laboratory Equipment Supplier",
    "CBC Machine Supplier",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "Diagnostic Equipment Supplier",
    "Medical Equipment Supplier India",
    "ELISA Reader Price India",
    "Electrolyte Analyzer Supplier",
    "Urine Analyzer Supplier",
    "Diagnostic Reagents Distributor",
    "Pathology Equipment Supplier",
    "Lab Equipment Price in India",
    "Raj Biosis",
  ],

  authors: [{ name: "Raj Biosis", url: "https://anylabtest.in" }],
  creator: "Raj Biosis",
  publisher: "Raj Biosis",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title:
      "Biomedical Equipment & Diagnostic Machine Supplier in India | Raj Biosis",

    description:
      "Supplier of certified biomedical and laboratory equipment, CBC machines, analyzers, and reagents across all districts in India.",

    url: "https://anylabtest.in",

    siteName: "Raj Biosis",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raj Biosis Biomedical Equipment",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Biomedical Equipment & Diagnostic Machine Supplier | Raj Biosis",

    description:
      "Supplier of biomedical and laboratory equipment across India.",

    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://anylabtest.in",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}