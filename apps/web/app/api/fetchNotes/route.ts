import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { userId } = auth();
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.userId, userId!));
    
    return NextResponse.json({data:notes});
}