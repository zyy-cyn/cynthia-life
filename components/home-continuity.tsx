"use client";

import { useEffect } from "react";

export function HomeContinuity() {
  useEffect(() => {
    const world = document.querySelector<HTMLElement>(".home-world");
    if (!world) return;
    const scenes = Array.from(world.querySelectorAll<HTMLElement>("[data-scene]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 800px)");
    const review = new URLSearchParams(window.location.search).get("review");
    if (review === "environment") world.dataset.review = "environment";
    let frame: number | null = null;
    let disposed = false;
    let heroHeight = 1;
    function update() {
      frame = null;
      if (!world) return;
      const allowed = !reduced.matches && !small.matches && review !== "still";
      const exit = Math.max(0, Math.min(1, (window.scrollY - heroHeight * .45) / (heroHeight * .5)));
      world.dataset.motion = allowed ? "enabled" : "static";
      world.style.setProperty("--hero-opacity", allowed ? String(1 - exit) : "1");
      world.style.setProperty("--fragment-opacity", allowed ? String(Math.max(0, 1 - exit * 1.5)) : "0");
      world.style.setProperty("--fragment-exit", allowed ? `${exit * 8}px` : "0px");
    }
    function schedule() { if (frame === null) frame = requestAnimationFrame(update); }
    function measure() {
      if (!world || disposed) return;
      const scroll = window.scrollY;
      const offsets = scenes.map(scene => { const rect = scene.getBoundingClientRect(); return { id: scene.dataset.scene, top: rect.top + scroll, height: rect.height }; });
      heroHeight = offsets[0]?.height || window.innerHeight;
      world.style.setProperty("--hero-end", `${heroHeight}px`);
      for (const id of ["proof", "operate", "experience"]) {
        const scene = offsets.find(entry => entry.id === id);
        if (scene) world.style.setProperty(`--${id}-start`, `${scene.top}px`);
      }
      world.dataset.measured = "true";
      schedule();
    }
    const resize = new ResizeObserver(measure);
    scenes.forEach(scene => resize.observe(scene));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    reduced.addEventListener("change", schedule);
    small.addEventListener("change", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", schedule);
      small.removeEventListener("change", measure);
    };
  }, []);
  return null;
}

