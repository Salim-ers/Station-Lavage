"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import { CarSilhouette } from "@/components/visuals/CarSilhouette";
import { photos } from "@/data/media";
import { programs } from "@/data/programs";
import { links } from "@/data/station";
import { cn } from "@/lib/utils";

/**
 * 09 — CTA final. Seule utilisation de l'effet essuie-glace : à l'entrée
 * dans l'écran, un balai efface la saleté et révèle l'image nette.
 * La voiture (illustration) reprend la route pendant le scroll.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const carX = useTransform(scrollYProgress, [0.2, 1], ["14%", "-22%"]);
  const sweep = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const wiped = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section
      ref={ref}
      className={cn(wiped && "is-in", "wiper relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-carbon py-28")}
      data-wash-step="09"
      data-wash-label="Reprise de la route"
      aria-labelledby="cta-title"
    >
      <Image src={photos.heroStation.src} alt="" fill sizes="100vw" placeholder="blur" className="-z-20 object-cover object-[75%_45%]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_9_9/.9),rgb(7_9_9/.55)_55%,rgb(7_9_9/.3)),linear-gradient(0deg,rgb(7_9_9)_2%,transparent_40%)]" />
      <div aria-hidden="true" className="wiper-dirt" />
      <div aria-hidden="true" className="wiper-blade" />

      <div className="container-x relative z-10">
        <RevealLines id="cta-title" lines={["Elle mérite", "de briller."]} className="t-mega max-w-[12ch]" />
        <p className="t-lead mt-8 text-white/85">
          Trois programmes. {programs.map((p) => `${p.price} €.`).join(" ")}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={links.directions} leadingIcon="pin" cursor="→">
            Itinéraire
          </ButtonLink>
          <ButtonLink href="/programmes" variant="secondary" cursor="6 · 8 · 12 €">
            Découvrir les programmes
          </ButtonLink>
        </div>
      </div>

      <m.div aria-hidden="true" style={{ x: carX }} className="pointer-events-none absolute -right-[8%] bottom-[3%] w-[82%] opacity-90 md:w-[58%] lg:bottom-[5%] lg:w-[48%]">
        <CarSilhouette sweepProgress={sweep} />
      </m.div>
    </section>
  );
}
