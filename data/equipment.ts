import { photos, type Photo } from "./media";

/**
 * ÉQUIPEMENTS
 * Seuls les équipements `confirmed: true` sont affichés sur le site.
 * Pour en ajouter un : passer `confirmed` à true et compléter les champs.
 */

export type EquipmentIcon = "rollers" | "vacuum" | "drop" | "sparkle" | "spray";

export type Equipment = {
  id: string;
  name: string;
  headline: string[];
  description: string;
  tips: string[];
  photo: Photo | null;
  icon: EquipmentIcon;
  confirmed: boolean;
  /** d'où vient la confirmation (usage interne) */
  source: string;
};

export const equipment: Equipment[] = [
  {
    id: "rouleaux",
    name: "Rouleaux",
    headline: ["Rouleaux."],
    description: "Le portique à rouleaux de la station. Vous avancez, les brosses font le travail.",
    tips: [
      "Fermez les vitres et le toit ouvrant.",
      "Rabattez les rétroviseurs.",
      "Retirez ou rétractez l'antenne si nécessaire.",
      "Vérifiez les accessoires extérieurs : porte-vélos, barres de toit.",
      "Suivez les consignes affichées sur le portique.",
    ],
    photo: photos.portiqueRouleaux,
    icon: "rollers",
    confirmed: true,
    source: "Photo du portique sur la fiche Google",
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
    photo: null,
    icon: "vacuum",
    confirmed: true,
    source: "Services listés sur la fiche Google (nettoyage à l'aspirateur de l'intérieur)",
  },
  // --- À CONFIRMER : non affichés tant que `confirmed` vaut false ---
  {
    id: "haute-pression",
    name: "Haute pression",
    headline: ["Haute pression."],
    description: "[INFORMATION À RENSEIGNER]",
    tips: [],
    photo: null,
    icon: "spray",
    confirmed: false,
    source: "À confirmer",
  },
  {
    id: "mousse",
    name: "Mousse",
    headline: ["Mousse."],
    description: "[INFORMATION À RENSEIGNER]",
    tips: [],
    photo: null,
    icon: "drop",
    confirmed: false,
    source: "À confirmer",
  },
  {
    id: "finition",
    name: "Finition",
    headline: ["Finition."],
    description: "[INFORMATION À RENSEIGNER]",
    tips: [],
    photo: null,
    icon: "sparkle",
    confirmed: false,
    source: "« Lustrage de carrosserie » apparaît sur la fiche Google — à confirmer",
  },
];

export const confirmedEquipment = equipment.filter((e) => e.confirmed);
