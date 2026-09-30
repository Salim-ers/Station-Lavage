"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

const WORDS = ["Eau", "Mousse", "Pression", "Brillance"];
const PLACES = ["H2AU", "Saint-Maximin", "24h/24"];

function Line({ items, repeat = 4 }: { items: string[]; repeat?: number }) {
  return (
    <>
      {Array.from({ length: repeat }, () => items)
        .flat()
        .map((w, i) => (
          <span key={i} className="inline-flex items-center">
            {w}
            <span className="mx-[.35em] inline-block size-[.14em] rounded-full bg-h2au-bright shadow-[0_0_12px_var(--color-h2au-bright)]" />
          </span>
        ))}
    </>
  );
}

/**
 * Transition entre les programmes (clair) et les équipements (sombre) :
 * deux bandeaux de texte glissent en sens opposés sur fond carbone,
 * traversés par une ligne d'eau.
 */
export function WaterTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-8%", "-38%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-38%", "-8%"]);
  const jet = useTransform(scrollYProgress, [0.2, 0.62], [0, 1]);
  const jetGlow = useTransform(scrollYProgress, [0.2, 0.5, 0.75], [0, 1, 0.4]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex min-h-[340px] select-none flex-col justify-center gap-3 overflow-hidden bg-carbon py-20 md:min-h-[520px] md:gap-5"
    >
      <div aria-hidden="true" className="green-glow absolute left-1/2 top-1/2 -z-0 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-40" />

      <m.p style={{ x: x1 }} className="t-mega relative whitespace-nowrap !text-[clamp(3rem,10vw,9rem)] !leading-[.95] text-white">
        <Line items={WORDS} />
      </m.p>

      <div className="relative">
        <m.div style={{ scaleX: jet, opacity: jetGlow }} className="jet-line h-[2px] origin-left" />
      </div>

      <m.p
        style={{ x: x2 }}
        className="t-mega text-outline relative whitespace-nowrap !text-[clamp(3rem,10vw,9rem)] !leading-[.95] [-webkit-text-stroke-color:var(--color-h2au-bright)]"
      >
        <Line items={PLACES} />
      </m.p>
    </div>
  );
}
