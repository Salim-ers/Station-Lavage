import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Programs } from "@/components/home/Programs";
import { WaterTransition } from "@/components/home/WaterTransition";
import { Equipment } from "@/components/home/Equipment";
import { WashSequence } from "@/components/home/WashSequence";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricesXXL } from "@/components/home/PricesXXL";
import { StationBlock } from "@/components/home/StationBlock";
import { GallerySection } from "@/components/home/GallerySection";
import { Open24 } from "@/components/home/Open24";
import { WhyH2AU } from "@/components/home/WhyH2AU";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FinalCta } from "@/components/home/FinalCta";
import { MapSection } from "@/components/home/MapSection";
import { WashProgress } from "@/components/layout/WashProgress";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "H2AU Lavage — Station de lavage auto à Saint-Maximin (60), ouverte 24h/24",
    description:
      "Station de lavage automobile H2AU à Saint-Maximin (Oise), ouverte 24h/24. Trois programmes : 6 €, 8 € et 12 €. Rouleaux, aspiration, itinéraire et infos pratiques.",
    path: "/",
  }),
  title: { absolute: "H2AU Lavage — Station de lavage auto à Saint-Maximin (60), ouverte 24h/24" },
};

/**
 * Accueil : la voiture « se lave » au fil du scroll.
 * 01 Arrivée → 02 Prélavage → 03 Mousse → 04 Haute pression → 05 Lavage
 * → 06 Rinçage → 07 Finition → 08 Brillance → 09 Reprise de la route.
 */
export default function HomePage() {
  return (
    <>
      <WashProgress />
      <Hero />
      <Intro />
      <Programs />
      <WaterTransition />
      <Equipment />
      <WashSequence />
      <BeforeAfter />
      <HowItWorks />
      <PricesXXL />
      <StationBlock />
      <GallerySection />
      <Open24 />
      <WhyH2AU />
      <ReviewsSection />
      <FinalCta />
      <MapSection />
    </>
  );
}
