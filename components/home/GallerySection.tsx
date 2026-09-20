import { SectionHeading } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/sections/Gallery";
import { gallery } from "@/data/media";

export function GallerySection() {
  return (
    <section className="bg-carbon py-24 md:py-36" aria-labelledby="galerie-title">
      <div className="container-x">
        <SectionHeading id="galerie-title" title={["Votre voiture.", "Notre terrain."]} intro="La station H2AU Lavage, à Saint-Maximin." />
        <div className="mt-14 md:mt-20">
          <Gallery items={gallery} />
        </div>
      </div>
    </section>
  );
}
