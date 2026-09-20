import type { StaticImageData } from "next/image";
import stationAuvent from "@/assets/photos/station-auvent.jpg";
import heroStation from "@/assets/photos/hero-station.jpg";
import heroStationSale from "@/assets/photos/hero-station-sale.jpg";
import portiqueRouleaux from "@/assets/photos/portique-rouleaux-etalonne.jpg";

/**
 * PHOTOS
 * Photos réelles H2AU, provisoirement extraites de la fiche Google (basse
 * résolution). Pour les remplacer : déposer les originaux HD dans
 * /assets/photos en gardant les mêmes noms de fichiers — rien d'autre à modifier.
 *
 * - station-auvent.jpg       : photo retouchée (exposition, netteté)
 * - hero-station.jpg         : même photo, étalonnage « automobile » (ciel assombri,
 *                              verts densifiés, sol légèrement humide) — architecture intacte
 * - hero-station-sale.jpg    : même photo vue à travers un pare-brise sale (effet du Hero)
 * - portique-rouleaux-etalonne.jpg : rouleaux du portique, noirs plus profonds
 *
 * Pour ajouter une photo : importer le fichier ci-dessous et l'ajouter à `gallery`.
 */

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** mise en page dans la galerie éditoriale */
  layout?: "wide" | "tall" | "detail";
  /** point focal (object-position) */
  focus?: string;
  /** recadrage « gros plan » dans la galerie (la visionneuse montre la photo entière) */
  zoom?: number;
  caption?: string;
};

export const photos = {
  stationAuvent: {
    src: stationAuvent,
    alt: "La station H2AU Lavage à Saint-Maximin : auvent vert, pistes de lavage et totem Carwash",
    focus: "62% 55%",
  },
  heroStation: {
    src: heroStation,
    alt: "La station H2AU Lavage à Saint-Maximin, son auvent vert et son totem Carwash",
    focus: "70% 45%",
  },
  heroStationSale: {
    src: heroStationSale,
    alt: "",
    focus: "70% 45%",
  },
  portiqueRouleaux: {
    src: portiqueRouleaux,
    alt: "Les rouleaux du portique H2AU Lavage, vus depuis une voiture en cours de lavage",
    focus: "40% 50%",
  },
} satisfies Record<string, Photo>;

/** Galerie éditoriale : l'ordre définit la composition (grande, verticale, gros plans). */
export const gallery: Photo[] = [
  { ...photos.heroStation, layout: "wide", caption: "La station" },
  { ...photos.portiqueRouleaux, layout: "tall", caption: "Le portique" },
  {
    ...photos.heroStation,
    alt: "Gros plan sur le totem Carwash et l'extrémité de l'auvent H2AU Lavage",
    layout: "detail",
    focus: "90% 48%",
    zoom: 2.1,
    caption: "Le totem",
  },
  {
    ...photos.portiqueRouleaux,
    alt: "Gros plan sur les brosses du portique à rouleaux",
    layout: "detail",
    focus: "35% 28%",
    zoom: 1.25,
    caption: "Les brosses",
  },
];

/**
 * AVANT / APRÈS — aucune vraie photo pour l'instant.
 * Tant que `before`/`after` valent null, le comparateur affiche une
 * démonstration illustrée, clairement signalée comme telle.
 */
export const beforeAfter: { before: Photo | null; after: Photo | null } = {
  before: null,
  after: null,
};
