"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/data/navigation";
import { links, station, fullAddress } from "@/data/station";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu à chaque navigation
  useEffect(() => setOpen(false), [pathname]);

  // Menu mobile : verrouillage du scroll, Échap, focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,height] duration-300",
          scrolled
            ? "h-16 border-white/10 bg-carbon/75 shadow-[0_18px_40px_-24px_rgba(0,0,0,.9)] backdrop-blur-md"
            : "h-20 border-transparent bg-transparent",
          open && "border-transparent bg-carbon",
        )}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Logo compact={scrolled} />

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-7 text-[.9rem] font-medium text-white/80">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="nav-link transition-colors hover:text-white aria-[current=page]:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={links.directions}
              leadingIcon="pin"
              icon={null}
              size="sm"
              className="hidden sm:inline-flex"
              cursor="→"
            >
              Itinéraire
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="grid size-11 place-items-center rounded-[var(--radius-small)] border border-white/15 text-white transition-colors hover:border-white/40 xl:hidden"
            >
              <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
              <Icon name={open ? "close" : "menu"} className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran (mobile / tablette) */}
      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-carbon pt-24 xl:hidden"
      >
        <div className="container-x flex min-h-full flex-col pb-10">
          <nav aria-label="Navigation mobile">
            <ul className="border-t border-white/10">
              {mainNav.map((item, i) => (
                <li
                  key={item.href}
                  className="border-b border-white/10 opacity-0 [animation:menu-in_.5s_var(--ease-jet)_forwards]"
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-[1.55rem] font-[780] uppercase tracking-[-0.02em] text-white/85 transition-colors hover:text-white aria-[current=page]:text-h2au-bright sm:text-[2rem]"
                    style={{ fontStretch: "115%" }}
                  >
                    {item.label}
                    <Icon name="arrow" className="size-5 text-metal" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <ButtonLink href={links.tel} variant="secondary" leadingIcon="phone" icon={null}>
              Appeler
            </ButtonLink>
            <ButtonLink href={links.directions} leadingIcon="pin" icon={null}>
              Itinéraire
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-metal">
            {station.name}, {fullAddress}
            <br />
            {station.openingHoursLong} · {station.phone.display}
          </p>
        </div>
      </div>
    </>
  );
}
