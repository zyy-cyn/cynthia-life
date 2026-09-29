"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { HERO_FRAGMENTS, HERO_SOURCE } from "@/components/home-geometry";
import { PageVisual } from "@/components/page-visual";

const movingFragments = HERO_FRAGMENTS.filter((fragment) => fragment.offset !== 0);

export function HomeHeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const original = useRef<HTMLImageElement>(null);
  const pending = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const picture = original.current;
    picture?.decode().then(() => { if (!cancelled) setReady(true); }).catch(() => {});
    return () => {
      cancelled = true;
      if (pending.current !== null) window.cancelAnimationFrame(pending.current);
    };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ready) return;
    const stage = root.current;
    if (!stage || stage.closest<HTMLElement>(".home-world")?.dataset.motion !== "enabled") return;
    const { clientX, clientY } = event;
    if (pending.current !== null) window.cancelAnimationFrame(pending.current);
    pending.current = window.requestAnimationFrame(() => {
      pending.current = null;
      const bounds = stage.getBoundingClientRect();
      stage.style.setProperty("--pointer-x", `${((clientX - bounds.left) / bounds.width - .5) * 4}px`);
      stage.style.setProperty("--pointer-y", `${((clientY - bounds.top) / bounds.height - .5) * 4}px`);
    });
  }

  function leave() {
    if (pending.current !== null) window.cancelAnimationFrame(pending.current);
    pending.current = null;
    root.current?.style.setProperty("--pointer-x", "0px");
    root.current?.style.setProperty("--pointer-y", "0px");
  }

  return (
    <div ref={root} className="hero-visual" data-ready={ready} onPointerMove={move} onPointerLeave={leave} style={{ "--hero-image": `url("${HERO_SOURCE.src}")` } as CSSProperties}>
      <PageVisual page="home" imageRef={original} className="hero-original" priority />
      {String(HERO_SOURCE.src) === String(HERO_SOURCE.fragmentationSource) && <div className="hero-fragments" aria-hidden="true">
        {movingFragments.map((fragment, index) => (
          <span
            className="hero-fragment"
            key={fragment.id}
            style={{
              "--fragment-top": `${fragment.y / HERO_SOURCE.height * 100}%`,
              "--fragment-right": `${(HERO_SOURCE.width - fragment.x - fragment.width) / HERO_SOURCE.width * 100}%`,
              "--fragment-bottom": `${(HERO_SOURCE.height - fragment.y - fragment.height) / HERO_SOURCE.height * 100}%`,
              "--fragment-left": `${fragment.x / HERO_SOURCE.width * 100}%`,
              "--fragment-offset": `${fragment.offset}px`,
              "--fragment-delay": `${index * 22}ms`,
              "--fragment-direction": index % 2 ? "-1" : "1",
            } as CSSProperties}
          />
        ))}
      </div>}
    </div>
  );
}

