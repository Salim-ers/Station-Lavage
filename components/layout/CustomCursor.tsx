"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur contextuel très léger : une étiquette suit la souris au survol des
 * éléments porteurs de `data-cursor` (galerie « Voir », prix, CTA…).
 * Desktop à pointeur fin uniquement ; désactivé si mouvement réduit.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x + 16}px, ${y + 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const label = target?.dataset.cursor;
      if (label) {
        if (el.textContent !== label) el.textContent = label;
        el.classList.add("is-on");
      } else {
        el.classList.remove("is-on");
      }
    };
    const onLeave = () => el.classList.remove("is-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-tag" aria-hidden="true" />;
}
