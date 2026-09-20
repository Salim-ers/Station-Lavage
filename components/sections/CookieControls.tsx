"use client";

import { useEffect, useState } from "react";
import { MAP_CONSENT_KEY } from "./StationMap";

/** Permet de retirer (ou donner) l'accord pour la carte Google Maps. */
export function CookieControls() {
  const [maps, setMaps] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setMaps(localStorage.getItem(MAP_CONSENT_KEY) === "1");
    } catch {
      setMaps(false);
    }
  }, []);

  const toggle = () => {
    try {
      if (maps) localStorage.removeItem(MAP_CONSENT_KEY);
      else localStorage.setItem(MAP_CONSENT_KEY, "1");
    } catch {}
    setMaps(!maps);
  };

  if (maps === null) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-medium)] border border-carbon/15 bg-white p-6">
      <div>
        <p className="font-bold">Carte Google Maps</p>
        <p className="text-sm text-graphite" role="status">
          {maps ? "Autorisée : la carte se charge automatiquement." : "Non autorisée : la carte ne se charge qu'après un clic."}
        </p>
      </div>
      <button type="button" onClick={toggle} className="btn btn-secondary-dark btn-sm">
        {maps ? "Retirer mon accord" : "Autoriser"}
      </button>
    </div>
  );
}
