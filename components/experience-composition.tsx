"use client";

import { useSite } from "@/components/site-provider";

export function ExperienceComposition() {
  const { t } = useSite();
  return <div className="experience-composition">{t.experience.map((item, index) => <article className={`experience-entry experience-${index}`} key={item.company} data-responsive-module>
    <p className="micro experience-period">{item.period}</p><h3>{item.company}</h3><p className="micro experience-role">{item.role}</p><p className="experience-summary">{item.summary}</p>
    <details className="experience-details"><summary><span><span className="when-closed">{t.common.expand}</span><span className="when-open">{t.common.collapse}</span></span><span aria-hidden="true">＋</span></summary><p>{item.details}</p></details>
    <p className="experience-signal micro">{item.signal}</p>
  </article>)}</div>;
}

