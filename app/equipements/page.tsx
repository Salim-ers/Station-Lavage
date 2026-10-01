import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { VacuumVisual } from "@/components/sections/EquipmentVisuals";
import { RevealLines, JetRule } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { confirmedEquipment } from "@/data/equipment";
import { photos } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Équipements : lavage automatique, haute pression, aspiration, multi-services",
  description:
    "Les équipements de la station H2AU à Saint-Maximin : portique de lavage automatique, pistes haute pression, aspirateurs et borne multi-services (parfums, brillant pneus, lave-glace). Tarifs et conseils.",
  path: "/equipements",
});

export default function EquipementsPage() {
  return (
    <>
      <PageHero
        title={["Les outils.", "Pour le résultat."]}
        kicker="Nos équipements"
        intro="Ce que vous trouverez à la station H2AU Lavage de Saint-Maximin, et comment en tirer le meilleur."
        photo={photos.pistes}
        washStep={{ n: "04", label: "Haute pression" }}
      />

      {confirmedEquipment.map((eq, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={eq.id}
            id={eq.id}
            className={cn("scroll-mt-16 py-20 md:py-32", i % 2 === 0 ? "bg-carbon" : "bg-anthracite")}
            aria-labelledby={`${eq.id}-title`}
          >
            <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div
                data-reveal="clip"
                className={cn(
                  "zoom-img relative aspect-[4/5] overflow-hidden rounded-[var(--radius-medium)] border border-white/10 bg-ink sm:aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[640px]",
                  flip && "lg:order-2",
                )}
              >
                {eq.photo ? (
                  <>
                    <Image
                      src={eq.photo.src}
                      alt={eq.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      placeholder="blur"
                      className="object-cover"
                      style={{ objectPosition: eq.photo.focus }}
                    />
                    {eq.icon === "rollers" && (
                      <span aria-hidden="true" className="brush-motion absolute inset-y-0 left-[6%] w-[64%] opacity-50 mix-blend-overlay" />
                    )}
                  </>
                ) : (
                  <VacuumVisual className="absolute inset-0" />
                )}
              </div>

              <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
                <span className="grid size-14 place-items-center rounded-full border border-white/15 text-h2au-bright">
                  <Icon name={eq.icon} className="size-7" />
                </span>
                <RevealLines as="h2" id={`${eq.id}-title`} lines={eq.headline} className="t-lg mt-8" />
                <JetRule className="mt-6 w-24" delay={250} />
                <p className="t-lead mt-8 text-white/80">{eq.description}</p>

                {eq.rates && eq.rates.length > 0 && (
                  <div className="mt-10">
                    <h3 className="t-label text-metal">Tarifs affichés sur la borne</h3>
                    <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
                      {eq.rates.map((r) => (
                        <div key={r.label} className="flex justify-between gap-4 py-3">
                          <dt className="text-white/75">{r.label}</dt>
                          <dd className="shrink-0 font-bold text-h2au-bright">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {eq.tips.length > 0 && (
                  <div className="mt-10">
                    <h3 className="t-label text-metal">Conseils d&apos;utilisation</h3>
                    <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                      {eq.tips.map((t, k) => (
                        <li key={k} className="flex gap-4 py-4">
                          <span className="t-label pt-0.5 tabular-nums text-h2au-bright">{String(k + 1).padStart(2, "0")}</span>
                          <span className="text-white/85">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-light py-16 md:py-20">
        <div className="container-x flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="t-md max-w-2xl">Une question sur un équipement ? Appelez la station ou écrivez-nous.</p>
          <Link href="/contact" className="nav-link inline-flex items-center gap-2 font-semibold">
            Nous contacter <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
