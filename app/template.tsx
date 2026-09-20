"use client";

import { m } from "framer-motion";
import { useState, type ReactNode } from "react";

let hasMounted = false;

/**
 * Transition de page (≈ 450 ms) : un masque carbone se retire, poussé par
 * une ligne d'eau verte. Jamais au premier chargement, seulement lors des
 * navigations internes. Masquée si mouvement réduit (CSS).
 */
export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const run = hasMounted;
    hasMounted = true;
    return run;
  });

  return (
    <>
      {animate && (
        <m.div
          aria-hidden="true"
          className="page-sweep"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1], delay: 0.04 }}
        />
      )}
      {children}
    </>
  );
}
