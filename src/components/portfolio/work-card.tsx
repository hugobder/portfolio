"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProfessionalWork } from "@/lib/db/schema";

interface WorkCardProps {
  work: ProfessionalWork;
  index?: number;
}

const ACCENT_COLORS = [
  "var(--coral)",
  "var(--electric-blue)",
  "var(--sunny-yellow)",
];

export function WorkCard({ work, index = 0 }: WorkCardProps) {
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
          {work.imageUrl ? (
            <Image
              src={work.imageUrl}
              alt={work.title}
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
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {work.company}
            </span>
            {work.role && (
              <>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-xs text-muted-foreground/70">
                  {work.role}
                </span>
              </>
            )}
          </div>

          <h3
            className="text-xl font-bold mb-2 transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="group-hover:text-primary transition-colors">
              {work.title}
            </span>
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
            {work.description}
          </p>

          {work.technologies && work.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {work.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs rounded-full px-2.5">
                  {tech}
                </Badge>
              ))}
              {work.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs rounded-full px-2.5">
                  +{work.technologies.length - 4}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Link
            href={`/work/${work.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ background: accentColor }}
          >
            <Eye className="h-3.5 w-3.5" />
            Détails
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
