import { getSetting } from "@/lib/data";
import { SkillBar } from "@/components/portfolio/skill-bar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Mail } from "lucide-react";
import { CvDownloadButton } from "@/components/portfolio/cv-download-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "À propos",
  description:
    "En savoir plus sur Hugo Bruder – Développeur Full Stack. Mon parcours, mes compétences en React, Next.js, TypeScript et mon expérience professionnelle.",
  openGraph: {
    title: "À propos | Hugo Bruder",
    description:
      "En savoir plus sur Hugo Bruder – Développeur Full Stack. Mon parcours, mes compétences en React, Next.js, TypeScript et mon expérience professionnelle.",
    url: "/about",
  },
};

interface Skill {
  name: string;
  level: number;
}

const STAT_CARDS = [
  { value: "2+", label: "Ans d'expérience", color: "var(--coral)" },
  { value: "10+", label: "Projets réalisés", color: "var(--electric-blue)" },
  { value: "5+", label: "Technologies", color: "var(--sunny-yellow)" },
];

export default async function AboutPage() {
  const name = await getSetting<string>("name") || "Hugo Bruder";
  const title = await getSetting<string>("title") || "Développeur Full Stack";
  const bio = await getSetting<string>("bio");
  const skills = await getSetting<Skill[]>("skills") || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bruderhugo.fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name,
      jobTitle: title,
      description: bio || undefined,
      url: siteUrl,
      email: "hugobruder62@gmail.com",
      knowsAbout: skills.map((s: Skill) => s.name),
      worksFor: {
        "@type": "Organization",
        name: "CashMag",
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-primary flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Mon parcours
          </p>
          <h1 className="text-4xl font-bold mb-4">À propos de moi</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apprenez à me connaître – mon parcours, mes compétences et ce qui me motive.
          </p>
        </div>

        {/* Bio + Stats */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Qui je suis</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bonjour, je suis{" "}
                <span className="text-foreground font-semibold">{name}</span>,{" "}
                {title}.
              </p>
              <p>
                {bio ||
                  "Je suis passionné par la création de solutions élégantes à des problèmes complexes. Avec des années d'expérience en développement web, j'ai travaillé sur une variété de projets allant des sites pour petites entreprises aux applications d'envergure."}
              </p>
              <p>
                Quand je ne code pas, vous pouvez me trouver en train d&apos;explorer de nouvelles technologies,
                de contribuer à des projets open-source ou de partager mes connaissances avec
                la communauté des développeurs.
              </p>
            </div>
            <div className="flex gap-3 mt-8 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ background: "var(--coral)", boxShadow: "0 4px 16px oklch(0.65 0.22 28 / 30%)" }}
              >
                <Mail className="h-4 w-4" />
                Me contacter
              </Link>
              <CvDownloadButton />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STAT_CARDS.map((stat) => (
              <Card key={stat.label} style={{ borderTop: `3px solid ${stat.color}` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-black mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-primary flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Ce que je maîtrise
            </p>
            <h2 className="text-2xl font-bold">Compétences &amp; expertise</h2>
          </div>
          {skills.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <SkillBar name="JavaScript" level={70} index={0} />
              <SkillBar name="TypeScript" level={50} index={1} />
              <SkillBar name="React" level={60} index={2} />
              <SkillBar name="Node.js" level={60} index={3} />
              <SkillBar name="Python" level={70} index={4} />
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div>
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-primary flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Mon parcours professionnel
            </p>
            <h2 className="text-2xl font-bold">Expérience</h2>
          </div>
          <div className="space-y-6">
            <Card style={{ borderLeft: "4px solid var(--coral)" }}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-bold">Développeur en stage</h3>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full mt-1 md:mt-0"
                    style={{
                      background: "oklch(0.65 0.22 28 / 10%)",
                      color: "var(--coral)",
                    }}
                  >
                    2024 – Présent
                  </span>
                </div>
                <p className="font-semibold mb-2" style={{ color: "var(--electric-blue)" }}>
                  CashMag
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Apprentissage des bases du développement et des bonnes pratiques en génie logiciel.
                  Travail sur des projets concrets et collaboration avec des développeurs expérimentés
                  pour renforcer mes compétences dans le domaine.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
