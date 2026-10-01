import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Price } from "@/components/ui/Price";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { confirmedEquipment } from "@/data/equipment";
import { photos } from "@/data/media";
import { programs } from "@/data/programs";
import { tokenNotes, tokenPacks } from "@/data/tarifs";
import { station } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tarifs : lavage automatique, jetons, aspirateur et services",
  description:
    "Tous les tarifs de la station H2AU à Saint-Maximin (60) : lavage automatique de 6 € à 22 € (6 programmes), jetons dès 10 €, aspirateur 4 min pour 1 €, borne multi-services. Ouvert 24h/24.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  const extras = confirmedEquipment.filter((e) => e.rates?.length);

  return (
    <>
      <PageHero
        title={["Nos tarifs.", "Sans surprise."]}
        kicker={<>{station.name} · {station.city}</>}
        intro="Lavage automatique, pistes haute pression, aspiration et services : tout se règle sur place, par carte, jetons ou pièces."
        aside={
          <ul className="flex items-end justify-start gap-6 md:justify-end md:gap-10" aria-label="Tarifs du lavage automatique">
            {programs.map((p) => (
              <li key={p.id} data-inview="">
                <a href={`#${p.id}`} className="block" data-cursor={`${p.price} €`}>
                  <Price value={p.price} chrome className="text-[clamp(3.6rem,9vw,7rem)]" />
                </a>
              </li>
            ))}
          </ul>
        }
        washStep={{ n: "03", label: "Mousse" }}
      />

      {/* Lavage automatique */}
      <section className="section-light py-20 md:py-28" aria-labelledby="lavage-auto">
        <div className="container-x">
          <SectionHeading id="lavage-auto" title={["Lavage", "automatique."]} tone="light" intro="Six programmes au portique, du plus simple au plus complet." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <ProgramCard key={p.id} program={p} index={i} context="page" />
            ))}
          </div>
        </div>
      </section>

      {/* Jetons */}
      <section className="bg-carbon py-20 md:py-28" aria-labelledby="jetons">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading id="jetons" title={["Les jetons.", "Plus vous en prenez…"]} intro="Le distributeur de jetons est sur la station, ouvert 24h/24." />
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Offres du distributeur de jetons">
              {tokenPacks.map((t) => (
                <li key={t.price} className="rounded-[var(--radius-medium)] border border-white/12 p-5">
                  <p className="t-price text-4xl">
                    {t.price}
                    <span className="euro">€</span>
                  </p>
                  <p className="mt-2 font-semibold text-h2au-bright">{t.tokens} jetons</p>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-2 text-metal">
              {tokenNotes.map((n) => (
                <li key={n} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-h2au-bright" strokeWidth={2} />
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-medium)] lg:col-span-5">
            <Image src={photos.borne.src} alt={photos.borne.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" placeholder="blur" className="object-cover" style={{ objectPosition: photos.borne.focus }} />
          </div>
        </div>
      </section>

      {/* Services à la carte */}
      <section className="section-white py-20 md:py-28" aria-labelledby="services">
        <div className="container-x">
          <SectionHeading id="services" title={["Services", "à la carte."]} tone="light" intro="En pièces de 1 € et 2 €, ou en jetons." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {extras.map((e) => (
              <article key={e.id} className="rounded-[var(--radius-medium)] border border-carbon/12 p-7">
                <Icon name={e.icon} className="size-7 text-h2au-deep" />
                <h3 className="t-md mt-6">{e.name}</h3>
                <dl className="mt-5 divide-y divide-carbon/10 border-y border-carbon/10">
                  {e.rates!.map((r) => (
                    <div key={r.label} className="flex justify-between gap-4 py-3">
                      <dt className="text-graphite">{r.label}</dt>
                      <dd className="shrink-0 font-bold">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
