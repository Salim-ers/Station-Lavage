import type { SVGProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconName =
  | "pin" | "phone" | "arrow" | "arrowUpRight" | "clock" | "menu" | "close"
  | "drop" | "rollers" | "vacuum" | "sparkle" | "spray" | "chevronLeft" | "chevronRight"
  | "star" | "starOutline" | "route" | "check" | "alert" | "grid";

const paths: Record<IconName, ReactNode> = {
  pin: (<><path d="M12 21s-7-6.2-7-11.6a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.4" r="2.4" /></>),
  phone: <path d="M5.2 3.5h3l1.7 4.2-2.1 1.4a11 11 0 0 0 5.1 5.1l1.4-2.1 4.2 1.7v3a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2Z" />,
  arrow: <path d="M4 12h15.5M13.5 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  menu: <path d="M3.5 8.5h17M3.5 15.5h11" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  drop: <path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0c0-4.2 6-10.6 6-10.6Z" />,
  rollers: (<><path d="M3 4h18" /><rect x="5" y="6.5" width="4.2" height="14" rx="1.6" /><rect x="14.8" y="6.5" width="4.2" height="14" rx="1.6" /><path d="M5 10h4.2M5 13.5h4.2M5 17h4.2M14.8 10H19M14.8 13.5H19M14.8 17H19" /></>),
  vacuum: (<><path d="M3.5 20.5h8.5" /><path d="M7.5 20.5v-3.5a3 3 0 0 1 3-3h2a3 3 0 0 0 3-3V5.5" /><path d="M13.5 3.5h4" /></>),
  sparkle: <path d="M12 3.5c.6 4.3 2.2 5.9 6.5 6.5-4.3.6-5.9 2.2-6.5 6.5-.6-4.3-2.2-5.9-6.5-6.5 4.3-.6 5.9-2.2 6.5-6.5ZM18.5 16c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3Z" />,
  spray: (<><path d="M4 14h7l2-3h3" /><path d="M16 11l4.5-2M16 11l4.5 0M16 11l4.5 2" /><path d="M6 14v6" /></>),
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  star: <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" fill="currentColor" stroke="none" />,
  starOutline: <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" />,
  route: (<><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6.5a3.5 3.5 0 0 0 0-7h-5a3.5 3.5 0 0 1 0-7H16" /></>),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.8v5M12 16.2h.01" /></>),
  grid: (<><rect x="4" y="4" width="6.5" height="6.5" /><rect x="13.5" y="4" width="6.5" height="6.5" /><rect x="4" y="13.5" width="6.5" height="6.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" /></>),
};

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, className, strokeWidth = 1.6, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
