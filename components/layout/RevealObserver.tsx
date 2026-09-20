"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Déclenche les révélations au scroll : ajoute `.is-in` aux éléments
 * [data-reveal] et [data-inview] quand ils entrent dans l'écran (une seule fois).
 * Sans JavaScript, rien n'est masqué (les styles ne s'appliquent qu'avec html.js).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0 },
    );

    const scan = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-in), [data-inview]:not(.is-in)")
        .forEach((el) => io.observe(el));

    scan();
    // Contenu ajouté après coup (visionneuse, formulaire, carte…)
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
