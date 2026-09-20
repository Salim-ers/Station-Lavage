import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { StationInfo } from "@/components/sections/StationInfo";
import { StationMap } from "@/components/sections/StationMap";
import { Wordmark } from "@/components/brand/Wordmark";
import { station } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact et itinéraire",
  description: `Contacter la station de lavage H2AU à Saint-Maximin (60) : téléphone ${station.phone.display}, formulaire, adresse et itinéraire. Ouvert 24h/24.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero title={["Besoin", "d'une info ?"]} kicker="Contact" intro={`Retrouvez ${station.name} à ${station.city}. Appelez, écrivez-nous ou passez directement.`} />

      <section className="section-light py-16 md:py-24" aria-label="Nous contacter">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="rounded-[var(--radius-medium)] bg-carbon p-7 text-white md:p-9 lg:sticky lg:top-24">
              <Wordmark className="text-4xl" />
              <p className="t-label mt-2 text-metal">Lavage · {station.city}</p>
              <StationInfo tone="dark" className="mt-8" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="t-lg">Écrivez-nous.</h2>
            <p className="mt-4 text-graphite">Une question sur la station, les programmes ou les équipements ? Nous vous répondons.</p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-carbon py-16 md:py-24" aria-label="Carte">
        <div className="container-x">
          <StationMap wide />
        </div>
      </section>
    </>
  );
}
