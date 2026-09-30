"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

const WORDS = ["Eau", "Mousse", "Pression", "Brillance"];
const PLACES = ["H2AU Lavage", "Saint-Maximin", "Ouvert 24h/24"];

/** Une ligne continue (jamais de retour à la ligne), répétée pour couvrir l'écran. */
function Line({ items, repeat = 4 }: { items: string[]; repeat?: number }) {
  return (
    <span className="flex w-max items-center">
      {Array.from({ length: repeat }, () => items)
        .flat()
        .map((w, i) => (
          <span key={i} className="flex shrink-0 items-center">
            {w}
            <span className="mx-[.6em] size-[.16em] shrink-0 rounded-full bg-h2au-bright" />
          </span>
        ))}
    </span>
  );
}

/**
 * Bandeau de transition entre les programmes (clair) et les équipements (sombre) :
 * deux lignes discrètes qui glissent en sens opposés, séparées par un filet d'eau.
 */
export function WaterTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const jet = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative select-none overflow-hidden border-y border-white/10 bg-carbon py-14 md:py-20"
    >
      <m.div
        style={{ x: x1 }}
        className="whitespace-nowrap text-[clamp(1.6rem,4vw,3.4rem)] font-[820] uppercase leading-none tracking-[-0.02em] text-white/85 [font-stretch:118%]"
      >
        <Line items={WORDS} />
      </m.div>

      <div className="my-6 md:my-8">
        <m.div style={{ scaleX: jet }} className="jet-line mx-auto h-px w-full max-w-[1440px] origin-left opacity-70" />
      </div>

      <m.div
        style={{ x: x2 }}
        className="whitespace-nowrap text-[clamp(1.1rem,2.2vw,1.9rem)] font-semibold uppercase leading-none tracking-[.18em] text-metal"
      >
        <Line items={PLACES} repeat={5} />
      </m.div>
    </div>
  );
}
