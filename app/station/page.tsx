import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StationInfo } from "@/components/sections/StationInfo";
import { StationMap } from "@/components/sections/StationMap";
import { Gallery } from "@/components/sections/Gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery, photos } from "@/data/media";
import { station } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "La station de lavage à Saint-Maximin (Centre commercial Cora)",
  description:
    "Station de lavage H2AU à Saint-Maximin (60740), Centre commercial Cora, à côté de la station carburants. Ouverte 24h/24. Adresse, itinéraire et photos.",
  path: "/station",
});

/**
 * La station : uniquement ce qu'on ne trouve pas ailleurs (accès et photos).
 * Programmes, équipements et fonctionnement ont leurs propres pages.
 */
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
        intro={`${station.address.complement}.`}
        photo={photos.stationEnsemble}
        washStep={{ n: "08", label: "Brillance" }}
      />

      {/* Accès */}
      <section className="bg-carbon py-16 md:py-24" aria-label="Adresse et itinéraire">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center lg:gap-12">
          <div className="md:col-span-5">
            <StationInfo tone="dark" />
          </div>
          <div className="md:col-span-7">
            <StationMap />
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="border-t border-white/10 bg-carbon py-16 md:py-24" aria-labelledby="photos">
        <div className="container-x">
          <SectionHeading id="photos" title={["La station", "en images."]} />
          <div className="mt-10 md:mt-14">
            <Gallery items={gallery} />
          </div>
        </div>
      </section>
    </>
  );
}
