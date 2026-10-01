import Link from "next/link";
import { FoamEdge } from "@/components/visuals/FoamEdge";
import { RevealLines, JetRule } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { programs } from "@/data/programs";
import { station } from "@/data/station";

/** 02 — Introduction (fond clair) + les prix des programmes qui apparaissent. */
export function Intro() {
  return (
    <section
      className="section-light relative z-10 pb-20 pt-16 md:pb-28 md:pt-24"
      data-wash-step="02"
      data-wash-label="Prélavage"
      aria-labelledby="intro-title"
    >
      <FoamEdge />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <RevealLines
              id="intro-title"
              lines={["Votre voiture", "mérite plus", "qu'un simple", "coup d'eau."]}
              className="t-xl"
            />
          </div>
          <div className="lg:col-span-3 lg:self-end">
            <p data-reveal="fade" className="t-body text-graphite" style={{ ["--d" as string]: "250ms" }}>
              Retrouvez {station.name} à {station.city} et choisissez le programme adapté à votre véhicule.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-3 gap-x-4 gap-y-10 md:mt-24 md:grid-cols-6 md:gap-x-6" aria-label="Tarifs des programmes">
          {programs.map((p, i) => (
            <li
              key={p.id}
              data-reveal="fade"
              style={{ ["--d" as string]: `${i * 100}ms` }}
              className="border-t border-carbon/15 pt-6 md:pt-8"
            >
              <Link
                href={`/programmes#${p.id}`}
                className="group block"
                data-cursor={`${p.price} €`}
                aria-label={`${p.name} : voir le détail`}
              >
                <span className="t-label text-graphite">N°{p.number}</span>
                <span className="t-price mt-3 block text-[clamp(2.6rem,12vw,5rem)] text-carbon transition-colors duration-500 group-hover:text-h2au-deep md:text-[clamp(2.6rem,5.6vw,5.5rem)]">
                  <CountUp value={p.price} />
                  <span className="euro">€</span>
                </span>
                <JetRule className="mt-5 w-2/3" delay={300 + i * 140} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
