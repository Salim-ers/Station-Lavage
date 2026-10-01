/**
 * PROGRAMMES DU LAVAGE AUTOMATIQUE (portique)
 * Relevés sur le panneau « Programmes » du portique Christ (photo d'octobre 2026).
 * Sur le panneau, le n°1 est le plus complet (22 €) et le n°6 le plus simple (6 €).
 * Chaque programme reprend les prestations du précédent et en ajoute.
 *
 * `look` ne sert qu'au design des cartes. Aucun libellé du type « recommandé »
 * ou « le plus populaire » n'est affiché.
 */

export type Program = {
  id: string;
  /** numéro affiché sur le panneau du portique */
  number: number;
  price: number;
  name: string;
  description: string | null;
  features: string[];
  duration: string | null;
  look: "minimal" | "rich" | "signature";
};

const S = {
  prelavage: "Prélavage démoustiquant",
  jantes: "Jantes haute pression",
  mousse: "Mousse active",
  lavage: "Lavage brosses douces",
  chassis: "Lavage châssis",
  cire: "Cire polish",
  cirePlus: "Cire polish +",
  sechage: "Séchage",
  sechagePlus: "Séchage +",
};

export const programs: Program[] = [
  {
    id: "programme-6",
    number: 6,
    price: 6,
    name: "Programme n°6",
    description: "L'essentiel : lavage et séchage.",
    features: [S.lavage, S.sechage],
    duration: null,
    look: "minimal",
  },
  {
    id: "programme-8",
    number: 5,
    price: 8,
    name: "Programme n°5",
    description: "Avec mousse active.",
    features: [S.mousse, S.lavage, S.sechage],
    duration: null,
    look: "minimal",
  },
  {
    id: "programme-12",
    number: 4,
    price: 12,
    name: "Programme n°4",
    description: "Prélavage et jantes haute pression en plus.",
    features: [S.prelavage, S.jantes, S.mousse, S.lavage, S.sechage],
    duration: null,
    look: "rich",
  },
  {
    id: "programme-16",
    number: 3,
    price: 16,
    name: "Programme n°3",
    description: "Avec une cire polish pour la brillance.",
    features: [S.prelavage, S.jantes, S.mousse, S.lavage, S.cire, S.sechage],
    duration: null,
    look: "rich",
  },
  {
    id: "programme-18",
    number: 2,
    price: 18,
    name: "Programme n°2",
    description: "Avec le lavage du châssis.",
    features: [S.prelavage, S.jantes, S.mousse, S.lavage, S.chassis, S.sechagePlus],
    duration: null,
    look: "signature",
  },
  {
    id: "programme-22",
    number: 1,
    price: 22,
    name: "Programme n°1",
    description: "Le plus complet.",
    features: [S.prelavage, S.jantes, S.mousse, S.lavage, S.chassis, S.cirePlus, S.sechagePlus],
    duration: null,
    look: "signature",
  },
];

export const PROGRAM_PLACEHOLDERS = {
  details: "[DÉTAILS DU PROGRAMME À RENSEIGNER]",
} as const;

export const minPrice = Math.min(...programs.map((p) => p.price));
export const maxPrice = Math.max(...programs.map((p) => p.price));
export const priceList = programs.map((p) => `${p.price} €`);
/** « 6 programmes, de 6 € à 22 € » */
export const programsSummary = `${programs.length} programmes, de ${minPrice} € à ${maxPrice} €`;
