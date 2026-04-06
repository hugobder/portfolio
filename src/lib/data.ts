import { db, projects, settings, messages, professionalWorks } from "./db";
import { eq, desc } from "drizzle-orm";

export async function getSettings() {
  const rows = await db.select().from(settings);
  const settingsMap: Record<string, unknown> = {};

  for (const row of rows) {
    settingsMap[row.key] = row.value;
  }

  return settingsMap;
}

export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  const result = await db.select().from(settings).where(eq(settings.key, key));
  if (result.length === 0) return null;
  return result[0].value as T;
}

export async function setSetting(key: string, value: unknown) {
  const existing = await db.select().from(settings).where(eq(settings.key, key));

  if (existing.length > 0) {
    await db.update(settings).set({ value: value as string }).where(eq(settings.key, key));
  } else {
    await db.insert(settings).values({ key, value: value as string });
  }
}

export async function getPublishedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.status, "published"))
    .orderBy(desc(projects.order), desc(projects.createdAt));
}

export async function getFeaturedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(desc(projects.order), desc(projects.createdAt));
}

export async function getAllProjects() {
  return db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));
}

export async function getProjectBySlug(slug: string) {
  const result = await db.select().from(projects).where(eq(projects.slug, slug));
  return result[0] || null;
}

export async function getProjectById(id: number) {
  const result = await db.select().from(projects).where(eq(projects.id, id));
  return result[0] || null;
}

export async function getMessages() {
  return db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt));
}

export async function getUnreadMessagesCount() {
  const result = await db
    .select()
    .from(messages)
    .where(eq(messages.read, false));
  return result.length;
}

export async function getPublishedProfessionalWorks() {
  return db
    .select()
    .from(professionalWorks)
    .where(eq(professionalWorks.status, "published"))
    .orderBy(desc(professionalWorks.order), desc(professionalWorks.createdAt));
}

export async function getAllProfessionalWorks() {
  return db
    .select()
    .from(professionalWorks)
    .orderBy(desc(professionalWorks.createdAt));
}

export async function getProfessionalWorkBySlug(slug: string) {
  const result = await db.select().from(professionalWorks).where(eq(professionalWorks.slug, slug));
  return result[0] || null;
}

export async function getProfessionalWorkById(id: number) {
  const result = await db.select().from(professionalWorks).where(eq(professionalWorks.id, id));
  return result[0] || null;
}

// Default settings for initial setup
export const defaultSettings = {
  site_title: "Portfolio",
  name: "Bruder Hugo",
  title: "Full Stack Developer",
  bio: "Je crée des applications web modernes avec des technologies de pointe. Passionné par la création de solutions élégantes à des problèmes complexes.",
  email: "hugobruder62@gmail.com",
  social_links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  skills: [
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 70 },
    { name: "React", level: 80 },
    { name: "Next.js", level: 70 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 65 },
    { name: "SQL", level: 60 },
    { name: "Docker", level: 70 },
  ],
};

export async function initializeSettings() {
  const existingSettings = await getSettings();

  for (const [key, value] of Object.entries(defaultSettings)) {
    if (!(key in existingSettings)) {
      await setSetting(key, value);
    }
  }
}
