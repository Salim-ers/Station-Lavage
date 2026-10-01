import type { StaticImageData } from "next/image";
// Photo libre de droits (licence Unsplash) : Zulfahmi Khani, unsplash.com/photos/9iH_6JO7Ufs
import heroMousse from "@/assets/photos/hero-mousse.jpg";
import stationPortique from "@/assets/photos/station-portique.jpg";
import panneauProgrammes from "@/assets/photos/panneau-programmes.jpg";
import monnayeurPiste from "@/assets/photos/monnayeur-piste.jpg";
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
 * PHOTOS — prises à la station H2AU Lavage de Saint-Maximin.
 * Pour remplacer une photo : déposer le nouveau fichier dans /assets/photos
 * sous le même nom. Pour en ajouter une : l'importer ici puis l'ajouter à `gallery`.
 *
 * Seule exception : la photo du Hero (hero-mousse.jpg), libre de droits.
 * Sources des autres : originaux Google Drive (octobre 2026), agrandis progressivement
 * (1600 à 2560 px selon l'usage) avec un affinage léger.
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
    src: heroMousse,
    alt: "Une voiture couverte de mousse dans une piste de lavage",
    focus: "50% 42%",
  },
  stationEnsemble: {
    src: stationEnsemble,
    alt: "Vue d'ensemble de la station H2AU Lavage, pistes sous auvent et espace services",
    focus: "50% 58%",
  },
  portique: {
    src: stationPortique,
    alt: "Le portique de lavage automatique de la station H2AU Lavage, brosses et rails de guidage",
    focus: "40% 55%",
  },
  panneauProgrammes: {
    src: panneauProgrammes,
    alt: "Le panneau des 6 programmes du lavage automatique, de 6 € à 22 €",
    focus: "60% 50%",
  },
  monnayeurPiste: {
    src: monnayeurPiste,
    alt: "Le monnayeur d'une piste haute pression : pièces de 1 € et 2 € ou jeton",
    focus: "50% 55%",
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
  { ...photos.portique, layout: "wide", caption: "Le portique" },
  { ...photos.borne, layout: "tall", caption: "Les jetons" },
  { ...photos.piste, layout: "detail", caption: "Les pistes" },
  { ...photos.multiServices, layout: "detail", caption: "Multi-services" },
  { ...photos.aspirateur, layout: "detail", caption: "L'aspiration" },
  { ...photos.stationEnsemble, layout: "wide", caption: "La station" },
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
