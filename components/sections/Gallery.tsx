"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/brand/Wordmark";
import type { Photo } from "@/data/media";
import { cn } from "@/lib/utils";

/**
 * Galerie éditoriale (tailles et formats variés) + visionneuse plein écran :
 * clavier (← → Échap), balayage tactile, focus piégé par <dialog>.
 * Les gros plans sont des recadrages : la visionneuse montre toujours la photo entière.
 */
export function Gallery({ items }: { items: Photo[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const startX = useRef<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setIndex(i);
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [index]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      document.body.style.overflow = "";
      setIndex(null);
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [go]);

  const onDown = (e: PointerEvent) => (startX.current = e.clientX);
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const current = index !== null ? items[index] : null;
  const tile = (layout?: Photo["layout"]) =>
    layout === "wide"
      ? "lg:col-span-8 aspect-[4/3] lg:aspect-auto lg:min-h-[560px]"
      : layout === "tall"
        ? "lg:col-span-4 aspect-[3/4] lg:aspect-auto lg:min-h-[560px]"
        : "lg:col-span-4 aspect-square";

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {items.map((p, i) => (
          <li
            key={i}
            data-reveal="fade"
            style={{ ["--d" as string]: `${(i % 3) * 110}ms` }}
            className={cn("relative", tile(p.layout), p.layout === "wide" && "sm:col-span-2")}
          >
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              data-cursor="Voir"
              className="zoom-img group absolute inset-0 overflow-hidden rounded-[var(--radius-medium)] bg-ink text-left"
              aria-label={`Agrandir : ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={p.layout === "wide" ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"}
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: p.focus, "--z": p.zoom ?? 1, transformOrigin: p.focus } as CSSProperties}
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              {p.caption && (
                <span className="absolute bottom-4 left-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[.14em] text-white md:bottom-6 md:left-6">
                  <span className="tabular-nums text-h2au-bright">{String(i + 1).padStart(2, "0")}</span>
                  {p.caption}
                </span>
              )}
            </button>
          </li>
        ))}
        {/* respiration typographique qui complète la composition */}
        <li aria-hidden="true" className="relative hidden aspect-square overflow-hidden rounded-[var(--radius-medium)] border border-white/10 lg:col-span-4 lg:block">
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <Wordmark className="text-outline text-[7.5rem] !leading-none" />
            <p className="t-label text-metal">
              Saint-Maximin
              <br />
              Oise · 60
            </p>
          </div>
        </li>
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Visionneuse de photos"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="relative flex h-full flex-col" onPointerDown={onDown} onPointerUp={onUp}>
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <p className="t-label tabular-nums text-metal">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-white/60" autoFocus>
                <Icon name="close" className="size-5" />
                <span className="sr-only">Fermer</span>
              </button>
            </div>
            <div className="relative mx-4 flex-1 md:mx-24">
              <Image key={index} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-8">
              <p className="max-w-xl text-sm text-white/80">{current.alt}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-white/60">
                  <Icon name="chevronLeft" className="size-5" />
                  <span className="sr-only">Photo précédente</span>
                </button>
                <button type="button" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-white/60">
                  <Icon name="chevronRight" className="size-5" />
                  <span className="sr-only">Photo suivante</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
