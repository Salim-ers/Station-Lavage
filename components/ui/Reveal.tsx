import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
};

/**
 * Titre révélé ligne par ligne par un masque (le texte reste dans le HTML
 * pour le SEO ; l'animation ne s'active que si JavaScript est disponible).
 */
export function RevealLines({ lines, as: Tag = "h2", className, lineClassName, delay = 0, id }: LinesProps) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="rl">
          <span className={lineClassName} style={{ "--i": i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Ligne « jet » qui se dessine quand elle entre dans l'écran. */
export function JetRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span
      aria-hidden="true"
      data-reveal="jet"
      className={cn("jet-line block", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    />
  );
}

export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("ph", className)}>{children}</span>;
}
