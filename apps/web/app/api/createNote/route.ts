// /api/createNoteBook
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  console.log("name",name);
  // const image_description = await generateImagePrompt(name);
  // if (!image_description) {
  //   return new NextResponse("failed to generate image description", {
  //     status: 500,
  //   });
  // }
  // const image_url = await generateImage(image_description);
  // if (!image_url) {
  //   return new NextResponse("failed to generate image ", {
  //     status: 500,
  //   });
  // }
  const note_ids = await db
    .insert($notes)
    .values({
      name,
      userId,
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}