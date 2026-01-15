import { NextRequest, NextResponse } from "next/server";
import { db, projects } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));

    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      imageUrl,
      liveUrl,
      githubUrl,
      technologies,
      featured,
      status,
      order,
    } = body;

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: "Title, slug, and description are required" },
        { status: 400 }
      );
    }

    const newProject = await db
      .insert(projects)
      .values({
        title,
        slug,
        description,
        content: content || null,
        imageUrl: imageUrl || null,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        technologies: technologies || [],
        featured: featured || false,
        status: status || "draft",
        order: order || 0,
      })
      .returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
