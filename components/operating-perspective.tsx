"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSite } from "@/components/site-provider";

export function OperatingPerspective() {
  const { t, enhanced, lang } = useSite();
  const [active, setActive] = useState("signal");
  if (!enhanced) return <div className="perspective-static">{t.operator.map((item, index) => <article key={item.id}><span className="micro">0{index + 1} / {item.en}</span><h3>{item.title}</h3><p>{item.text}</p><p className="micro">{item.output}</p></article>)}</div>;
  return <Tabs value={active} onValueChange={setActive} className="perspective" data-responsive-module>
    <TabsList className="perspective-path" aria-label={t.home.operatorTitle}>{t.operator.map((item, index) => <TabsTrigger value={item.id} key={item.id} className={`perspective-word word-${index}`}><span className="micro">0{index + 1}</span><span>{item.title}</span>{lang === "zh" && <small className="micro">{item.en}</small>}</TabsTrigger>)}</TabsList>
    <div className="perspective-reading">{t.operator.map(item => <TabsContent key={item.id} value={item.id}><p>{item.text}</p><span className="micro">{item.output}</span></TabsContent>)}</div>
  </Tabs>;
}

