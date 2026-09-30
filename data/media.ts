import type { StaticImageData } from "next/image";
import stationAuvent from "@/assets/photos/station-auvent.jpg";
import heroStation from "@/assets/photos/hero-station.jpg";
import heroStationSale from "@/assets/photos/hero-station-sale.jpg";
import portiqueRouleaux from "@/assets/photos/portique-rouleaux.jpg";
import portiqueBrosses from "@/assets/photos/portique-rouleaux-etalonne.jpg";
import lavageMousse from "@/assets/photos/lavage-mousse.jpg";

/**
 * PHOTOS
 * Photos réelles d'une station de lavage du même type (portique à rouleaux,
 * auvent vert, pistes libre-service). Pour les remplacer par les vraies
 * photos de la station H2AU : déposer les originaux HD dans /assets/photos
 * en gardant les mêmes noms de fichiers — rien d'autre à modifier.
 *
 * - hero-station.jpg               : vue large de la station sous l'auvent, totem Carwash
 * - hero-station-sale.jpg          : même ambiance, ternie/embrumée (effet « vitre sale » du Hero)
 * - station-auvent.jpg             : autre angle de la station, pistes libre-service
 * - portique-rouleaux.jpg          : le portique à rouleaux, vue d'ensemble
 * - portique-rouleaux-etalonne.jpg : les brosses du portique, gros plan avec une voiture
 * - lavage-mousse.jpg              : rinçage haute pression, gros plan
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
    alt: "La station de lavage sous son auvent vert, pistes libre-service",
    focus: "42% 48%",
  },
  heroStation: {
    src: heroStation,
    alt: "La station de lavage, son auvent vert et son totem Carwash",
    focus: "78% 45%",
  },
  heroStationSale: {
    src: heroStationSale,
    alt: "",
    focus: "78% 45%",
  },
  portiqueRouleaux: {
    src: portiqueRouleaux,
    alt: "Le portique à rouleaux de la station, vu de face",
    focus: "48% 42%",
  },
  portiqueBrosses: {
    src: portiqueBrosses,
    alt: "Les brosses du portique, vues depuis une voiture en cours de lavage",
    focus: "42% 58%",
  },
  lavageMousse: {
    src: lavageMousse,
    alt: "Rinçage haute pression d'une carrosserie couverte de mousse",
    focus: "32% 55%",
  },
} satisfies Record<string, Photo>;

/** Galerie éditoriale : l'ordre définit la composition (grande, verticale, gros plans). */
export const gallery: Photo[] = [
  { ...photos.heroStation, layout: "wide", caption: "La station" },
  { ...photos.portiqueRouleaux, layout: "tall", caption: "Le portique" },
  { ...photos.lavageMousse, layout: "detail", caption: "Le rinçage" },
  { ...photos.portiqueBrosses, layout: "detail", caption: "Les brosses" },
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
