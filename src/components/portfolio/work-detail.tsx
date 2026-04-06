"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkPageContent } from "./work-page-content";
import type { ProfessionalWork } from "@/lib/db/schema";

interface WorkDetailProps {
  work: ProfessionalWork;
}

export function WorkDetail({ work }: WorkDetailProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const pages = work.pages || [];
  const hasMultiplePages = pages.length > 1;

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, pages.length]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux réalisations
      </Link>

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {work.company}
          </span>
          {work.role && (
            <>
              <span className="text-muted-foreground/50">·</span>
              <span className="text-sm text-muted-foreground/70">
                {work.role}
              </span>
            </>
          )}
        </div>
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {work.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          {work.description}
        </p>
        {work.technologies && work.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {work.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs rounded-full px-2.5">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiplePages && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentPage ? 1 : -1);
                setCurrentPage(i);
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  i === currentPage
                    ? "var(--coral)"
                    : "var(--muted-foreground)",
                opacity: i === currentPage ? 1 : 0.25,
                transform: i === currentPage ? "scale(1.25)" : "scale(1)",
              }}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Page content with arrows */}
      <div className="relative max-w-3xl mx-auto">
        {/* Left arrow */}
        {hasMultiplePages && (
          <div className="absolute -left-16 top-0 bottom-0 hidden lg:flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goPrev}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Right arrow */}
        {hasMultiplePages && (
          <div className="absolute -right-16 top-0 bottom-0 hidden lg:flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goNext}
              disabled={currentPage === pages.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Mobile arrows */}
        {hasMultiplePages && (
          <div className="flex lg:hidden justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goPrev}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              {currentPage + 1} / {pages.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goNext}
              disabled={currentPage === pages.length - 1}
            >
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Animated page content */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {pages.length > 0 && (
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <WorkPageContent page={pages[currentPage]} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
