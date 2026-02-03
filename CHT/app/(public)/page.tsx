import Hero from "@/components/public/Hero";
import FeaturedVideosCarousel from "@/components/public/FeaturedVideosCarousel";
import TreatmentContentCarousel from "@/components/public/TreatmentContentCarousel";
import ContentHighlight from "@/components/public/ContentHighlight";
import Resources from "@/components/public/Resources";
import FAQ from "@/components/public/FAQ";
import CTASection from "@/components/public/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVideosCarousel />
      <TreatmentContentCarousel />
      <ContentHighlight />
      <Resources />
      <FAQ />
      <CTASection />
    </>
  );
}