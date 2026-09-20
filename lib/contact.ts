/** Règles partagées entre le formulaire (navigateur) et la route API (serveur). */

export const SUBJECTS = ["Question générale", "Programmes et tarifs", "Équipements", "Autre"] as const;

export type ContactPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  /** anti-spam */
  website?: string;
  startedAt?: number;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+\d][\d\s.-]{7,18}$/;

export function validateContact(d: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {};
  const t = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  if (t(d.firstName).length < 2) e.firstName = "Indiquez votre prénom.";
  if (t(d.lastName).length < 2) e.lastName = "Indiquez votre nom.";
  if (t(d.phone) && !PHONE.test(t(d.phone))) e.phone = "Ce numéro ne semble pas valide.";
  if (!EMAIL.test(t(d.email))) e.email = "Indiquez une adresse e-mail valide.";
  if (!SUBJECTS.includes(t(d.subject) as (typeof SUBJECTS)[number])) e.subject = "Choisissez un sujet.";
  if (t(d.message).length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
  if (t(d.message).length > 3000) e.message = "Votre message est trop long (3 000 caractères maximum).";
  if (d.consent !== true) e.consent = "Votre accord est nécessaire pour que nous puissions vous répondre.";
  return e;
}
