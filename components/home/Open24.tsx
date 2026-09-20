import { RevealLines } from "@/components/ui/Reveal";
import { DayRing } from "@/components/sections/DayRing";
import { station } from "@/data/station";

/** Section 24h/24 (fond clair). */
export function Open24() {
  return (
    <section className="section-light relative overflow-hidden py-24 md:py-36" aria-labelledby="h24-title">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealLines id="h24-title" lines={["Quand", "vous voulez."]} className="t-xl" />
            <p data-reveal="fade" className="t-lead mt-8 text-graphite" style={{ ["--d" as string]: "200ms" }}>
              Votre station {station.name} à {station.city}. Jour, nuit, week-end : elle est ouverte.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <DayRing className="max-w-[340px] lg:max-w-[380px]" />
          </div>
        </div>
        <p
          data-reveal="clip"
          aria-hidden="true"
          className="mt-14 whitespace-nowrap text-[clamp(5rem,23vw,24rem)] font-[860] uppercase leading-[.78] tracking-[-0.05em] md:mt-20 md:text-[clamp(5rem,20.5vw,24rem)] md:[font-stretch:122%]"
        >
          24<span className="text-h2au-deep">H</span>/24
        </p>
      </div>
    </section>
  );
}
