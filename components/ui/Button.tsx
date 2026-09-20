import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "secondary-dark";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: IconName | null;
  leadingIcon?: IconName;
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  /** libellé du curseur contextuel (desktop) */
  cursor?: string;
  "aria-label"?: string;
};

/** Lien stylé en bouton. Les liens externes (Maps) s'ouvrent dans un nouvel onglet. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  leadingIcon,
  size = "md",
  block,
  className,
  cursor,
  ...rest
}: Props) {
  const cls = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", block && "btn-block", className);
  const isHttp = /^https?:/.test(href);
  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} className="size-[1.1rem]" />}
      <span>{children}</span>
      {icon && <Icon name={icon} className="btn-icon size-4" />}
      {isHttp && <span className="sr-only"> (nouvel onglet)</span>}
    </>
  );

  if (isHttp || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        data-cursor={cursor}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cursor={cursor} {...rest}>
      {content}
    </Link>
  );
}
