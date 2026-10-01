import { programs } from "./programs";
import { tokenPacks } from "./tarifs";
import { station, fullAddress, TODO } from "./station";

/**
 * FAQ — uniquement des réponses confirmées, ou un emplacement à renseigner.
 * `answer: null` → affiche « [INFORMATION À RENSEIGNER] » et exclut la question
 * des données structurées.
 */
export type Faq = { q: string; answer: string | null };

const prices = programs.map((p) => `${p.price} €`);

export const faq: Faq[] = [
  { q: "La station est-elle ouverte la nuit ?", answer: `Oui. La station ${station.name} est ouverte 24h/24.` },
  {
    q: "Combien coûte un lavage automatique ?",
    answer: `Le portique propose ${programs.length} programmes : ${prices.slice(0, -1).join(", ")} et ${prices[prices.length - 1]}. Le détail de chacun est sur la page Programmes & tarifs.`,
  },
  { q: "Où se trouve la station ?", answer: `${fullAddress} — ${station.address.complement}.` },
  { q: "Comment payer ?", answer: station.paymentMethods.length ? station.paymentMethods.join(", ") + "." : null },
  {
    q: "Combien coûtent les jetons ?",
    answer: `Au distributeur : ${tokenPacks.map((t) => `${t.price} € = ${t.tokens} jetons`).join(", ")}. Paiement par carte, sans contact ou billets ; le distributeur ne rend pas la monnaie.`,
  },
  {
    q: "Peut-on aspirer l'intérieur de sa voiture ?",
    answer: "Oui. Les aspirateurs fonctionnent avec des pièces : 1 € pour 4 minutes, 2 € pour 8 minutes.",
  },
  {
    q: "Peut-on parfumer la voiture ou gonfler les pneus ?",
    answer:
      "Oui, la borne multi-services propose parfums (vanille, anti-tabac, citron, musc blanc), brillant pneus, lave-glace −20 °C, nettoyant tableau de bord et gonflage des pneus, pour 2 € ou 1 jeton.",
  },
  {
    q: "Qui contacter en cas de problème ?",
    answer: `L'assistance répond au ${station.phone.display}${station.email ? `, ou par e-mail à ${station.email}` : ""}.`,
  },
];

export const FAQ_TODO = TODO.info;
