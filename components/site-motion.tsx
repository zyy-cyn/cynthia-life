"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/site-provider";

/** Event-driven enhancement: no perpetual animation loop, no motion dependencies. */
export function SiteMotion() {
  const pathname = usePathname();
  const { lang } = useSite();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine) and (min-width: 801px)");
    const still = new URLSearchParams(window.location.search).get("review") === "still";
    const root = document.documentElement;
    let allowed = !reduce.matches && !still;
    let pointerFrame: number | null = null;
    let scrollFrame: number | null = null;
    let target: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let point = { x: 0, y: 0 };
    let disposed = false;
    const imageStage = document.querySelector<HTMLElement>("[data-image-depth]");
    let imageTop = 0;
    let imageHeight = 1;

    function resetPointer() {
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame);
      pointerFrame = null;
      target?.style.setProperty("--magnet-x", "0px");
      target?.style.setProperty("--magnet-y", "0px");
      target?.style.setProperty("--tilt-x", "0deg");
      target?.style.setProperty("--tilt-y", "0deg");
      target = null; bounds = null;
    }
    function motionPreference() {
      allowed = !reduce.matches && !still;
      root.dataset.siteMotion = allowed ? "enabled" : "static";
      resetPointer();
      if (!allowed) imageStage?.style.setProperty("--image-shift", "0px");
      if (!allowed) document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => { element.dataset.reveal = "visible"; });
    }
    function enter(event: PointerEvent) {
      if (!allowed || !fine.matches || event.pointerType !== "mouse") return;
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-spotlight], [data-magnetic], [data-depth]") : null;
      if (element === target) return;
      resetPointer();
      if (element && element.closest("[data-in-view='false']") === null) {
        target = element; bounds = element.getBoundingClientRect();
      }
    }
    function move(event: PointerEvent) {
      if (!target) enter(event);
      if (!target || !bounds || !allowed) return;
      point = { x: event.clientX, y: event.clientY };
      if (pointerFrame !== null) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = null;
        if (!target || !bounds) return;
        const x = Math.max(0, Math.min(1, (point.x - bounds.left) / Math.max(1, bounds.width)));
        const y = Math.max(0, Math.min(1, (point.y - bounds.top) / Math.max(1, bounds.height)));
        if (target.hasAttribute("data-spotlight")) {
          target.style.setProperty("--spot-x", `${x * 100}%`);
          target.style.setProperty("--spot-y", `${y * 100}%`);
        }
        if (target.hasAttribute("data-depth")) {
          target.style.setProperty("--tilt-x", `${(.5 - y) * 2.2}deg`);
          target.style.setProperty("--tilt-y", `${(x - .5) * 2.2}deg`);
        }
        if (target.hasAttribute("data-magnetic")) {
          target.style.setProperty("--magnet-x", `${(x - .5) * 9}px`);
          target.style.setProperty("--magnet-y", `${(y - .5) * 7}px`);
        }
      });
    }
    function leave(event: PointerEvent) {
      if (target && (!(event.relatedTarget instanceof Node) || !target.contains(event.relatedTarget))) resetPointer();
    }
    function scroll() {
      resetPointer();
      if (scrollFrame !== null) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        root.dataset.scrolled = window.scrollY > 64 ? "true" : "false";
        root.style.setProperty("--reading-progress", String(distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0));
        if (!imageStage || !allowed || !fine.matches) return;
        const offset = window.scrollY - imageTop;
        if (offset < -window.innerHeight || offset > imageHeight) return;
        imageStage.style.setProperty("--image-shift", `${Math.max(-4, Math.min(7, offset / imageHeight * 7))}px`);
      });
    }
    function measure() {
      if (disposed) return;
      if (imageStage) { const rect = imageStage.getBoundingClientRect(); imageTop = rect.top + window.scrollY; imageHeight = Math.max(1, rect.height); }
      scroll();
    }
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => { (entry.target as HTMLElement).dataset.inView = String(entry.isIntersecting); });
    }, { threshold: 0 });
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.reveal = "visible";
        reveal.unobserve(entry.target);
      });
    }, { threshold: .05, rootMargin: "0px 0px -24px 0px" });
    const revealElements = document.querySelectorAll<HTMLElement>(".work-entry, .case-chapter, .evidence-heading, .experience-entry");
    revealElements.forEach(element => {
      element.dataset.reveal = allowed && element.getBoundingClientRect().top > window.innerHeight ? "armed" : "visible";
      reveal.observe(element);
    });
    document.querySelectorAll("[data-responsive-module]").forEach(element => visibility.observe(element));
    const resize = new ResizeObserver(measure);
    if (imageStage) resize.observe(imageStage);
    document.addEventListener("pointerover", enter, { passive: true });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    reduce.addEventListener("change", motionPreference);
    fine.addEventListener("change", motionPreference);
    document.fonts.ready.then(measure);
    motionPreference(); measure();
    return () => {
      disposed = true; resetPointer();
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      visibility.disconnect(); reveal.disconnect(); resize.disconnect();
      revealElements.forEach(element => { delete element.dataset.reveal; });
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", measure);
      reduce.removeEventListener("change", motionPreference);
      fine.removeEventListener("change", motionPreference);
    };
  }, [pathname, lang]);
  return <div className="reading-progress" aria-hidden="true"><span /></div>;
}

