"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Preserve ordinary navigation on HTTP review hosts without Web Crypto. */
export function SiteLink({ onClick, href, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} href={href} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof href === "string" && !window.crypto?.subtle && (!props.target || props.target === "_self")) {
      event.preventDefault();
      window.location.assign(href);
    }
  }} />;
}

