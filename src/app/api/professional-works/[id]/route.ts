import { NextRequest, NextResponse } from "next/server";
import { db, professionalWorks } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const work = await db
      .select()
      .from(professionalWorks)
      .where(eq(professionalWorks.id, parseInt(id)));

    if (work.length === 0) {
      return NextResponse.json(
        { error: "Professional work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(work[0]);
  } catch (error) {
    console.error("Error fetching professional work:", error);
    return NextResponse.json(
      { error: "Failed to fetch professional work" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updatedWork = await db
      .update(professionalWorks)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(professionalWorks.id, parseInt(id)))
      .returning();

    if (updatedWork.length === 0) {
      return NextResponse.json(
        { error: "Professional work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedWork[0]);
  } catch (error) {
    console.error("Error updating professional work:", error);
    return NextResponse.json(
      { error: "Failed to update professional work" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deletedWork = await db
      .delete(professionalWorks)
      .where(eq(professionalWorks.id, parseInt(id)))
      .returning();

    if (deletedWork.length === 0) {
      return NextResponse.json(
        { error: "Professional work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting professional work:", error);
    return NextResponse.json(
      { error: "Failed to delete professional work" },
      { status: 500 }
    );
  }
}
