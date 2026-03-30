"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/db/schema";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ACCENT_COLORS = [
  "var(--coral)",
  "var(--electric-blue)",
  "var(--sunny-yellow)",
];

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accentColor = ACCENT_COLORS[index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className="group overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        style={{ borderTop: `3px solid ${accentColor}` }}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-sm font-medium opacity-40"
              style={{ color: accentColor }}
            >
              Pas d&apos;image
            </div>
          )}
        </div>

        <CardContent className="flex-1 p-6">
          <h3
            className="text-xl font-bold mb-2 transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="group-hover:text-primary transition-colors">
              {project.title}
            </span>
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
            {project.description}
          </p>

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs rounded-full px-2.5">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs rounded-full px-2.5">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0 gap-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: "var(--coral)" }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Démo en direct
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 hover:text-white hover:scale-105"
              style={{ borderColor: "var(--electric-blue)", color: "var(--electric-blue)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--electric-blue)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
