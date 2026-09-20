"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

/**
 * Transition clair → anthracite → noir : une ligne d'eau traverse l'écran
 * pendant que les mots de la marque glissent en sens opposés.
 */
export function WaterTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["4%", "-38%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-40%", "2%"]);
  const jet = useTransform(scrollYProgress, [0.2, 0.62], [0, 1]);
  const jetGlow = useTransform(scrollYProgress, [0.2, 0.5, 0.75], [0, 1, 0.4]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[70vh] min-h-[420px] overflow-hidden md:h-[88vh]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-offwhite) 0%, #d9dedd 14%, #6f7777 34%, var(--color-anthracite) 56%, var(--color-carbon) 82%)",
      }}
    >
      <div className="absolute inset-x-0 top-[26%] select-none whitespace-nowrap">
        <m.p style={{ x: x1 }} className="t-mega text-outline !text-[clamp(4rem,15vw,15rem)] !leading-[.9] [-webkit-text-stroke-color:rgb(7_9_9/.14)]">
          Eau · Mousse · Pression · Brillance · Eau · Mousse
        </m.p>
        <m.p style={{ x: x2 }} className="t-mega text-outline mt-2 !text-[clamp(4rem,15vw,15rem)] !leading-[.9] [-webkit-text-stroke-color:rgb(255_255_255/.14)]">
          H2AU · Saint-Maximin · 24h/24 · H2AU · Saint-Maximin
        </m.p>
      </div>

      <div className="absolute inset-x-0 top-[62%]">
        <m.div style={{ scaleX: jet, opacity: jetGlow }} className="jet-line h-[2px] origin-left" />
        <m.div
          style={{ scaleX: jet, opacity: jetGlow }}
          className="absolute -top-10 left-0 h-20 w-full origin-left bg-[radial-gradient(60%_50%_at_100%_50%,rgb(43_227_140/.2),transparent)]"
        />
      </div>
    </div>
  );
}
