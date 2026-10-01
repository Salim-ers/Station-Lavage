import { FoamEdge } from "@/components/visuals/FoamEdge";
import { RevealLines } from "@/components/ui/Reveal";
import { station } from "@/data/station";

/** 02 — Introduction (fond clair). Les prix sont juste en dessous, dans les programmes. */
export function Intro() {
  return (
    <section
      className="section-light relative z-10 pb-6 pt-16 md:pb-10 md:pt-24"
      data-wash-step="02"
      data-wash-label="Prélavage"
      aria-labelledby="intro-title"
    >
      <FoamEdge />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <RevealLines
              id="intro-title"
              lines={["Votre voiture", "mérite plus", "qu'un simple", "coup d'eau."]}
              className="t-xl"
            />
          </div>
          <div className="lg:col-span-3 lg:self-end">
            <p data-reveal="fade" className="t-body text-graphite" style={{ ["--d" as string]: "250ms" }}>
              Lavage automatique, pistes haute pression, aspiration : tout est sur place à {station.city}, 24h/24.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
