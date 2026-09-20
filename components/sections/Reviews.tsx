import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/Reveal";
import { googleRating, reviews } from "@/data/reviews";
import { links, TODO } from "@/data/station";
import { cn } from "@/lib/utils";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name={i < Math.round(value) ? "star" : "starOutline"} className="size-4" />
      ))}
    </span>
  );
}

/**
 * Avis clients. Aucun avis n'est inventé : tant que data/reviews.ts est vide,
 * des emplacements « [AVIS GOOGLE À INTÉGRER] » s'affichent.
 * La note Google est celle relevée sur la fiche (capture fournie).
 */
export function Reviews() {
  const items = reviews.length ? reviews : [null, null, null];
  const rating = googleRating.value.toLocaleString("fr-FR", { minimumFractionDigits: 1 });

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        {googleRating.show && (
          <div data-reveal="fade">
            <p className="flex items-end gap-3">
              <span className="t-price text-[clamp(5rem,12vw,8.5rem)]">{rating}</span>
              <span className="pb-3 text-2xl font-bold text-graphite">/ 5</span>
            </p>
            <Stars value={googleRating.value} className="mt-3 text-h2au-deep [&_svg]:size-5" />
            <p className="mt-4 text-graphite">
              {googleRating.count} avis sur Google
              <span className="block text-sm">Note relevée sur la fiche Google en {googleRating.capturedAt}.</span>
            </p>
          </div>
        )}
        <div className="mt-8">
          <ButtonLink href={links.googleReviews} variant="secondary-dark" icon="arrowUpRight">
            Voir les avis Google
          </ButtonLink>
        </div>
      </div>

      <ul className="relative grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:block lg:min-h-[520px]">
        {items.map((r, i) => (
          <li
            key={i}
            data-reveal="fade"
            style={{ ["--d" as string]: `${i * 140}ms` }}
            className={cn(
              "lg:absolute lg:w-[58%]",
              i === 0 && "lg:left-0 lg:top-0",
              i === 1 && "lg:right-0 lg:top-[30%]",
              i === 2 && "lg:bottom-0 lg:left-[8%]",
              i > 2 && "lg:hidden",
            )}
          >
            <figure className="float-slow rounded-[var(--radius-medium)] border border-carbon/10 bg-white p-6 shadow-[0_30px_60px_-35px_rgb(7_9_9/.35)]" style={{ animationDelay: `${i * -2.3}s` }}>
              {r ? (
                <>
                  <Stars value={r.rating} className="text-h2au-deep" />
                  <blockquote className="mt-4 text-carbon">« {r.text} »</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-graphite">
                    {r.firstName} · {r.date}
                  </figcaption>
                </>
              ) : (
                <>
                  <Stars value={0} className="text-carbon/25" />
                  <p className="mt-4">
                    <Placeholder className="text-graphite">{TODO.review}</Placeholder>
                  </p>
                  <figcaption className="mt-4 text-sm text-graphite/70">Prénom · date</figcaption>
                </>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
