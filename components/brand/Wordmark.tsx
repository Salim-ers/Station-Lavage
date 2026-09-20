import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark typographique H₂AU (le « 2 » traité comme dans H₂O).
 * Provisoire : si un logo officiel existe, le placer ici et ne rien changer ailleurs.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("wordmark", className)}>
      H<span className="wordmark-2">2</span>AU
    </span>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="H2AU Lavage, retour à l'accueil"
      className={cn("group inline-flex flex-col items-start leading-none", className)}
    >
      <Wordmark className={cn("transition-[font-size] duration-300", compact ? "text-[1.45rem]" : "text-[1.7rem]")} />
      <span
        className="mt-[3px] text-[.58rem] font-semibold tracking-[.62em] text-metal transition-colors group-hover:text-white"
        style={{ fontStretch: "100%" }}
      >
        LAVAGE
      </span>
    </Link>
  );
}
