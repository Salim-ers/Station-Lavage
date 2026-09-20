import type { ReactNode } from "react";
import { JetRule } from "@/components/ui/Reveal";

/** Mise en page sobre des pages légales. */
export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <header className="bg-carbon pb-14 pt-32 md:pt-40">
        <div className="container-x">
          <h1 className="t-xl max-w-[16ch]">{title}</h1>
          <JetRule className="mt-8 w-28" />
          {updated && <p className="mt-6 text-sm text-metal">Dernière mise à jour : {updated}</p>}
        </div>
      </header>
      <div className="section-light py-16 md:py-24">
        <div className="container-x">
          <div className="legal max-w-3xl">{children}</div>
        </div>
      </div>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-extrabold uppercase leading-tight" style={{ fontStretch: "110%" }}>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-carbon/85">{children}</div>
    </section>
  );
}
