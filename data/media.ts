import type { StaticImageData } from "next/image";
import heroStation from "@/assets/photos/hero-station.jpg";
import heroStationSale from "@/assets/photos/hero-station-sale.jpg";
import stationPortique from "@/assets/photos/station-portique.jpg";
import stationEnsemble from "@/assets/photos/station-ensemble.jpg";
import pistesAuvent from "@/assets/photos/pistes-auvent.jpg";
import piste from "@/assets/photos/piste-voiture.jpg";
import pisteGrandAngle from "@/assets/photos/piste-grand-angle.jpg";
import borneJetons from "@/assets/photos/borne-jetons.jpg";
import multiServices from "@/assets/photos/multi-services.jpg";
import espaceServices from "@/assets/photos/espace-services.jpg";
import produitJantes from "@/assets/photos/produit-jantes.jpg";
import aspirateur from "@/assets/photos/aspirateur.jpg";

/**
 * PHOTOS — toutes prises à la station H2AU Lavage de Saint-Maximin.
 * Pour remplacer une photo : déposer le nouveau fichier dans /assets/photos
 * sous le même nom. Pour en ajouter une : l'importer ici puis l'ajouter à `gallery`.
 *
 * hero-station.jpg, station-ensemble.jpg et pistes-auvent.jpg (affichées en
 * plein écran) ont été agrandies en 2400–2560 px et légèrement affinées.
 * hero-station-sale.jpg est une version ternie de hero-station.jpg
 * (effet « vitre sale » du Hero) : la régénérer si la photo change.
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
  heroStation: {
    src: heroStation,
    alt: "La station H2AU Lavage à Saint-Maximin : pistes de lavage sous auvent et portique de lavage automatique",
    focus: "68% 55%",
  },
  heroStationSale: {
    src: heroStationSale,
    alt: "",
    focus: "68% 55%",
  },
  stationEnsemble: {
    src: stationEnsemble,
    alt: "Vue d'ensemble de la station H2AU Lavage, pistes sous auvent et espace services",
    focus: "50% 58%",
  },
  portique: {
    src: stationPortique,
    alt: "Le portique de lavage automatique de la station H2AU Lavage",
    focus: "90% 62%",
  },
  pistes: {
    src: pistesAuvent,
    alt: "Les pistes de lavage haute pression en libre-service, sous l'auvent de la station",
    focus: "55% 62%",
  },
  piste: {
    src: piste,
    alt: "Une voiture sur une piste de lavage haute pression de la station",
    focus: "35% 62%",
  },
  pisteGrandAngle: {
    src: pisteGrandAngle,
    alt: "Piste de lavage couverte de la station H2AU Lavage",
    focus: "35% 58%",
  },
  borne: {
    src: borneJetons,
    alt: "Le distributeur de jetons : paiement par carte bancaire, sans contact ou billets",
    focus: "50% 42%",
  },
  multiServices: {
    src: multiServices,
    alt: "La borne multi-services : parfums, brillant pneus, lave-glace, tableau de bord et gonflage",
    focus: "50% 40%",
  },
  espaceServices: {
    src: espaceServices,
    alt: "L'espace aspiration et multi-services de la station",
    focus: "50% 62%",
  },
  produitJantes: {
    src: produitJantes,
    alt: "La borne produit jantes et démoustiquant, sur les pistes de lavage",
    focus: "50% 55%",
  },
  aspirateur: {
    src: aspirateur,
    alt: "Un aspirateur de la station, à pièces ou à jetons",
    focus: "45% 50%",
  },
} satisfies Record<string, Photo>;

/** Galerie éditoriale : l'ordre définit la composition (grande, verticale, gros plans). */
export const gallery: Photo[] = [
  { ...photos.stationEnsemble, layout: "wide", caption: "La station" },
  { ...photos.borne, layout: "tall", caption: "Les jetons" },
  { ...photos.piste, layout: "detail", caption: "Les pistes" },
  { ...photos.multiServices, layout: "detail", caption: "Multi-services" },
  { ...photos.aspirateur, layout: "detail", caption: "L'aspiration" },
  { ...photos.portique, layout: "wide", caption: "Le portique" },
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
