"use client";

import { useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useSite } from "@/components/site-provider";

export type ExplorerStage = { id: string; title: string; en: string; fields: { label: string; value: string }[] };
export function ReadingFields({ fields }: { fields: ExplorerStage["fields"] }) {
  return <dl className="reading-fields">{fields.map(field => <div key={field.label}><dt className="micro">{field.label}</dt><dd>{field.value}</dd></div>)}</dl>;
}

export function StageExplorer({ stages, label, variant = "ownership" }: { stages: ExplorerStage[]; label: string; variant?: "ownership" | "cycle" | "pipeline" }) {
  const { t, enhanced } = useSite();
  const [active, setActive] = useState(stages[0].id);
  const [direction, setDirection] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const activeIndex = stages.findIndex(stage => stage.id === active);
  function select(value: string) {
    if (!value || value === active) return;
    setDirection(stages.findIndex(stage => stage.id === value) > activeIndex ? 1 : -1);
    setActive(value);
  }
  function step(delta: number) {
    const target = stages[activeIndex + delta];
    if (!target) return;
    select(target.id);
    root.current?.querySelector<HTMLButtonElement>(`[data-stage="${target.id}"]`)?.focus({ preventScroll: true });
  }
  if (!enhanced) return <div className={`explorer-static explorer-${variant}`} aria-label={label}>{stages.map((stage, index) => <article key={stage.id}><p className="micro">{String(index + 1).padStart(2, "0")} / {stage.en}</p><h3>{stage.title}</h3><ReadingFields fields={stage.fields} /></article>)}</div>;
  return <div ref={root} className={`stage-explorer explorer-${variant}`} data-direction={direction} data-responsive-module>
    <p className="interaction-guide"><span aria-hidden="true">↳</span>{t.common.selectStage}</p>
    <Tabs value={active} onValueChange={select} orientation="vertical" className="explorer-desktop">
      <TabsList className="stage-list" aria-label={label}>{stages.map((stage, index) => <TabsTrigger key={stage.id} value={stage.id} className="stage-trigger" data-stage={stage.id} data-adjacent={Math.abs(index - activeIndex) === 1}>
        <span className="stage-index">{String(index + 1).padStart(2, "0")}</span><span>{stage.title}</span><span className="stage-mark" aria-hidden="true">↗</span>
      </TabsTrigger>)}</TabsList>
      <div className="stage-reading-position">
        <div className="stage-position micro"><span>{t.common.stage} {String(activeIndex + 1).padStart(2, "0")} / {stages.length}</span><div><button type="button" onClick={() => step(-1)} disabled={activeIndex === 0} aria-label={t.common.previous}>←</button><button type="button" onClick={() => step(1)} disabled={activeIndex === stages.length - 1} aria-label={t.common.following}>→</button></div></div>
        <div className="stage-progress" aria-hidden="true"><span style={{ width: `${(activeIndex + 1) / stages.length * 100}%` }} /></div>
        {stages.map(stage => <TabsContent key={stage.id} value={stage.id} className="stage-reading"><p className="micro stage-en">{stage.en}</p><h3>{stage.title}</h3><ReadingFields fields={stage.fields} /></TabsContent>)}
      </div>
    </Tabs>
    <Accordion type="single" value={active} onValueChange={select} className="explorer-mobile" aria-label={label}>
      {stages.map((stage, index) => <AccordionItem key={stage.id} value={stage.id}><AccordionTrigger><span className="stage-index">{String(index + 1).padStart(2, "0")}</span><span>{stage.title}</span></AccordionTrigger><AccordionContent><p className="micro">{stage.en}</p><ReadingFields fields={stage.fields} /></AccordionContent></AccordionItem>)}
    </Accordion>
  </div>;
}

