import Link from "next/link";
import { FoamEdge } from "@/components/visuals/FoamEdge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { Icon } from "@/components/ui/Icon";
import { programs } from "@/data/programs";

/** 02 — Programmes (fond clair), juste après le Hero. */
export function Programs() {
  return (
    <section
      id="programmes"
      className="section-light relative z-10 scroll-mt-16 pb-24 pt-16 md:pb-32 md:pt-24"
      data-wash-step="02"
      data-wash-label="Prélavage"
      aria-labelledby="programmes-title"
    >
      <FoamEdge />
      <div className="container-x">
        <SectionHeading
          id="programmes-title"
          title={["Choisissez", "votre lavage."]}
          tone="light"
          intro="Six programmes au portique, de 6 € à 22 €. Pistes haute pression et aspiration sur place, 24h/24."
        />
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {programs.map((p, i) => (
            <ProgramCard key={p.id} program={p} index={i} />
          ))}
        </div>
        <p className="mt-10 flex justify-end">
          <Link href="/programmes" className="nav-link inline-flex items-center gap-2 font-semibold text-carbon">
            Tous les tarifs <Icon name="arrow" className="size-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
