/**
 * DISTRIBUTEUR DE JETONS — offres relevées sur la borne (photo de septembre 2026).
 * Les tarifs des services (aspirateur, multi-services…) sont dans data/equipment.ts.
 */

export const tokenPacks = [
  { price: 10, tokens: 2 },
  { price: 20, tokens: 5 },
  { price: 40, tokens: 11 },
  { price: 60, tokens: 17 },
];

export const tokenNotes = [
  "Carte bancaire, sans contact (Apple Pay) ou billets.",
  "Le distributeur ne rend pas la monnaie.",
  "Tout crédit validé ne peut être ni annulé, ni remboursé.",
];
