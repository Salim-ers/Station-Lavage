"use client";

import { useRef, useState, type CSSProperties } from "react";
import { m, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CarSilhouette } from "@/components/visuals/CarSilhouette";
import { programs } from "@/data/programs";
import { cn } from "@/lib/utils";

/**
 * 05 — « DE SALE À IMPECCABLE »
 * Section collante : la voiture (illustration, présentée comme telle) passe de
 * sale à brillante pendant le scroll. Les étapes s'allument une à une.
 * Mouvement réduit : pas de section collante, voiture propre, étapes listées.
 */

const STEPS = [
  { name: "Arrivée", text: "Elle arrive telle qu'elle a roulé." },
  { name: "Programme", text: `${programs.map((p) => `${p.price} €`).join(", ").replace(/, ([^,]*)$/, " ou $1")} : vous choisissez.` },
  { name: "Lavage", text: "La saleté se décolle, la carrosserie respire." },
  { name: "Rinçage", text: "Tout ce qui restait s'en va." },
  { name: "Brillance", text: "Elle repart. Et ça se voit." },
];

const SPOTS = [
  { label: "Carrosserie", x: "54%", y: "22%" },
  { label: "Vitres", x: "63%", y: "8%" },
  { label: "Jantes", x: "22%", y: "84%" },
  { label: "Habitacle", x: "41%", y: "36%" },
];

const STREAKS = Array.from({ length: 14 }, (_, i) => ({
  left: `${6 + i * 6.6}%`,
  dur: `${0.8 + ((i * 37) % 7) / 10}s`,
  delay: `${((i * 53) % 10) / 10}s`,
}));

export function WashSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length * 0.999)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const dirt = useTransform(p, [0, 0.36, 0.6], [1, 1, 0]);
  const foam = useTransform(p, [0.3, 0.44, 0.6, 0.72], [0, 0.95, 0.95, 0]);
  const shine = useTransform(p, [0.62, 0.92], [0, 1]);
  const rinse = useTransform(p, [0.52, 0.6, 0.76, 0.84], [0, 1, 1, 0]);
  const sweep = useTransform(p, [0.84, 1], [0, 1]);
  const glow = useTransform(p, [0.6, 1], [0.15, 1]);
  const carX = useTransform(p, [0, 0.2, 0.85, 1], ["9%", "0%", "0%", "-5%"]);
  const bar = useTransform(p, [0, 1], [0, 1]);

  if (reduce) {
    return (
      <section className="bg-carbon py-24" data-wash-step="05" data-wash-label="Lavage" aria-labelledby="sequence-title">
        <div className="container-x">
          <h2 id="sequence-title" className="t-xl">De sale à impeccable.</h2>
          <CarSilhouette className="mt-12" title="Illustration d'une voiture propre" />
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.name}>
                <span className="t-label text-h2au-bright">{String(i + 1).padStart(2, "0")}</span>
                <p className="t-md mt-2">{s.name}</p>
                <p className="mt-2 text-metal">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[300vh] bg-carbon md:h-[340vh]"
      data-wash-step="05"
      data-wash-label="Lavage"
      aria-labelledby="sequence-title"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-20 md:pt-24">
        {/* éclairage qui monte avec la brillance */}
        <m.div
          aria-hidden="true"
          style={{ opacity: glow }}
          className="absolute left-1/2 top-[55%] -z-0 h-[70vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(43_227_140/.16),rgb(255_255_255/.04)_55%,transparent)]"
        />
        {/* sol mouillé */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent via-white/[.015] to-white/[.04]" />

        <div className="container-x relative flex h-full flex-col">
          <div className="flex items-end justify-between gap-6">
            <h2 id="sequence-title" className="t-xl">
              De sale
              <br />à <span className="text-h2au-bright">impeccable.</span>
            </h2>
            <p className="t-label hidden text-right text-metal md:block">
              Illustration
              <br />
              démonstration visuelle
            </p>
          </div>

          {/* la voiture */}
          <div className="relative flex flex-1 items-center">
            <m.div style={{ x: carX }} className="relative mx-auto w-full max-w-[1100px]">
              <CarSilhouette dirt={dirt} foam={foam} shine={shine} sweepProgress={sweep} />
              {/* ruissellement pendant le rinçage */}
              <m.div aria-hidden="true" style={{ opacity: rinse }} className="pointer-events-none absolute inset-x-[6%] -top-[8%] bottom-[18%] overflow-hidden">
                {STREAKS.map((s, i) => (
                  <span key={i} className="streak" style={{ left: s.left, "--dur": s.dur, "--delay": s.delay } as CSSProperties} />
                ))}
              </m.div>
              {/* repères */}
              <ul aria-hidden="true" className="hidden md:block">
                {SPOTS.map((s) => (
                  <li
                    key={s.label}
                    className="absolute flex items-center gap-2 text-[.7rem] font-semibold uppercase tracking-[.14em] text-white/60"
                    style={{ left: s.x, top: s.y }}
                  >
                    <span className="size-1.5 rounded-full bg-h2au-bright shadow-[0_0_8px_var(--color-h2au-bright)]" />
                    <span className="h-px w-6 bg-white/30" />
                    {s.label}
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* étapes */}
          <div className="relative pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-12">
            <div className="h-px w-full bg-white/12">
              <m.div style={{ scaleX: bar }} className="jet-line h-[2px] origin-left" />
            </div>
            <ol className="mt-6 grid grid-cols-5 gap-3 md:gap-6">
              {STEPS.map((s, i) => (
                <li
                  key={s.name}
                  aria-current={i === active ? "step" : undefined}
                  className={cn("transition-opacity duration-500", i === active ? "opacity-100" : i < active ? "opacity-45" : "opacity-25")}
                >
                  <span className={cn("t-label tabular-nums", i <= active ? "text-h2au-bright" : "text-metal")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 hidden font-bold uppercase sm:block sm:text-base md:text-lg" style={{ fontStretch: "112%" }}>
                    {s.name}
                  </p>
                  <p className="mt-2 hidden text-sm text-metal md:block">{s.text}</p>
                </li>
              ))}
            </ol>
            {/* mobile : le texte de l'étape en cours */}
            <p className="mt-4 min-h-[3.5rem] text-base text-white/80 sm:hidden">
              <span className="block text-lg font-bold uppercase text-white" style={{ fontStretch: "112%" }}>
                {STEPS[active].name}
              </span>
              {STEPS[active].text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
