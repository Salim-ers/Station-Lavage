"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";

/**
 * Rail « jet » fixe (grands écrans) : la page est le parcours d'une voiture
 * dans la station. La ligne progresse avec le scroll et affiche l'étape en cours.
 * Chaque section du parcours porte data-wash-step et data-wash-label.
 */
export function WashProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [step, setStep] = useState({ n: "01", label: "Arrivée" });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-wash-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setStep({ n: el.dataset.washStep ?? "", label: el.dataset.washLabel ?? "" });
          }
        });
      },
      { rootMargin: "-48% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference 2xl:block">
      <div className="relative mx-auto h-[38vh] w-px bg-white/25">
        <m.div style={{ scaleY }} className="absolute inset-0 origin-top bg-white" />
      </div>
      <p className="mt-4 text-center text-[.7rem] font-semibold text-white [writing-mode:vertical-rl]" style={{ fontStretch: "80%" }}>
        <span className="tabular-nums">{step.n}</span>
        <span className="mt-2 inline-block">{step.label}</span>
      </p>
    </div>
  );
}
