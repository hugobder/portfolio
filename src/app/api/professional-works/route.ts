import { NextRequest, NextResponse } from "next/server";
import { db, professionalWorks } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allWorks = await db
      .select()
      .from(professionalWorks)
      .orderBy(desc(professionalWorks.createdAt));

    return NextResponse.json(allWorks);
  } catch (error) {
    console.error("Error fetching professional works:", error);
    return NextResponse.json(
      { error: "Failed to fetch professional works" },
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
      company,
      role,
      imageUrl,
      technologies,
      pages,
      featured,
      status,
      order,
    } = body;

    if (!title || !slug || !description || !company) {
      return NextResponse.json(
        { error: "Title, slug, description, and company are required" },
        { status: 400 }
      );
    }

    const newWork = await db
      .insert(professionalWorks)
      .values({
        title,
        slug,
        description,
        company,
        role: role || null,
        imageUrl: imageUrl || null,
        technologies: technologies || [],
        pages: pages || [],
        featured: featured || false,
        status: status || "draft",
        order: order || 0,
      })
      .returning();

    return NextResponse.json(newWork[0], { status: 201 });
  } catch (error) {
    console.error("Error creating professional work:", error);
    return NextResponse.json(
      { error: "Failed to create professional work" },
      { status: 500 }
    );
  }
}
