"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { links } from "@/data/station";
import { cn } from "@/lib/utils";

/** Barre d'actions mobile : Appeler / Itinéraire / Programmes. Se retire à l'arrivée du footer. */
export function MobileStickyBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { rootMargin: "0px 0px -40px 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-carbon/85 px-3 pt-2 backdrop-blur-md transition-transform duration-300 md:hidden",
        "pb-[max(.5rem,env(safe-area-inset-bottom))]",
        hidden && "translate-y-full",
      )}
      aria-hidden={hidden || undefined}
    >
      <div className="grid grid-cols-[1fr_1.35fr_auto] gap-2">
        <a href={links.tel} tabIndex={hidden ? -1 : 0} className="btn btn-secondary btn-sm !min-h-12 !gap-2">
          <Icon name="phone" className="size-4" />
          Appeler
        </a>
        <a
          href={links.directions}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : 0}
          className="btn btn-primary btn-sm !min-h-12 !gap-2"
        >
          <Icon name="pin" className="size-4" />
          Itinéraire
        </a>
        <Link
          href="/programmes"
          tabIndex={hidden ? -1 : 0}
          className="grid min-h-12 min-w-12 place-items-center rounded-[var(--radius-small)] border border-white/15 px-2 text-center text-[.7rem] font-bold leading-tight text-white"
          style={{ fontStretch: "90%" }}
        >
          <span>
            6·8·12
            <span className="block text-[.6rem] font-semibold text-metal">€</span>
          </span>
          <span className="sr-only"> : voir les programmes</span>
        </Link>
      </div>
    </div>
  );
}
