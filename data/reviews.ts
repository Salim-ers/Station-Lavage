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

/** Avis Google réels (captures fournies par l'exploitant). Date = mois de visite. */
export const reviews: Review[] = [
  {
    firstName: "Annelise P.",
    rating: 5,
    text: "Trop contente de mon passage dans cette station de lavage, le personnel est trop sympa et super pro, ils aident pour l'utilisation des différents appareils, pour gonfler les pneus... La station de lavage est propres, les produits sont de bonnes qualités, mes jantes sont comme neuves 👍",
    date: "décembre 2023",
  },
  {
    firstName: "Fr H.",
    rating: 5,
    text: "Station de lavage idéalement située à côté du supermarché Cora ! Les jetons sont moins chers qu'ailleurs et le personnel au top en cas de soucis ! Je recommande vivement et pour ma part, je n'hésiterai pas à y retourner !",
    date: "septembre 2023",
  },
  {
    firstName: "Tom L.",
    rating: 5,
    text: "Station au top bien entretenu, convivial, produits et matériel toujours opérationnel, patronne toujours à l'écoute, très gentille, accueillante et très souriante. Matériel désinfecter régulièrement et désinfectant mains disponible à côté…",
    date: "mars 2021",
  },
  {
    firstName: "Emilie M.",
    rating: 5,
    text: "Je viens très régulièrement pour laver ma voiture au lavage automatique et pour l'aspirateur. Lavage automatique : Parfait 👍…",
    date: "août 2024",
  },
  {
    firstName: "C. S.",
    rating: 5,
    text: "J'ai habitude de laver mes voitures la bas depuis pas loin de 15 ans, jamais eu a me plaindre ça marche bien. La proprio actuelle est très cool et intervient direct en cas de problème ou propose un remboursement de la monnaie perdue…",
    date: "juillet 2020",
  },
];

/** Note relevée sur la fiche Google (capture fournie). Mettre à jour ou passer `show` à false. */
export const googleRating = {
  show: true,
  value: 4.0,
  count: 180,
  capturedAt: "septembre 2026",
};
