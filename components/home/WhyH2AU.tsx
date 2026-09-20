import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JetRule } from "@/components/ui/Reveal";
import { photos } from "@/data/media";
import { programs } from "@/data/programs";
import { station } from "@/data/station";

/** Pourquoi H2AU : quatre cartes, quatre traitements différents. */
export function WhyH2AU() {
  return (
    <section className="bg-anthracite py-24 md:py-36" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading id="why-title" title={["Pourquoi", "H2AU ?"]} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:items-start">
          {/* 1 — chiffre chromé */}
          <li data-reveal="fade" data-inview="" className="rounded-[var(--radius-medium)] bg-carbon p-8 lg:min-h-[420px]">
            <p className="t-price chrome-text text-[7.5rem]">24</p>
            <h3 className="t-md mt-8">24H/24</h3>
            <p className="mt-3 text-metal">Une station accessible à toute heure.</p>
          </li>
          {/* 2 — bordure fine, prix */}
          <li data-reveal="fade" style={{ ["--d" as string]: "100ms" }} className="rounded-[var(--radius-medium)] border border-white/15 p-8 lg:mt-16 lg:min-h-[420px]">
            <p className="text-[2.1rem] font-[820] leading-none" style={{ fontStretch: "118%" }}>
              {programs.map((p, i) => (
                <span key={p.id} className="block">
                  {p.price}&nbsp;€{i < programs.length - 1 && <span className="sr-only">,</span>}
                </span>
              ))}
            </p>
            <h3 className="t-md mt-8">3 programmes</h3>
            <p className="mt-3 text-metal">{programs.map((p) => `${p.price} €`).join(", ").replace(/, ([^,]*)$/, " ou $1")}.</p>
          </li>
          {/* 3 — photo */}
          <li data-reveal="fade" style={{ ["--d" as string]: "200ms" }} className="zoom-img relative min-h-[420px] overflow-hidden rounded-[var(--radius-medium)]">
            <Image src={photos.heroStation.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" placeholder="blur" className="object-cover" style={{ objectPosition: "88% 45%" }} />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="t-md">{station.city}</h3>
              <p className="mt-3 text-white/80">Votre station de lavage automobile locale.</p>
            </div>
          </li>
          {/* 4 — transparente, jet */}
          <li data-reveal="fade" style={{ ["--d" as string]: "300ms" }} className="p-8 lg:mt-16">
            <JetRule className="w-full" delay={400} />
            <h3 className="t-md mt-10">Simple</h3>
            <p className="mt-3 text-metal">Choisissez votre programme et prenez soin de votre voiture.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
