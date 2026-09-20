"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Anneau 24 h : 24 graduations, un arc qui se remplit jusqu'à l'heure
 * actuelle et un point lumineux. La station étant ouverte 24h/24, l'état
 * « Ouvert » est toujours vrai. Rendu serveur : anneau neutre (pas d'heure).
 */
export function DayRing({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const R = 150;
  const C = 2 * Math.PI * R;
  // heure de la station (Europe/Paris), quel que soit le fuseau du visiteur
  const parts = now
    ? new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Paris" }).formatToParts(now)
    : [];
  const hh = Number(parts.find((x) => x.type === "hour")?.value ?? 0) % 24;
  const mm = Number(parts.find((x) => x.type === "minute")?.value ?? 0);
  const frac = now ? (hh * 60 + mm) / 1440 : 0;
  const angle = frac * 2 * Math.PI - Math.PI / 2;
  const time = now ? `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}` : "";
  const dark = tone === "dark";

  return (
    <figure className={cn("relative aspect-square w-full max-w-[420px]", className)}>
      <svg viewBox="0 0 360 360" className="h-full w-full" role="img" aria-label={now ? `Il est ${time} : la station est ouverte, comme à toute heure.` : "Station ouverte 24h/24"}>
        <circle cx="180" cy="180" r={R} fill="none" strokeWidth="2" className={dark ? "stroke-white/10" : "ring-track"} />
        {Array.from({ length: 24 }, (_, h) => {
          const a = (h / 24) * 2 * Math.PI - Math.PI / 2;
          const major = h % 6 === 0;
          const r1 = R + 12;
          const r2 = R + (major ? 26 : 19);
          return (
            <line
              key={h}
              x1={180 + r1 * Math.cos(a)}
              y1={180 + r1 * Math.sin(a)}
              x2={180 + r2 * Math.cos(a)}
              y2={180 + r2 * Math.sin(a)}
              strokeWidth={major ? 2 : 1}
              className={dark ? "stroke-white/30" : "tick"}
            />
          );
        })}
        <circle
          cx="180"
          cy="180"
          r={R}
          fill="none"
          stroke="var(--color-h2au)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - frac)}
          transform="rotate(-90 180 180)"
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)" }}
        />
        {now && (
          <g>
            <circle cx={180 + R * Math.cos(angle)} cy={180 + R * Math.sin(angle)} r="16" fill="var(--color-h2au-bright)" opacity=".18" />
            <circle cx={180 + R * Math.cos(angle)} cy={180 + R * Math.sin(angle)} r="6" fill="var(--color-h2au-bright)" />
          </g>
        )}
        {["0h", "6h", "12h", "18h"].map((l, i) => {
          const a = (i / 4) * 2 * Math.PI - Math.PI / 2;
          return (
            <text
              key={l}
              x={180 + (R - 26) * Math.cos(a)}
              y={180 + (R - 26) * Math.sin(a) + 4}
              textAnchor="middle"
              className={cn("text-[11px] font-semibold", dark ? "fill-white/45" : "fill-[#444b4b]")}
            >
              {l}
            </text>
          );
        })}
      </svg>
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={cn("t-label", dark ? "text-metal" : "text-graphite")}>{now ? "Il est" : "Ouvert"}</span>
        <span className="mt-1 text-[clamp(2.4rem,7vw,3.6rem)] font-[820] tabular-nums leading-none" style={{ fontStretch: "112%" }}>
          {now ? time : "24h/24"}
        </span>
        <span className={cn("mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.14em]", dark ? "text-h2au-bright" : "text-h2au-deep")}>
          <span className="gps scale-75" aria-hidden="true">
            <i />
          </span>
          Ouvert
        </span>
      </figcaption>
    </figure>
  );
}
