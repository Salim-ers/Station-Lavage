import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { StationInfo } from "@/components/sections/StationInfo";
import { StationMap } from "@/components/sections/StationMap";
import { DayRing } from "@/components/sections/DayRing";
import { Gallery } from "@/components/sections/Gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealLines, JetRule } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { confirmedEquipment } from "@/data/equipment";
import { gallery, photos } from "@/data/media";
import { programs } from "@/data/programs";
import { station } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "La station de lavage à Saint-Maximin (Centre commercial Cora)",
  description:
    "Station de lavage H2AU à Saint-Maximin (60740), Centre commercial Cora, à côté de la station carburants. Ouverte 24h/24. Adresse, itinéraire, photos, équipements.",
  path: "/station",
});

export default function StationPage() {
  return (
    <>
      <PageHero
        title={["H2AU.", "Saint-Maximin."]}
        kicker={
          <>
            <span className="gps" aria-hidden="true">
              <i />
            </span>
            Ouvert maintenant · {station.openingHours}
          </>
        }
        intro={`Votre station de lavage automobile dans l'Oise. ${station.address.complement}.`}
        photo={photos.heroStation}
        washStep={{ n: "08", label: "Brillance" }}
      />

      {/* Localisation */}
      <section className="bg-carbon py-20 md:py-28" aria-labelledby="localisation">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="t-label text-metal">Localisation</p>
            <RevealLines id="localisation" lines={["Facile", "à trouver."]} className="t-lg mt-4" />
            <JetRule className="mt-6 w-24" delay={250} />
            <StationInfo tone="dark" className="mt-10" />
          </div>
          <div className="lg:col-span-7">
            <StationMap />
          </div>
        </div>
      </section>

      {/* Horaires */}
      <section className="section-light py-20 md:py-28" aria-labelledby="horaires">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-label text-graphite">Horaires</p>
            <RevealLines id="horaires" lines={["Ouvert", "24h/24."]} className="t-xl mt-4" />
            <p className="t-lead mt-8 text-graphite">Tôt le matin, tard le soir, le dimanche : venez quand c&apos;est le bon moment pour vous.</p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <DayRing className="max-w-[340px]" />
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-carbon py-20 md:py-28" aria-labelledby="photos">
        <div className="container-x">
          <SectionHeading id="photos" title={["La station", "en images."]} />
          <div className="mt-12 md:mt-16">
            <Gallery items={gallery} />
          </div>
        </div>
      </section>

      {/* Équipements + fonctionnement */}
      <section className="bg-anthracite py-20 md:py-28" aria-labelledby="sur-place">
        <div className="container-x">
          <SectionHeading id="sur-place" title={["Sur place."]} intro="Les équipements et le fonctionnement de la station." />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {confirmedEquipment.map((e) => (
              <li key={e.id}>
                <Link href={`/equipements#${e.id}`} className="lift group flex h-full flex-col rounded-[var(--radius-medium)] border border-white/12 p-7 hover:border-white/30" data-cursor="Voir">
                  <Icon name={e.icon} className="size-7 text-h2au-bright" />
                  <span className="t-md mt-10">{e.name}</span>
                  <span className="mt-2 text-metal">{e.description}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/programmes" className="lift flex h-full flex-col rounded-[var(--radius-medium)] bg-carbon p-7" data-cursor="6 · 8 · 12 €">
                <Icon name="drop" className="size-7 text-h2au-bright" />
                <span className="t-md mt-10">Programmes</span>
                <span className="mt-2 text-2xl font-extrabold" style={{ fontStretch: "118%" }}>
                  {programs.map((p) => `${p.price} €`).join(" · ")}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/comment-ca-marche" className="lift flex h-full flex-col rounded-[var(--radius-medium)] bg-h2au p-7 text-carbon">
                <Icon name="route" className="size-7" />
                <span className="t-md mt-10">Comment ça marche ?</span>
                <span className="mt-2 font-medium">Le lavage en 5 étapes.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand title={["On vous attend", "à Saint-Maximin."]} />
    </>
  );
}
