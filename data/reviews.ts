/**
 * AVIS
 * N'ajouter que de vrais avis, copiés à l'identique.
 * Tant que la liste est vide, des emplacements « [AVIS GOOGLE À INTÉGRER] » s'affichent.
 */

export type Review = {
  firstName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // ex. "mars 2026"
};

export const reviews: Review[] = [];

/** Note relevée sur la fiche Google (capture fournie). Mettre à jour ou passer `show` à false. */
export const googleRating = {
  show: true,
  value: 4.0,
  count: 180,
  capturedAt: "septembre 2026",
};
