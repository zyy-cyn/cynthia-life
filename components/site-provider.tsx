"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { zh, type Dictionary } from "@/content/zh";
import { en } from "@/content/en";

type Language = "zh" | "en";
const SiteContext = createContext<{ lang: Language; t: Dictionary; setLanguage: (lang: Language) => void; enhanced: boolean }>({ lang: "zh", t: zh, setLanguage: () => {}, enhanced: false });

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("zh");
  const [enhanced, setEnhanced] = useState(true);
  const pathname = usePathname();
  const t = lang === "zh" ? zh : en;
  useEffect(() => {
    try { if (localStorage.getItem("cynthia-language") === "en") setLang("en"); } catch { /* Storage restrictions must not block navigation. */ }
    setEnhanced(new URLSearchParams(window.location.search).get("review") !== "still");
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    const page = pathname.split("/")[1] || "home";
    const caseItem = t.cases.find(item => pathname === `/results/${item.slug}`);
    const title = caseItem?.title || t.nav[page as keyof typeof t.nav] || t.nav.home;
    document.title = `${title} — CYNTHIA · ${t.hero.role}`;
  }, [lang, pathname, t]);
  function setLanguage(value: Language) {
    setLang(value);
    try { localStorage.setItem("cynthia-language", value); } catch { /* Language still works for this visit. */ }
  }
  return <SiteContext.Provider value={{ lang, t, setLanguage, enhanced }}>{children}</SiteContext.Provider>;
}
export function useSite() { return useContext(SiteContext); }

