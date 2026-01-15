import { ProjectCard } from "@/components/portfolio/project-card";
import { getPublishedProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Portfolio",
  description: "Browse my portfolio of projects and work",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground">
          A collection of projects I&apos;ve worked on. Each project represents
          my passion for creating impactful solutions.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No projects yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
