"use client";
import { IllustrationGallery } from "@/components/illustration-gallery";
import { NextScene } from "@/components/next-scene";
import { useSite } from "@/components/site-provider";
export function IllustrationsPage() {
 const { t } = useSite();
 return <main id="top" className="art-world"><div id="main-content" tabIndex={-1}><header className="art-opening scene-margin"><p className="micro">ILLUSTRATION & LIFE</p><h1>{t.extra.artPageTitle}</h1><p>{t.extra.artPageIntro}</p></header><div className="scene-margin art-collection"><IllustrationGallery /></div><NextScene to="contact" title={t.home.contactTitle} /></div></main>;
}
