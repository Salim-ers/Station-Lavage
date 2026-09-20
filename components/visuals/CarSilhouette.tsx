"use client";

import { useEffect, useId, useRef, useState } from "react";
import { m, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Illustration automobile vectorielle (profil générique, aucune marque).
 * Utilisée pour les démonstrations : section immersive, avant/après, timeline, CTA.
 * Ce n'est jamais présenté comme une photo de réalisation H2AU.
 *
 * - dirt  : 0 → 1, couche de salissures
 * - foam  : 0 → 1, couche de mousse
 * - shine : 0 → 1, reflets et liseré vert H2AU
 * - sweep : lance un reflet lumineux qui traverse la carrosserie à l'apparition
 */

type MV = MotionValue<number> | number;

type Props = {
  dirt?: MV;
  foam?: MV;
  shine?: MV;
  sweep?: boolean;
  /** reflet piloté par le scroll (0 → 1) */
  sweepProgress?: MotionValue<number>;
  viewBox?: string;
  className?: string;
  shadow?: boolean;
  title?: string;
};

export const CAR_BODY =
  "M95 305C72 300 64 275 70 255C74 240 86 232 110 228C200 214 320 204 430 196C480 160 540 128 610 116C700 104 800 104 870 118C950 138 1010 170 1060 188C1100 196 1122 206 1128 228C1134 255 1132 285 1112 305L1010 305A76 76 0 1 0 860 305L340 305A76 76 0 1 0 190 305Z";
const WINDOWS = "M462 194C506 161 556 137 618 127C700 118 790 118 852 130C905 142 950 164 986 186Z";

function SweepBand({ progress, fill }: { progress: MotionValue<number>; fill: string }) {
  const x = useTransform(progress, [0, 1], [0, 1900]);
  return (
    <g transform="skewX(-22)">
      <m.rect x="-400" y="60" width="300" height="340" fill={fill} style={{ x }} />
    </g>
  );
}

function Wheel({ cx, id }: { cx: number; id: string }) {
  const spokes = [0, 72, 144, 216, 288];
  return (
    <g>
      <circle cx={cx} cy={292} r={62} fill="#050606" />
      <circle cx={cx} cy={292} r={61} fill="none" stroke="#1d2323" strokeWidth={2} />
      <circle cx={cx} cy={292} r={43} fill={`url(#${id}-rim)`} />
      {spokes.map((a) => (
        <rect
          key={a}
          x={cx - 4.5}
          y={252}
          width={9}
          height={36}
          rx={3}
          fill="#1a2020"
          transform={`rotate(${a} ${cx} 292)`}
        />
      ))}
      <circle cx={cx} cy={292} r={43} fill="none" stroke="#6d7676" strokeOpacity={0.55} strokeWidth={1.5} />
      <circle cx={cx} cy={292} r={10} fill="#2a3131" stroke="#8e9797" strokeOpacity={0.5} />
    </g>
  );
}

export function CarSilhouette({
  dirt = 0,
  foam = 0,
  shine = 1,
  sweep = false,
  sweepProgress,
  viewBox = "40 90 1120 300",
  className,
  shadow = true,
  title,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const [near, setNear] = useState(false);
  const [swept, setSwept] = useState(false);

  // Textures (salissures / mousse) chargées seulement à l'approche de l'écran.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          if (e.intersectionRatio > 0.35) setSwept(true);
        }
      },
      { rootMargin: "400px 0px", threshold: [0, 0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasDirt = typeof dirt !== "number" || dirt > 0;
  const hasFoam = typeof foam !== "number" || foam > 0;

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={cn("block h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#4a5454" />
          <stop offset=".28" stopColor="#222a2a" />
          <stop offset=".5" stopColor="#0f1414" />
          <stop offset=".72" stopColor="#1c2323" />
          <stop offset="1" stopColor="#070909" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f2828" />
          <stop offset=".45" stopColor="#0a0e0e" />
          <stop offset=".62" stopColor="#2c3838" />
          <stop offset="1" stopColor="#060808" />
        </linearGradient>
        <radialGradient id={`${uid}-rim`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#c9d0cf" />
          <stop offset=".5" stopColor="#6c7575" />
          <stop offset="1" stopColor="#262d2d" />
        </radialGradient>
        <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <path d={CAR_BODY} />
        </clipPath>
        <filter id={`${uid}-soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${uid}-glow`} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {shadow && <ellipse cx="600" cy="356" rx="540" ry="16" fill="#000" opacity=".65" filter={`url(#${uid}-soft)`} />}

      <Wheel cx={265} id={uid} />
      <Wheel cx={935} id={uid} />

      <path d={CAR_BODY} fill={`url(#${uid}-body)`} />
      <path d={WINDOWS} fill={`url(#${uid}-glass)`} />
      <rect x="697" y="118" width="11" height="78" fill="#121818" />

      <g clipPath={`url(#${uid}-clip)`}>
        {/* ligne de caractère et arêtes */}
        <path d="M110 238C400 214 800 202 1118 214" stroke="#fff" strokeOpacity=".22" strokeWidth="2" fill="none" />
        <path d="M86 272C400 262 800 258 1126 262" stroke="#000" strokeOpacity=".45" strokeWidth="3" fill="none" />
        <path d="M455 200 468 302M704 197 702 302M872 188 866 300" stroke="#000" strokeOpacity=".55" strokeWidth="2" fill="none" />
        <rect x="610" y="214" width="40" height="6" rx="3" fill="#2b3434" />
        <rect x="850" y="208" width="38" height="6" rx="3" fill="#2b3434" />
        {/* rétroviseur */}
        <path d="M470 190l26-9 7 12-25 7Z" fill="#171d1d" />

        {/* reflets et liseré H2AU */}
        <m.g style={{ opacity: shine }}>
          <path
            d="M430 196C480 160 540 128 610 116C700 104 800 104 870 118C950 138 1010 170 1060 188"
            stroke="#2be38c"
            strokeWidth="5"
            fill="none"
            filter={`url(#${uid}-glow)`}
            opacity=".85"
          />
          <path d="M140 232C400 212 800 200 1100 212" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
          <path d="M150 300C450 292 800 290 1100 294" stroke="#2be38c" strokeOpacity=".35" strokeWidth="6" fill="none" filter={`url(#${uid}-glow)`} />
          <ellipse cx="640" cy="150" rx="170" ry="16" fill="#fff" opacity=".08" />
        </m.g>

        {near && hasDirt && (
          <m.image
            href="/textures/car-dirt.webp"
            x="40"
            y="90"
            width="1120"
            height="300"
            preserveAspectRatio="none"
            style={{ opacity: dirt }}
          />
        )}
        {near && hasFoam && (
          <m.image
            href="/textures/suds.webp"
            x="40"
            y="90"
            width="1120"
            height="300"
            preserveAspectRatio="none"
            style={{ opacity: foam }}
          />
        )}

        {sweepProgress && <SweepBand progress={sweepProgress} fill={`url(#${uid}-sweep)`} />}
        {sweep && (
          <g transform="skewX(-22)">
            <rect
              x="-400"
              y="60"
              width="300"
              height="340"
              fill={`url(#${uid}-sweep)`}
              style={{
                transform: swept ? "translateX(1900px)" : "translateX(0px)",
                transition: swept ? "transform 1.6s cubic-bezier(.22,1,.36,1) .25s" : "none",
              }}
            />
          </g>
        )}
      </g>

      {/* phares : fin trait LED à l'avant, feu arrière */}
      <path d="M76 246 152 236" stroke="#e9fff5" strokeWidth="4" strokeLinecap="round" />
      <path d="M76 246 152 236" stroke="#2be38c" strokeWidth="10" strokeLinecap="round" opacity=".25" filter={`url(#${uid}-glow)`} />
      <path d="M1098 214 1128 224" stroke="#e5484d" strokeWidth="5" strokeLinecap="round" />

      {near && hasDirt && (
        <m.g style={{ opacity: dirt }}>
          <circle cx="265" cy="292" r="60" fill="#5a4a36" opacity=".55" />
          <circle cx="935" cy="292" r="60" fill="#5a4a36" opacity=".55" />
        </m.g>
      )}
    </svg>
  );
}
