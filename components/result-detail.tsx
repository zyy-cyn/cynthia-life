"use client";

import { SiteLink as Link } from "@/components/site-link";
import { useSite } from "@/components/site-provider";
import { NextScene } from "@/components/next-scene";

import { ResultEvidence } from "@/components/result-evidence";
import { IllustrationGallery } from "@/components/illustration-gallery";

export function ResultDetail({ slug }: { slug: string }) {
  const { t } = useSite();
  const item = t.cases.find(record => record.slug === slug)!;
  const otherCases = t.cases.filter(record => record.slug !== slug);
  return <main id="top" className="case-world"><div className="page-grain" aria-hidden="true" /><div id="main-content" tabIndex={-1}>
    <header className="case-opening scene-margin"><Link className="text-link" href="/results"><span aria-hidden="true">←</span>{t.common.back}</Link><p className="micro">{item.index} / {item.category}</p><h1>{item.title}</h1><div className="case-lead"><p>{item.ownership}</p><div><strong>{item.result}</strong><span>{item.resultLabel}</span></div></div></header>
    <div className="case-narrative scene-margin">{(["context", "diagnosis", "decision", "system", "execution", "outcome", "learning"] as const).map((key, index) => <section className={`case-chapter chapter-${key}`} key={key} aria-labelledby={`chapter-${key}`} data-responsive-module><h2 id={`chapter-${key}`}><span className="micro">0{index + 1}</span>{t.common[key]}</h2><p>{item[key]}</p></section>)}</div>
    <div className="scene-margin case-gallery">{slug === "visual-storytelling" ? <><h2>{t.extra.artPageTitle}</h2><IllustrationGallery preview /><Link className="text-link art-all" href="/illustrations">{t.extra.artAll}<span aria-hidden="true">↗</span></Link></> : <ResultEvidence slug={slug} />}</div>
    <nav className="other-cases scene-margin" aria-label={t.common.viewAll}><h2 className="micro">{t.common.viewAll}</h2>{otherCases.map(record => <Link key={record.slug} href={`/results/${record.slug}`}><span className="micro">{record.index}</span><span>{record.title}</span><span aria-hidden="true">↗</span></Link>)}</nav>
    <NextScene to="methodology" title={t.pages.results.nextTitle} />
  </div></main>;
}

