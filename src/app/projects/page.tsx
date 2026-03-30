import { ProjectCard } from "@/components/portfolio/project-card";
import { getPublishedProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projets",
  description:
    "Découvrez le portfolio de projets web de Hugo Bruder, réalisés avec React, Next.js, TypeScript et Node.js.",
  openGraph: {
    title: "Projets | Hugo Bruder",
    description:
      "Découvrez le portfolio de projets web de Hugo Bruder, réalisés avec React, Next.js, TypeScript et Node.js.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <p className="text-sm font-bold text-primary flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          Ce que j&apos;ai construit
        </p>
        <h1 className="text-4xl font-bold mb-4">Projets</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Une collection de projets sur lesquels j&apos;ai travaillé. Chaque projet reflète
          ma passion pour la création de solutions à fort impact.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/30 rounded-3xl bg-dots">
          <p className="text-muted-foreground text-lg">
            Aucun projet pour l&apos;instant. Revenez bientôt !
          </p>
        </div>
      )}
    </div>
  );
}
