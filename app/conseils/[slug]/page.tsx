import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleVisual } from "@/components/sections/ArticleVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JetRule } from "@/components/ui/Reveal";
import { articles, formatDate, getArticle, readingTime, type ArticleBlock } from "@/data/articles";
import { programs } from "@/data/programs";
import { links, siteUrl, station } from "@/data/station";
import { JsonLd, pageMetadata, SITE_NAME } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/conseils/${a.slug}`, type: "article" });
}

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === "p") return <p className="mt-5 text-lg leading-[1.75] text-carbon/85">{block.text}</p>;
  if (block.type === "tip")
    return (
      <aside className="mt-7 flex gap-4 rounded-[var(--radius-medium)] border-l-4 border-h2au bg-white p-5 text-carbon">
        <Icon name="drop" className="mt-0.5 size-5 shrink-0 text-h2au-deep" />
        <p>
          <strong className="font-bold">Bon à savoir · </strong>
          {block.text}
        </p>
      </aside>
    );
  const List = block.ordered ? "ol" : "ul";
  return (
    <List className="mt-6 space-y-3">
      {block.items.map((item, i) => (
        <li key={i} className="flex gap-4 text-lg leading-relaxed text-carbon/85">
          <span className="t-label mt-1.5 w-6 shrink-0 tabular-nums text-h2au-deep">
            {block.ordered ? String(i + 1).padStart(2, "0") : "—"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </List>
  );
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const idx = articles.findIndex((a) => a.slug === slug);
  const related = [articles[(idx + 1) % articles.length], articles[(idx + 2) % articles.length]];

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${siteUrl}/conseils/${article.slug}`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@id": `${siteUrl}/#station` },
    image: `${siteUrl}/opengraph-image.jpg`,
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Conseils", item: `${siteUrl}/conseils` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}/conseils/${article.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={crumbs} />
      <article>
        <header className="bg-carbon pb-12 pt-32 md:pt-40">
          <div className="container-x">
            <nav aria-label="Fil d'Ariane" className="t-label text-metal">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">Accueil</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/conseils" className="hover:text-white">Conseils</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/80">{article.category}</li>
              </ol>
            </nav>
            <h1 className="t-xl mt-8 max-w-[18ch]">{article.title}</h1>
            <JetRule className="mt-8 w-28" />
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-metal">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span>{readingTime(article)} min de lecture</span>
              <span>{article.category}</span>
            </p>
          </div>
        </header>
        <ArticleVisual visual={article.visual} className="aspect-[21/9] max-h-[60vh] w-full" />

        <div className="section-light py-16 md:py-24">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-1">
              <p className="t-lead text-carbon">{article.excerpt}</p>
              {article.sections.map((s) => (
                <section key={s.heading} className="mt-12">
                  <h2 className="text-2xl font-extrabold uppercase leading-tight md:text-3xl" style={{ fontStretch: "110%" }}>
                    {s.heading}
                  </h2>
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </section>
              ))}
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-[var(--radius-medium)] bg-carbon p-7 text-white lg:sticky lg:top-24">
                <p className="t-label text-metal">{station.name} · {station.city}</p>
                <p className="t-md mt-4">Envie d&apos;une voiture propre ?</p>
                <p className="mt-3 text-metal">Station ouverte {station.openingHours}. Trois programmes :</p>
                <p className="mt-3 text-2xl font-extrabold" style={{ fontStretch: "118%" }}>
                  {programs.map((p) => `${p.price} €`).join(" · ")}
                </p>
                <div className="mt-7 grid gap-3">
                  <ButtonLink href={links.directions} leadingIcon="pin" icon={null} block>
                    Itinéraire
                  </ButtonLink>
                  <ButtonLink href="/programmes" variant="secondary" block>
                    Les programmes
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="section-white py-16 md:py-24" aria-labelledby="a-lire">
        <div className="container-x">
          <h2 id="a-lire" className="t-lg">À lire aussi</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/conseils/${a.slug}`} className="lift group grid h-full grid-cols-[40%_1fr] overflow-hidden rounded-[var(--radius-medium)] border border-carbon/10 bg-white" data-cursor="Lire">
                  <ArticleVisual visual={a.visual} className="h-full min-h-[160px]" />
                  <div className="p-6">
                    <p className="t-label text-h2au-deep">{a.category}</p>
                    <h3 className="mt-2 text-lg font-extrabold uppercase leading-tight" style={{ fontStretch: "110%" }}>{a.title}</h3>
                    <Icon name="arrow" className="mt-4 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
