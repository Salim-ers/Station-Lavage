import { cn } from "@/lib/utils";

/** Composition « aspiration » : flux d'air vers la buse, zones de l'habitacle. */
export function VacuumVisual({ className }: { className?: string }) {
  const zones = ["Tapis", "Sièges", "Coffre", "Habitacle"];
  return (
    <div className={cn("overflow-hidden", className ?? "relative")} aria-hidden="true">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="air" x1="0" x2="1">
            <stop offset="0" stopColor="#2be38c" stopOpacity="0" />
            <stop offset="1" stopColor="#2be38c" stopOpacity=".9" />
          </linearGradient>
          <radialGradient id="nozzle-glow">
            <stop offset="0" stopColor="#2be38c" stopOpacity=".35" />
            <stop offset="1" stopColor="#2be38c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="318" cy="150" r="90" fill="url(#nozzle-glow)" />
        <g className="airflow" fill="none" stroke="url(#air)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M20 40C140 50 230 110 300 146" />
          <path d="M10 100C130 100 220 130 300 148" style={{ animationDelay: "-.4s" }} />
          <path d="M20 170C140 160 230 156 300 151" style={{ animationDelay: "-.8s" }} />
          <path d="M14 240C140 220 230 180 300 154" style={{ animationDelay: "-1.2s" }} />
          <path d="M60 290C160 250 240 190 302 156" style={{ animationDelay: "-.6s" }} />
        </g>
        {/* buse */}
        <path d="M300 138h46a10 10 0 0 1 10 10v4a10 10 0 0 1-10 10h-46l-8-6v-12Z" fill="#1d2424" stroke="#6d7676" strokeOpacity=".6" />
        <path d="M356 150h60" stroke="#2a3232" strokeWidth="12" strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <ul className="absolute left-5 top-5 space-y-1.5 md:left-7 md:top-7">
        {zones.map((z) => (
          <li key={z} className="t-label text-white/55">
            {z}
          </li>
        ))}
      </ul>
    </div>
  );
}
