import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/Reveal";
import { Price } from "@/components/ui/Price";
import { PROGRAM_PLACEHOLDERS, type Program } from "@/data/programs";
import { links } from "@/data/station";
import { cn } from "@/lib/utils";

type Props = {
  program: Program;
  index: number;
  /** home : renvoie vers le détail ; page : renvoie vers l'itinéraire */
  context?: "home" | "page";
  className?: string;
};

/**
 * Carte programme — trois designs distincts, sans hiérarchie commerciale affichée :
 *  minimal   : carte claire, sobre
 *  rich      : carte sombre, filet vert
 *  signature : carte carbone, bordure où l'eau circule, prix chromé
 */
export function ProgramCard({ program, index, context = "home", className }: Props) {
  const { look } = program;
  const dark = look !== "minimal";
  const features = program.features.length
    ? program.features
    : Array.from({ length: PROGRAM_PLACEHOLDERS.slots }, () => null);

  const cta =
    context === "home"
      ? { href: `/programmes#${program.id}`, label: "Choisir ce programme" }
      : { href: links.directions, label: "Choisir ce programme" };

  return (
    <div data-reveal="fade" style={{ ["--d" as string]: `${index * 120}ms` } as CSSProperties} className={cn("h-full", className)}>
    <article
      id={context === "page" ? program.id : undefined}
      data-cursor={`${program.price} €`}
      data-inview=""
      className={cn(
        "lift group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[var(--radius-medium)] p-7 md:p-9",
        look === "minimal" && "border border-carbon/12 bg-white text-carbon hover:border-carbon/30",
        look === "rich" && "border border-white/8 bg-ink text-white",
        look === "signature" && "border-run sheen bg-carbon text-white shadow-[0_40px_80px_-40px_rgb(20_176_106/.45)]",
      )}
    >
      {look === "rich" && (
        <span aria-hidden="true" className="jet-line absolute inset-x-0 top-0 !h-[3px] !rounded-none" />
      )}
      {look === "signature" && (
        <>
          <span aria-hidden="true" className="green-glow absolute -right-1/3 -top-1/3 h-[120%] w-[120%]" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-40 bg-[url(/textures/suds.webp)] bg-cover bg-bottom opacity-[.07]"
          />
        </>
      )}

      <div className="relative flex items-center justify-between">
        <span className={cn("t-label", dark ? "text-metal" : "text-graphite")}>
          Programme {String(index + 1).padStart(2, "0")}
        </span>
        <Icon
          name="drop"
          className={cn("size-5", look === "minimal" ? "text-carbon/40" : look === "rich" ? "text-h2au" : "text-h2au-bright")}
        />
      </div>

      <h3 className="sr-only">{program.name}</h3>
      <p aria-hidden="true" className="relative mt-10 leading-none md:mt-14">
        <Price
          value={program.price}
          chrome={look === "signature"}
          className={cn("text-[clamp(6rem,18vw,9.5rem)] md:text-[clamp(7rem,11vw,10.5rem)]", look === "rich" && "[&_.euro]:text-h2au-bright")}
        />
      </p>
      <p className={cn("relative mt-2 text-lg font-bold", dark ? "text-white" : "text-carbon")} style={{ fontStretch: "112%" }}>
        {program.name}
      </p>

      <div className={cn("relative mt-6 border-t pt-6", dark ? "border-white/12" : "border-carbon/12")}>
        {program.description ? (
          <p className={cn("t-body", dark ? "text-white/75" : "text-graphite")}>{program.description}</p>
        ) : (
          <Placeholder className={dark ? "text-white/80" : "text-graphite"}>{PROGRAM_PLACEHOLDERS.details}</Placeholder>
        )}

        <ul className="mt-6 space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <Icon
                name="check"
                className={cn("mt-0.5 size-4 shrink-0", dark ? "text-h2au-bright" : "text-h2au-deep")}
                strokeWidth={2}
              />
              {f ? (
                <span className={dark ? "text-white/85" : "text-carbon/85"}>{f}</span>
              ) : (
                <Placeholder className={dark ? "text-white/70" : "text-graphite"}>{PROGRAM_PLACEHOLDERS.option}</Placeholder>
              )}
            </li>
          ))}
        </ul>

        {program.duration && (
          <p className={cn("mt-6 flex items-center gap-2 text-sm", dark ? "text-metal" : "text-graphite")}>
            <Icon name="clock" className="size-4" /> {program.duration}
          </p>
        )}
      </div>

      <div className="relative mt-auto pt-10">
        <ButtonLink
          href={cta.href}
          block
          variant={look === "signature" ? "primary" : look === "rich" ? "secondary" : "secondary-dark"}
          cursor={context === "page" ? "→" : `${program.price} €`}
        >
          {cta.label}
        </ButtonLink>
      </div>
    </article>
    </div>
  );
}
