import { WorkCard } from "@/components/portfolio/work-card";
import { getPublishedProfessionalWorks } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Réalisations",
  description:
    "Découvrez les réalisations professionnelles de Hugo Bruder, projets réalisés en entreprise avec React, Next.js, TypeScript et Node.js.",
  openGraph: {
    title: "Réalisations | Hugo Bruder",
    description:
      "Découvrez les réalisations professionnelles de Hugo Bruder, projets réalisés en entreprise avec React, Next.js, TypeScript et Node.js.",
    url: "/work",
  },
};

export default async function WorkPage() {
  const works = await getPublishedProfessionalWorks();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <p className="text-sm font-bold text-primary flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          Ce que j&apos;ai réalisé en entreprise
        </p>
        <h1 className="text-4xl font-bold mb-4">Réalisations</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Une sélection de projets professionnels sur lesquels j&apos;ai travaillé
          en entreprise.
        </p>
      </div>

      {works.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/30 rounded-3xl bg-dots">
          <p className="text-muted-foreground text-lg">
            Aucune réalisation pour l&apos;instant. Revenez bientôt !
          </p>
        </div>
      )}
    </div>
  );
}
