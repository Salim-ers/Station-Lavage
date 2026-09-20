import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealLines, JetRule } from "./Reveal";

type Props = {
  title: ReactNode[];
  as?: ElementType;
  size?: "xl" | "lg" | "mega";
  intro?: ReactNode;
  tone?: "dark" | "light";
  jet?: boolean;
  className?: string;
  id?: string;
  aside?: ReactNode;
};

/** Titre de section : lignes courtes révélées au scroll, jet, texte d'appui décalé à droite. */
export function SectionHeading({ title, as = "h2", size = "xl", intro, tone = "dark", jet = true, className, id, aside }: Props) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12", className)}>
      <div className="lg:col-span-12">
        <RevealLines as={as} id={id} lines={title} className={size === "mega" ? "t-mega" : size === "lg" ? "t-lg" : "t-xl"} />
      </div>
      {jet && (
        <div className="lg:col-span-7">
          <JetRule className="w-24 md:w-36" delay={300} />
        </div>
      )}
      {(intro || aside) && (
        <div className={cn("lg:col-span-5", jet ? "lg:-mt-2" : "lg:col-start-8")}>
          {intro && (
            <p data-reveal="fade" className={cn("t-lead", tone === "dark" ? "text-metal" : "text-graphite")} style={{ ["--d" as string]: "200ms" }}>
              {intro}
            </p>
          )}
          {aside}
        </div>
      )}
    </div>
  );
}
