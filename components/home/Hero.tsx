"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  animate,
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { photos } from "@/data/media";
import { minPrice } from "@/data/programs";
import { links, station } from "@/data/station";

/**
 * HERO — 01 Arrivée.
 * Le visiteur est derrière son pare-brise. Un jet d'eau lumineux entre par la
 * droite au chargement, puis continue de « nettoyer » la vitre pendant le scroll
 * et révèle la photo nette de la station.
 * Mouvement réduit : photo nette directement, sans jet.
 */

const DROPS = [
  { left: "83%", top: "24%", w: 16, h: 19 },
  { left: "90%", top: "58%", w: 11, h: 13 },
  { left: "74%", top: "70%", w: 20, h: 23 },
  { left: "95%", top: "36%", w: 8, h: 10 },
  { left: "68%", top: "18%", w: 9, h: 11 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // position du jet, en % de la largeur (à gauche du jet : vitre sale)
  const intro = useMotionValue(118);
  useEffect(() => {
    if (reduce) {
      intro.set(-30);
      return;
    }
    const first = document.documentElement.classList.contains("first-visit");
    const ctrl = animate(intro, 58, { duration: 1.6, delay: first ? 1 : 0.3, ease: [0.22, 1, 0.36, 1] });
    return () => ctrl.stop();
  }, [reduce, intro]);

  const fromScroll = useTransform(scrollYProgress, [0, 0.5], [58, -30]);
  const x = useTransform(() => Math.min(intro.get(), fromScroll.get()));
  const xBottom = useTransform(x, (v) => v - 9);
  const clip = useMotionTemplate`polygon(${x}% 0%, 110% 0%, 110% 100%, ${xBottom}% 100%)`;

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const jetOpacity = useTransform(x, [-30, -8, 0, 100, 112], [0, 0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-carbon"
      data-wash-step="01"
      data-wash-label="Arrivée"
      aria-labelledby="hero-title"
    >
      {/* Photo : vitre sale (dessous) puis vitre nettoyée (dessus, découpée par le jet) */}
      <m.div className="absolute inset-0 -z-20" style={{ y: photoY, scale: photoScale }}>
        <Image
          src={photos.heroStationSale.src}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[80%_50%] md:object-[70%_45%]"
        />
        <m.div className="absolute inset-0" style={{ clipPath: clip }}>
          <Image
            src={photos.heroStation.src}
            alt={photos.heroStation.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[80%_50%] md:object-[70%_45%]"
          />
          {/* quelques gouttes sur la partie nettoyée, loin du texte */}
          <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
            {DROPS.map((d, i) => (
              <span key={i} className="drop" style={{ left: d.left, top: d.top, width: d.w, height: d.h }} />
            ))}
          </div>
        </m.div>
      </m.div>

      {/* le jet */}
      {!reduce && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(0 0 6px rgb(43 227 140 / .9)) drop-shadow(0 0 22px rgb(43 227 140 / .45))" }}
        >
          <m.line
            x1={x}
            y1={0}
            x2={xBottom}
            y2={100}
            stroke="rgb(233 255 244 / .1)"
            strokeWidth={9}
            vectorEffect="non-scaling-stroke"
            style={{ opacity: jetOpacity }}
          />
          <m.line
            x1={x}
            y1={0}
            x2={xBottom}
            y2={100}
            stroke="#e9fff4"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            style={{ opacity: jetOpacity }}
          />
        </svg>
      )}

      <div aria-hidden="true" className="hero-vignette absolute inset-0 -z-10" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <m.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative flex h-full flex-col justify-end pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-28 md:justify-center md:pb-10"
      >
        <h1 id="hero-title">
          <span className="flex items-baseline gap-3 text-[clamp(1.35rem,3vw,2.1rem)]">
            <Wordmark />
            <span className="font-bold tracking-[.32em] text-white/85" style={{ fontStretch: "100%", fontSize: ".58em" }}>
              LAVAGE
            </span>
          </span>
          <span className="t-mega hero-stretch mt-4 block whitespace-nowrap md:mt-5">
            Faites-la
            <br />
            briller.
          </span>
        </h1>
        <span aria-hidden="true" className="wet-reflection t-mega hero-stretch hidden md:block">
          <span>briller.</span>
        </span>

        <p className="t-lead mt-5 text-white/85 md:mt-2">
          Station de lavage automobile à {station.city}.
          <br className="hidden sm:block" /> Accessible {station.openingHours}.
        </p>

        <p className="mt-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[.14em] text-white/80">
          <span className="h-px w-8 bg-h2au-bright shadow-[0_0_10px_var(--color-h2au-bright)]" aria-hidden="true" />
          Programmes dès
          <Price value={minPrice} chrome className="text-[1.9rem] font-[850] tracking-[-0.04em] is-in" />
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="#programmes" cursor="6 · 8 · 12 €">
            Découvrir les programmes
          </ButtonLink>
          <ButtonLink href={links.directions} variant="secondary" leadingIcon="pin" icon={null} cursor="→">
            Itinéraire
          </ButtonLink>
        </div>
      </m.div>

      {/* bas de Hero (desktop) : statut + invitation à descendre */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-8 hidden items-end justify-between md:flex">
        <p className="t-label flex items-center gap-3 text-white/70">
          <span className="gps" aria-hidden="true">
            <i />
          </span>
          Ouvert maintenant · {station.openingHoursLong}
        </p>
        <div className="flex flex-col items-center gap-3" aria-hidden="true">
          <span className="t-label text-white/60 [writing-mode:vertical-rl]">Défiler</span>
          <span className="scroll-cue" />
        </div>
      </div>
    </section>
  );
}
