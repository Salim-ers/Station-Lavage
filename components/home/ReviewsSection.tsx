import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reviews } from "@/components/sections/Reviews";

export function ReviewsSection() {
  return (
    <section className="section-light py-24 md:py-36" aria-labelledby="avis-title">
      <div className="container-x">
        <SectionHeading id="avis-title" title={["Ils sont passés", "chez H2AU."]} tone="light" />
        <div className="mt-14 md:mt-20">
          <Reviews />
        </div>
      </div>
    </section>
  );
}
