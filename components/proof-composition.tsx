"use client";

import { SiteLink as Link } from "@/components/site-link";
import { useSite } from "@/components/site-provider";

export function ProofComposition({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useSite();
  return <div className={`proof-composition ${compact ? "proof-compact" : ""}`}>
    <p className="proof-aside editorial-aside">{t.home.proofAside}</p>
    <div className="proof-depth">{t.proof.primary.map((item, index) => <Link href={item.href} key={item.value} className={`proof-object proof-${index}`} data-responsive-module data-spotlight data-depth>
      <span className="proof-number micro" aria-hidden="true">0{index + 1}</span><strong>{item.value}<span className="number-suffix">{item.suffix}</span></strong><h3>{item.title}</h3><p className="proof-context">{item.context}</p><span className="proof-direction action-link">{t.common.viewCase} <span aria-hidden="true">↗</span></span>
    </Link>)}</div>
    <div className="proof-support">{t.proof.secondary.map(item => <p key={item.label}><strong>{item.value}</strong><span>{item.label}</span></p>)}</div>
    <details className="proof-notes proof-details"><summary>{lang === "zh" ? "数据说明" : "About these figures"}</summary><p>{t.proof.order}</p><p>{t.common.proofNote}</p></details>
  </div>;
}

