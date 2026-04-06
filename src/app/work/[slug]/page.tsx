import { notFound } from "next/navigation";
import { getProfessionalWorkBySlug } from "@/lib/data";
import { WorkDetail } from "@/components/portfolio/work-detail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getProfessionalWorkBySlug(slug);

  if (!work) return {};

  return {
    title: `${work.title} | Réalisations`,
    description: work.description,
    openGraph: {
      title: `${work.title} | Hugo Bruder`,
      description: work.description,
      url: `/work/${work.slug}`,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getProfessionalWorkBySlug(slug);

  if (!work || work.status !== "published") {
    notFound();
  }

  return <WorkDetail work={work} />;
}
