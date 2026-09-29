"use client";

import { SiteLink as Link } from "@/components/site-link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useSite } from "@/components/site-provider";
import { ReadingFields } from "@/components/stage-explorer";

export function HomeCapabilities({ expanded = false }: { expanded?: boolean }) {
  const { t, enhanced, lang } = useSite();
  const fields = (item: typeof t.capabilities[number]) => [{ label: t.common.decision, value: item.decision }, { label: t.common.system, value: item.system }];
  return <Accordion type="multiple" defaultValue={expanded ? t.capabilities.map(item => item.id) : ["social"]} className="capability-composition" data-responsive-module>
    {t.capabilities.map((item, index) => <AccordionItem className="capability-entry" value={item.id} key={item.id} data-spotlight>
      <p className="micro capability-kicker">0{index + 1} / {item.en}</p>
      <AccordionTrigger className="capability-heading"><span>{item.title}</span><span className="capability-toggle"><span className="when-closed">{lang === "zh" ? "展开" : "Explore"}</span><span className="when-open">{lang === "zh" ? "收起" : "Close"}</span><span className="toggle-sign" aria-hidden="true">＋</span></span></AccordionTrigger>
      <p className="capability-scope">{item.scope}</p>
      {enhanced ? <AccordionContent className="capability-details"><ReadingFields fields={fields(item)} /></AccordionContent> : <ReadingFields fields={fields(item)} />}
      <p className="capability-evidence"><span className="micro">{t.common.evidence}</span>{item.evidence}</p>
      <Link href={item.href} className="action-link">{t.common.viewCase}<span aria-hidden="true">↗</span></Link>
    </AccordionItem>)}
  </Accordion>;
}

