"use client";

import Link from "next/link";
import type {
  AriaRole,
  PointerEvent,
  ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "yellow" | "outline" | "light";
  target?: "_blank";
  rel?: string;
  ariaLabel?: string;
  role?: AriaRole;
};

export default function MagneticButton({
  href,
  children,
  className = "",
  variant = "yellow",
  target,
  rel,
  ariaLabel,
  role,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();

  function handlePointerMove(
    event: PointerEvent<HTMLAnchorElement>,
  ) {
    if (
      reduceMotion ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX -
        bounds.left -
        bounds.width / 2) *
      0.14;

    const y =
      (event.clientY -
        bounds.top -
        bounds.height / 2) *
      0.14;

    event.currentTarget.style.setProperty(
      "--magnetic-x",
      `${x}px`,
    );

    event.currentTarget.style.setProperty(
      "--magnetic-y",
      `${y}px`,
    );
  }

  function reset(
    event: PointerEvent<HTMLAnchorElement>,
  ) {
    event.currentTarget.style.setProperty(
      "--magnetic-x",
      "0px",
    );

    event.currentTarget.style.setProperty(
      "--magnetic-y",
      "0px",
    );
  }

  const content = (
    <>
      <span className="button-label">
        {children}
      </span>

      <span
        className="button-arrow"
        aria-hidden="true"
      >
        ↗
      </span>
    </>
  );

  const classes =
    `button button--${variant} ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link
        className={classes}
        href={href}
        aria-label={ariaLabel}
        role={role}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      aria-label={ariaLabel}
      role={role}
      target={target}
      rel={rel}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {content}
    </a>
  );
}