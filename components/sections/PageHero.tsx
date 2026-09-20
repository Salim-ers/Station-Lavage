import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/data/media";
import { RevealLines, JetRule } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  title: string[];
  kicker?: ReactNode;
  intro?: ReactNode;
  photo?: Photo;
  children?: ReactNode;
  /** zone sous le titre (prix, infos) */
  aside?: ReactNode;
  washStep?: { n: string; label: string };
  className?: string;
};

/**
 * En-tête des pages intérieures : sombre, titre XXL révélé par masque,
 * reflet « sol mouillé » sous le titre et photo réelle optionnelle.
 */
export function PageHero({ title, kicker, intro, photo, children, aside, washStep, className }: Props) {
  return (
    <section
      className={cn("relative isolate overflow-hidden bg-carbon pb-16 pt-32 md:pb-24 md:pt-44", photo && "min-h-[78svh] md:min-h-[88svh]", className)}
      data-wash-step={washStep?.n}
      data-wash-label={washStep?.label}
    >
      {photo && (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="-z-20 object-cover opacity-80"
            style={{ objectPosition: photo.focus }}
          />
          <div aria-hidden="true" className="hero-vignette absolute inset-0 -z-10" />
          <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
        </>
      )}
      {!photo && (
        <div aria-hidden="true" className="green-glow absolute -right-[15%] -top-[30%] -z-10 h-[90vmin] w-[90vmin]" />
      )}

      <div className={cn("container-x relative", photo && "flex min-h-[calc(78svh-12rem)] flex-col justify-end md:min-h-[calc(88svh-17rem)]")}>
        {kicker && <p className="t-label mb-6 flex items-center gap-3 text-metal">{kicker}</p>}
        <RevealLines as="h1" lines={title} className="t-mega !text-[clamp(2.7rem,7.2vw,7.2rem)]" />
        <span aria-hidden="true" className="wet-reflection t-mega hidden !text-[clamp(2.7rem,7.2vw,7.2rem)] md:block">
          <span>{title[title.length - 1]}</span>
        </span>
        <JetRule className="mt-6 w-28 md:mt-4 md:w-44" delay={250} />
        {(intro || aside || children) && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              {intro && (
                <p data-reveal="fade" className="t-lead text-white/80" style={{ ["--d" as string]: "250ms" }}>
                  {intro}
                </p>
              )}
              {children && (
                <div data-reveal="fade" className="mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "350ms" }}>
                  {children}
                </div>
              )}
            </div>
            {aside && <div className="lg:col-span-6">{aside}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
