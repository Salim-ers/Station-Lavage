import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Reveal";
import { Price } from "@/components/ui/Price";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { PROGRAM_PLACEHOLDERS, programs } from "@/data/programs";
import { links, station, TODO } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Programmes de lavage à 6 €, 8 € et 12 €",
  description:
    "Les trois programmes de lavage de la station H2AU à Saint-Maximin (60) : 6 €, 8 € et 12 €. Station ouverte 24h/24, venez choisir le vôtre sur place.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  const rows: { label: string; value: (p: (typeof programs)[number]) => React.ReactNode }[] = [
    { label: "Prix", value: (p) => <span className="text-xl font-extrabold">{p.price} €</span> },
    { label: "Prestations", value: (p) => (p.description ? p.description : <Placeholder>{PROGRAM_PLACEHOLDERS.details}</Placeholder>) },
    {
      label: "Options incluses",
      value: (p) => (p.features.length ? p.features.join(", ") : <Placeholder>{PROGRAM_PLACEHOLDERS.option}</Placeholder>),
    },
    { label: "Durée", value: (p) => p.duration ?? <Placeholder>{TODO.info}</Placeholder> },
  ];

  return (
    <>
      <PageHero
        title={["Un programme.", "Selon vos besoins."]}
        kicker={<>{station.name} · {station.city}</>}
        intro="Trois programmes de lavage, trois prix clairs. Vous choisissez à la station, à l'heure qui vous arrange."
        aside={
          <ul className="flex items-end justify-start gap-6 md:justify-end md:gap-10" aria-label="Tarifs">
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

      <section className="section-light py-20 md:py-28" aria-labelledby="liste-programmes">
        <div className="container-x">
          <h2 id="liste-programmes" className="sr-only">
            Les programmes
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {programs.map((p, i) => (
              <ProgramCard key={p.id} program={p} index={i} context="page" />
            ))}
          </div>
          <p className="mt-6 text-sm text-graphite">Le programme se choisit sur place, à la station.</p>
        </div>
      </section>

      <section className="section-white py-20 md:py-28" aria-labelledby="comparer">
        <div className="container-x">
          <SectionHeading id="comparer" title={["Comparer", "les programmes."]} tone="light" />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Comparatif des programmes de lavage H2AU</caption>
              <thead>
                <tr className="border-b-2 border-carbon">
                  <th scope="col" className="w-1/4 py-4 pr-4 font-normal">
                    <span className="t-label text-graphite">Programme</span>
                  </th>
                  {programs.map((p) => (
                    <th key={p.id} scope="col" className="py-4 pr-4 text-lg font-extrabold" style={{ fontStretch: "112%" }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-carbon/12 align-top">
                    <th scope="row" className="py-5 pr-4 font-semibold text-graphite">
                      {r.label}
                    </th>
                    {programs.map((p) => (
                      <td key={p.id} className="py-5 pr-4">
                        {r.value(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 grid gap-6 rounded-[var(--radius-medium)] border border-carbon/12 p-7 md:grid-cols-12 md:items-center md:p-9">
            <div className="md:col-span-8">
              <h3 className="t-md">Paiement</h3>
              <p className="mt-3 text-graphite">
                {station.paymentMethods.length ? station.paymentMethods.join(", ") : <Placeholder>{TODO.payment}</Placeholder>}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <ButtonLink href={links.directions} leadingIcon="pin" icon={null}>
                Itinéraire
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
