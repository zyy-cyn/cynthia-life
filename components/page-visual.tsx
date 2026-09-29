"use client";

import type { CSSProperties, Ref } from "react";
import { pageVisuals, type PageKey } from "@/content/page-visuals";
import { useSite } from "@/components/site-provider";

/** The only primary-image renderer. Home remains full-frame and unfiltered. */
export function PageVisual({ page, className = "", imageRef, priority = false }: { page: PageKey; className?: string; imageRef?: Ref<HTMLImageElement>; priority?: boolean }) {
  const { lang } = useSite();
  const visual = pageVisuals[page];
  return <img ref={imageRef} src={visual.src} alt={lang === "zh" ? visual.altZh : visual.altEn} width={visual.width} height={visual.height}
    className={`page-visual page-visual-${page} ${className}`} style={{ "--position-desktop": visual.objectPositionDesktop, "--position-mobile": visual.objectPositionMobile } as CSSProperties}
    fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} decoding="async" />;
}

