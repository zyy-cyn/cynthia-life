"use client";

import { useState } from "react";
import { SiteLink as Link } from "@/components/site-link";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { useSite } from "@/components/site-provider";
import { resume, routes } from "@/content/page-visuals";

export function LanguageSwitch() {
  const { lang, t, setLanguage } = useSite();
  return <div className="language-switch" role="group" aria-label={t.common.language}>
    <button type="button" aria-label={t.common.switchZh} aria-pressed={lang === "zh"} onClick={() => setLanguage("zh")}>中</button>
    <span aria-hidden="true">/</span>
    <button type="button" aria-label={t.common.switchEn} aria-pressed={lang === "en"} onClick={() => setLanguage("en")}>EN</button>
  </div>;
}
export function ResumeLink({ className = "text-link" }: { className?: string }) {
  const { t } = useSite();
  return <a className={className} href={resume.href} download={resume.filename} data-magnetic aria-label={`${t.common.resume} — ${t.common.resumeNote}`}>{t.common.resume}<span aria-hidden="true">↓</span></a>;
}
export function HomeNavigation() {
  const { t } = useSite();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? path === "/" : path.startsWith(href);
  return <>
    <a className="skip-link" href="#main-content">{t.common.skip}</a>
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={t.common.home}>CYNTHIA</Link>
      <nav className="desktop-navigation" aria-label={t.common.navigation}>
        {routes.map(route => <Link key={route.key} href={route.href} aria-current={active(route.href) ? "page" : undefined}>{t.nav[route.key]}</Link>)}
      </nav>
      <div className="header-tools"><ResumeLink className="header-resume" /><LanguageSwitch />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><button className="menu-trigger" type="button">{t.common.menu}<span aria-hidden="true">＋</span></button></SheetTrigger>
          <SheetContent side="top" className="site-menu" showCloseButton={false} aria-describedby="menu-description">
            <div className="menu-top"><SheetTitle>CYNTHIA</SheetTitle><SheetClose className="menu-close">{t.common.close}<span aria-hidden="true">×</span></SheetClose></div>
            <SheetDescription id="menu-description" className="sr-only">{t.common.menuDescription}</SheetDescription>
            <nav aria-label={t.common.navigation}>{routes.map((route, index) => <Link key={route.key} href={route.href} aria-current={active(route.href) ? "page" : undefined} onClick={() => setOpen(false)}><span className="micro">0{index + 1}</span>{t.nav[route.key]}<span aria-hidden="true">↗</span></Link>)}</nav>
            <div className="menu-bottom"><ResumeLink /><LanguageSwitch /></div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  </>;
}

