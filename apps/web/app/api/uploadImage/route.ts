import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request): Promise<NextResponse> {
    try{
        const { noteId } = await request.json();
        console.log("noteId is",noteId);
        // extract out the dalle imageurl
        // save it to firebase
        const notes = await db
        .select()
        .from($notes)
        .where(eq($notes.id, parseInt(noteId)));
        if (!notes[0].imageUrl) {
                return new NextResponse("no image url", { status: 400 });
        }
        const { searchParams } = new URL(notes[0].imageUrl);
        const filename = searchParams.get('filename');
        const blob = await put(filename, request.body, {
            access: 'public',
          });
        
        // update the note with the firebase url
        await db
        .update($notes)
        .set({ imageUrl: blob.url,
        })
        .where(eq($notes.id, parseInt(noteId)));
        return new NextResponse("ok", { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("error", { status: 500 });
  }
}