import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealLines } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { VacuumVisual } from "@/components/sections/EquipmentVisuals";
import { confirmedEquipment } from "@/data/equipment";
import { cn } from "@/lib/utils";

/** 04 — Équipements confirmés uniquement (rouleaux, aspiration). */
export function Equipment() {
  return (
    <section
      className="relative bg-carbon pb-24 pt-4 md:pb-36"
      data-wash-step="04"
      data-wash-label="Haute pression"
      aria-labelledby="equipements-title"
    >
      <div className="container-x">
        <SectionHeading
          id="equipements-title"
          title={["Tout ce qu'il faut.", "Pour le résultat."]}
          intro="Les équipements de la station, pensés pour laver vite et bien."
        />

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-12">
          {confirmedEquipment.map((eq, i) => {
            const wide = i === 0;
            return (
              <div key={eq.id} data-reveal="fade" style={{ ["--d" as string]: `${i * 150}ms` }} className={wide ? "lg:col-span-7" : "lg:col-span-5"}>
                <Link
                  href={`/equipements#${eq.id}`}
                  data-cursor="Voir"
                  className={cn(
                    "lift group zoom-img relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-[var(--radius-medium)] border border-white/10 bg-ink p-7 md:min-h-[600px] md:p-10",
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
                      {/* impression de rotation lente des brosses */}
                      <span aria-hidden="true" className="brush-motion absolute inset-y-0 left-[6%] w-[64%] opacity-60 mix-blend-overlay" />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/55 to-carbon/5" />
                    </>
                  ) : (
                    <VacuumVisual className="absolute inset-0" />
                  )}

                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-full border border-white/20 bg-carbon/60 text-h2au-bright backdrop-blur">
                      <Icon name={eq.icon} className="size-6" />
                    </span>
                    <RevealLines as="h3" lines={eq.headline} className="t-lg mt-6" />
                    <p className="mt-4 max-w-md text-white/75">{eq.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.12em] text-h2au-bright">
                      En savoir plus <Icon name="arrow" className="btn-icon size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center md:justify-end">
          <ButtonLink href="/equipements" variant="secondary">
            Nos équipements
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
