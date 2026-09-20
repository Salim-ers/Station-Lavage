import { ButtonLink } from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import { links, station } from "@/data/station";
import { programs } from "@/data/programs";

/** Bandeau de conversion en bas des pages intérieures. */
export function CtaBand({ title = ["Passez.", "Lavez.", "Repartez."] }: { title?: string[] }) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-anthracite py-20 md:py-28">
      <div aria-hidden="true" className="green-glow absolute -bottom-1/2 left-1/3 h-[70vmin] w-[70vmin]" />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <RevealLines lines={title} className="t-xl" />
        </div>
        <div className="lg:col-span-5">
          <p className="t-label text-metal">
            {station.name} · {station.city} · {station.openingHours}
          </p>
          <p className="mt-3 text-2xl font-extrabold md:text-3xl" style={{ fontStretch: "118%" }}>
            {programs.map((p) => `${p.price} €`).join("  ·  ")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={links.directions} leadingIcon="pin" cursor="→">
              Itinéraire
            </ButtonLink>
            <ButtonLink href={links.tel} variant="secondary" leadingIcon="phone" icon={null} cursor="GO">
              Appeler
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
