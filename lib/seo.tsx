import type { Metadata } from "next";
import { station, siteUrl, links, fullAddress } from "@/data/station";
import { programs } from "@/data/programs";

export const SITE_NAME = "H2AU Lavage";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

/** Métadonnées d'une page : title unique, description, canonical, Open Graph, Twitter. */
export function pageMetadata({ title, description, path, type = "website" }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Données structurées Schema.org — type AutoWash (sous-type de LocalBusiness). */
export function stationJsonLd() {
  const sameAs = Object.values(station.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "@id": `${siteUrl}/#station`,
    name: station.name,
    alternateName: station.subtitle,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.jpg`,
    logo: `${siteUrl}/icons/icon-512.png`,
    telephone: station.phone.e164,
    priceRange: `${programs[0].price} € – ${programs[programs.length - 1].price} €`,
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${station.address.street}, ${station.address.complement}`,
      postalCode: station.address.postalCode,
      addressLocality: station.address.city,
      addressRegion: station.region,
      addressCountry: station.country,
    },
    ...(station.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: station.geo.lat, longitude: station.geo.lng } }
      : {}),
    hasMap: links.maps,
    areaServed: [
      { "@type": "City", name: "Saint-Maximin" },
      { "@type": "AdministrativeArea", name: "Oise" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    makesOffer: programs.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "EUR",
      itemOffered: { "@type": "Service", name: `Lavage automobile — ${p.name}` },
    })),
    ...(sameAs.length ? { sameAs } : {}),
    description: `Station de lavage automobile ouverte 24h/24 à Saint-Maximin (Oise). ${fullAddress}.`,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
