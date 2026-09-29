"use client";

import { contact } from "@/content/page-visuals";
import { useSite } from "@/components/site-provider";
import { ResumeLink } from "@/components/home-navigation";

export function ContactLinks() {
  const { t } = useSite();
  return <div className="contact-links" data-responsive-module>
    <a href={`mailto:${contact.email}`} className="contact-email" data-magnetic><span className="micro">{t.common.email}</span><span>{contact.email}</span><span className="contact-arrow" aria-hidden="true">↗</span></a>
    <a href={`tel:${contact.phone.replaceAll(' ', '')}`} className="contact-phone" data-magnetic><span className="micro">{t.common.phone}</span><span>{contact.phone}</span><span className="contact-arrow" aria-hidden="true">↗</span></a>
    <div className="contact-resume"><ResumeLink /><span className="micro">{t.common.resumeNote}</span></div>
  </div>;
}

