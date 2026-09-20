import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { Icon } from "@/components/ui/Icon";
import { programs } from "@/data/programs";

/** 03 — Programmes (fond clair). */
export function Programs() {
  return (
    <section
      id="programmes"
      className="section-light relative scroll-mt-16 pb-24 pt-8 md:pb-32 md:pt-16"
      data-wash-step="03"
      data-wash-label="Mousse"
      aria-labelledby="programmes-title"
    >
      <div className="container-x">
        <SectionHeading
          id="programmes-title"
          title={["Choisissez", "votre lavage."]}
          tone="light"
          intro="Trois programmes. Une seule destination : une voiture propre."
        />
        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3 lg:items-stretch">
          {programs.map((p, i) => (
            <ProgramCard key={p.id} program={p} index={i} />
          ))}
        </div>
        <p className="mt-10 flex justify-end">
          <Link href="/programmes" className="nav-link inline-flex items-center gap-2 font-semibold text-carbon">
            Tout savoir sur les programmes <Icon name="arrow" className="size-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
