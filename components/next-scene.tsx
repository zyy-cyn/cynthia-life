"use client";

import { SiteLink as Link } from "@/components/site-link";
import { useSite } from "@/components/site-provider";
import { routes, type PageKey } from "@/content/page-visuals";

export function NextScene({ to, title }: { to: PageKey; title: string }) {
  const { t } = useSite();
  return <section className="next-scene scene-margin" data-responsive-module>
    <p className="micro">{t.common.next} / {t.nav[to]}</p><Link className="next-title" data-spotlight href={routes.find(route => route.key === to)!.href}><span>{title}</span><span className="next-arrow" aria-hidden="true">↗</span></Link>
    <footer className="site-footer"><Link href="/" aria-label={t.common.home}>CYNTHIA</Link><span className="micro">{t.home.principles}</span><a href="#top" className="footer-top" aria-label={t.common.top}>↑</a></footer>
  </section>;
}

