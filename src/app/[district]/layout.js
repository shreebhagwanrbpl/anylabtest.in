import { fetchDistrictsList } from "@/lib/data-fetcher";

export async function generateStaticParams() {
  const districts = await fetchDistrictsList();
  return districts.map((d) => ({ district: d.slug }));
}

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const title = `Biomedical & Diagnostic Equipment Supplier in ${districtName} | CBC Machines & Analyzers | Raj Biosis`;

  const description = `Raj Biosis is the leading biomedical and laboratory equipment supplier in ${districtName}. Supplying CBC Machines, 5-Part Hematology Analyzers, Biochemistry Analyzers, Reagents, ELISA Readers and Urine Analyzers to pathology labs and hospitals in ${districtName}.`;

  const url = `https://anylabtest.in/${district}`;

  return {
    title,
    description,

    keywords: [
      `Biomedical Equipment ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      `Laboratory Equipment ${districtName}`,
      `Pathology Equipment ${districtName}`,
      `Biomedical Supplier ${districtName}`,
      `CBC Machine ${districtName}`,
      `Hematology Analyzer ${districtName}`,
      `Biochemistry Analyzer ${districtName}`,
      `ELISA Reader ${districtName}`,
      `Reagents Supplier ${districtName}`,
      `Lab Equipment Dealer ${districtName}`,
    ],

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

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Raj Biosis",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}