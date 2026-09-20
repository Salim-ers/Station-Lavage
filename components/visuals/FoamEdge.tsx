"use client";

import { useRef, type CSSProperties } from "react";
import { m, useScroll, useTransform } from "framer-motion";

const BUBBLES = [
  { left: "8%", size: 7, dur: "6.5s", delay: "0s", drift: "10px" },
  { left: "21%", size: 4, dur: "7.5s", delay: "1.4s", drift: "-6px" },
  { left: "37%", size: 9, dur: "8s", delay: ".6s", drift: "12px" },
  { left: "55%", size: 5, dur: "6s", delay: "2.2s", drift: "-10px" },
  { left: "68%", size: 8, dur: "7s", delay: "1s", drift: "6px" },
  { left: "84%", size: 4, dur: "6.8s", delay: "2.8s", drift: "-8px" },
  { left: "93%", size: 6, dur: "7.8s", delay: ".3s", drift: "9px" },
];

/**
 * Transition « mousse » : la section claire monte sur la précédente avec une
 * bordure de mousse photographique et quelques micro-bulles.
 * À placer dans une section `relative` au fond clair.
 */
export function FoamEdge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.6], ["45%", "0%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0px", "-220px"]);

  return (
    <m.div ref={ref} aria-hidden="true" className="foam-edge" style={{ y, backgroundPositionX: bgX }}>
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={
            {
              left: b.left,
              width: b.size,
              height: b.size,
              "--dur": b.dur,
              "--delay": b.delay,
              "--drift": b.drift,
            } as CSSProperties
          }
        />
      ))}
    </m.div>
  );
}
