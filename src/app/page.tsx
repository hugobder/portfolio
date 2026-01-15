import { Hero } from "@/components/portfolio/hero";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Button } from "@/components/ui/button";
import { getSetting, getPublishedProjects, initializeSettings } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Initialize default settings if needed
  await initializeSettings();

  // Get settings from database
  const name = await getSetting<string>("name") || "John Doe";
  const title = await getSetting<string>("title") || "Full Stack Developer";
  const bio = await getSetting<string>("bio");
  const socialLinks = await getSetting<{ github?: string; linkedin?: string; email?: string }>("social_links");

  // Get featured projects (first 3)
  const projects = await getPublishedProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      <Hero
        name={name}
        title={title}
        description={bio || undefined}
        socialLinks={socialLinks || undefined}
      />

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">
                  Some of my recent work that I&apos;m proud of
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/projects">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {bio || "I'm a passionate developer who loves building things for the web."}
            </p>
            <Button asChild>
              <Link href="/about">Learn More About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing together.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
