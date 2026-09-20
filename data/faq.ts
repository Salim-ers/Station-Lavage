import { programs } from "./programs";
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
    q: "Combien coûte un lavage ?",
    answer: `Trois programmes sont proposés : ${prices.slice(0, -1).join(", ")} et ${prices[prices.length - 1]}.`,
  },
  { q: "Où se trouve la station ?", answer: `${fullAddress} — ${station.address.complement}.` },
  { q: "Comment payer ?", answer: station.paymentMethods.length ? station.paymentMethods.join(", ") + "." : null },
  { q: "Peut-on aspirer l'intérieur de sa voiture ?", answer: "Oui, des aspirateurs sont à disposition pour l'habitacle." },
  { q: "Que contient chaque programme ?", answer: null },
  { q: "Combien de temps dure un lavage ?", answer: null },
];

export const FAQ_TODO = TODO.info;
