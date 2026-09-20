import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleVisual } from "@/components/sections/ArticleVisual";
import { Icon } from "@/components/ui/Icon";
import { articles, formatDate, readingTime } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Conseils lavage auto : méthode, jantes, hiver, intérieur",
  description:
    "Comment bien laver sa voiture, dans quel ordre, éviter les traces, nettoyer les jantes et l'intérieur : les conseils de la station de lavage H2AU à Saint-Maximin.",
  path: "/conseils",
});

export default function ConseilsPage() {
  const [first, ...rest] = articles;
  return (
    <>
      <PageHero
        title={["Nos conseils.", "Pour qu'elle brille."]}
        kicker="Conseils d'entretien"
        intro="Des gestes simples pour laver mieux, plus vite, et garder une voiture propre plus longtemps."
      />

      <section className="section-light py-20 md:py-28" aria-label="Articles">
        <div className="container-x">
          {/* article à la une */}
          <Link
            href={`/conseils/${first.slug}`}
            data-cursor="Lire"
            className="group grid overflow-hidden rounded-[var(--radius-medium)] bg-carbon text-white lg:grid-cols-12"
          >
            <ArticleVisual visual={first.visual} dirty className="aspect-[16/9] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]" />
            <div className="flex flex-col justify-end p-7 md:p-10 lg:col-span-5">
              <p className="t-label text-h2au-bright">
                {first.category} · {readingTime(first)} min
              </p>
              <h2 className="t-lg mt-4">{first.title}</h2>
              <p className="mt-4 text-metal">{first.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.12em] text-h2au-bright">
                Lire le conseil <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <li key={a.slug} data-reveal="fade" style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
                <Link
                  href={`/conseils/${a.slug}`}
                  data-cursor="Lire"
                  className={cn(
                    "lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-medium)] border border-carbon/10 bg-white",
                  )}
                >
                  <ArticleVisual visual={a.visual} className="aspect-[16/9]" />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="t-label text-h2au-deep">
                      {a.category} · {readingTime(a)} min
                    </p>
                    <h2 className="mt-3 text-xl font-extrabold uppercase leading-tight tracking-[-0.01em]" style={{ fontStretch: "110%" }}>
                      {a.title}
                    </h2>
                    <p className="mt-3 flex-1 text-graphite">{a.excerpt}</p>
                    <p className="mt-6 flex items-center justify-between text-sm text-graphite">
                      <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
                      <Icon name="arrow" className="size-4 text-carbon transition-transform duration-300 group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={["La théorie, c'est bien.", "Le lavage, c'est mieux."]} />
    </>
  );
}
