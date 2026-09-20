"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { m, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CarSilhouette } from "@/components/visuals/CarSilhouette";
import { cn } from "@/lib/utils";

export type TimelineStep = { title: string; text?: ReactNode };

/**
 * Parcours en 5 étapes. Desktop : ligne horizontale, section collante, la
 * voiture avance sur la ligne. Mobile : ligne verticale qui se remplit.
 * Les étapes s'allument au passage ; la ligne passe du gris au vert.
 */
export function WashTimeline({ steps, header }: { steps: TimelineStep[]; header?: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress: pDesk } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const { scrollYProgress: pMob } = useScroll({ target: list, offset: ["start 70%", "end 55%"] });
  const p = desktop ? pDesk : pMob;

  useMotionValueEvent(pDesk, "change", (v) => desktop && setLit(Math.floor(v * steps.length * 1.02 - 0.15)));
  useMotionValueEvent(pMob, "change", (v) => !desktop && setLit(Math.floor(v * steps.length * 1.02 - 0.1)));

  const fill = useTransform(p, [0, 1], [0, 1]);
  const carLeft = useTransform(pDesk, [0, 1], ["0%", "100%"]);
  const carTop = useTransform(pMob, [0, 1], ["0%", "100%"]);
  const on = (i: number) => reduce || i <= lit;

  return (
    <div ref={outer} className="relative lg:h-[230vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pt-16">
        {header}
        <ol ref={list} className="relative mt-16 grid gap-10 pl-14 lg:mt-10 lg:grid-cols-5 lg:gap-6 lg:pl-0 lg:pt-28">
          {/* ligne */}
          <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-white/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5.5rem] lg:h-px lg:w-auto">
            <m.span
              style={desktop ? { scaleX: reduce ? 1 : fill } : { scaleY: reduce ? 1 : fill }}
              className="jet-line absolute inset-0 !h-auto origin-top lg:origin-left"
            />
          </span>

          {/* la voiture */}
          {!reduce && (
            <>
              <m.span
                aria-hidden="true"
                style={{ left: carLeft }}
                className="absolute top-[3rem] hidden w-[170px] -translate-x-1/2 lg:block"
              >
                <span className="block -scale-x-100">
                  <CarSilhouette shadow={false} shine={1} />
                </span>
              </m.span>
              <m.span
                aria-hidden="true"
                style={{ top: carTop }}
                className="absolute left-[19px] w-[64px] -translate-x-1/2 -translate-y-1/2 lg:hidden"
              >
                <span className="block -rotate-90">
                  <CarSilhouette shadow={false} shine={1} />
                </span>
              </m.span>
            </>
          )}

          {steps.map((s, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-14 top-0 grid size-10 place-items-center rounded-full border text-[.8rem] font-bold tabular-nums transition-all duration-500 lg:static lg:mb-10",
                  on(i)
                    ? "border-h2au-bright bg-carbon text-h2au-bright shadow-[0_0_18px_rgb(43_227_140/.45)]"
                    : "border-white/20 bg-carbon text-metal",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={cn("transition-opacity duration-500", on(i) ? "opacity-100" : "opacity-40")}>
                <h3 className="t-md">{s.title}</h3>
                {s.text && <div className="mt-3 text-[.95rem] leading-relaxed text-metal">{s.text}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
