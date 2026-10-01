"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { photos } from "@/data/media";
import { minPrice } from "@/data/programs";
import { links, station } from "@/data/station";

/**
 * HERO — 01 Arrivée.
 * Une seule photo de la station, assombrie à gauche pour le texte.
 * Elle s'éclaircit et avance très légèrement à l'arrivée, puis glisse au scroll.
 * Mouvement réduit : photo fixe.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-carbon"
      data-wash-step="01"
      data-wash-label="Arrivée"
      aria-labelledby="hero-title"
    >
      <m.div className="absolute inset-0 -z-20" style={{ y: reduce ? 0 : photoY }}>
        <m.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* servie telle quelle (unoptimized) : pas de recompression par le serveur d'images */}
          <Image
            src={photos.heroStation.src}
            alt={photos.heroStation.alt}
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover"
            style={{ objectPosition: photos.heroStation.focus }}
          />
        </m.div>
      </m.div>
      <div aria-hidden="true" className="hero-vignette absolute inset-0 -z-10" />

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
          <ButtonLink href="#programmes" cursor="6 → 22 €">
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
