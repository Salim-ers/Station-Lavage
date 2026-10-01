/**
 * PROGRAMMES DU LAVAGE AUTOMATIQUE (portique)
 * Les prix sont confirmés. Le détail de chaque programme reste à fournir :
 *  - `features` : liste des prestations (vide → la liste n'est pas affichée)
 *  - `duration` : durée (null → non affichée)
 *
 * `look` ne sert qu'au design des cartes (minimal → signature). Aucun libellé
 * du type « recommandé » ou « le plus populaire » n'est affiché.
 */

export type Program = {
  id: string;
  price: number;
  name: string;
  description: string | null;
  features: string[];
  duration: string | null;
  look: "minimal" | "rich" | "signature";
};

export const programs: Program[] = [
  {
    id: "programme-6",
    price: 6,
    name: "Programme 6 €",
    description: "Lavage automatique au portique à rouleaux.",
    features: [],
    duration: null,
    look: "minimal",
  },
  {
    id: "programme-8",
    price: 8,
    name: "Programme 8 €",
    description: "Lavage automatique au portique à rouleaux.",
    features: [],
    duration: null,
    look: "rich",
  },
  {
    id: "programme-12",
    price: 12,
    name: "Programme 12 €",
    description: "Lavage automatique au portique à rouleaux.",
    features: [],
    duration: null,
    look: "signature",
  },
];

export const PROGRAM_PLACEHOLDERS = {
  details: "[DÉTAILS DU PROGRAMME À RENSEIGNER]",
  option: "[OPTION À RENSEIGNER]",
  slots: 3,
} as const;

export const minPrice = Math.min(...programs.map((p) => p.price));
export const priceList = programs.map((p) => `${p.price} €`);
