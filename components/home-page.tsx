"use client";
import { HomeCapabilities } from "@/components/home-capabilities";
import { OperatingPerspective } from "@/components/operating-perspective";
import { StageExplorer } from "@/components/stage-explorer";
import { ProofComposition } from "@/components/proof-composition";
import { SelectedWork } from "@/components/selected-work";
import { ExperienceComposition } from "@/components/experience-composition";
import { ContactLinks } from "@/components/contact-links";
import { NextScene } from "@/components/next-scene";
import { IllustrationGallery } from "@/components/illustration-gallery";
import { SiteLink as Link } from "@/components/site-link";
import { useSite } from "@/components/site-provider";
import { publicAsset } from "@/lib/public-asset";

export function HomePage() {
  const { t, lang } = useSite();
  const stages = t.ownership.map(item => ({ ...item, fields: (["evaluate", "decision", "coordinate", "output"] as const).map(key => ({ label: t.common[key], value: item[key] })) }));
  return <main id="top" className="home-world cynthia-home" data-measured="true">
    <div id="main-content" className="home-content" tabIndex={-1}>
      <section className="cynthia-hero" aria-labelledby="hero-title">
        <div className="cynthia-hero-art"><img src={publicAsset("/images/cynthia/astronaut.png")} width={1672} height={941} alt={lang === "zh" ? "Cynthia 的宇航员与星空插画" : "Cynthia’s astronaut illustration"} fetchPriority="high" /></div>
        <div className="cynthia-hero-copy">
          <p className="micro hero-intro">{lang === "zh" ? "周媛媛 / 内容与视觉作品集" : "YUANYUAN ZHOU / CONTENT & VISUAL PORTFOLIO"}</p>
          <h1 id="hero-title">CYNTHIA<span className="hero-dot">.</span></h1>
          <p className="cynthia-role">{t.hero.role}</p>
          <p className="cynthia-thesis">{t.hero.thesis.map(line => <span key={line}>{line}</span>)}</p>
          <div className="hero-actions"><Link href="/results" className="hero-primary">{t.common.results}<span aria-hidden="true">↗</span></Link><Link href="/illustrations" className="text-link">{t.extra.artLink}<span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="cynthia-hero-foot scene-margin micro"><span>{t.hero.location}</span><a href="#operator">{t.common.scroll}<span aria-hidden="true">↓</span></a></div>
      </section>
      <section id="operator" className="scene scene-operator" aria-labelledby="operator-title"><div className="operator-composition scene-margin"><p className="scene-caption micro">{t.home.operator}</p><h2 id="operator-title" className="editorial-aside operator-aside">{t.home.operatorTitle}</h2><OperatingPerspective /><p className="operator-intro">{t.home.operatorIntro}</p></div></section>
      <section id="ownership" className="scene scene-ownership" aria-labelledby="ownership-title"><div className="scene-margin"><p className="scene-caption micro">{t.home.chain}</p><div className="section-intro"><h2 id="ownership-title">{t.home.chainTitle}</h2><p>{t.home.chainIntro}</p></div><StageExplorer stages={stages} label={t.home.chainTitle} /></div></section>
      <section id="proof" className="scene scene-proof" aria-labelledby="proof-title"><div className="scene-margin"><h2 id="proof-title" className="scene-caption micro">{t.home.proof}</h2><ProofComposition /></div></section>
      <section id="operate" className="scene scene-operate" aria-labelledby="operate-title"><div className="scene-margin"><p className="scene-caption micro">{t.home.operate}</p><h2 id="operate-title" className="section-title">{t.home.operateTitle}</h2><HomeCapabilities /></div></section>
      <section id="work" className="scene scene-work" aria-labelledby="work-title"><div className="scene-margin"><p className="scene-caption micro">{t.home.work}</p><h2 id="work-title" className="section-title">{t.home.workTitle}</h2><SelectedWork /></div></section>
      <section id="illustrations" className="scene scene-illustrations" aria-labelledby="art-title"><div className="scene-margin"><p className="scene-caption micro">{t.extra.artEyebrow}</p><div className="art-heading"><h2 id="art-title">{t.extra.artTitle}</h2><p>{t.extra.artIntro}</p></div><IllustrationGallery preview /><Link className="text-link art-all" href="/illustrations">{t.extra.artAll}<span aria-hidden="true">↗</span></Link></div></section>
      <section id="experience" className="scene scene-experience" aria-labelledby="experience-title"><div className="scene-margin"><p className="scene-caption micro">{t.home.experience}</p><h2 id="experience-title" className="section-title">{t.home.experienceTitle}</h2><ExperienceComposition /><div className="education-note"><p className="micro">{t.extra.educationPeriod}</p><div><h3>{t.extra.education}</h3><p>{t.extra.bio}</p></div></div></div></section>
      <section id="ai-workflow" className="scene scene-ai" aria-labelledby="ai-title"><div className="scene-margin ai-composition"><p className="micro">{t.home.ai}</p><h2 id="ai-title">{t.home.aiTitle}</h2><p>{t.home.aiTools}</p></div></section>
      <section id="contact-home" className="scene scene-contact" aria-labelledby="contact-title"><div className="scene-margin"><p className="micro">{t.home.contact}</p><h2 id="contact-title" className="section-title">{t.home.contactTitle}</h2><ContactLinks /></div></section>
      <NextScene to="capabilities" title={t.home.nextTitle} />
    </div>
  </main>;
}
