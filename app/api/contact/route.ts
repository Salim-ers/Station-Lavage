import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { station } from "@/data/station";

/**
 * Réception du formulaire de contact.
 * Transmet le message en JSON à CONTACT_WEBHOOK_URL (Make, Zapier, n8n,
 * Formspree, service d'e-mail…). Voir .env.example.
 * Protections : champ piège (honeypot), délai minimal de saisie, limite par IP.
 */

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX;
}

export async function POST(req: Request) {
  let data: Partial<ContactPayload>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Robots : on répond « ok » sans rien transmettre
  if (data.website) return NextResponse.json({ ok: true });
  if (typeof data.startedAt === "number" && Date.now() - data.startedAt < 2500) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Trop de messages envoyés. Réessayez dans quelques minutes." }, { status: 429 });
  }

  const errors = validateContact(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const message = {
    firstName: data.firstName!.trim(),
    lastName: data.lastName!.trim(),
    phone: data.phone?.trim() || null,
    email: data.email!.trim(),
    subject: data.subject!.trim(),
    message: data.message!.trim(),
    receivedAt: new Date().toISOString(),
    source: `${station.name} — site web`,
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL absent — message non transmis :", message);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json(
      { ok: false, error: `Le formulaire n'est pas encore relié. Appelez-nous au ${station.phone.display}.` },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] échec d'envoi", err);
    return NextResponse.json(
      { ok: false, error: `L'envoi a échoué. Réessayez ou appelez-nous au ${station.phone.display}.` },
      { status: 502 },
    );
  }
}
