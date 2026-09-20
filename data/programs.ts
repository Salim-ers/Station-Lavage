/**
 * PROGRAMMES DE LAVAGE
 * Les prix sont confirmés. Le détail des prestations ne l'est pas encore :
 *  - `description` : texte court sous le prix (null → « [DÉTAILS DU PROGRAMME À RENSEIGNER] »)
 *  - `features`    : liste des prestations (vide → emplacements « [OPTION À RENSEIGNER] »)
 *
 * Exemple une fois les informations reçues :
 *   name: "Programme Éclat", description: "…", features: ["…", "…"]
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
    description: null,
    features: [],
    duration: null,
    look: "minimal",
  },
  {
    id: "programme-8",
    price: 8,
    name: "Programme 8 €",
    description: null,
    features: [],
    duration: null,
    look: "rich",
  },
  {
    id: "programme-12",
    price: 12,
    name: "Programme 12 €",
    description: null,
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
