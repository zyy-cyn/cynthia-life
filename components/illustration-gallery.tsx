"use client";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { illustrations } from "@/content/illustrations";
import { useSite } from "@/components/site-provider";

export function IllustrationGallery({ preview = false }: { preview?: boolean }) {
  const { t, lang } = useSite();
  const items = preview ? illustrations.filter(item => ["art-2", "art-5", "art-7"].includes(item.id)) : illustrations;
  return <div className={"illustration-grid" + (preview ? " art-preview" : "")}>
    {items.map((item, index) => <figure key={item.id} className={"illustration-card " + (item.width > item.height ? "art-landscape" : "art-portrait")}>
      <Dialog><DialogTrigger asChild><button type="button" className="illustration-open" aria-label={t.extra.openImage + " — " + item.title[lang]}><img src={item.src} width={item.width} height={item.height} loading="lazy" decoding="async" alt={item.title[lang]} /><span className="art-open-label">{t.extra.openImage}<span aria-hidden="true">＋</span></span></button></DialogTrigger>
        <DialogContent className="art-lightbox" showCloseButton={false}><div className="art-lightbox-bar"><DialogTitle>{item.title[lang]}</DialogTitle><DialogClose className="action-link">{t.extra.closeImage}<span aria-hidden="true">×</span></DialogClose></div><DialogDescription className="sr-only">{item.title[lang]}</DialogDescription><img src={item.src} width={item.width} height={item.height} alt={item.title[lang]} /></DialogContent>
      </Dialog>
      <figcaption><span className="micro">{String(index + 1).padStart(2, "0")}</span><span>{item.title[lang]}</span><span className="micro">{lang === "zh" ? "插画" : "ILLUSTRATION"}</span></figcaption>
    </figure>)}
  </div>;
}
