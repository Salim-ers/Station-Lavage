import { CarSilhouette } from "@/components/visuals/CarSilhouette";
import type { Article } from "@/data/articles";
import { cn } from "@/lib/utils";

/** Cadrages de l'illustration selon le sujet de l'article (jante, avant, vitres…). */
const VIEWBOX: Record<Article["visual"], string> = {
  full: "40 60 1120 360",
  side: "330 110 640 260",
  wheel: "170 195 200 190",
  front: "50 150 420 220",
  glass: "440 90 580 160",
};

export function ArticleVisual({ visual, className, dirty = false }: { visual: Article["visual"]; className?: string; dirty?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_65%,#1d2826_0%,#0b0f0f_70%)]",
        className,
      )}
    >
      <CarSilhouette viewBox={VIEWBOX[visual]} shadow={visual === "full"} dirt={dirty ? 0.6 : 0} className="w-full" />
      <span className="grain absolute inset-0" />
    </div>
  );
}
