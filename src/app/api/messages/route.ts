import { NextResponse } from "next/server";
import { db, messages } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));

    return NextResponse.json(allMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
