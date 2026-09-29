import { notFound } from "next/navigation";
import { ResultDetail } from "@/components/result-detail";
import { zh } from "@/content/zh";

export function generateStaticParams() { return zh.cases.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = zh.cases.find(record => record.slug === slug);
  return { title: `${item?.title ?? zh.nav.results} — CYNTHIA`, description: item?.outcome };
}
export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!zh.cases.some(item => item.slug === slug)) notFound();
  return <ResultDetail slug={slug} />;
}

