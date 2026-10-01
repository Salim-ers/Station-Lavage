import { photos, type Photo } from "./media";

/**
 * ÉQUIPEMENTS — relevés sur place (photos de la station, septembre 2026).
 * Seuls les équipements `confirmed: true` sont affichés sur le site.
 */

export type EquipmentIcon = "rollers" | "vacuum" | "drop" | "sparkle" | "spray";

export type Equipment = {
  id: string;
  name: string;
  headline: string[];
  description: string;
  tips: string[];
  /** tarifs affichés sur la borne */
  rates?: { label: string; value: string }[];
  photo: Photo | null;
  icon: EquipmentIcon;
  confirmed: boolean;
  /** d'où vient la confirmation (usage interne) */
  source: string;
};

export const equipment: Equipment[] = [
  {
    id: "rouleaux",
    name: "Lavage automatique",
    headline: ["Lavage", "automatique."],
    description: "Le portique à rouleaux. Vous choisissez votre programme, vous avancez, les brosses font le travail.",
    tips: [
      "Fermez les vitres et le toit ouvrant.",
      "Rabattez les rétroviseurs.",
      "Retirez ou rétractez l'antenne si nécessaire.",
      "Vérifiez les accessoires extérieurs : porte-vélos, barres de toit.",
      "Suivez les consignes affichées sur le portique.",
    ],
    photo: photos.portique,
    icon: "rollers",
    confirmed: true,
    source: "Photo de la station (panneau « Lavage automatique » et portique)",
  },
  {
    id: "haute-pression",
    name: "Pistes haute pression",
    headline: ["Haute pression.", "À votre rythme."],
    description:
      "Des pistes couvertes en libre-service, avec lance haute pression. Sur place, une borne de produit jantes et démoustiquant.",
    tips: [
      "Commencez par le bas de caisse et les jantes, là où la saleté s'accroche.",
      "Lavez de haut en bas, en gardant la lance à distance de la carrosserie.",
      "Terminez par un rinçage complet avant que le produit ne sèche.",
    ],
    rates: [
      { label: "Produit jantes + démoustiquant · 1 €", value: "30 s" },
      { label: "Produit jantes + démoustiquant · 2 € ou 1 jeton", value: "1 min" },
    ],
    photo: photos.piste,
    icon: "spray",
    confirmed: true,
    source: "Photos des pistes et de la borne produit jantes",
  },
  {
    id: "aspiration",
    name: "Aspiration",
    headline: ["L'extérieur compte.", "L'intérieur aussi."],
    description: "Des aspirateurs pour l'habitacle : tapis, sièges, coffre.",
    tips: [
      "Sortez les tapis et secouez-les avant de les aspirer.",
      "Commencez par les sièges, terminez par le plancher.",
      "Avancez puis reculez les sièges pour atteindre les rails.",
      "Videz le coffre avant de l'aspirer.",
    ],
    rates: [
      { label: "2 €", value: "8 min" },
      { label: "1 €", value: "4 min" },
    ],
    photo: photos.aspirateur,
    icon: "vacuum",
    confirmed: true,
    source: "Photo de l'aspirateur (tarifs affichés)",
  },
  {
    id: "multi-services",
    name: "Multi-services",
    headline: ["La touche", "finale."],
    description:
      "Une borne pour finir le travail : parfums (vanille, anti-tabac, citron, musc blanc), brillant pneus, lave-glace −20 °C, nettoyant tableau de bord et plastiques, gonflage des pneus.",
    tips: [
      "Choisissez le service sur la borne, puis insérez pièces ou jeton.",
      "Le bouton STOP interrompt le service en cours.",
    ],
    rates: [
      { label: "Parfum · 2 € ou 1 jeton", value: "1 min" },
      { label: "Brillant pneus · 2 € ou 1 jeton", value: "1 min 40" },
      { label: "Tableau de bord · 2 € ou 1 jeton", value: "1 min 20" },
      { label: "Lave-glace 1 L · 2 € ou 1 jeton", value: "40 s" },
    ],
    photo: photos.multiServices,
    icon: "sparkle",
    confirmed: true,
    source: "Photo de la borne multi-services (2 € ou 1 jeton)",
  },
];

export const confirmedEquipment = equipment.filter((e) => e.confirmed);
