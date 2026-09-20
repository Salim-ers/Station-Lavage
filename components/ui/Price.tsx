import { cn } from "@/lib/utils";

/** Prix typographique (chiffres tabulaires, € en exposant). `chrome` : effet métal + reflet à l'apparition. */
export function Price({ value, className, chrome = false }: { value: number; className?: string; chrome?: boolean }) {
  return (
    <span className={cn("t-price inline-block", chrome && "chrome-text", className)}>
      {value}
      <span className="euro">€</span>
    </span>
  );
}
