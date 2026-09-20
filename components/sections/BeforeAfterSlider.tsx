"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { CarSilhouette } from "@/components/visuals/CarSilhouette";
import { Icon } from "@/components/ui/Icon";
import { beforeAfter } from "@/data/media";
import { clamp, cn } from "@/lib/utils";

/**
 * Comparateur avant / après (souris, tactile, clavier).
 * Sans vraies photos (data/media.ts → beforeAfter), il affiche une démonstration
 * illustrée clairement signalée « Démonstration visuelle ».
 */
export function BeforeAfterSlider({ className }: { className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const real = beforeAfter.before && beforeAfter.after;

  const fromClientX = useCallback((clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(clamp(((clientX - r.left) / r.width) * 100, 0, 100));
  }, []);

  // Petit mouvement d'invitation, une fois, à l'entrée dans l'écran
  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        let raf = 0;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          setPos(50 - Math.sin(k * Math.PI) * 16);
          if (k < 1) raf = requestAnimationFrame(tick);
          else setHinted(true);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    frame.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    setHinted(true);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) fromClientX(e.clientX);
  };
  const stop = () => setDragging(false);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 20 : 5;
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100, PageDown: pos - 20, PageUp: pos + 20 };
    if (e.key in map) {
      e.preventDefault();
      setPos(clamp(map[e.key], 0, 100));
    }
  };

  return (
    <figure className={cn("relative", className)}>
      <div
        ref={frame}
        className="ba-frame relative aspect-[4/3] overflow-hidden rounded-[var(--radius-medium)] bg-anthracite md:aspect-[16/8]"
        data-dragging={dragging}
        data-cursor={hinted ? undefined : "Glisser"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
      >
        {/* APRÈS (dessous) */}
        <div className="absolute inset-0">
          {real ? (
            <Image src={beforeAfter.after!.src} alt={beforeAfter.after!.alt} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
          ) : (
            <DemoScene state="after" />
          )}
        </div>
        {/* AVANT (dessus, découpé) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {real ? (
            <Image src={beforeAfter.before!.src} alt={beforeAfter.before!.alt} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
          ) : (
            <DemoScene state="before" />
          )}
        </div>

        <span className="t-label absolute left-4 top-4 rounded-full bg-carbon/70 px-3 py-1.5 text-white backdrop-blur md:left-6 md:top-6">Avant</span>
        <span className="t-label absolute right-4 top-4 rounded-full bg-h2au px-3 py-1.5 text-carbon md:right-6 md:top-6">Après</span>
        {!real && (
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-carbon/70 px-3 py-1.5 text-[.72rem] font-semibold uppercase tracking-[.12em] text-white/80 backdrop-blur md:bottom-6 md:left-6">
            <Icon name="alert" className="size-3.5" /> Démonstration visuelle
          </span>
        )}

        <div className="ba-handle" style={{ left: `${pos}%` }}>
          <button
            type="button"
            role="slider"
            aria-label="Comparer avant et après"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)} % avant`}
            onKeyDown={onKey}
            className="ba-knob"
          >
            <span className="flex items-center">
              <Icon name="chevronLeft" className="size-4" strokeWidth={2.2} />
              <Icon name="chevronRight" className="-ml-1 size-4" strokeWidth={2.2} />
            </span>
          </button>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-graphite">
        {real
          ? "Photos réelles prises à la station H2AU Lavage."
          : "Illustration non contractuelle : les photos avant / après de la station seront ajoutées ici."}
      </figcaption>
    </figure>
  );
}

function DemoScene({ state }: { state: "before" | "after" }) {
  const after = state === "after";
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", after ? "bg-[radial-gradient(ellipse_at_50%_60%,#1f2a26_0%,#0b0f0f_70%)]" : "bg-[radial-gradient(ellipse_at_50%_60%,#2a2721_0%,#0f0e0c_70%)]")}>
      <div className="w-[118%] max-w-none shrink-0 md:w-[82%]">
        <CarSilhouette dirt={after ? 0 : 1} shine={after ? 1 : 0} sweep={after} />
      </div>
      {!after && <span aria-hidden="true" className="absolute inset-0 bg-[url(/textures/dirt.webp)] bg-cover opacity-25 mix-blend-multiply" />}
    </div>
  );
}
