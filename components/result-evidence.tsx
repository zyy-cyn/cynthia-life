"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useSite } from "@/components/site-provider";
import { evidenceItems, evidenceCopy, type EvidenceItem, type EvidenceCategory } from "@/content/result-evidence";

function EvidenceFrame({ item, index }: { item: EvidenceItem; index: number }) {
  const { lang } = useSite();
  const copy = evidenceCopy[lang];
  const [failed, setFailed] = useState(false);
  return <figure className={"evidence-item evidence-" + item.category} data-evidence-id={item.id}>
    <Dialog><DialogTrigger asChild><button type="button" className="evidence-frame evidence-open" disabled={failed} aria-label={copy.zoom + " — " + item.title[lang]}>{failed ? <span>{copy.pending}</span> : <img src={item.src} alt={item.alt[lang]} loading="lazy" decoding="async" onError={() => setFailed(true)} />}<span className="evidence-zoom">{copy.zoom}<span aria-hidden="true">↗</span></span></button></DialogTrigger>
      <DialogContent className="evidence-lightbox" showCloseButton={false}><div className="evidence-lightbox-bar"><DialogTitle>{item.title[lang]}</DialogTitle><DialogClose className="action-link">{copy.close}<span aria-hidden="true">×</span></DialogClose></div><DialogDescription className="record-description">{item.alt[lang]}</DialogDescription><img src={item.src} alt={item.alt[lang]} /></DialogContent>
    </Dialog>
    <figcaption><span>{String(index + 1).padStart(2,"0")} / {item.title[lang]}</span><span className="micro">{copy[item.category]}</span></figcaption>
  </figure>;
}
export function ResultEvidence({ slug }: { slug?: string }) {
  const { lang, t } = useSite();
  const copy = evidenceCopy[lang];
  const items = slug ? evidenceItems.filter(item => item.caseSlug === slug) : evidenceItems;
  const filters: ("all" | EvidenceCategory)[] = ["all", "beauty", "home", "export"];
  if (!items.length) return null;
  return <section id="evidence" className="result-evidence" aria-labelledby="evidence-title">
    <div className="evidence-heading"><div><p className="micro">{copy.eyebrow}</p><h2 id="evidence-title">{copy.title}</h2></div><span className="evidence-total" aria-hidden="true">{String(items.length).padStart(2,"0")}</span></div>
    <p className="evidence-intro">{t.extra.evidenceIntro}</p>
    {slug ? <div className="evidence-grid">{items.map((item,index) => <EvidenceFrame key={item.id} item={item} index={index} />)}</div> : <Tabs defaultValue="all" className="evidence-browser"><TabsList className="evidence-filters" aria-label={copy.title}>{filters.map(filter => <TabsTrigger key={filter} value={filter}>{copy[filter]}<span>{items.filter(item => filter === "all" || item.category === filter).length}</span></TabsTrigger>)}</TabsList>{filters.map(filter => <TabsContent key={filter} value={filter} className="evidence-grid">{items.map((item,index) => filter === "all" || item.category === filter ? <EvidenceFrame key={item.id} item={item} index={index} /> : null)}</TabsContent>)}</Tabs>}
  </section>;
}
