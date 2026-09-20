import { RevealLines } from "@/components/ui/Reveal";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { programs } from "@/data/programs";

/** Prix XXL : chiffres chromés, reflet qui traverse à l'apparition. */
export function PricesXXL() {
  return (
    <section className="relative overflow-hidden bg-carbon py-24 md:py-36" aria-labelledby="xxl-title">
      <div aria-hidden="true" className="green-glow absolute -left-1/4 top-1/3 h-[80vmin] w-[80vmin] opacity-60" />
      <div className="container-x relative">
        <RevealLines id="xxl-title" lines={["Lavez.", "Brillez.", "Repartez."]} className="t-xl" />
        <ul
          data-inview=""
          className="mt-14 grid grid-cols-3 items-end border-b border-white/10 pb-2 md:mt-20"
          aria-label="Tarifs"
        >
          {programs.map((p, i) => (
            <li key={p.id} className={i > 0 ? "border-l border-white/10 pl-3 md:pl-8" : ""}>
              <span className="sr-only">{p.name}</span>
              <Price value={p.price} chrome className="text-[clamp(4.4rem,21vw,19rem)] leading-[.8]" />
              <span aria-hidden="true" className="wet-reflection t-price text-[clamp(4.4rem,21vw,19rem)]">
                <span>
                  {p.price}
                  <span className="euro">€</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="t-lead text-metal">Trois programmes. Choisissez sur place.</p>
          <ButtonLink href="/programmes" cursor="6 · 8 · 12 €">
            Voir les programmes
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
