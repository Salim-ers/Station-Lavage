/**
 * INFORMATIONS DE LA STATION — source unique de vérité.
 * Tout le site (pages, footer, SEO, données structurées) lit ce fichier.
 *
 * Sources :
 *  - brief client : nom, téléphone, ouverture 24h/24, tarifs
 *  - fiche Google (capture fournie) : adresse, services listés, note
 * Laisser `null` tant qu'une information n'est pas confirmée : le site affiche
 * alors un emplacement « [… À RENSEIGNER] » ou masque le bloc.
 */

export const station = {
  name: "H2AU Lavage",
  subtitle: "Saint-Maximin Lavage",
  city: "Saint-Maximin",
  department: "Oise",
  departmentCode: "60",
  region: "Hauts-de-France",
  country: "FR",

  // Adresse relevée sur la fiche Google — à faire valider par l'exploitant.
  address: {
    street: "504 Rue des Montagnards",
    complement: "Centre Commercial Cora, à côté de la station carburants",
    postalCode: "60740",
    city: "Saint-Maximin",
  },

  // Coordonnées GPS : non communiquées. Ex. { lat: 49.2…, lng: 2.4… }
  geo: null as { lat: number; lng: number } | null,

  phone: {
    display: "06 10 47 56 36",
    e164: "+33610475636",
  },

  openingHours: "24h/24",
  openingHoursLong: "Ouvert 24h/24, 7j/7",

  email: null as string | null,

  // Modes de paiement : non communiqués. Ex. ["Carte bancaire", "Espèces"]
  paymentMethods: [] as string[],

  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },

  // Informations légales (mentions légales) : à renseigner.
  legal: {
    companyName: null as string | null,
    legalForm: null as string | null,
    siret: null as string | null,
    rcs: null as string | null,
    vat: null as string | null,
    director: null as string | null,
    host: null as string | null,
  },
};

export const fullAddress = `${station.address.street}, ${station.address.postalCode} ${station.address.city}`;

const mapsQuery = encodeURIComponent(`${station.name}, ${fullAddress}`);

export const links = {
  tel: `tel:${station.phone.e164}`,
  directions: station.geo
    ? `https://www.google.com/maps/dir/?api=1&destination=${station.geo.lat},${station.geo.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  googleReviews: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
};

/** URL publique du site — définir NEXT_PUBLIC_SITE_URL avant la mise en ligne. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Texte affiché quand une information manque. */
export const TODO = {
  address: "[ADRESSE EXACTE À RENSEIGNER]",
  payment: "[MODES DE PAIEMENT À RENSEIGNER]",
  info: "[INFORMATION À RENSEIGNER]",
  review: "[AVIS GOOGLE À INTÉGRER]",
  photo: "[PHOTO À AJOUTER]",
} as const;
