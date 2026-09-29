"use client";

import { SiteLink as Link } from "@/components/site-link";
import { useSite } from "@/components/site-provider";
import { projectSummaries } from "@/content/result-evidence";

export function SelectedWork() {
  const { t, lang } = useSite();
  return <div className="selected-work">{t.cases.map(item => <Link href={`/results/${item.slug}`} className="work-entry" key={item.slug} data-responsive-module data-spotlight>
    <div className="work-title"><p className="micro work-meta">{item.index} / {item.category}</p><h3>{item.title}</h3><p className="work-summary">{projectSummaries[item.slug]?.[lang] || item.ownership}</p></div>
    <div className="work-result"><strong>{item.result}</strong><span>{item.resultLabel}</span></div>
    <span className="action-link work-open">{t.common.viewCase}<span aria-hidden="true">↗</span></span>
  </Link>)}</div>;
}

