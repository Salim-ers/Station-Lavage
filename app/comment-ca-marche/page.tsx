import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { equipment } from "@/data/equipment";
import { faq, FAQ_TODO } from "@/data/faq";
import { programs } from "@/data/programs";
import { station, TODO } from "@/data/station";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Comment ça marche ? Le lavage en 5 étapes",
  description:
    "Choix du programme (6 €, 8 € ou 12 €), lavage, aspiration, départ : le fonctionnement de la station de lavage H2AU à Saint-Maximin, ouverte 24h/24.",
  path: "/comment-ca-marche",
});

export default function CommentCaMarchePage() {
  const rollerTips = equipment.find((e) => e.id === "rouleaux")?.tips ?? [];

  const steps = [
    {
      n: "01",
      title: "Choisir son programme",
      body: (
        <>
          <p>Trois programmes, trois prix.</p>
          <p className="mt-4 flex gap-5 text-3xl font-extrabold text-white" style={{ fontStretch: "118%" }}>
            {programs.map((p) => (
              <span key={p.id}>{p.price}&nbsp;€</span>
            ))}
          </p>
        </>
      ),
    },
    {
      n: "02",
      title: "Payer",
      body: station.paymentMethods.length ? <p>{station.paymentMethods.join(", ")}.</p> : <Placeholder className="text-white/80">{TODO.payment}</Placeholder>,
    },
    {
      n: "03",
      title: "Lancer le lavage",
      body: (
        <>
          <p>Avant d&apos;entrer dans le portique à rouleaux :</p>
          <ul className="mt-4 space-y-2">
            {rollerTips.map((t) => (
              <li key={t} className="flex gap-3">
                <Icon name="check" className="mt-1 size-4 shrink-0 text-h2au-bright" strokeWidth={2} />
                {t}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      n: "04",
      title: "Finir par l'intérieur",
      body: <p>Des aspirateurs sont à disposition pour l&apos;habitacle : tapis, sièges, coffre.</p>,
    },
    { n: "05", title: "Reprendre la route", body: <p>Propre. Et ça se voit.</p> },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq
      .filter((f) => f.answer)
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        title={["Passez.", "Lavez.", "Repartez."]}
        kicker="Comment ça marche ?"
        intro={`Le lavage chez ${station.name}, étape par étape. Ouvert ${station.openingHours}.`}
        washStep={{ n: "07", label: "Finition" }}
      />

      <section className="bg-anthracite py-20 md:py-28" aria-label="Les étapes">
        <div className="container-x">
          <ol className="border-t border-white/10">
            {steps.map((s, i) => (
              <li key={s.n} data-reveal="fade" style={{ ["--d" as string]: `${i * 60}ms` }} className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-12 md:py-14">
                <span className="t-price text-[clamp(3.5rem,8vw,6.5rem)] text-white/15 md:col-span-2">{s.n}</span>
                <h2 className="t-lg md:col-span-4">{s.title}</h2>
                <div className="text-lg leading-relaxed text-metal md:col-span-6">{s.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-light py-20 md:py-28" aria-labelledby="faq-title">
        <div className="container-x">
          <SectionHeading id="faq-title" title={["Questions", "fréquentes."]} tone="light" />
          <div className="mt-12 border-t border-carbon/15">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-carbon/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold md:text-xl [&::-webkit-details-marker]:hidden" style={{ fontStretch: "108%" }}>
                  {f.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-carbon/20 transition-transform duration-300 group-open:rotate-45">
                    <span aria-hidden="true" className="text-xl leading-none">+</span>
                  </span>
                </summary>
                <div className="max-w-3xl pb-7 text-graphite">{f.answer ?? <Placeholder>{FAQ_TODO}</Placeholder>}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
