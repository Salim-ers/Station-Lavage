"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { fullAddress, links, station } from "@/data/station";
import { cn } from "@/lib/utils";

export const MAP_CONSENT_KEY = "h2au-consent-maps";

/**
 * Carte Google Maps chargée uniquement à la demande (Google dépose des cookies).
 * Le choix est mémorisé dans le navigateur ; il se réinitialise sur /cookies.
 */
export function StationMap({ className, wide = false }: { className?: string; wide?: boolean }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(MAP_CONSENT_KEY) === "1") setLoad(true);
    } catch {}
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(MAP_CONSENT_KEY, "1");
    } catch {}
    setLoad(true);
  };

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[var(--radius-medium)] border border-white/10 bg-ink", wide ? "sm:aspect-[21/9]" : "sm:aspect-[4/3]", className)}>
      {load ? (
        <iframe
          title={`Carte : ${station.name}, ${fullAddress}`}
          src={links.mapEmbed}
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.3)_contrast(1.05)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          {/* plan stylisé (aucune donnée tierce chargée) */}
          <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <defs>
              <pattern id="blocks" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
                <rect width="40" height="40" fill="#101414" />
                <rect x="3" y="3" width="34" height="34" rx="2" fill="#141a1a" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#blocks)" />
            <path d="M-20 210C80 190 160 200 240 150S360 60 430 40" stroke="#253030" strokeWidth="14" fill="none" />
            <path d="M-20 210C80 190 160 200 240 150S360 60 430 40" stroke="#2f3b3b" strokeWidth="1" strokeDasharray="6 8" fill="none" />
            <path d="M120 -20C140 80 150 200 130 320" stroke="#1e2727" strokeWidth="9" fill="none" />
            <path d="M-20 90C100 110 260 100 420 130" stroke="#1e2727" strokeWidth="6" fill="none" />
            <circle cx="236" cy="152" r="60" fill="url(#g)" />
            <radialGradient id="g">
              <stop offset="0" stopColor="#2be38c" stopOpacity=".25" />
              <stop offset="1" stopColor="#2be38c" stopOpacity="0" />
            </radialGradient>
          </svg>
          <div className="absolute left-[59%] top-[50.5%] -translate-x-1/2 -translate-y-1/2">
            <span className="gps scale-150" aria-hidden="true">
              <i />
            </span>
          </div>
          <div className="absolute left-[59%] top-[50.5%] ml-5 -translate-y-1/2 rounded-[var(--radius-small)] bg-carbon/85 px-3 py-2 text-xs font-bold uppercase tracking-[.12em] backdrop-blur">
            {station.name}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-carbon via-carbon/90 to-transparent p-5 pt-16 md:p-7 md:pt-20">
            <button type="button" onClick={accept} className="btn btn-secondary btn-sm w-fit">
              <Icon name="grid" className="size-4" /> Afficher la carte interactive
            </button>
            <p className="text-xs text-metal">
              La carte est fournie par Google Maps, qui peut déposer des cookies.{" "}
              <a href={links.maps} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                Ouvrir dans Google Maps
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
