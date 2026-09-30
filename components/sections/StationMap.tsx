import { fullAddress, links, station } from "@/data/station";
import { cn } from "@/lib/utils";

/** Carte Google Maps, intégrée directement. */
export function StationMap({ className, wide = false }: { className?: string; wide?: boolean }) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[var(--radius-medium)] border border-white/10 bg-ink", wide ? "sm:aspect-[21/9]" : "sm:aspect-[4/3]", className)}>
      <iframe
        title={`Carte : ${station.name}, ${fullAddress}`}
        src={links.mapEmbed}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
