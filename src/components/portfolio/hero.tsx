"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export function Hero({
  name = "Hugo Bruder",
  title = "Développeur Full Stack",
  description = "Je crée des applications web modernes avec des technologies de pointe. Passionné par la création de solutions élégantes à des problèmes complexes.",
  socialLinks = {},
}: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-dots">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-[-8%] right-[-8%] w-[45vw] h-[45vw] max-w-[640px] max-h-[640px] rounded-full"
          style={{ background: "oklch(0.65 0.22 28 / 12%)" }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-8%] w-[38vw] h-[38vw] max-w-[540px] max-h-[540px] rounded-full"
          style={{ background: "oklch(0.52 0.22 252 / 10%)" }}
          animate={{ scale: [1.08, 1, 1.08], rotate: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] left-[5%] w-[18vw] h-[18vw] max-w-[280px] max-h-[280px] rounded-full"
          style={{ background: "oklch(0.87 0.17 92 / 18%)" }}
          animate={{ scale: [1, 1.18, 1], y: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Small geometric accents */}
        <div
          className="absolute top-[18%] right-[18%] w-14 h-14 rounded-2xl rotate-12 opacity-30"
          style={{ background: "oklch(0.65 0.22 28)" }}
        />
        <div
          className="absolute bottom-[28%] right-[12%] w-9 h-9 rounded-full opacity-25"
          style={{ background: "oklch(0.52 0.22 252)" }}
        />
        <div
          className="absolute bottom-[20%] left-[20%] w-6 h-6 rounded-md rotate-45 opacity-35"
          style={{ background: "oklch(0.87 0.17 92)" }}
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-semibold rounded-full border-2"
              style={{
                borderColor: "var(--coral)",
                color: "var(--coral)",
                background: "oklch(0.65 0.22 28 / 8%)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Bienvenue sur mon portfolio
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display tracking-tight mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block text-2xl md:text-3xl font-medium text-muted-foreground mb-2">
              Bonjour, je suis
            </span>
            <span className="text-gradient text-5xl md:text-7xl lg:text-8xl font-black">
              {name}
            </span>
          </motion.h1>

          {/* Title pill */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="px-5 py-2 rounded-full text-lg font-semibold text-white"
              style={{ background: "var(--electric-blue)" }}
            >
              {title}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full px-8 h-12 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-100"
              style={{
                background: "var(--coral)",
                boxShadow: "0 4px 24px oklch(0.65 0.22 28 / 35%)",
              }}
            >
              Voir mes projets
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-8 h-12 text-base font-semibold border-2 transition-all duration-200 hover:text-white hover:scale-105 active:scale-100"
              style={{
                borderColor: "var(--electric-blue)",
                color: "var(--electric-blue)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--electric-blue)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              Me contacter
            </Link>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.github && (
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-primary hover:border-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {socialLinks.linkedin && (
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-110"
                style={{}}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--electric-blue)";
                  el.style.color = "var(--electric-blue)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.color = "";
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            {socialLinks.email && (
              <Link
                href={`mailto:${socialLinks.email}`}
                className="p-3 rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-110"
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--sunny-yellow)";
                  el.style.color = "oklch(0.65 0.15 78)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.color = "";
                }}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
