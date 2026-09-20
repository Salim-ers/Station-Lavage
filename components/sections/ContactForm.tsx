"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SUBJECTS, validateContact, type ContactPayload, type FieldErrors } from "@/lib/contact";
import { links, station } from "@/data/station";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EMPTY: ContactPayload = { firstName: "", lastName: "", phone: "", email: "", subject: "", message: "", consent: false, website: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof ContactPayload>(k: K, v: ContactPayload[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        setValues(EMPTY);
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Le message n'a pas pu être envoyé.");
        setStatus("error");
      }
    } catch {
      setServerError(`Connexion impossible. Réessayez ou appelez-nous au ${station.phone.display}.`);
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-medium)] border border-h2au/40 bg-white p-8 outline-none md:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-h2au text-carbon">
          <Icon name="check" className="size-7" strokeWidth={2.2} />
        </span>
        <p className="t-lg mt-8">Message envoyé.</p>
        <p className="mt-4 text-graphite">Merci, nous revenons vers vous rapidement. Pour une réponse immédiate, appelez le {station.phone.display}.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary-dark btn-sm mt-8">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const field = (name: keyof ContactPayload, label: string, props: React.InputHTMLAttributes<HTMLInputElement> & { optional?: boolean }) => {
    const { optional, ...rest } = props;
    const id = `f-${name}`;
    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm font-semibold">
          {label} {optional ? <span className="font-normal text-graphite">(facultatif)</span> : <span aria-hidden="true" className="text-h2au-deep">*</span>}
        </label>
        <input
          id={id}
          name={name}
          value={values[name] as string}
          onChange={(e) => set(name, e.target.value as never)}
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? `${id}-err` : undefined}
          required={!optional}
          className="field"
          disabled={status === "loading"}
          {...rest}
        />
        {errors[name] && (
          <p id={`${id}-err`} className="mt-2 flex items-center gap-1.5 text-sm text-[#b3261e]">
            <Icon name="alert" className="size-4" /> {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("firstName", "Prénom", { autoComplete: "given-name" })}
        {field("lastName", "Nom", { autoComplete: "family-name" })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("phone", "Téléphone", { type: "tel", autoComplete: "tel", inputMode: "tel", optional: true })}
        {field("email", "E-mail", { type: "email", autoComplete: "email", inputMode: "email" })}
      </div>

      <div>
        <label htmlFor="f-subject" className="mb-2 block text-sm font-semibold">
          Sujet <span aria-hidden="true" className="text-h2au-deep">*</span>
        </label>
        <select
          id="f-subject"
          name="subject"
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "f-subject-err" : undefined}
          required
          className="field"
          disabled={status === "loading"}
        >
          <option value="" disabled>
            Choisir un sujet
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="f-subject-err" className="mt-2 flex items-center gap-1.5 text-sm text-[#b3261e]">
            <Icon name="alert" className="size-4" /> {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="f-message" className="mb-2 block text-sm font-semibold">
          Message <span aria-hidden="true" className="text-h2au-deep">*</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "f-message-err" : undefined}
          required
          maxLength={3000}
          className="field resize-y"
          disabled={status === "loading"}
        />
        {errors.message && (
          <p id="f-message-err" className="mt-2 flex items-center gap-1.5 text-sm text-[#b3261e]">
            <Icon name="alert" className="size-4" /> {errors.message}
          </p>
        )}
      </div>

      {/* champ piège pour les robots : invisible pour les visiteurs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Ne pas remplir</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-graphite">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "f-consent-err" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-h2au-deep)]"
            disabled={status === "loading"}
          />
          <span>
            J&apos;accepte que mes données soient utilisées pour répondre à ma demande, conformément à la{" "}
            <Link href="/politique-confidentialite" className="font-semibold text-carbon underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="f-consent-err" className="mt-2 flex items-center gap-1.5 text-sm text-[#b3261e]">
            <Icon name="alert" className="size-4" /> {errors.consent}
          </p>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status === "error" && serverError && (
          <p role="alert" className="flex items-start gap-2 rounded-[var(--radius-small)] border border-[#b3261e]/30 bg-[#b3261e]/5 p-4 text-sm text-[#8c1d17]">
            <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
            <span>
              {serverError}{" "}
              <a href={links.tel} className="font-semibold underline">
                Appeler
              </a>
            </span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p id="form-note" className="text-sm text-graphite">
          <span aria-hidden="true" className="text-h2au-deep">*</span> Champs obligatoires
        </p>
        <button type="submit" className={cn("btn btn-primary min-w-[12rem]")} disabled={status === "loading"} aria-busy={status === "loading"}>
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Envoi…
            </>
          ) : (
            <>
              Envoyer <Icon name="arrow" className="btn-icon size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
