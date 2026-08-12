import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
import JsonLd from "@/components/JsonLd";

export default function Home({ city = "" }) {
  return (
    <>
      <JsonLd city={city} />
      <HeroSection city={city} />
      <FeaturedProducts city={city} />
      <WhyChooseUs city={city} />
      <StatsSection city={city} />
      <ServicesPreview city={city} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </>
  );
}