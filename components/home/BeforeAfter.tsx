import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";

/** 06 — Avant / Après (fond clair). */
export function BeforeAfter() {
  return (
    <section className="section-light py-24 md:py-36" data-wash-step="06" data-wash-label="Rinçage" aria-labelledby="ba-title">
      <div className="container-x">
        <SectionHeading
          id="ba-title"
          title={["Avant.", "Après."]}
          tone="light"
          intro="Faites glisser la poignée pour voir la différence."
        />
        <div data-reveal="fade" className="mt-12 md:mt-16">
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
  );
}
