import { getSetting } from "@/lib/data";
import { SkillBar } from "@/components/portfolio/skill-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About | Portfolio",
  description: "Learn more about me, my skills, and my experience",
};

interface Skill {
  name: string;
  level: number;
}

export default async function AboutPage() {
  const name = await getSetting<string>("name") || "John Doe";
  const title = await getSetting<string>("title") || "Full Stack Developer";
  const bio = await getSetting<string>("bio");
  const skills = await getSetting<Skill[]>("skills") || [];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know me better - my background, skills, and what drives me.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hi, I&apos;m <span className="text-foreground font-medium">{name}</span>,
                a {title}.
              </p>
              <p>
                {bio || "I'm passionate about creating elegant solutions to complex problems. With years of experience in web development, I've worked on a variety of projects ranging from small business websites to large-scale enterprise applications."}
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button asChild>
                <Link href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Me
                </Link>
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">30+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Clients
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">
                  Technologies
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Skills & Expertise</h2>
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
              <SkillBar name="JavaScript" level={90} index={0} />
              <SkillBar name="TypeScript" level={85} index={1} />
              <SkillBar name="React" level={90} index={2} />
              <SkillBar name="Next.js" level={85} index={3} />
              <SkillBar name="Node.js" level={80} index={4} />
              <SkillBar name="Python" level={75} index={5} />
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold">Senior Developer</h3>
                  <span className="text-sm text-muted-foreground">2022 - Present</span>
                </div>
                <p className="text-primary font-medium mb-2">Tech Company Inc.</p>
                <p className="text-muted-foreground">
                  Leading development of web applications using modern technologies.
                  Mentoring junior developers and implementing best practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                  <span className="text-sm text-muted-foreground">2020 - 2022</span>
                </div>
                <p className="text-primary font-medium mb-2">Startup XYZ</p>
                <p className="text-muted-foreground">
                  Built and maintained multiple web applications from scratch.
                  Worked closely with design and product teams.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold">Junior Developer</h3>
                  <span className="text-sm text-muted-foreground">2018 - 2020</span>
                </div>
                <p className="text-primary font-medium mb-2">Digital Agency</p>
                <p className="text-muted-foreground">
                  Started my career building websites and web applications
                  for various clients across different industries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
