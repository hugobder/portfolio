import { Hero } from "@/components/portfolio/hero";
import { ProjectCard } from "@/components/portfolio/project-card";
import { getSetting, getPublishedProjects, initializeSettings } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await initializeSettings();
  const name = await getSetting<string>("name") || "Hugo Bruder";
  const title = await getSetting<string>("title") || "Développeur Junior";
  const bio = await getSetting<string>("bio");

  const description = bio ||
    `${name} – ${title}. Création d'applications web modernes avec React, Next.js et TypeScript.`;

  return {
    title: `${name} | ${title}`,
    description,
    openGraph: {
      title: `${name} | ${title}`,
      description,
      url: "/",
    },
  };
}

export default async function Home() {
  await initializeSettings();

  const name = await getSetting<string>("name") || "Hugo Bruder";
  const title = await getSetting<string>("title") || "Développeur Junior";
  const bio = await getSetting<string>("bio");
  const socialLinks = await getSetting<{ github?: string; linkedin?: string; email?: string }>("social_links");

  const projects = await getPublishedProjects();
  const featuredProjects = projects.slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bruderhugo.fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: title,
    description: bio || undefined,
    url: siteUrl,
    email: "hugobruder62@gmail.com",
    sameAs: [
      socialLinks?.github,
      socialLinks?.linkedin,
    ].filter(Boolean),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        name={name}
        title={title}
        description={bio || undefined}
        socialLinks={socialLinks || undefined}
      />

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-muted/40 bg-dots">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Travaux récents
                </p>
                <h2 className="text-3xl font-bold mb-2">Projets en vedette</h2>
                <p className="text-muted-foreground">
                  Quelques-uns de mes travaux récents dont je suis fier
                </p>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-border hover:border-primary hover:text-primary transition-all duration-200"
              >
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="mt-8 flex sm:hidden justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
              >
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold text-primary flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Qui je suis
            </p>
            <h2 className="text-3xl font-bold mb-6">À propos de moi</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {bio || "Je suis un développeur passionné qui aime créer des choses pour le web."}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: "var(--coral)", boxShadow: "0 4px 20px oklch(0.65 0.22 28 / 30%)" }}
            >
              En savoir plus sur moi
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.58 0.22 20) 0%, oklch(0.65 0.22 32) 50%, oklch(0.70 0.20 46) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-30%] right-[-5%] w-64 h-64 rounded-full opacity-15 bg-white" />
        <div className="absolute bottom-[-30%] left-[5%] w-48 h-48 rounded-full opacity-10 bg-white" />

        <div className="container mx-auto px-4 text-center relative">
          <p className="text-sm font-bold opacity-75 mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            Une idée en tête ?
          </p>
          <h2 className="text-4xl font-bold mb-4">Travaillons ensemble</h2>
          <p className="text-lg opacity-85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête ? J&apos;adorerais en entendre parler. Créons quelque chose d&apos;incroyable ensemble.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-bold bg-white transition-all duration-200 hover:opacity-95 hover:scale-105"
            style={{ color: "oklch(0.58 0.22 20)" }}
          >
            Me contacter
          </Link>
        </div>
      </section>
    </div>
  );
}
